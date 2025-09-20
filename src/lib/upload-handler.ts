import { NextRequest, NextResponse } from 'next/server';
import { getUploadConfig, getUploadLimits } from '@/lib/env';
import { promises as fs } from 'fs';
import path from 'path';
import { randomBytes } from 'crypto';

type UploadType = 'image' | 'video' | 'file';

export async function handleUpload(req: NextRequest, expectedType?: UploadType) {
  try {
    const cfg = getUploadConfig();
    const limits = getUploadLimits();
    await fs.mkdir(cfg.absDir, { recursive: true });

    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Expected multipart/form-data' }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Missing file field' }, { status: 400 });
    }

    const declaredType = String(formData.get('type') || 'file') as UploadType;
    const boardId = String(formData.get('boardId') || '').trim();

    const fileMime = (file as any).type || '';
    const isImage = fileMime.startsWith('image/');
    const isVideo = fileMime.startsWith('video/');

    let effectiveType: UploadType = 'file';
    if (expectedType) {
      effectiveType = expectedType;
    } else if (declaredType === 'image' || declaredType === 'video') {
      effectiveType = declaredType;
    } else if (isImage) {
      effectiveType = 'image';
    } else if (isVideo) {
      effectiveType = 'video';
    }

    // Basic MIME validation by endpoint intent
    if (effectiveType === 'image' && !isImage) {
      return NextResponse.json({ error: 'Invalid MIME for image endpoint' }, { status: 415 });
    }
    if (effectiveType === 'video' && !isVideo) {
      return NextResponse.json({ error: 'Invalid MIME for video endpoint' }, { status: 415 });
    }

    const cap = effectiveType === 'image' ? limits.imageMaxBytes : effectiveType === 'video' ? limits.videoMaxBytes : limits.fileMaxBytes;
    if (file.size > cap) {
      return NextResponse.json({ error: 'File too large for type', type: effectiveType, maxBytes: cap }, { status: 413 });
    }

    const originalName = (file as any).name || `upload_${Date.now()}`;
    const id = randomBytes(8).toString('hex');
    const fileName = `${id}_${originalName}`.replace(/[^a-zA-Z0-9._-]/g, '_');
    const targetDir = boardId ? path.join(cfg.absDir, boardId) : cfg.absDir;
    await fs.mkdir(targetDir, { recursive: true });
    const absPath = path.join(targetDir, fileName);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(absPath, buffer);

    const publicUrl = boardId
      ? path.posix.join(cfg.publicBase.replace(/\/$/, ''), boardId, fileName)
      : path.posix.join(cfg.publicBase.replace(/\/$/, ''), fileName);

    return NextResponse.json({ url: publicUrl, name: originalName, sizeBytes: file.size, type: effectiveType, boardId }, { status: 201 });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}



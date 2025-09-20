import path from 'path';

export interface UploadConfig {
  absDir: string;
  publicBase: string;
  maxSizeBytes: number;
}

export function getUploadConfig(): UploadConfig {
  const rootDir = process.cwd();

  const dirEnv = process.env.UPLOAD_DIR || 'public/uploads';
  const absDir = path.isAbsolute(dirEnv) ? dirEnv : path.resolve(rootDir, dirEnv);

  const publicBase = process.env.UPLOAD_PUBLIC_BASE || '/uploads';
  const maxSizeMb = Number(process.env.MAX_UPLOAD_SIZE_MB || 25);
  const maxSizeBytes = Math.max(1, maxSizeMb) * 1024 * 1024;

  return { absDir, publicBase, maxSizeBytes };
}

export interface UploadLimits {
  imageMaxBytes: number;
  videoMaxBytes: number;
  fileMaxBytes: number;
}

export function getUploadLimits(): UploadLimits {
  const toBytes = (mb: number) => Math.max(1, mb) * 1024 * 1024;
  const imageMb = Number(process.env.MAX_UPLOAD_SIZE_IMAGE_MB || 25);
  const videoMb = Number(process.env.MAX_UPLOAD_SIZE_VIDEO_MB || 500);
  const fileMb = Number(process.env.MAX_UPLOAD_SIZE_FILE_MB || 50);
  return {
    imageMaxBytes: toBytes(imageMb),
    videoMaxBytes: toBytes(videoMb),
    fileMaxBytes: toBytes(fileMb),
  };
}



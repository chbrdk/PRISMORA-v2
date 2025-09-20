'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export type PrismionResultItem =
  | { type: 'text'; content: string }
  | { type: 'richtext'; content: string }
  | { type: 'image'; url: string; alt?: string }
  | { type: 'video'; url: string; poster?: string }
  | { type: 'link'; url: string; label?: string };

export interface PrismionResultProps {
  items: PrismionResultItem[];
  defaultTab?: string;
  className?: string;
}

const labelFor = (item: PrismionResultItem, idx: number) => {
  switch (item.type) {
    case 'text': return `Text ${idx + 1}`;
    case 'richtext': return `Rich Text ${idx + 1}`;
    case 'image': return 'Image';
    case 'video': return 'Video';
    case 'link': return 'Link';
  }
};

export function PrismionResult({ items, defaultTab, className }: PrismionResultProps) {
  const tabs = items.map((item, idx) => ({ value: `${item.type}-${idx}`, item }));
  const first = tabs[0]?.value ?? 'none';
  const initial = defaultTab && tabs.some(t => t.value === defaultTab) ? defaultTab : first;

  return (
    <div className={cn('w-full', className)}>
      <Tabs defaultValue={initial} className="w-full">
        <TabsList className="mb-2">
          {tabs.map((t, idx) => (
            <TabsTrigger key={t.value} value={t.value}>
              {labelFor(t.item, idx)}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((t, idx) => (
          <TabsContent key={t.value} value={t.value} className="mt-0">
            {t.item.type === 'text' && (
              <div className="prose prose-sm max-w-none whitespace-pre-wrap text-sm text-foreground/90">
                {t.item.content}
              </div>
            )}
            {t.item.type === 'richtext' && (
              <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: t.item.content }} />
            )}
            {t.item.type === 'image' && (
              <img src={t.item.url} alt={t.item.alt ?? ''} className="w-full h-auto rounded-md border" />
            )}
            {t.item.type === 'video' && (
              <video src={t.item.url} poster={t.item.poster} controls className="w-full rounded-md border" />
            )}
            {t.item.type === 'link' && (
              <a href={t.item.url} target="_blank" rel="noreferrer" className="text-primary underline">
                {t.item.label ?? t.item.url}
              </a>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default PrismionResult;



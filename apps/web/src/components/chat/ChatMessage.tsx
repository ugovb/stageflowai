import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={cn('flex w-full items-start gap-4 p-4', isUser && 'flex-row-reverse')}>
      <Avatar>
        <AvatarImage src={isUser ? undefined : '/ai-avatar.png'} />
        <AvatarFallback>{isUser ? 'ME' : 'AI'}</AvatarFallback>
      </Avatar>
      
      <div className={cn(
        'flex flex-col max-w-[80%]',
        isUser ? 'items-end' : 'items-start'
      )}>
        <div
          className={cn(
            'rounded-lg px-4 py-2 shadow-sm text-sm',
            isUser 
              ? 'bg-blue-600 text-white' 
              : 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{content}</p>
          ) : (
            <div className="prose dark:prose-invert prose-sm max-w-none break-words">
             <ReactMarkdown>
                {content}
             </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

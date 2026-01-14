'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatMessage as ChatMessageType } from '@stageflow/types';
import { apiClient } from '@/lib/api-client';

// Extended type to allow for temp IDs or local state specific fields if needed
type UIMessage = Omit<ChatMessageType, 'id' | 'user_id' | 'created_at' | 'phase_context'> & {
  id: string | number;
};

export function ChatContainer() {
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [phaseInfo, setPhaseInfo] = useState<{ phase: number; name: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // 1. Fetch initial state (History + Current Phase)
  useEffect(() => {
    const initChat = async () => {
      try {
        const res = await apiClient("/api/chat/state");
        if (res.ok) {
          const data = await res.json();
          setPhaseInfo({ phase: data.phase, name: data.phase_name });
          
          if (data.history && data.history.length > 0) {
            setMessages(data.history);
          } else if (data.initial_message) {
            setMessages([
              {
                id: 'welcome',
                role: 'assistant',
                content: data.initial_message
              }
            ]);
          }
        }
      } catch (e) {
        console.error("Failed to initialize chat", e);
      }
    };
    initChat();
  }, []);

  const handleSendMessage = async (content: string) => {
    const newUserMessage: UIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await apiClient("/api/chat/message", {
        method: "POST",
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      // Handle Streaming (SSE)
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      let aiMessageContent = "";
      const aiMessageId = (Date.now() + 1).toString();

      // Add empty message for AI
      setMessages((prev) => [...prev, { id: aiMessageId, role: 'assistant', content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");
          
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const dataStr = line.replace("data: ", "").trim();
              if (dataStr === "[DONE]") {
                setIsLoading(false);
                continue;
              }
              try {
                const data = JSON.parse(dataStr);
                if (data.chunk) {
                  aiMessageContent += data.chunk;
                  // Update the last message with the new content
                  setMessages((prev) => {
                    const updated = [...prev];
                    const lastIdx = updated.length - 1;
                    updated[lastIdx] = { ...updated[lastIdx], content: aiMessageContent };
                    return updated;
                  });
                }
              } catch (e) {
                // Ignore parse errors for incomplete chunks
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { 
        id: 'error', 
        role: 'assistant', 
        content: "Désolé, une erreur est survenue lors de la communication avec l'IA. Vérifiez votre clé OpenRouter." 
      }]);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-65px)] flex-col bg-white dark:bg-zinc-950"> 
      <div className="border-b px-6 py-3 bg-zinc-50/50 dark:bg-zinc-900/50 flex justify-between items-center">
         <div>
            <h2 className="font-bold text-sm text-indigo-600 uppercase tracking-widest">Coach Socratique</h2>
            <p className="text-xs text-muted-foreground">{phaseInfo ? `Phase ${phaseInfo.phase}: ${phaseInfo.name}` : "Initialisation..."}</p>
         </div>
         <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase">GPT-5 Nano Active</span>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 py-8">
          {messages.map((msg, idx) => (
            <ChatMessage 
              key={msg.id || idx} 
              role={msg.role} 
              content={msg.content} 
            />
          ))}
          {isLoading && !messages[messages.length-1]?.content && (
             <div className="flex w-full items-start gap-4 p-4">
               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-xs">
                 AI
               </div>
               <div className="flex items-center gap-1 rounded-2xl bg-zinc-100 px-4 py-3 dark:bg-zinc-800">
                 <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.3s]"></span>
                 <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.15s]"></span>
                 <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400"></span>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 bg-gradient-to-t from-white via-white to-transparent dark:from-zinc-950 dark:via-zinc-950">
        <div className="max-w-3xl mx-auto">
            <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
            <p className="text-[10px] text-center text-muted-foreground mt-2">
                StageFlow AI peut faire des erreurs. Validez vos compétences avec des preuves concrètes.
            </p>
        </div>
      </div>
    </div>
  );
}
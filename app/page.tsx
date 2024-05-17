'use client';

import { useState } from 'react';
import { Message } from '@/llm/interface';
import { ChatUI } from './_components/chat-ui';

export default function Home() {
  const [conversation, setConversation] = useState<Message[]>([{ role: 'assistant', content: 'Hey there how can I help you today?' }]);
  const [input, setInput] = useState<string>('');

  return (
    <ChatUI
      conversation={conversation}
      setConversation={setConversation}
      input={input}
      setInput={setInput}
    />
  );
}
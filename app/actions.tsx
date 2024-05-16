'use server';

import { generateText } from 'ai';

import { tools } from '@/llm/tools'
import { SYS_MESSAGE } from '@/llm/prompts';
import { GENERATION_MODEL } from '@/llm/models';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function continueConversation(history: Message[]) {
  'use server';

  let res = await generateText({
    model: GENERATION_MODEL,
    system: SYS_MESSAGE,
    messages: history,
    tools: tools,
  });

  if (res.finishReason === 'tool-calls') {
    res = await generateText({
      model: GENERATION_MODEL,
      system: SYS_MESSAGE,
      messages: [
        ...history,
        { role: 'assistant', content: res.toolCalls },
        { role: 'tool', content: res.toolResults }
      ]
    });
  }

  return {
    messages: [
      ...history,
      {
        role: 'assistant',
        content: res.text,
      },
    ],
  };
}
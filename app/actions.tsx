'use server';

import { functionalStreamJournalAgent } from '@/llm/agent';
import { Message } from '@/llm/interface';
import { createStreamableValue } from 'ai/rsc';


export async function continueConversation(history: Message[]) {
  'use server';

  const stream = createStreamableValue();

  functionalStreamJournalAgent(history, stream)

  return {
    messages: history,
    newMessage: stream.value,
  };
}

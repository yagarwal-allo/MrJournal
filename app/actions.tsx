'use server';

import { functionalStreamJournalAgent } from '@/llm/agent';
import { Message } from '@/llm/interface';
import { createStreamableValue } from 'ai/rsc';


export async function continueConversation(history: Message[]) {
  'use server';

  try {
    const stream = createStreamableValue();

    functionalStreamJournalAgent(history, stream)

    return {
      messages: history,
      newMessage: stream.value,
    };
  } catch (e) {
    console.log('Error while generating the response >>>>', e)

    const errorStream = createStreamableValue('Looks like I faced an error while trying to generate the response. Please retry again later.')
    return {
      messages: history,
      newMessage: errorStream.value,
    };
  }
}

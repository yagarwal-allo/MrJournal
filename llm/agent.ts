
import { streamText } from 'ai';

import { tools } from '@/llm/tools'
import { SYS_MESSAGE } from '@/llm/prompts';
import { GENERATION_MODEL } from '@/llm/models';
import { Message } from './interface';

export const functionalStreamJournalAgent = async (history: Message[], stream: any) => {
  const res = await streamText({
    model: GENERATION_MODEL,
    system: SYS_MESSAGE,
    messages: history,
    tools: tools,
  });

  const toolCalls = []
  const toolResults = []
  let isToolCall = false;


  for await (const chunk of res.fullStream) {
    if (chunk.type === 'text-delta') {
      stream.update(chunk.textDelta)
    } else if (chunk.type === 'tool-call') {
      toolCalls.push(chunk)
    } else if (chunk.type === 'tool-result') {
      toolResults.push(chunk)
    } else if (chunk.type === 'finish' && chunk.finishReason === 'tool-calls') {
      isToolCall = true
    }
  }

  if (isToolCall) {
    const sumRes = await streamText({
      model: GENERATION_MODEL,
      system: SYS_MESSAGE,
      messages: [
        ...history,
        { role: 'assistant', content: toolCalls },
        { role: 'tool', content: toolResults }
      ]
    });

    for await (const text of sumRes.textStream) {
      stream.update(text);
    }
  }

  stream.done();
}
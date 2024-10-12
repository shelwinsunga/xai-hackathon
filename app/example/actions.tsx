'use server';

import { streamText } from 'ai';
import { createStreamableValue } from 'ai/rsc';


import { createOpenAI } from '@ai-sdk/openai';

const openai = createOpenAI({
    baseUrl: 'https://api.x.ai/v1/',
    apiKey: process.env.XAI_API_KEY,
  });


export async function generate(input: string) {
  const stream = createStreamableValue('');

  (async () => {
    const { textStream } = await streamText({
      model: openai('grok-2-mini-public'),
      system: `Output JSON Objects with the following keys: "name", "message", "minutesAgo"
      Example:
      {
        "name": "Alice",
        "message": "Hello, how are you?",
        "minutesAgo": 5
      }`,

      prompt: input,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}
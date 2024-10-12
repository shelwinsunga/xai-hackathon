'use server';

import { streamText } from 'ai';
import { createStreamableValue } from 'ai/rsc';


import { createOpenAI } from '@ai-sdk/openai';

const openai = createOpenAI({
    baseUrl: 'https://api.x.ai/v1/',
    apiKey: process.env.XAI_API_KEY,
});


export async function generate(question: string, answer: string, criteria: { [key: string]: string }) {
  const stream = createStreamableValue('');

  (async () => {
    const { textStream } = await streamText({
      model: openai('grok-preview'),
      system: systemPrompt,
      prompt: `${question}\n\n${answer}\n\n${Object.entries(criteria).map(([criterion, description]) => `${criterion}: ${description}`).join('\n')}`,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}

const systemPrompt = `You will be given a question, a students answer, and a list of criteria. You will generate a JSON object that 'grades' the answer based on the criteria.

Here is the example format you should use when outputting your JSON. It should be the 'criterion' and whether or not it was met:

{
    { "criterion": "Mentioned Newton once", "met": true },
    { "criterion": "Explored Galileo's impact", "met": true },
    { "criterion": "Discussed Kepler's laws", "met": true },
    { "criterion": "Explained Copernican model", "met": true }
}

Do not wrap your answer in backticks like this:
\`\`\`json
{
{ criterion: "Mentioned Newton once", met: true },
{ criterion: "Explored Galileo's impact", met: true },
{ criterion: "Discussed Kepler's laws", met: true },
{ criterion: "Explained Copernican model", met: true }
}
\`\`\`
`;
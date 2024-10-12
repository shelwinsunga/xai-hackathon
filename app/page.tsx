'use client';

import { useState, useEffect } from 'react';
import { generate } from './actions';
import { readStreamableValue } from 'ai/rsc';
import { parseIncompleteJSON } from './utils';
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;



export default function Home() {
  const [generation, setGeneration] = useState<string>('');
  const [structuredOutput, setStructuredOutput] = useState<any>(null);

  useEffect(() => {
    setStructuredOutput(parseIncompleteJSON(generation));
  }, [generation]);

  console.log(structuredOutput);
  return (
    <div>
      <button
        onClick={async () => {
          const { output } = await generate('Why is the sky blue?');

          for await (const delta of readStreamableValue(output)) {
            setGeneration(currentGeneration => `${currentGeneration}${delta}`);

          }
        }}
      >
        Ask
      </button>

      <div>{generation}</div>
    </div>
  );
}
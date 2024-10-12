'use client';

import { useState, KeyboardEvent, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { parseIncompleteJSON } from "@/app/example/utils";
import { generate } from '@/app/example/actions';
import { readStreamableValue } from 'ai/rsc';
import { Button } from "@/components/ui/button";

export default function FRQ({ question, criteria }: { question: string, criteria: any }) {
  const [answer, setAnswer] = useState("");
  const [generation, setGeneration] = useState<string>('');
  const [structuredOutput, setStructuredOutput] = useState<any>(null);

  useEffect(() => {
    setStructuredOutput(parseIncompleteJSON(generation));
  }, [generation]);

  return (
    <div>
      <h3>{question}</h3>

      <Textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="min-h-[200px] shadow rounded-md bg-muted resize-none"
        placeholder="Type your answer here. Press Enter to submit."
      />

      <Button
        onClick={async () => {
          const { output } = await generate('hello');
          for await (const delta of readStreamableValue(output)) {
            setGeneration(currentGeneration => `${currentGeneration}${delta}`);
          }
        }}
      >
        Submit
      </Button>

      <div>
        {structuredOutput && (
          <ul>
            <li>Name: {structuredOutput.name}</li>
            <li>Message: {structuredOutput.message}</li>
            <li>Minutes Ago: {structuredOutput.minutesAgo}</li>
          </ul>
        )}
      </div>
    </div>
  );
}   

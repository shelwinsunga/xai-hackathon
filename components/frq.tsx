'use client';

import { useState, KeyboardEvent, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { parseIncompleteJSON } from "@/app/example/utils";
import { generate } from '@/app/example/actions';
import { readStreamableValue } from 'ai/rsc';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from "@/components/ui/label";
export default function FRQ({ question, criteria }: { question: string, criteria: any }) {
  const [answer, setAnswer] = useState("");
  const [generation, setGeneration] = useState<string>('');
  const [structuredOutput, setStructuredOutput] = useState<any>(null);
  console.log(generation);
  useEffect(() => {
    setStructuredOutput(parseIncompleteJSON(generation));
  }, [generation]);


  return (
    <div className="flex">
      <Card className="w-[590px] h-[520px] px-[20px] py-[20px] bg-muted relative overflow-hidden">
      <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground font-medium">European History</span>
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                FRQ
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-between h-full gap-6">
            <div className="w-full">
              <Label htmlFor="question" className="text-base font-medium w-full">
                Analyze the impact of the Scientific Revolution on European society and intellectual thought during the period 1500-1700.</Label>
            </div>
            <div>
              <Textarea
                id="answer"
                placeholder="Type your answer here..."
                className="min-h-[200px] shadow rounded-md bg-muted"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-6 w-full border-t flex justify-center items-center pt-6">
          <Button
            variant="outline"
            type="submit"
            // onClick={handleSubmit}
            className="w-full"
            // disabled={isLoading}
          >
            Placeholder
            {/* {isLoading ? "Grading..." : "Grade"} */}
          </Button>
        </CardFooter>
        </Card>

      {/* <Button
        onClick={async () => {
          const { output } = await generate(question, answer, criteria);
          for await (const delta of readStreamableValue(output)) {
            setGeneration(currentGeneration => `${currentGeneration}${delta}`);

          }
        }}
      >
        Submit
      </Button> */}
    </div>
  );
}   

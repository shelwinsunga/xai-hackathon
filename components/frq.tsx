// @ts-nocheck
'use client';

import { useState, KeyboardEvent, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { parseIncompleteJSON } from "@/app/example/utils";
import { generate } from '@/app/example/actions';
import { readStreamableValue } from 'ai/rsc';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from "@/components/ui/label";
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
  

export default function FRQ({ question, criteria }: { question: string, criteria: any }) {
  const [answer, setAnswer] = useState("");
  const [generation, setGeneration] = useState<string>('');
  const [structuredOutput, setStructuredOutput] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isGraded, setIsGraded] = useState(false);
  const [gradeSteps, setGradeSteps] = useState([]);
  const [gradeResults, setGradeResults] = useState([]);
  console.log(gradeResults);

  useEffect(() => {
    setStructuredOutput(parseIncompleteJSON(generation));
  }, [generation]);


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    setGeneration('');
    setIsLoading(true);
    setShowOverlay(true);
    setIsGraded(false);
    setGradeSteps([]);
    setGradeResults([]);

    const {output} = await generate(question, answer, criteria);
    for await (const delta of readStreamableValue(output)) {
        setGeneration(currentGeneration => `${currentGeneration}${delta}`);
    }

    setIsLoading(false);
    setIsGraded(true);
    setGradeResults(criteria);
  }

  const handleCloseOverlay = () => {
    setIsGraded(false);
    setShowOverlay(false);
  };


  return (
    <div className="flex w-full justify-center mt-9">
      <Card className="w-full h-[520px] px-[20px] py-[20px] bg-muted relative overflow-hidden">
      <AnimatePresence>
      {showOverlay && (
        <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute top-0 left-0 right-0 w-[93%] mx-auto bg-background/70 border shadow-sm text-foreground p-4 text-center rounded-md backdrop-blur-sm"
        >
             <div className="flex flex-col items-start w-full">
                <p className="text-base text-foreground/90 font-medium mb-2">Grade</p>
                <div className="w-full">
                    {structuredOutput.map((criterion: any, index: number) => (
                         <motion.div
                         key={index}
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.5 }}
                         className="flex items-center mb-2"
                       >
                         <motion.div
                           initial={{ opacity: 0, x: -10 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ duration: 0.3 }}
                           className="flex items-center"
                         >
                           <motion.div
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             transition={{ duration: 0.3 }}
                           >
                             <motion.div
                               initial={{ scale: 0, opacity: 0 }}
                               animate={{ scale: 1, opacity: 1 }}
                               transition={{ duration: 0.3, ease: "easeOut" }}
                               style={{ minWidth: '16px', minHeight: '16px' }}
                             >
                           {criterion.met === 'pending' ? (
                             <Loader2 className="h-4 w-4 mr-2 text-muted-foreground animate-spin" />
                           ) : criterion.met ? (
                             <CheckIcon className="h-4 w-4 mr-2 text-green-500" />
                           ) : (
                             <XIcon className="h-4 w-4 mr-2 text-red-500" />
                           )}
                             </motion.div>
                        </motion.div>
                        <motion.span
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="text-sm ml-2 relative overflow-hidden"
                        >
                          <motion.span
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                          >
                            {criterion.criterion}
                          </motion.span>
                          <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-background/60 to-transparent"
                            initial={{ x: '-100%', opacity: 1 }}
                            animate={{ x: '100%', opacity: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                          />
                        </motion.span>
                      </motion.div>
                      </motion.div>
                    ))}
                </div>
                {isGraded && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex justify-end mt-2"
                  >
                    <Button
                      onClick={handleCloseOverlay}
                    >
                      Close
                    </Button>
                  </motion.div>
                )}
            </div>
        </motion.div>
      )}
      </AnimatePresence>
      <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground font-medium">LLM-Graded Question</span>
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
                {question}
              </Label>
            </div>
            <div>
              <Textarea
                id="answer"
                onChange={(e) => setAnswer(e.target.value)}
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
            onClick={(e) => handleSubmit(e)}
            className="w-full"
          >
            Submit
          </Button>
        </CardFooter>
        </Card>
        {/* <div className="ml-4 w-[200px]">
        {gradeResults.length > 0 && (
          <div className="flex flex-col">
            <AnimatePresence>
              {structuredOutput.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="mb-1"
                >
                  {result.met ? (
                    <CheckIcon className="h-6 w-6" />
                  ) : (
                    <XIcon className="h-6 w-6" />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div> */}

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

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="#90EE90"
    stroke="#90EE90"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-circle-check"
  >
    <circle cx="12" cy="12" r="10" fill="#90EE90" />
    <path d="m9 12 2 2 4-4" stroke="#006400" />
  </svg>
);


const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="#FF6347"
    stroke="#FF6347"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-circle-x"
  >
    <circle cx="12" cy="12" r="10" fill="#FF6347" />
    <path d="M15 9l-6 6" stroke="#8B0000" />
    <path d="M9 9l6 6" stroke="#8B0000" />
  </svg>
);
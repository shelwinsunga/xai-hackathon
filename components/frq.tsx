import { useState, KeyboardEvent } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function FRQ({ question, criteria }: { question: string, criteria: any }) {
  const [answer, setAnswer] = useState("");
  console.log(criteria);



  return (
    <div>
      <h3>{question}</h3>
      <Textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="min-h-[200px] shadow rounded-md bg-muted resize-none"
        placeholder="Type your answer here. Press Enter to submit."
      />
    </div>
  );
}   

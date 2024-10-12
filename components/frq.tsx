import { useState, KeyboardEvent } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function FRQ({ question, criteria }: { question: string, criteria: string }) {
  const [answer, setAnswer] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      console.log("Submitted answer:", answer);
    }
  };

  return (
    <div>
      <h3>{question}</h3>
      <Textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={handleKeyDown}
        className="min-h-[200px] shadow rounded-md bg-muted resize-none"
        placeholder="Type your answer here. Press Enter to submit."
      />
    </div>
  );
}   

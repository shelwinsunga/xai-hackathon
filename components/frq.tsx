export default function FRQ({ question, criteria }: { question: string, criteria: string }) {
  return <div>
    <h3>{question}</h3>
    <p>{criteria}</p>
  </div>;
}

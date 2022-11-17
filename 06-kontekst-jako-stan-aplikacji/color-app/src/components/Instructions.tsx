interface InstructionsProps {
  title: string;
  steps: string[];
}

const Instructions = ({ title, steps }: InstructionsProps) => (
  <section className="instructions">
    <h2>{title}</h2>
    {steps.map((s, i) => (
      <p key={i}>{s}</p>
    ))}
  </section>
);

export default Instructions;

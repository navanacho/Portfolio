const AMBIENT_BLOBS = [
  "bg-primary/10 left-[-8%] top-[-12%] h-[26rem] w-[26rem]",
  "bg-warm/10 right-[-10%] top-[18%] h-[30rem] w-[30rem]",
  "bg-secondary/20 bottom-[-12%] left-[28%] h-[28rem] w-[28rem]",
] as const;

export function AmbientBlobs() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {AMBIENT_BLOBS.map((position, index) => (
        <span key={index} className={`ambient-blob absolute rounded-full blur-3xl ${position}`} />
      ))}
    </div>
  );
}

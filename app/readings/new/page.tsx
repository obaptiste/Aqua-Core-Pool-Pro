import { ReadingForm } from '@/components/ReadingForm';

export default function NewReadingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-4 py-4">
        <h1 className="text-2xl font-bold">Log Reading</h1>
        <p className="text-muted-foreground text-sm">Record today&apos;s pool measurements</p>
      </header>
      <main className="px-4 py-6 max-w-2xl mx-auto">
        <ReadingForm />
      </main>
    </div>
  );
}

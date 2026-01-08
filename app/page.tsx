import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-24 bg-background text-foreground transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="relative z-10 text-center space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
          Front Data Inmobiliaria
        </h1>
        <p className="text-xl text-muted-foreground max-w-lg mx-auto">
          Plataforma avanzada de datos inmobiliarios
        </p>
      </div>
      <div className="mt-8">
        <a href="/platforms" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
          View Platforms
        </a>
      </div>

    </main>
  );
}

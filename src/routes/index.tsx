import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { BOOKS } from "@/data/books";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen px-4 py-10 md:py-16">
      <header className="mx-auto max-w-5xl text-center">
        <p className="font-display text-sm uppercase tracking-[0.25em] text-primary/80">
          Giggle Books
        </p>
        <h1 className="mt-3 font-display text-5xl font-700 text-foreground md:text-7xl">
          Funny stories,{" "}
          <span className="text-primary">read just for you.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Pick a book. Pick a voice. Settle in. We'll do the reading.
        </p>
      </header>

      <section
        aria-label="Bookshelf"
        className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {BOOKS.map((book, i) => (
          <Link
            key={book.id}
            to="/book/$bookId"
            params={{ bookId: book.id }}
            className="group relative block transition-transform duration-300 hover:-translate-y-2 focus:outline-none focus-visible:-translate-y-2"
            style={{
              transform: `rotate(${i % 2 === 0 ? "-1deg" : "1.2deg"})`,
            }}
          >
            <div className="overflow-hidden rounded-2xl bg-card shadow-book ring-1 ring-black/5 transition-shadow group-hover:shadow-2xl">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={book.cover}
                  alt={`Cover of ${book.title}`}
                  loading="lazy"
                  width={768}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span
                    className="inline-block rounded-full px-3 py-1 text-xs font-700"
                    style={{ backgroundColor: book.accent, color: "white" }}
                  >
                    {book.ageRange}
                  </span>
                  <h2 className="mt-2 font-display text-2xl font-700 leading-tight drop-shadow">
                    {book.title}
                  </h2>
                  {book.subtitle && (
                    <p className="text-sm opacity-90">{book.subtitle}</p>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <footer className="mx-auto mt-20 max-w-5xl text-center text-sm text-muted-foreground">
        Made with 🧡 for curious kids and tired grown-ups.
      </footer>
    </main>
  );
}

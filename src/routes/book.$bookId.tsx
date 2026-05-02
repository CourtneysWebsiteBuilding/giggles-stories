import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { getBook, VOICES, type VoiceId } from "@/data/books";
import { useServerFn } from "@tanstack/react-start";
import { narratePage } from "@/server/narrate.functions";

export const Route = createFileRoute("/book/$bookId")({
  loader: ({ params }) => {
    const book = getBook(params.bookId);
    if (!book) throw notFound();
    return { book };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.book.title} — Giggle Books` },
          { name: "description", content: loaderData.book.blurb },
          { property: "og:title", content: loaderData.book.title },
          { property: "og:description", content: loaderData.book.blurb },
          { property: "og:image", content: loaderData.book.cover },
        ]
      : [],
  }),
  component: BookDetail,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center p-6 text-center">
      <div>
        <h1 className="font-display text-4xl">Book not found</h1>
        <Link to="/" className="mt-4 inline-block text-primary underline">
          Back to bookshelf
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center p-6 text-center">
      <div>
        <h1 className="font-display text-3xl">Oops, something went wrong.</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
        <Link to="/" className="mt-4 inline-block text-primary underline">
          Back to bookshelf
        </Link>
      </div>
    </div>
  ),
});

function BookDetail() {
  const { book } = Route.useLoaderData();
  const [selectedVoice, setSelectedVoice] = useState<VoiceId>(VOICES[0].id);
  const [previewing, setPreviewing] = useState<string | null>(null);
  const narrate = useServerFn(narratePage);
  const navigate = useNavigate();

  async function previewVoice(voiceId: string) {
    setPreviewing(voiceId);
    try {
      const res = await narrate({
        data: {
          text: "Hi! I'm going to read you a story. Are you ready?",
          voiceId,
        },
      });
      const audio = new Audio(`data:audio/mpeg;base64,${res.audio}`);
      audio.onended = () => setPreviewing(null);
      audio.onerror = () => setPreviewing(null);
      await audio.play();
    } catch (e) {
      console.error(e);
      setPreviewing(null);
    }
  }

  return (
    <main className="min-h-screen px-4 py-8 md:py-14">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-700 shadow-soft transition-transform hover:-translate-x-1"
        >
          ← Back to bookshelf
        </Link>

        <div className="mt-8 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-start">
          <div className="mx-auto w-full max-w-sm md:sticky md:top-8">
            <div className="overflow-hidden rounded-2xl shadow-book ring-1 ring-black/5">
              <img
                src={book.cover}
                alt={`Cover of ${book.title}`}
                width={768}
                height={1024}
                className="h-auto w-full"
              />
            </div>
          </div>

          <div>
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-700 text-white"
              style={{ backgroundColor: book.accent }}
            >
              {book.ageRange}
            </span>
            <h1 className="mt-3 font-display text-4xl font-700 leading-tight md:text-5xl">
              {book.title}
            </h1>
            {book.subtitle && (
              <p className="mt-1 text-lg italic text-muted-foreground">
                {book.subtitle}
              </p>
            )}
            <p className="mt-5 text-lg text-foreground/80">{book.blurb}</p>

            <h2 className="mt-10 font-display text-2xl font-700">
              1. Pick a voice 🎙️
            </h2>
            <p className="text-sm text-muted-foreground">
              Tap a voice to hear what they sound like.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {VOICES.map((v) => {
                const isSelected = selectedVoice === v.id;
                const isPreviewing = previewing === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      setSelectedVoice(v.id);
                      previewVoice(v.id);
                    }}
                    disabled={isPreviewing}
                    className={`flex items-center gap-3 rounded-2xl border-2 bg-card p-4 text-left transition-all hover:scale-[1.02] ${
                      isSelected
                        ? "border-primary shadow-soft"
                        : "border-transparent shadow-soft/50"
                    }`}
                  >
                    <span className="text-3xl" aria-hidden>
                      {v.emoji}
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-lg font-700">
                        {v.name}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {isPreviewing ? "Speaking..." : v.description}
                      </span>
                    </span>
                    {isSelected && (
                      <span className="text-primary" aria-label="Selected">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <h2 className="mt-10 font-display text-2xl font-700">
              2. Start reading 📖
            </h2>
            <button
              type="button"
              onClick={() =>
                navigate({
                  to: "/book/$bookId/read",
                  params: { bookId: book.id },
                  search: { voice: selectedVoice },
                })
              }
              className="mt-4 w-full rounded-2xl bg-primary px-8 py-5 text-xl font-700 text-primary-foreground shadow-soft transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: book.accent }}
            >
              Open the book →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
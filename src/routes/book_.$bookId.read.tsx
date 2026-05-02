import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { getBook, VOICES, type VoiceId } from "@/data/books";
import { useServerFn } from "@tanstack/react-start";
import { narratePage } from "@/server/narrate.functions";

const SearchSchema = z.object({
  voice: z.string().optional(),
});

export const Route = createFileRoute("/book_/$bookId/read")({
  validateSearch: SearchSchema,
  loader: ({ params }) => {
    const book = getBook(params.bookId);
    if (!book) throw notFound();
    return { book };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `Reading: ${loaderData.book.title}` },
          { name: "description", content: loaderData.book.blurb },
        ]
      : [],
  }),
  component: Reader,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center p-6 text-center">
      <Link to="/" className="text-primary underline">
        Back to bookshelf
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center p-6 text-center">
      <div>
        <p className="text-muted-foreground">{error.message}</p>
        <Link to="/" className="mt-4 inline-block text-primary underline">
          Back to bookshelf
        </Link>
      </div>
    </div>
  ),
});

function Reader() {
  const { book } = Route.useLoaderData();
  const search = Route.useSearch();
  const voiceId =
    (VOICES.find((v) => v.id === search.voice)?.id as VoiceId) ?? VOICES[0].id;
  const voice = VOICES.find((v) => v.id === voiceId)!;

  const [pageIdx, setPageIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cacheRef = useRef<Map<string, string>>(new Map());
  const narrate = useServerFn(narratePage);

  const totalPages = book.pages.length;
  const currentText = book.pages[pageIdx];

  function stopAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  }

  async function playCurrent() {
    setError(null);
    const cacheKey = `${voiceId}:${pageIdx}`;
    let url = cacheRef.current.get(cacheKey);
    if (!url) {
      setLoading(true);
      try {
        const res = await narrate({
          data: { text: currentText, voiceId },
        });
        url = `data:audio/mpeg;base64,${res.audio}`;
        cacheRef.current.set(cacheKey, url);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Could not load audio";
        setError(msg);
        setLoading(false);
        return;
      }
      setLoading(false);
    }
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => {
      setIsPlaying(false);
      setError("Audio could not play.");
    };
    setIsPlaying(true);
    try {
      await audio.play();
    } catch {
      setIsPlaying(false);
    }
  }

  // Auto-play on page change
  useEffect(() => {
    stopAudio();
    playCurrent();
    return () => stopAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIdx, voiceId]);

  function go(delta: number) {
    const next = pageIdx + delta;
    if (next < 0 || next >= totalPages) return;
    setPageIdx(next);
  }

  function togglePlay() {
    if (isPlaying) {
      stopAudio();
    } else {
      playCurrent();
    }
  }

  return (
    <main className="min-h-screen px-4 py-6 md:py-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <Link
            to="/book/$bookId"
            params={{ bookId: book.id }}
            className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-700 shadow-soft"
          >
            ← Close book
          </Link>
          <div className="rounded-full bg-card px-4 py-2 text-sm font-700 shadow-soft">
            {voice.emoji} {voice.name}
          </div>
        </div>

        <article
          key={pageIdx}
          className="mt-6 overflow-hidden rounded-3xl bg-card shadow-book ring-1 ring-black/5"
          style={{ animation: "fadeIn 0.4s ease-out" }}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted sm:aspect-[3/2]">
            <img
              src={book.cover}
              alt={`Illustration for ${book.title} page ${pageIdx + 1}`}
              className="h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, transparent 40%, ${book.accent}22 100%)`,
              }}
            />
          </div>
          <div className="p-6 md:p-10">
            <p className="font-display text-xl leading-relaxed text-foreground md:text-2xl md:leading-relaxed">
              {currentText}
            </p>
            {error && (
              <p className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </p>
            )}
          </div>
        </article>

        {/* Page indicator */}
        <div className="mt-6 flex justify-center gap-2" aria-hidden>
          {book.pages.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === pageIdx ? "w-8 bg-primary" : "w-2 bg-foreground/20"
              }`}
              style={i === pageIdx ? { backgroundColor: book.accent } : {}}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="mt-6 grid grid-cols-3 items-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={pageIdx === 0}
            className="rounded-2xl bg-card px-4 py-5 text-lg font-700 shadow-soft transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={togglePlay}
            className="rounded-2xl px-4 py-5 text-lg font-700 text-white shadow-soft transition-transform hover:scale-105 disabled:opacity-60"
            style={{ backgroundColor: book.accent }}
            disabled={loading}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {loading ? "…" : isPlaying ? "❚❚ Pause" : "▶ Play"}
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={pageIdx === totalPages - 1}
            className="rounded-2xl bg-card px-4 py-5 text-lg font-700 shadow-soft transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
          >
            Next →
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Page {pageIdx + 1} of {totalPages}
        </p>

        {pageIdx === totalPages - 1 && !isPlaying && !loading && (
          <div className="mt-8 rounded-2xl bg-card p-6 text-center shadow-soft">
            <p className="font-display text-2xl">The End. 🌟</p>
            <Link
              to="/"
              className="mt-4 inline-block rounded-full bg-primary px-6 py-3 font-700 text-primary-foreground"
            >
              Pick another book
            </Link>
          </div>
        )}
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px);} to { opacity: 1; transform: none; } }`}</style>
    </main>
  );
}
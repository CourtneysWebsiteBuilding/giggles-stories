# Funny Books for Kids — Read & Listen

A colorful, kid-friendly website with 5 original funny picture books. Each book has an illustrated cover, page-by-page reading, and an AI narrator (ElevenLabs) the child can choose. Humor stays warm and clever — no fart/burp jokes.

## The 5 Books (mix of ages 3–10)

1. **Sir Reginald the Brave (and His Slightly Cowardly Sock)** — A tiny knight whose left sock is terrified of everything. Ages 5–8. Wacky adventure.
2. **The Penguin Who Wanted to Be a Firefighter** — Pip the penguin keeps melting the fire pole. Ages 3–5. Silly animals.
3. **My Teacher Is Definitely a Wizard** — A kid gathers "evidence" that Mrs. Plum is magical. Ages 8–10. Everyday-life-turned-absurd.
4. **The Dinosaur Who Forgot How to Roar** — Rex the T-rex can only meow. He goes on a quest to find his roar. Ages 5–8. Adventure.
5. **Bedtime for the Moon** — The Moon refuses to go to sleep and a very tired child has to tuck it in. Ages 3–6. Cozy bedtime humor.

Each book: illustrated cover + 6–8 illustrated interior pages with a short, funny line of text per page.

## Pages & Flow

```
/                  Home — bookshelf of 5 covers, big friendly title
/book/$bookId      Book detail — big cover, blurb, "Choose a voice" + "Start reading"
/book/$bookId/read Reader — one page at a time, Next/Prev, Play/Pause narration
```

- Home: warm, playful design — chunky rounded cards, hand-drawn feel, big covers arranged like a real shelf.
- Book detail: cover, age badge, 1-sentence blurb, voice picker (4 narrator options with sample-play button), big "Start Reading" button.
- Reader: full illustration, text caption beneath, large Prev / Play / Next buttons sized for small hands. Child controls turning. Audio auto-plays on each new page; tapping Next stops current audio and loads the next.

## Voices (ElevenLabs)

Child picks before reading. 4 options:
- **Lily** — warm, gentle (great for bedtime)
- **Brian** — fun grandpa-style storyteller
- **Sarah** — bright and bubbly
- **Callum** — playful character voice

Each has a "tap to hear me" sample button on the book detail page.

## Illustrations

All covers and interior pages generated up front with the Nano Banana Pro image model in a consistent storybook style (soft colors, rounded shapes, expressive characters). Saved as static assets so the site loads fast and looks polished — no generation wait for kids.

## Read-Aloud (Technical Section)

- Server function `narratePage` calls ElevenLabs TTS with the chosen voiceId and the page text, returns MP3 audio.
- `ELEVENLABS_API_KEY` stored as a Lovable secret (will request after plan approval).
- Client caches audio per (bookId, pageIndex, voiceId) so re-tapping Prev doesn't re-generate.
- Sample voice clips are pre-generated once and stored as static files to avoid API calls on hover.
- Book content (titles, pages, image paths) lives in a typed `src/data/books.ts` file — no database needed.
- Routes: `src/routes/index.tsx`, `src/routes/book.$bookId.tsx`, `src/routes/book.$bookId.read.tsx`, plus server function in `src/server/narrate.functions.ts`.

## Design

Bright, cheerful, kid-safe: cream background, big rounded buttons, playful display font for titles (e.g. Fredoka), readable sans for body. Generous tap targets, no tiny controls. Subtle page-flip animation between reader pages.

## What I'll need from you after approval

- Confirm adding the **ElevenLabs API key** as a secret so the narrator works.

## Out of scope (v1)

- User accounts / saving favorites
- Multi-language narration
- Custom book creation by kids

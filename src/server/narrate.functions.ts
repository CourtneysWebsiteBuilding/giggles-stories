import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const NarrateInput = z.object({
  text: z.string().min(1).max(2000),
  voiceId: z.string().min(1).max(64).regex(/^[A-Za-z0-9]+$/),
});

export const narratePage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => NarrateInput.parse(input))
  .handler(async ({ data }) => {
    const apiKey =
      process.env.ELEVENLABS_API_KEY ?? globalThis.process?.env?.ELEVENLABS_API_KEY;
    if (!apiKey) {
      throw new Error(
        "ELEVENLABS_API_KEY is not available in the server runtime yet. The dev server may need to restart to pick up the new secret."
      );
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${data.voiceId}/with-timestamps?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: data.text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.35,
            similarity_boost: 0.8,
            style: 0.7,
            use_speaker_boost: true,
            speed: 0.95,
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`TTS failed (${response.status}): ${err.slice(0, 200)}`);
    }

    const json = (await response.json()) as {
      audio_base64: string;
      alignment?: {
        characters: string[];
        character_start_times_seconds: number[];
        character_end_times_seconds: number[];
      } | null;
    };
    return {
      audio: json.audio_base64,
      alignment: json.alignment ?? null,
    };
  });
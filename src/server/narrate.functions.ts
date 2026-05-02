import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const NarrateInput = z.object({
  text: z.string().min(1).max(2000),
  voiceId: z.string().min(1).max(64).regex(/^[A-Za-z0-9]+$/),
});

export const narratePage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => NarrateInput.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      throw new Error("ELEVENLABS_API_KEY is not configured");
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${data.voiceId}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: data.text,
          model_id: "eleven_turbo_v2_5",
          voice_settings: {
            stability: 0.55,
            similarity_boost: 0.75,
            style: 0.4,
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

    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    return { audio: base64 };
  });
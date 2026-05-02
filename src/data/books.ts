import coverKnight from "@/assets/cover-knight.jpg";
import coverPenguin from "@/assets/cover-penguin.jpg";
import coverTeacher from "@/assets/cover-teacher.jpg";
import coverDino from "@/assets/cover-dino.jpg";
import coverMoon from "@/assets/cover-moon.png";
import pageMoon1 from "@/assets/page-moon-1.png";
import pageMoon2 from "@/assets/page-moon-2.png";
import pageMoon3 from "@/assets/page-moon-3.png";
import pageMoon4 from "@/assets/page-moon-4.png";

export type Page = {
  text: string;
  image?: string;
  /** When true, the illustration already contains the story text — hide the caption. */
  textInImage?: boolean;
};

export type Book = {
  id: string;
  title: string;
  subtitle: string;
  blurb: string;
  ageRange: string;
  cover: string;
  accent: string; // CSS color for theme accent
  pages: Page[];
};

export const BOOKS: Book[] = [
  {
    id: "knight",
    title: "Sir Reginald the Brave",
    subtitle: "(and His Slightly Cowardly Sock)",
    blurb:
      "A tiny knight is ready for any adventure. His left sock... is not.",
    ageRange: "Ages 5–8",
    cover: coverKnight,
    accent: "#d4a017",
    pages: [
      { text: "Sir Reginald was the bravest knight in the whole kingdom. He was three feet tall, but he had a VERY big sword. There was just one tiny problem — his left sock, whose name was Gerald, was afraid of absolutely everything." },
      { text: "\"A butterfly!\" shrieked Gerald. \"It is enormous! It has WINGS!\" Sir Reginald sighed and kept walking. One day, the king asked Sir Reginald to rescue a dragon stuck in a tree. \"A DRAGON?\" wailed Gerald. \"In a TREE?\"" },
      { text: "When they arrived, the dragon was very small and very stuck and very embarrassed. \"Hello,\" said the dragon politely. Gerald the sock screamed for eleven seconds straight. Then he stopped, looked again, and whispered, \"Oh. He's actually quite cute.\"" },
      { text: "Sir Reginald lifted the dragon down. The dragon gave Gerald a tiny grateful sniff. Gerald giggled. From that day on, the three of them went on adventures together. Gerald was still afraid of butterflies. Some things never change." },
    ],
  },
  {
    id: "penguin",
    title: "The Penguin Who Wanted to Be a Firefighter",
    subtitle: "",
    blurb: "Pip the penguin has a dream. The fire pole has other plans.",
    ageRange: "Ages 3–5",
    cover: coverPenguin,
    accent: "#e63946",
    pages: [
      { text: "Pip was a penguin. Pip wanted to be a firefighter. There was just one teeny problem. Pip was made of feathers and fluff and a little bit of snow. Fire trucks are made of metal. Metal does not stick to fluff." },
      { text: "On his first day, Pip slid down the fire pole. The pole melted. \"Hmm,\" said Pip. Pip tried the fire hose. The hose froze solid. \"Hmm hmm,\" said Pip." },
      { text: "Then a real fire happened in the snowy forest! Everyone panicked. Except Pip. Pip waddled up and gave the fire a great big penguin hug. The fire went \"pfft\" and turned into a small puff of warm air." },
      { text: "It turns out penguins are EXCELLENT firefighters, as long as the fires are willing to be hugged. The whole town cheered. Pip got his very own helmet. It was three sizes too big. He wore it anyway. He was very, very proud." },
    ],
  },
  {
    id: "teacher",
    title: "My Teacher Is Definitely a Wizard",
    subtitle: "",
    blurb:
      "Mrs. Plum says she's just a teacher. The evidence says otherwise.",
    ageRange: "Ages 8–10",
    cover: coverTeacher,
    accent: "#7c3aed",
    pages: [
      { text: "I have a theory. My teacher, Mrs. Plum, is a wizard. I have been collecting evidence in a special notebook. EVIDENCE #1: She always knows when I am passing notes. Always. Even when I do it under the desk. Even when she is facing the chalkboard." },
      { text: "EVIDENCE #2: Her coffee mug never gets cold. I checked. I touched it once when she wasn't looking. Steaming hot. At 3pm. Suspicious. EVIDENCE #3: She has eyes in the back of her head. I cannot prove this with science yet, but I am working on it." },
      { text: "EVIDENCE #4: When she sneezes, the lights flicker. Last week she sneezed twice and a pencil rolled UPHILL. I told my best friend Marco. Marco said, \"All teachers are like that.\" Marco is missing the point." },
      { text: "Today I asked Mrs. Plum if she was a wizard. She smiled and said, \"Why don't you find out at the end of the year?\" That is EXACTLY what a wizard would say. The investigation continues. I will report back next chapter." },
    ],
  },
  {
    id: "dino",
    title: "The Dinosaur Who Forgot How to Roar",
    subtitle: "",
    blurb:
      "Rex the T-rex woke up one morning and could only say... meow.",
    ageRange: "Ages 5–8",
    cover: coverDino,
    accent: "#2d6a4f",
    pages: [
      { text: "Rex was the loudest T-rex on the whole prehistoric block. His roar could shake coconuts out of trees. But one morning, Rex opened his enormous mouth and out came... \"Meow.\"" },
      { text: "Rex blinked. He tried again. Bigger breath. Mightier stance. \"MEOW.\" This was a disaster. You cannot scare anybody with a meow. The little lizards just patted him on the toe." },
      { text: "Rex set off on a quest to find his roar. He asked a volcano. The volcano just burped politely. He asked a pterodactyl. The pterodactyl said, \"Have you tried turning yourself off and on again?\" That did not help." },
      { text: "Finally, Rex met a very wise old turtle. The turtle said, \"Your roar is still inside you. You just have to mean it.\" Rex thought about everything he loved. Then he opened his mouth and ROARED. The coconuts fell. The lizards cheered. Rex was back. (He still meows on Sundays, just for fun.)" },
    ],
  },
  {
    id: "moon",
    title: "Bedtime for the Moon",
    subtitle: "",
    blurb:
      "Everyone in the world is asleep. Everyone except one very stubborn Moon.",
    ageRange: "Ages 3–6",
    cover: coverMoon,
    accent: "#4361ee",
    pages: [
      {
        image: pageMoon1,
        textInImage: true,
        text: "It was very, very late. All the children were asleep. All the puppies were asleep. Even the loudest rooster was asleep. But the Moon was still wide awake. The Moon did NOT want to go to bed.",
      },
      {
        image: pageMoon2,
        textInImage: true,
        text: "\"One more game,\" said the Moon. \"One more song. One more cloud to bounce on.\" A small sleepy child named Nora heard the Moon and tiptoed to the window. \"Moon,\" she whispered, \"it is bedtime.\"",
      },
      {
        image: pageMoon3,
        textInImage: true,
        text: "\"I am not tired,\" said the Moon, who was clearly extremely tired and trying very hard not to yawn. Nora climbed up a ladder of stars and brought a great big fluffy cloud blanket.",
      },
      {
        image: pageMoon4,
        textInImage: true,
        text: "She tucked the Moon in. She gave the Moon a tiny kiss on the cheek. The Moon yawned the biggest yawn anybody had ever seen. \"Goodnight, Moon,\" whispered Nora. \"Goodnight, Nora,\" whispered the Moon. And the whole world finally, finally went to sleep.",
      },
    ],
  },
];

export function getBook(id: string): Book | undefined {
  return BOOKS.find((b) => b.id === id);
}

export const VOICES = [
  {
    name: "Sarah",
    id: "EXAVITQu4vr4xnSDxMaL",
    description: "Soft and soothing",
    emoji: "🌟",
  },
  {
    id: "FGY2WhTYpPnrIDTdsKH5",
    name: "Laura",
    description: "Warm and gentle — perfect for bedtime",
    emoji: "🌸",
  },
  {
    id: "XrExE9yKIg1WjnnlVkGX",
    name: "Matilda",
    description: "Calm and dreamy",
    emoji: "🌷",
  },
  {
    id: "cgSgspJ2msm6clMCkdW9",
    name: "Jessica",
    description: "Soft, slow, and reassuring",
    emoji: "🌙",
  },
  {
    id: "Xb7hH8MSUJpSbSDYk0k2",
    name: "Alice",
    description: "Quiet and peaceful",
    emoji: "☁️",
  },
  {
    id: "SAz9YHcvj6GT2YYXdXww",
    name: "River",
    description: "Gentle and flowing — like a lullaby",
    emoji: "🌊",
  },
  {
    id: "SAhdygBsjizE9aIj39dz",
    name: "Mrs Claus",
    description: "Cozy and grandmotherly",
    emoji: "🍪",
  },
  {
    id: "g6xIsTj2HwM6VR4iXFCw",
    name: "Jessie",
    description: "American — friendly and bright",
    emoji: "🌼",
  },
  {
    id: "OYTbf65OHHFELVut7v2H",
    name: "Hope",
    description: "American — upbeat and warm",
    emoji: "🌈",
  },
  {
    id: "kdmDKE6EkgrWrrykO9Qt",
    name: "Alexandra",
    description: "American — clear and conversational",
    emoji: "🌻",
  },
  {
    id: "L0Dsvb3SLTyegXwtm47J",
    name: "Archer",
    description: "American — soft storyteller",
    emoji: "🍯",
  },
  {
    id: "PT4nqlKZfc06VW1BuClj",
    name: "Angela",
    description: "American — playful and kind",
    emoji: "🌺",
  },
  {
    id: "56AoDkrOh6qfVPDXZ7Pt",
    name: "Cassidy",
    description: "American — confident and cozy",
    emoji: "🍂",
  },
  {
    id: "OBNoHv4kbAj2nT9NUz7n",
    name: "Maple",
    description: "Canadian — sweet and gentle",
    emoji: "🍁",
  },
  {
    id: "ZF6FPAbjXT4488VcRRnw",
    name: "Amelia",
    description: "Canadian — soft and elegant",
    emoji: "🌾",
  },
] as const;

export type VoiceId = typeof VOICES[number]["id"];
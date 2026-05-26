import { NextRequest, NextResponse } from "next/server";

interface ExerciseDbItem {
  exerciseId: string;
  name: string;
  gifUrl: string;
  instructions?: string[];
}

const FALLBACK_TERMS: Array<[string, string]> = [
  ["goblet", "dumbbell goblet squat"],
  ["agachamento", "squat"],
  ["stiff", "dumbbell romanian deadlift"],
  ["terra romeno", "romanian deadlift"],
  ["leg press", "leg press"],
  ["extensora", "leg extension"],
  ["cadeira", "leg extension"],
  ["panturrilha em pe", "standing calf raise"],
  ["panturrilha em p", "standing calf raise"],
  ["panturrilha sentada", "seated calf raise"],
  ["supino", "dumbbell bench press"],
  ["remada baixa", "cable seated row"],
  ["remada", "seated row"],
  ["desenvolvimento", "dumbbell shoulder press"],
  ["puxada frente", "lat pulldown"],
  ["puxada", "lat pulldown"],
  ["rosca direta", "dumbbell biceps curl"],
  ["rosca", "biceps curl"],
  ["triceps corda", "cable triceps pushdown"],
  ["triceps", "triceps pushdown"],
  ["prancha", "front plank"],
  ["dead bug", "dead bug"],
  ["pallof", "cable pallof press"],
  ["afundo", "lunge"],
  ["mesa flexora", "lying leg curl"],
  ["flexora", "leg curl"],
];

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildSearchTerms(name: string) {
  const normalized = normalize(name);
  const mapped = FALLBACK_TERMS.find(([term]) => normalized.includes(term))?.[1];
  const cleaned = normalized
    .replace(/\b(com|de|da|do|dos|das|no|na|em|ao|aos|unilateral|sentado|sentada|maquina|cabo|halteres?|barra|smith)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return Array.from(new Set([mapped, cleaned, normalized].filter(Boolean))) as string[];
}

function scoreExercise(item: ExerciseDbItem, term: string) {
  const itemName = normalize(item.name);
  const termTokens = normalize(term).split(" ").filter(Boolean);
  const matches = termTokens.filter((token) => itemName.includes(token)).length;
  const exactBoost = itemName === normalize(term) ? 4 : 0;
  const prefixBoost = itemName.startsWith(normalize(term)) ? 2 : 0;
  return matches + exactBoost + prefixBoost;
}

async function searchExercise(term: string): Promise<ExerciseDbItem | null> {
  const url = `https://oss.exercisedb.dev/api/v1/exercises/search?search=${encodeURIComponent(term)}`;
  const res = await fetch(url, {
    headers: { accept: "application/json" },
    next: { revalidate: 60 * 60 * 24 * 7 },
  });

  if (!res.ok) return null;

  const payload = await res.json();
  const items = Array.isArray(payload?.data) ? (payload.data as ExerciseDbItem[]) : [];
  const withGif = items.filter((item) => item.gifUrl);
  if (!withGif.length) return null;

  return withGif.sort((a, b) => scoreExercise(b, term) - scoreExercise(a, term))[0];
}

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name") || "";
  if (!name.trim()) {
    return NextResponse.json({ error: "Informe o parâmetro name." }, { status: 400 });
  }

  for (const term of buildSearchTerms(name)) {
    const exercise = await searchExercise(term);
    if (exercise) {
      return NextResponse.json(
        {
          name: exercise.name,
          gifUrl: exercise.gifUrl,
          instructions: exercise.instructions || [],
          source: "ExerciseDB / AscendAPI",
          sourceUrl: "https://oss.exercisedb.dev/docs",
          matchedTerm: term,
        },
        { headers: { "Cache-Control": "public, s-maxage=604800, stale-while-revalidate=86400" } }
      );
    }
  }

  return NextResponse.json({ gifUrl: null }, { headers: { "Cache-Control": "public, s-maxage=86400" } });
}

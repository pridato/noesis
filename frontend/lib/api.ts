import type { Prompt } from "@/types/prompt"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

export async function fetchRandomPrompt(userId?: number): Promise<Prompt> {
  const url = new URL(`${API_URL}/prompts/random`)
  if (userId !== undefined) url.searchParams.set("user_id", String(userId))

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`Error fetching prompt: ${res.status}`)
  return res.json()
}

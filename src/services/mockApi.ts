import { CATALOG } from '../data/demoData'
import type { ParsedListItem } from '../types'

/** Simulated network delay for “API” feel */
function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

function matchProductId(text: string): string | null {
  const t = text.toLowerCase().trim()
  if (!t) return null
  for (const p of CATALOG) {
    if (p.aliases.some((a) => t.includes(a) || a.includes(t))) return p.id
    if (t.includes(p.id.replace('_', ' '))) return p.id
    if (p.label.toLowerCase().includes(t)) return p.id
  }
  return null
}

/**
 * Mock “natural language list” parser — replace with real NLP endpoint later.
 * Accepts comma or newline separated phrases; strips quantities like "2x milk".
 */
export function parseGroceryText(input: string): ParsedListItem[] {
  const chunks = input
    .split(/[\n,;]+/)
    .map((s) => s.trim())
    .filter(Boolean)

  return chunks.map((raw) => {
    const qtyMatch = raw.match(/^(\d+)\s*[x×]\s*/i)
    let quantity = 1
    let rest = raw
    if (qtyMatch) {
      quantity = parseInt(qtyMatch[1], 10) || 1
      rest = raw.slice(qtyMatch[0].length).trim()
    }
    const productId = matchProductId(rest) ?? matchProductId(raw)
    return { raw, productId, quantity }
  })
}

/**
 * Mock image / computer vision endpoint: returns a fixed sample list
 * (simulates OCR + product detection response shape).
 */
export async function mockVisionParseImage(file: File): Promise<ParsedListItem[]> {
  void file.name
  await delay(900)
  return [
    { raw: 'milk', productId: 'milk', quantity: 1 },
    { raw: 'eggs', productId: 'eggs', quantity: 1 },
    { raw: 'bread', productId: 'bread', quantity: 1 },
    { raw: 'bananas', productId: 'bananas', quantity: 2 },
  ]
}

/** Mock “voice transcript cleanup” — already text from Web Speech API */
export async function mockVoiceNormalize(transcript: string): Promise<ParsedListItem[]> {
  await delay(200)
  return parseGroceryText(transcript)
}

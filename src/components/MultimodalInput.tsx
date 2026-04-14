import { useCallback, useRef, useState } from 'react'
import { ImageIcon, Mic, MicOff, Type } from 'lucide-react'
import type { ParsedListItem } from '../types'
import { mockVisionParseImage, parseGroceryText, mockVoiceNormalize } from '../services/mockApi'

type Tab = 'text' | 'voice' | 'image'

interface Props {
  onParsed: (items: ParsedListItem[]) => void
}

export function MultimodalInput({ onParsed }: Props) {
  const [tab, setTab] = useState<Tab>('text')
  const [text, setText] = useState(
    'milk, eggs, 2x bread, bananas, chicken breast, spinach',
  )
  const [voiceStatus, setVoiceStatus] = useState<string>('')
  const [busy, setBusy] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const applyText = useCallback(() => {
    onParsed(parseGroceryText(text))
  }, [text, onParsed])

  const startVoice = useCallback(() => {
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition
    if (!SR) {
      setVoiceStatus('Speech recognition not supported in this browser.')
      return
    }
    const rec = new SR()
    rec.lang = 'en-US'
    rec.interimResults = false
    rec.maxAlternatives = 1
    rec.onresult = async (ev: SpeechRecognitionEvent) => {
      const transcript = ev.results[0]?.[0]?.transcript ?? ''
      setVoiceStatus(`Heard: “${transcript}”`)
      setBusy(true)
      try {
        const items = await mockVoiceNormalize(transcript)
        onParsed(items)
      } finally {
        setBusy(false)
      }
    }
    rec.onerror = () => setVoiceStatus('Voice capture error — try Chrome / Edge.')
    rec.onend = () => setBusy(false)
    recognitionRef.current = rec
    setBusy(true)
    setVoiceStatus('Listening…')
    rec.start()
  }, [onParsed])

  const stopVoice = useCallback(() => {
    recognitionRef.current?.stop()
    setBusy(false)
    setVoiceStatus('')
  }, [])

  const onImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      setBusy(true)
      try {
        const items = await mockVisionParseImage(file)
        onParsed(items)
      } finally {
        setBusy(false)
        e.target.value = ''
      }
    },
    [onParsed],
  )

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'text', label: 'Text', icon: <Type className="h-4 w-4" /> },
    { id: 'voice', label: 'Voice', icon: <Mic className="h-4 w-4" /> },
    { id: 'image', label: 'Image', icon: <ImageIcon className="h-4 w-4" /> },
  ]

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Multimodal list</h2>
      <p className="mt-1 text-sm text-slate-600">
        Text runs fully local. Voice uses the browser Speech API. Image upload calls a{' '}
        <strong>mock</strong> vision response (sample items).
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
              tab === t.id
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'text' && (
        <div className="mt-4 text-left">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            className="w-full rounded-xl border border-slate-200 p-3 font-mono text-sm text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="milk, eggs, bread…"
          />
          <button
            type="button"
            disabled={busy}
            onClick={applyText}
            className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            Parse list
          </button>
        </div>
      )}

      {tab === 'voice' && (
        <div className="mt-4 text-left">
          <p className="text-sm text-slate-600">
            Click mic, speak your list, then we normalize with a mock “cleanup” API.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={startVoice}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              <Mic className="h-4 w-4" />
              Start listening
            </button>
            <button
              type="button"
              onClick={stopVoice}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <MicOff className="h-4 w-4" />
              Stop
            </button>
          </div>
          {voiceStatus && <p className="mt-2 text-sm text-slate-600">{voiceStatus}</p>}
        </div>
      )}

      {tab === 'image' && (
        <div className="mt-4 text-left">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 hover:bg-slate-100">
            <ImageIcon className="h-10 w-10 text-slate-400" />
            <span className="mt-2 text-sm font-medium text-slate-700">
              Upload grocery photo
            </span>
            <span className="text-xs text-slate-500">Mock CV returns milk, eggs, bread, bananas</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={busy}
              onChange={onImage}
            />
          </label>
        </div>
      )}
    </section>
  )
}

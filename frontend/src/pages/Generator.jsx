import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import GlassCard from '../components/GlassCard'
import api from '../lib/api'

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <span className="text-sm text-zinc-200">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 accent-emerald-400"
      />
    </label>
  )
}

export default function Generator() {
  const [length, setLength] = useState(16)
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)

  const [generated, setGenerated] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: 'onBlur'
  })

  const canGenerate = useMemo(
    () => uppercase || lowercase || numbers || symbols,
    [uppercase, lowercase, numbers, symbols],
  )

  async function onGenerate() {
    setMessage('')
    setLoading(true)
    try {
      const { data } = await api.post('/password/generate', {
        length,
        uppercase,
        lowercase,
        numbers,
        symbols,
      })
      setGenerated(data.password)
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Failed to generate password')
    } finally {
      setLoading(false)
    }
  }

  async function onCopy() {
    if (!generated) return
    await navigator.clipboard.writeText(generated)
    setMessage('Copied to clipboard')
    setTimeout(() => setMessage(''), 1200)
  }

  async function onSave(data) {
    setMessage('')
    setSaving(true)
    try {
      const response = await api.post('/password/save', {
        label: data.label,
        username: data.username,
        password: generated,
      })
      setMessage(response?.data?.message || 'Saved')
      // Clear form after successful save
      reset()
      setGenerated('')
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-10 sm:space-y-12 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Advanced Generator</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Create cryptographically strong passwords tailored to your requirements. 
          Save them directly to your encrypted vault.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-emerald-400">⚙️</span>
            <h3 className="font-semibold text-white">Configuration</h3>
          </div>
          
          <GlassCard className="p-6 sm:p-8 space-y-8 border-emerald-500/10">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-zinc-300">Password Length</div>
                <div className="text-2xl font-bold text-emerald-400">{length}</div>
              </div>
              <input
                type="range"
                min={6}
                max={64}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>06</span>
                <span>32</span>
                <span>64</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Toggle label="Uppercase (A-Z)" checked={uppercase} onChange={setUppercase} />
              <Toggle label="Lowercase (a-z)" checked={lowercase} onChange={setLowercase} />
              <Toggle label="Numbers (0-9)" checked={numbers} onChange={setNumbers} />
              <Toggle label="Symbols (!@#)" checked={symbols} onChange={setSymbols} />
            </div>

            <button
              disabled={!canGenerate || loading}
              onClick={onGenerate}
              className="w-full rounded-2xl px-6 py-4 bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              {loading ? 'Generating…' : 'Generate Password'}
            </button>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blue-400">💾</span>
            <h3 className="font-semibold text-white">Vault Integration</h3>
          </div>

          <GlassCard className="p-6 sm:p-8 space-y-6 border-blue-500/10">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative rounded-2xl border border-white/10 bg-black/50 px-4 sm:px-6 py-6 font-mono text-base sm:text-lg break-all min-h-[84px] flex items-center justify-center text-center text-emerald-300">
                {generated ? generated : <span className="text-zinc-600 italic text-base">Generated output will appear here</span>}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={onCopy}
                disabled={!generated}
                className="w-full sm:flex-1 px-4 py-3 rounded-xl bg-white/5 text-zinc-200 border border-white/10 hover:bg-white/10 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span>📋</span> Copy
              </button>
              <button
                onClick={() => setGenerated('')}
                className="w-full sm:flex-1 px-4 py-3 rounded-xl bg-white/5 text-zinc-200 border border-white/10 hover:bg-white/10 transition flex items-center justify-center gap-2"
              >
                <span>🗑️</span> Clear
              </button>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-4">
              <form onSubmit={handleSubmit(onSave)} className="grid gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest pl-1">Label</label>
                  <input
                    {...register('label', {
                      required: 'Label is required'
                    })}
                    className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-emerald-500/40 transition"
                    placeholder="e.g. Personal Gmail"
                  />
                  {errors.label && (
                    <p className="text-xs text-red-400">{errors.label.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest pl-1">Identifier</label>
                  <input
                    {...register('username', {
                      required: 'Username/identifier is required'
                    })}
                    className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-emerald-500/40 transition"
                    placeholder="Email or Username"
                  />
                  {errors.username && (
                    <p className="text-xs text-red-400">{errors.username.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!generated || saving}
                  className="w-full rounded-xl px-6 py-4 bg-white/10 text-white font-semibold border border-white/10 hover:bg-white/20 transition-all disabled:opacity-50 shadow-xl"
                >
                  {saving ? 'Encrypting & Saving…' : 'Secure to Vault'}
                </button>
              </form>
            </div>

            {message && (
              <div className={`text-center py-2 px-4 rounded-xl text-sm ${message.includes('fail') ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                {message}
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

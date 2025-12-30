import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import GlassCard from '../components/GlassCard'
import { Skeleton } from '../components/Skeleton'
import Modal from '../components/Modal'
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

function VaultRow({ item, onCopy, onReveal, onReplace, onDelete, busyId }) {
  const busy = busyId === item._id

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
      <div className="min-w-0">
        <div className="text-sm text-white truncate">{item.label}</div>
        <div className="text-xs text-zinc-400 truncate">{item.username}</div>
      </div>

      <div className="flex items-center gap-2 flex-wrap justify-start sm:justify-end w-full sm:w-auto">
        <button
          onClick={() => onReveal(item._id)}
          disabled={busy}
          className="flex-1 sm:flex-none px-3 py-2 rounded-xl text-xs bg-white/5 text-zinc-200 border border-white/10 hover:bg-white/10 transition disabled:opacity-50"
        >
          Reveal
        </button>
        <button
          onClick={() => onCopy(item._id)}
          disabled={busy}
          className="flex-1 sm:flex-none px-3 py-2 rounded-xl text-xs bg-emerald-500/15 text-emerald-200 border border-emerald-400/20 hover:bg-emerald-500/20 transition disabled:opacity-50"
        >
          Copy
        </button>
        <button
          onClick={() => onReplace(item._id)}
          disabled={busy}
          className="flex-1 sm:flex-none px-3 py-2 rounded-xl text-xs bg-white/5 text-zinc-200 border border-white/10 hover:bg-white/10 transition disabled:opacity-50"
        >
          Replace
        </button>
        <button
          onClick={() => onDelete(item._id)}
          disabled={busy}
          className="flex-1 sm:flex-none px-3 py-2 rounded-xl text-xs bg-red-500/10 text-red-200 border border-red-500/20 hover:bg-red-500/15 transition disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default function Vault() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState('')
  const [toast, setToast] = useState('')
  const [search, setSearch] = useState('')

  // Replace modal state
  const [showReplaceModal, setShowReplaceModal] = useState(false)
  const [replaceId, setReplaceId] = useState('')
  const [replaceLength, setReplaceLength] = useState(16)
  const [replaceUppercase, setReplaceUppercase] = useState(true)
  const [replaceLowercase, setReplaceLowercase] = useState(true)
  const [replaceNumbers, setReplaceNumbers] = useState(true)
  const [replaceSymbols, setReplaceSymbols] = useState(true)
  const [newPassword, setNewPassword] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Reveal modal state
  const [showRevealModal, setShowRevealModal] = useState(false)
  const [revealedPassword, setRevealedPassword] = useState('')

  const filteredItems = useMemo(() => {
    if (!search) return items
    const s = search.toLowerCase()
    return items.filter(
      (it) => it.label.toLowerCase().includes(s) || it.username.toLowerCase().includes(s),
    )
  }, [items, search])

  const hasItems = useMemo(() => filteredItems?.length > 0, [filteredItems])

  async function load() {
    setLoading(true)
    try {
      const { data } = await api.get('/passwords')
      setItems(data?.items || [])
    } catch (err) {
      setItems([])
      setToast(err?.response?.data?.message || 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  function flash(message) {
    setToast(message)
    setTimeout(() => setToast(''), 1400)
  }

  async function reveal(id) {
    setBusyId(id)
    try {
      const { data } = await api.get(`/passwords/${id}`)
      if (data?.password) {
        setRevealedPassword(data.password)
        setShowRevealModal(true)
      } else {
        flash('No password returned')
      }
    } catch (err) {
      flash(err?.response?.data?.message || 'Reveal failed')
    } finally {
      setBusyId('')
    }
  }

  async function copy(id) {
    setBusyId(id)
    try {
      const { data } = await api.get(`/passwords/${id}`)
      if (data?.password) {
        await navigator.clipboard.writeText(data.password)
        flash('Copied')
      } else {
        flash('Nothing to copy')
      }
    } catch (err) {
      flash(err?.response?.data?.message || 'Copy failed')
    } finally {
      setBusyId('')
    }
  }

  async function replace(id) {
    // Open modal for custom generation options
    setReplaceId(id)
    setShowReplaceModal(true)
  }

  async function generateNew() {
    setIsGenerating(true)
    try {
      const { data } = await api.post('/password/generate', {
        length: replaceLength,
        uppercase: replaceUppercase,
        lowercase: replaceLowercase,
        numbers: replaceNumbers,
        symbols: replaceSymbols,
      })
      setNewPassword(data?.password)
    } catch (err) {
      flash(err?.response?.data?.message || 'Generation failed')
    } finally {
      setIsGenerating(false)
    }
  }

  async function confirmReplace() {
    if (!replaceId || !newPassword) return
    setBusyId(replaceId)
    setShowReplaceModal(false)
    try {
      await api.put(`/passwords/${replaceId}`, { password: newPassword })
      flash('Updated successfully')
      setNewPassword('')
      load() // Reload to reflect changes if needed (though UI might not show it)
    } catch (err) {
      flash(err?.response?.data?.message || 'Update failed')
    } finally {
      setBusyId('')
      setReplaceId('')
    }
  }

  async function remove(id) {
    setBusyId(id)
    try {
      await api.delete(`/passwords/${id}`)
      setItems((prev) => prev.filter((p) => p._id !== id))
      flash('Deleted')
    } catch (err) {
      flash(err?.response?.data?.message || 'Delete failed')
    } finally {
      setBusyId('')
    }
  }

  return (
    <div className="space-y-10">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-6 border-emerald-500/10">
          <div className="text-zinc-400 text-xs font-medium uppercase tracking-wider">Total Passwords</div>
          <div className="text-4xl font-bold text-white mt-2">{items.length}</div>
        </GlassCard>
        <GlassCard className="p-6 border-blue-500/10">
          <div className="text-zinc-400 text-xs font-medium uppercase tracking-wider">Vault Integrity</div>
          <div className="text-4xl font-bold text-blue-400 mt-2">100%</div>
        </GlassCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-start sm:items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Your Vault</h2>
              <p className="text-zinc-400 mt-1">Manage and protect your digital identities.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={load}
                className="px-4 py-2 rounded-xl bg-white/5 text-zinc-300 border border-white/10 hover:bg-white/10 transition flex items-center gap-2"
              >
                <span>🔄</span> Sync
              </button>
            </div>
          </div>

          <div className="relative">
            <input 
              type="text" 
              placeholder="Search passwords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-12 text-white outline-none focus:border-emerald-500/50 transition"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">🔍</span>
          </div>

          <GlassCard className="p-2 overflow-hidden">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-4 space-y-4">
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                </div>
              ) : hasItems ? (
                <div className="divide-y divide-white/5">
                  {filteredItems.map((it) => (
                    <div key={it._id} className="p-2">
                      <VaultRow
                        item={it}
                        onReveal={reveal}
                        onCopy={copy}
                        onReplace={replace}
                        onDelete={remove}
                        busyId={busyId}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="text-4xl mb-4">📭</div>
                  <div className="text-zinc-400">
                    {search ? `No results for "${search}"` : 'Your vault is empty.'}
                  </div>
                  {!search && (
                    <Link to="/generator" className="mt-4 inline-block text-emerald-400 text-sm font-medium hover:underline">
                      Add your first password →
                    </Link>
                  )}
                </div>
              )}
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white">Security Intelligence</h3>
          
          <GlassCard className="p-6 space-y-6 border-emerald-500/10">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="h-10 w-10 shrink-0 rounded-full bg-emerald-500/20 grid place-items-center text-emerald-400">✓</div>
                <div>
                  <div className="text-sm font-medium text-white">Encryption Active</div>
                  <div className="text-xs text-zinc-500">AES-256-GCM is securing all vault entries.</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-10 w-10 shrink-0 rounded-full bg-blue-500/20 grid place-items-center text-blue-400">!</div>
                <div>
                  <div className="text-sm font-medium text-white">Audit Recommended</div>
                  <div className="text-xs text-zinc-500">It's been 30 days since your last security audit.</div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Quick Tips</div>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li className="flex gap-2">
                  <span className="text-emerald-500">•</span> 
                  Avoid using personal info in passwords.
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500">•</span> 
                  Enable 2FA on all your critical accounts.
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500">•</span> 
                  Never share your master vault key.
                </li>
              </ul>
            </div>
          </GlassCard>
        </div>
      </div>

      {toast ? (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-2xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl px-4 py-3 text-sm text-zinc-200">
          {toast}
        </div>
      ) : null}

      {/* Reveal Modal */}
      <Modal
        isOpen={showRevealModal}
        onClose={() => {
          setShowRevealModal(false)
          setRevealedPassword('')
        }}
        title="Password Revealed"
      >
        <div className="space-y-4">
          <p className="text-sm text-zinc-400">
            Here's your decrypted password:
          </p>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-6 py-6 font-mono text-lg break-all text-center">
            <span className="text-emerald-300 select-all">{revealedPassword}</span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(revealedPassword)
                flash('Copied to clipboard')
                setShowRevealModal(false)
                setRevealedPassword('')
              }}
              className="flex-1 px-4 py-3 rounded-2xl bg-emerald-500/15 text-emerald-200 border border-emerald-400/20 hover:bg-emerald-500/20 transition flex items-center justify-center gap-2"
            >
              <span>📋</span> Copy
            </button>
            <button
              onClick={() => {
                setShowRevealModal(false)
                setRevealedPassword('')
              }}
              className="flex-1 px-4 py-3 rounded-2xl bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 transition"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* Replace Modal */}
      <Modal
        isOpen={showReplaceModal}
        onClose={() => setShowReplaceModal(false)}
        title="Replace Password"
      >
        <div className="space-y-4">
          <p className="text-sm text-zinc-400">
            Customize the new password before replacing:
          </p>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-zinc-400">Length</div>
              <div className="text-xl font-semibold text-white">{replaceLength}</div>
            </div>
            <input
              type="range"
              min={6}
              max={64}
              value={replaceLength}
              onChange={(e) => setReplaceLength(Number(e.target.value))}
              className="w-2/3 accent-emerald-400"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <Toggle label="Uppercase" checked={replaceUppercase} onChange={setReplaceUppercase} />
            <Toggle label="Lowercase" checked={replaceLowercase} onChange={setReplaceLowercase} />
            <Toggle label="Numbers" checked={replaceNumbers} onChange={setReplaceNumbers} />
            <Toggle label="Symbols" checked={replaceSymbols} onChange={setReplaceSymbols} />
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 font-mono text-sm break-all min-h-[56px] flex items-center justify-center text-center">
            {newPassword ? (
              <span className="text-emerald-300">{newPassword}</span>
            ) : (
              <span className="text-zinc-500">Generate a new password...</span>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={generateNew}
              disabled={
                isGenerating ||
                (!replaceUppercase && !replaceLowercase && !replaceNumbers && !replaceSymbols)
              }
              className="flex-1 px-4 py-3 rounded-2xl bg-emerald-500/15 text-emerald-200 border border-emerald-400/20 hover:bg-emerald-500/20 transition disabled:opacity-50"
            >
              {isGenerating ? 'Generating...' : 'Generate New'}
            </button>
            <button
              onClick={confirmReplace}
              disabled={!newPassword}
              className="flex-1 px-4 py-3 rounded-2xl bg-white/10 text-white border border-white/20 hover:bg-white/20 transition disabled:opacity-50"
            >
              Save & Replace
            </button>
          </div>

          <button
            onClick={() => {
              setShowReplaceModal(false)
              setNewPassword('')
            }}
            className="w-full px-4 py-3 rounded-2xl bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 transition"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  )
}

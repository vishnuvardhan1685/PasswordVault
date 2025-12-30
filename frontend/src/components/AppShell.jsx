import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { clearToken, getToken } from '../lib/auth'

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-xl text-sm transition ${
          isActive
            ? 'bg-white/10 text-white'
            : 'text-zinc-300 hover:text-white hover:bg-white/5'
        }`
      }
    >
      {children}
    </NavLink>
  )
}

export default function AppShell() {
  const token = getToken()
  const navigate = useNavigate()

  function onLogout() {
    clearToken()
    navigate('/login')
  }

  return (
    <div className="min-h-full bg-grid bg-zinc-950">
      {/* glow */}
      <div className="pointer-events-none fixed inset-0 [background:radial-gradient(900px_circle_at_20%_10%,rgba(34,197,94,0.18),transparent_55%),radial-gradient(900px_circle_at_80%_30%,rgba(59,130,246,0.10),transparent_55%)]" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/40 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-white/10 border border-white/10 grid place-items-center">
              <span className="text-emerald-300 font-semibold">PV</span>
            </div>
            <div className="leading-tight">
              <div className="text-white font-semibold">Password Vault</div>
              <div className="text-xs text-zinc-400">Passwords, encrypted</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            <NavItem to="/generator">Generator</NavItem>
            <NavItem to="/vault">Vault</NavItem>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-2 rounded-xl text-sm bg-emerald-500/15 text-emerald-200 border border-emerald-400/20 hover:bg-emerald-500/20 transition whitespace-nowrap"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <button
                onClick={onLogout}
                className="px-3 py-2 rounded-xl text-sm bg-white/5 text-zinc-200 border border-white/10 hover:bg-white/10 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Extra bottom padding so content isn't hidden behind mobile bottom nav */}
      <main className="relative mx-auto max-w-7xl px-3 sm:px-4 py-8 sm:py-10 pb-24 md:pb-10 animate-enter">
        <Outlet />
      </main>

      {/* Mobile bottom nav (phones) */}
      <nav className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-md">
        <div className="rounded-2xl border border-white/10 bg-zinc-950/70 backdrop-blur-xl shadow-2xl px-2 py-2 flex items-center justify-between">
          <NavLink
            to="/generator"
            className={({ isActive }) =>
              `flex-1 mx-1 px-3 py-3 rounded-xl text-sm text-center transition ${
                isActive ? 'bg-white/10 text-white' : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`
            }
          >
            Generator
          </NavLink>
          <NavLink
            to="/vault"
            className={({ isActive }) =>
              `flex-1 mx-1 px-3 py-3 rounded-xl text-sm text-center transition ${
                isActive ? 'bg-white/10 text-white' : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`
            }
          >
            Vault
          </NavLink>
        </div>
      </nav>

      <footer className="relative border-t border-white/10 mt-20">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 grid place-items-center">
                  <span className="text-xs text-emerald-400 font-bold">PV</span>
                </div>
                <span className="text-white font-bold tracking-tight text-lg">Password Vault</span>
              </div>
              <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
                The world's most minimalist, zero-knowledge password manager. 
                Built for privacy, designed for speed, and powered by high-grade encryption.
              </p>
            </div>
            <div>
              <div className="text-white text-sm font-semibold mb-4">Product</div>
              <ul className="space-y-2 text-zinc-500 text-sm">
                <li><Link to="/generator" className="hover:text-emerald-400 transition">Generator</Link></li>
                <li><Link to="/vault" className="hover:text-emerald-400 transition">Vault</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-white text-sm font-semibold mb-4">Legal</div>
              <ul className="space-y-2 text-zinc-500 text-sm">
                <li><Link to="/privacy" className="hover:text-emerald-400 transition">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-emerald-400 transition">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-600 uppercase tracking-widest">
            <div>© 2025 Password Vault. All rights reserved.</div>
            <div className="flex gap-6">
              <span>Encrypted by AES-256</span>
              <span>Zero Knowledge</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

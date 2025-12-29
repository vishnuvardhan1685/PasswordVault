import { Link } from 'react-router-dom'
import GlassCard from '../components/GlassCard'
import { getToken } from '../lib/auth'

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 text-xs font-medium">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
      {children}
    </span>
  )
}

function Feature({ title, desc, icon }) {
  return (
    <div className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition group">
      <div className="h-12 w-12 shrink-0 rounded-2xl bg-emerald-500/15 border border-emerald-400/20 grid place-items-center text-xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h3 className="text-white font-medium">{title}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

export default function Landing() {
  const isLoggedIn = !!getToken()
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-16 items-center pt-10">
        <div className="space-y-8">
          <div className="flex flex-wrap gap-2">
            <Badge>Military-Grade AES-256</Badge>
            <Badge>Zero-Knowledge Architecture</Badge>
            <Badge>End-to-End Encrypted</Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Security that feels <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              effortless.
            </span>
          </h1>

          <p className="text-lg text-zinc-400 max-w-xl leading-relaxed">
            Password Vault combines state-of-the-art encryption with a minimalist interface. 
            Generate unbreakable passwords and store them in a vault that only you can access.
          </p>

          <div className="flex flex-wrap gap-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/vault"
                  className="px-8 py-4 rounded-2xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  Open My Vault
                </Link>
                <Link
                  to="/generator"
                  className="px-8 py-4 rounded-2xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all font-medium"
                >
                  Generate Password
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="px-8 py-4 rounded-2xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  Get Started for Free
                </Link>
                <Link
                  to="/generator"
                  className="px-8 py-4 rounded-2xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all font-medium"
                >
                  Try Generator
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-white/5">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400">
                  U{i}
                </div>
              ))}
            </div>
            <p className="text-sm text-zinc-500">
              Trusted by users worldwide for digital sovereignty.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Decorative Glow */}
          <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl rounded-full" />
          
          <GlassCard className="p-8 relative border-emerald-500/20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-white font-semibold text-lg">Password Vault</h2>
                <p className="text-sm text-zinc-400">Encrypted Storage Active</p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 grid place-items-center animate-bounce-slow">
                <span className="text-2xl">🔒</span>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Primary Email', user: 'alex.v@proton.me', dots: '••••••••••••••••' },
                { label: 'Trading Account', user: 'crypto_vault', dots: '••••••••••••••••' },
                { label: 'Work Workspace', user: 'admin_root', dots: '••••••••••••••••' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 flex items-center justify-between group cursor-default"
                >
                  <div>
                    <div className="text-sm text-white font-medium">{item.label}</div>
                    <div className="text-xs text-zinc-500">{item.user}</div>
                  </div>
                  <div className="text-xs font-mono text-emerald-400/60 tracking-widest">{item.dots}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-[11px] text-zinc-400 text-center italic">
              "Your data is encrypted locally before being transmitted."
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Feature 
          icon="⚡️"
          title="Instant Generation"
          desc="Create complex, high-entropy passwords in milliseconds with customizable rules."
        />
        <Feature 
          icon="🛡️"
          title="Zero-Knowledge"
          desc="We never see your master key. Your passwords are encrypted on your device."
        />
        <Feature 
          icon="📱"
          title="Cloud Sync"
          desc="Access your vault from any device securely with our real-time synchronization."
        />
      </div>

      {/* Bottom CTA */}
      {!isLoggedIn && (
        <GlassCard className="p-12 text-center space-y-6 bg-gradient-to-b from-white/5 to-emerald-500/5 border-emerald-500/20">
          <h2 className="text-3xl font-bold text-white">Ready to secure your digital life?</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Join thousands of users who trust Password Vault for their sensitive information. 
            No credit card required. No hidden fees.
          </p>
          <Link
            to="/signup"
            className="inline-block px-10 py-4 rounded-2xl bg-white text-black font-bold hover:bg-zinc-200 transition-all hover:scale-105"
          >
            Create Your Vault
          </Link>
        </GlassCard>
      )}
      
      {isLoggedIn && (
        <GlassCard className="p-12 text-center space-y-6 bg-gradient-to-b from-white/5 to-emerald-500/5 border-emerald-500/20">
          <h2 className="text-3xl font-bold text-white">Welcome back to Password Vault!</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Your passwords are safely encrypted and ready to access. 
            Generate new passwords or manage your existing vault entries.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/vault"
              className="inline-block px-10 py-4 rounded-2xl bg-white text-black font-bold hover:bg-zinc-200 transition-all hover:scale-105"
            >
              Go to Vault
            </Link>
            <Link
              to="/generator"
              className="inline-block px-10 py-4 rounded-2xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all hover:scale-105"
            >
              Generate Password
            </Link>
          </div>
        </GlassCard>
      )}
    </div>
  )
}

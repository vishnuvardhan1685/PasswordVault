import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import GlassCard from '../components/GlassCard'
import { login } from '../lib/auth'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const nextPath = new URLSearchParams(location.search).get('next') || '/vault'
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur'
  })

  async function onSubmit(data) {
    setError('')
    setLoading(true)
    try {
      await login({ email: data.email, password: data.password })
      navigate(nextPath)
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <GlassCard className="p-5 sm:p-6 md:p-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Welcome back</h2>
          <p className="text-sm text-zinc-400">Log in to access your encrypted vault.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-zinc-400">Email</label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              className="w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-emerald-400/40"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400">Password</label>
            <input
              {...register('password', {
                required: 'Password is required'
              })}
              type="password"
              className="w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-emerald-400/40"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
            )}
          </div>

          {error ? (
            <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3">
              {error}
            </div>
          ) : null}

          <button
            disabled={loading}
            className="w-full rounded-2xl px-4 py-3 bg-emerald-500/15 text-emerald-200 border border-emerald-400/20 hover:bg-emerald-500/20 transition disabled:opacity-50"
          >
            {loading ? 'Logging in…' : 'Log in'}
          </button>

          <div className="text-sm text-zinc-400">
            No account?{' '}
            <Link className="text-emerald-200 hover:text-emerald-100" to="/signup">
              Sign up
            </Link>
          </div>
        </form>
      </GlassCard>
    </div>
  )
}

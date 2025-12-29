import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import GlassCard from '../components/GlassCard'
import PasswordStrength from '../components/PasswordStrength'
import { signup } from '../lib/auth'

export default function Signup() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode: 'onBlur'
  })
  
  const password = watch('password', '')

  async function onSubmit(data) {
    setError('')
    setLoading(true)
    try {
      await signup({ email: data.email, password: data.password })
      navigate('/vault')
    } catch (err) {
      setError(err?.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <GlassCard className="p-6 md:p-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Create account</h2>
          <p className="text-sm text-zinc-400">Your vault is per-user and encrypted.</p>
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
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              type="password"
              className="w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-emerald-400/40"
              placeholder="Create a strong password"
            />
            {errors.password && (
              <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
            )}
            {password && !errors.password && (
              <div className="mt-2">
                <PasswordStrength password={password} />
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400">Confirm Password</label>
            <input
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
              type="password"
              className="w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-emerald-400/40"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-400 mt-1">{errors.confirmPassword.message}</p>
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
            {loading ? 'Creating…' : 'Sign up'}
          </button>

          <div className="text-sm text-zinc-400">
            Already have an account?{' '}
            <Link className="text-emerald-200 hover:text-emerald-100" to="/login">
              Log in
            </Link>
          </div>
        </form>
      </GlassCard>
    </div>
  )
}

export default function PasswordStrength({ password }) {
  const calculateStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', color: '' }

    let score = 0
    
    // Length criteria
    if (pwd.length >= 8) score++
    if (pwd.length >= 12) score++
    if (pwd.length >= 16) score++
    
    // Character variety
    if (/[a-z]/.test(pwd)) score++ // lowercase
    if (/[A-Z]/.test(pwd)) score++ // uppercase
    if (/[0-9]/.test(pwd)) score++ // numbers
    if (/[^a-zA-Z0-9]/.test(pwd)) score++ // special chars
    
    // Determine strength level
    if (score <= 2) return { score: 1, label: 'Weak', color: 'bg-red-500' }
    if (score <= 4) return { score: 2, label: 'Fair', color: 'bg-orange-500' }
    if (score <= 6) return { score: 3, label: 'Good', color: 'bg-yellow-500' }
    return { score: 4, label: 'Strong', color: 'bg-emerald-500' }
  }

  const strength = calculateStrength(password)
  
  if (!password) return null

  return (
    <div className="space-y-2">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-1.5 flex-1 rounded-full transition-all ${
              level <= strength.score ? strength.color : 'bg-white/10'
            }`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-400">Password strength:</span>
        <span className={`text-xs font-medium ${
          strength.score === 1 ? 'text-red-400' :
          strength.score === 2 ? 'text-orange-400' :
          strength.score === 3 ? 'text-yellow-400' :
          'text-emerald-400'
        }`}>
          {strength.label}
        </span>
      </div>
    </div>
  )
}

export default function GlassCard({ className = '', children }) {
  return (
    <div
      className={
        'rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_20px_100px_-40px_rgba(0,0,0,0.9)] ' +
        className
      }
    >
      {children}
    </div>
  )
}

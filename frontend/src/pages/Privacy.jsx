import GlassCard from '../components/GlassCard'
import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition">
          ← Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-white">Privacy Policy</h1>
        <p className="text-zinc-400">Last updated: December 30, 2024</p>
      </div>

      <GlassCard className="p-8 space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Introduction</h2>
          <p className="text-zinc-300 leading-relaxed">
            At Password Vault, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
            protect, and handle your personal information when you use our password management service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Zero-Knowledge Architecture</h2>
          <p className="text-zinc-300 leading-relaxed">
            Password Vault is built on a zero-knowledge architecture. This means:
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
            <li>We never see your master password or vault passwords in plain text</li>
            <li>All passwords are encrypted on your device before transmission</li>
            <li>We cannot decrypt your passwords even if we wanted to</li>
            <li>Only you have access to your encrypted vault</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-emerald-400 mb-2">Account Information</h3>
              <p className="text-zinc-300 leading-relaxed">
                When you create an account, we collect your email address. Your email is used for:
              </p>
              <ul className="list-disc list-inside space-y-1 text-zinc-300 ml-4 mt-2">
                <li>Account identification and authentication</li>
                <li>Important service communications</li>
                <li>Account recovery (if implemented)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-emerald-400 mb-2">Encrypted Vault Data</h3>
              <p className="text-zinc-300 leading-relaxed">
                We store your encrypted passwords using AES-256-GCM encryption. This data includes:
              </p>
              <ul className="list-disc list-inside space-y-1 text-zinc-300 ml-4 mt-2">
                <li>Encrypted password entries (labels, usernames, and passwords)</li>
                <li>Encryption metadata (initialization vectors, authentication tags)</li>
                <li>Timestamps for password creation and modification</li>
              </ul>
              <p className="text-zinc-400 italic mt-2">
                Note: All passwords are encrypted before they reach our servers. We cannot read your passwords.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-emerald-400 mb-2">Technical Information</h3>
              <p className="text-zinc-300 leading-relaxed">
                We may collect technical information to improve our service:
              </p>
              <ul className="list-disc list-inside space-y-1 text-zinc-300 ml-4 mt-2">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>IP address (for security purposes)</li>
                <li>Access times and dates</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
            <li>To provide and maintain our password management service</li>
            <li>To authenticate your identity and secure your account</li>
            <li>To store and sync your encrypted passwords across devices</li>
            <li>To improve our service and user experience</li>
            <li>To detect and prevent security threats or fraud</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Data Security</h2>
          <p className="text-zinc-300 leading-relaxed">
            We implement industry-standard security measures to protect your data:
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
            <li><strong className="text-white">AES-256-GCM Encryption:</strong> Military-grade encryption for all passwords at rest</li>
            <li><strong className="text-white">Bcrypt Hashing:</strong> Secure hashing for your master password (10 salt rounds)</li>
            <li><strong className="text-white">JWT Tokens:</strong> Secure session management with token-based authentication</li>
            <li><strong className="text-white">HTTPS:</strong> All data transmitted over secure, encrypted connections</li>
            <li><strong className="text-white">Per-User Isolation:</strong> Each vault is scoped to individual users</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Data Sharing</h2>
          <p className="text-zinc-300 leading-relaxed">
            We do not sell, trade, or rent your personal information to third parties. We may share information only in these circumstances:
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
            <li>With your explicit consent</li>
            <li>To comply with legal obligations or court orders</li>
            <li>To protect our rights, property, or safety</li>
            <li>In connection with a business transfer or merger</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Your Rights</h2>
          <p className="text-zinc-300 leading-relaxed">
            You have the following rights regarding your personal data:
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
            <li><strong className="text-white">Access:</strong> Request a copy of your personal data</li>
            <li><strong className="text-white">Correction:</strong> Update or correct your information</li>
            <li><strong className="text-white">Deletion:</strong> Request deletion of your account and all associated data</li>
            <li><strong className="text-white">Export:</strong> Download your encrypted vault data</li>
            <li><strong className="text-white">Objection:</strong> Object to certain data processing activities</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Data Retention</h2>
          <p className="text-zinc-300 leading-relaxed">
            We retain your data for as long as your account is active. When you delete your account:
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
            <li>All encrypted passwords are permanently deleted</li>
            <li>Your email and account information are removed</li>
            <li>Backups are purged within 30 days</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Cookies and Tracking</h2>
          <p className="text-zinc-300 leading-relaxed">
            We use minimal tracking technologies:
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
            <li>Authentication tokens stored in localStorage for session management</li>
            <li>No third-party tracking cookies</li>
            <li>No advertising or analytics cookies</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Children's Privacy</h2>
          <p className="text-zinc-300 leading-relaxed">
            Password Vault is not intended for users under 13 years of age. We do not knowingly collect 
            personal information from children. If you believe a child has provided us with personal information, 
            please contact us to have it removed.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">International Users</h2>
          <p className="text-zinc-300 leading-relaxed">
            Your data may be transferred to and processed in countries other than your own. We ensure that 
            all transfers comply with applicable data protection laws and that your data remains protected 
            to the standards described in this policy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Changes to This Policy</h2>
          <p className="text-zinc-300 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by:
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
            <li>Updating the "Last updated" date at the top of this policy</li>
            <li>Sending you an email notification for significant changes</li>
            <li>Displaying a notice on our website</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Contact Us</h2>
          <p className="text-zinc-300 leading-relaxed">
            If you have questions about this Privacy Policy or how we handle your data, please contact us at:
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-4">
            <p className="text-zinc-300">Email: <span className="text-emerald-400">privacy@passwordvault.com</span></p>
          </div>
        </section>

        <div className="pt-8 border-t border-white/10">
          <p className="text-sm text-zinc-500 leading-relaxed">
            By using Password Vault, you agree to the collection and use of information in accordance with this policy. 
            Your continued use of the service after any changes to this Privacy Policy will constitute your acceptance of such changes.
          </p>
        </div>
      </GlassCard>
    </div>
  )
}

import GlassCard from '../components/GlassCard'
import { Link } from 'react-router-dom'

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition">
          ← Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-white">Terms of Service</h1>
        <p className="text-zinc-400">Last updated: December 30, 2024</p>
      </div>

      <GlassCard className="p-8 space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Acceptance of Terms</h2>
          <p className="text-zinc-300 leading-relaxed">
            By accessing and using Password Vault ("the Service"), you accept and agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Description of Service</h2>
          <p className="text-zinc-300 leading-relaxed">
            Password Vault is a password management service that allows you to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
            <li>Generate strong, random passwords</li>
            <li>Store passwords in an encrypted vault</li>
            <li>Access your passwords from any device</li>
            <li>Manage and organize your credentials</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mt-4">
            All passwords are encrypted using AES-256-GCM encryption before being stored on our servers. 
            We cannot access or decrypt your passwords.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">User Accounts</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-emerald-400 mb-2">Account Creation</h3>
              <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
                <li>You must provide a valid email address and create a secure password</li>
                <li>You must be at least 13 years of age to use the Service</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You may not share your account credentials with others</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-emerald-400 mb-2">Account Security</h3>
              <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
                <li>You are solely responsible for your master password</li>
                <li>If you lose your master password, we cannot recover your encrypted data</li>
                <li>You must notify us immediately of any unauthorized access</li>
                <li>You are responsible for all activities under your account</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Acceptable Use</h2>
          <p className="text-zinc-300 leading-relaxed">You agree NOT to use the Service to:</p>
          <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on intellectual property rights of others</li>
            <li>Transmit malware, viruses, or harmful code</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt the Service</li>
            <li>Use the Service for illegal activities</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Scrape, mine, or collect data from the Service</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">User Responsibilities</h2>
          <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
            <li><strong className="text-white">Master Password:</strong> You are solely responsible for remembering your master password. We cannot recover it if lost.</li>
            <li><strong className="text-white">Backup:</strong> We recommend maintaining offline backups of critical passwords</li>
            <li><strong className="text-white">Password Quality:</strong> Use strong, unique passwords for your master password</li>
            <li><strong className="text-white">Device Security:</strong> Ensure devices used to access the Service are secure</li>
            <li><strong className="text-white">Logout:</strong> Always logout from shared or public devices</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Service Availability</h2>
          <p className="text-zinc-300 leading-relaxed">
            We strive to provide uninterrupted service, but we do not guarantee:
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
            <li>100% uptime or availability</li>
            <li>Error-free operation</li>
            <li>Freedom from viruses or harmful components</li>
            <li>Immediate resolution of technical issues</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mt-4">
            We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Data and Privacy</h2>
          <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
            <li>Your use of the Service is also governed by our <Link to="/privacy" className="text-emerald-400 hover:underline">Privacy Policy</Link></li>
            <li>We use AES-256-GCM encryption to protect your passwords</li>
            <li>We cannot access or decrypt your vault data</li>
            <li>You retain ownership of all data you store in the Service</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Intellectual Property</h2>
          <div className="space-y-4">
            <p className="text-zinc-300 leading-relaxed">
              The Service and its original content, features, and functionality are owned by Password Vault and are protected by:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
              <li>International copyright laws</li>
              <li>Trademark laws</li>
              <li>Other intellectual property rights</li>
            </ul>
            <p className="text-zinc-300 leading-relaxed">
              You may not copy, modify, distribute, sell, or lease any part of our Service without explicit permission.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Limitation of Liability</h2>
          <p className="text-zinc-300 leading-relaxed uppercase text-sm font-semibold mb-4">
            IMPORTANT: PLEASE READ CAREFULLY
          </p>
          <p className="text-zinc-300 leading-relaxed">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, PASSWORD VAULT SHALL NOT BE LIABLE FOR:
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
            <li>Loss of data or passwords due to user error</li>
            <li>Forgotten or lost master passwords</li>
            <li>Unauthorized access to your account</li>
            <li>Service interruptions or downtime</li>
            <li>Data breaches beyond our reasonable control</li>
            <li>Any indirect, incidental, or consequential damages</li>
            <li>Loss of profits, data, or business opportunities</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mt-4">
            Our total liability shall not exceed the amount you paid for the Service in the past 12 months (if applicable).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Disclaimers</h2>
          <p className="text-zinc-300 leading-relaxed">
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, INCLUDING:
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
            <li>Implied warranties of merchantability</li>
            <li>Fitness for a particular purpose</li>
            <li>Non-infringement</li>
            <li>Accuracy or reliability of information</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mt-4">
            While we implement strong security measures, no system is 100% secure. You use the Service at your own risk.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Termination</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-emerald-400 mb-2">By You</h3>
              <p className="text-zinc-300 leading-relaxed">
                You may terminate your account at any time by deleting your data and contacting us. 
                Upon termination, all your encrypted data will be permanently deleted.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-emerald-400 mb-2">By Us</h3>
              <p className="text-zinc-300 leading-relaxed">
                We reserve the right to suspend or terminate your account if you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4 mt-2">
                <li>Violate these Terms of Service</li>
                <li>Engage in fraudulent or illegal activities</li>
                <li>Abuse or misuse the Service</li>
                <li>Fail to pay applicable fees (if any)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Indemnification</h2>
          <p className="text-zinc-300 leading-relaxed">
            You agree to indemnify and hold harmless Password Vault, its officers, directors, employees, and agents from any claims, 
            damages, losses, or expenses arising from:
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
            <li>Your use or misuse of the Service</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any third-party rights</li>
            <li>Any content you submit or store</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Governing Law</h2>
          <p className="text-zinc-300 leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which 
            Password Vault operates, without regard to its conflict of law provisions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Changes to Terms</h2>
          <p className="text-zinc-300 leading-relaxed">
            We reserve the right to modify these Terms at any time. We will notify users of any material changes by:
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
            <li>Updating the "Last updated" date</li>
            <li>Sending email notifications</li>
            <li>Displaying a notice on our website</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mt-4">
            Your continued use of the Service after changes constitutes acceptance of the new Terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Severability</h2>
          <p className="text-zinc-300 leading-relaxed">
            If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited 
            or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Contact Information</h2>
          <p className="text-zinc-300 leading-relaxed">
            For questions about these Terms of Service, please contact us:
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-4 space-y-2">
            <p className="text-zinc-300">Email: <span className="text-emerald-400">legal@passwordvault.com</span></p>
            <p className="text-zinc-300">Support: <span className="text-emerald-400">support@passwordvault.com</span></p>
          </div>
        </section>

        <div className="pt-8 border-t border-white/10">
          <p className="text-sm text-zinc-500 leading-relaxed">
            By using Password Vault, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </div>
      </GlassCard>
    </div>
  )
}

import { useState } from 'react';
import { updatePassword } from '@/lib/auth';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2 } from 'lucide-react';

export default function ResetPassword() {
  const { clearRecovery } = useAuth();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setSaving(true);
    try {
      await updatePassword(password);
      setDone(true);
      setTimeout(() => clearRecovery(), 2000);
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(160deg, #060606 0%, #0c0c0c 50%, #091409 100%)' }}>
      <div className="w-full max-w-sm px-6">
        <div className="text-center mb-8">
          <p className="text-lm-green/70 text-[10px] font-bold tracking-[0.4em] uppercase mb-2">Les Mills</p>
          <h1 className="text-white font-display font-bold text-3xl tracking-widest uppercase mb-1">Club Coach</h1>
          <p className="text-white/40 text-sm">Set a new password</p>
        </div>

        {done ? (
          <div className="text-center space-y-4">
            <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: '#00FF63' }}>
              <CheckCircle2 className="w-7 h-7 text-black" />
            </div>
            <p className="text-white font-semibold">Password updated — signing you in…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="px-5 py-5 space-y-4">
                <div>
                  <Label className="text-white/60 text-xs mb-1.5 block">New Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    autoFocus
                    className="bg-white/6 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-lm-green/40 focus-visible:border-lm-green/50 h-10"
                  />
                </div>
                <div>
                  <Label className="text-white/60 text-xs mb-1.5 block">Confirm Password</Label>
                  <Input
                    type="password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    placeholder="Repeat password"
                    className="bg-white/6 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-lm-green/40 focus-visible:border-lm-green/50 h-10"
                  />
                </div>
              </div>
            </div>

            {error && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}

            <button
              type="submit"
              disabled={saving}
              className="w-full h-12 rounded-full text-sm font-bold transition-all disabled:opacity-60"
              style={{ backgroundColor: '#00FF63', color: '#0A0A0A' }}
            >
              {saving ? 'Saving…' : 'Set New Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

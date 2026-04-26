import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, resetPasswordEmail } from '@/lib/auth';
import { Loader2, ArrowLeft } from 'lucide-react';
import SignUp from './SignUp';
import LMWordmark from '@/components/LMWordmark';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type FormValues = z.infer<typeof schema>;

const STYLES = `
  @keyframes lm-fade-up {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes lm-spin {
    to { transform: rotate(360deg); }
  }
  .lm-animate {
    opacity: 0;
    animation: lm-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  .lm-input {
    width: 100%;
    height: 44px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 8px;
    color: #fff;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    padding: 0 14px;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s;
    box-sizing: border-box;
  }
  .lm-input::placeholder { color: rgba(255,255,255,0.18); }
  .lm-input:focus {
    border-color: #00FF63;
    box-shadow: 0 0 0 3px rgba(0,255,99,0.13);
  }
  .lm-btn-primary {
    width: 100%;
    height: 46px;
    background: #00FF63;
    color: #0A0A0A;
    border: none;
    border-radius: 100px;
    font-size: 12px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    transition: opacity 0.18s, transform 0.12s;
  }
  .lm-btn-primary:hover:not(:disabled) { opacity: 0.92; transform: translateY(-1px); }
  .lm-btn-primary:active:not(:disabled) { transform: translateY(0); }
  .lm-btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }
  .lm-btn-ghost {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: rgba(255,255,255,0.35);
    font-size: 11px;
    font-family: 'Inter', sans-serif;
    transition: color 0.15s;
  }
  .lm-btn-ghost:hover { color: rgba(255,255,255,0.7); }
  .lm-spinner {
    width: 14px; height: 14px;
    animation: lm-spin 0.9s linear infinite;
    flex-shrink: 0;
  }
`;

function Background() {
  return (
    <>
      {/* Radial aurora — bottom-right */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 65% 65% at 105% 105%, rgba(0,255,99,0.13) 0%, transparent 65%)',
      }} />
      {/* Radial aurora — top-left */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 45% 45% at -5% -5%, rgba(0,255,99,0.06) 0%, transparent 65%)',
      }} />
      {/* Centre pulse */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(0,255,99,0.03) 0%, transparent 70%)',
      }} />
      {/* Dot grid */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.18 }} aria-hidden>
        <defs>
          <pattern id="lm-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.2" fill="rgba(255,255,255,0.35)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lm-dots)" />
      </svg>
      {/* Bottom glow bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', pointerEvents: 'none',
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,99,0.25) 30%, rgba(0,255,99,0.45) 50%, rgba(0,255,99,0.25) 70%, transparent 100%)',
      }} />
    </>
  );
}


function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.025)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderTop: '3px solid #00FF63',
      borderRadius: '16px',
      padding: '32px 28px',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
    }}>
      {children}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label style={{
      display: 'block', fontSize: '9px', fontWeight: 700,
      letterSpacing: '0.18em', textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.38)', marginBottom: '7px',
      fontFamily: "'Barlow Condensed', sans-serif",
    }}>
      {children}
    </label>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p style={{ color: '#FF623E', fontSize: '11px', marginTop: '5px', fontFamily: "'Inter', sans-serif" }}>{msg}</p>;
}

export default function Login() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetSending, setResetSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  if (showSignUp) return <SignUp onBack={() => setShowSignUp(false)} />;

  async function onSubmit(values: FormValues) {
    setError(null);
    try {
      await signIn(values.email, values.password);
    } catch (err: any) {
      setError(err.message ?? 'Login failed. Check your email and password.');
    }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setResetError(null);
    setResetSending(true);
    try {
      await resetPasswordEmail(resetEmail);
      setResetSent(true);
    } catch (err: any) {
      setResetError(err.message ?? 'Could not send reset email.');
    } finally {
      setResetSending(false);
    }
  }

  const screen: React.CSSProperties = {
    minHeight: '100vh',
    background: 'linear-gradient(160deg, #060606 0%, #0c0c0c 50%, #080d08 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '32px 20px',
  };

  const inner: React.CSSProperties = {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    maxWidth: '380px',
  };

  // ── Forgot password screen ──────────────────────────────────────────
  if (showForgot) {
    return (
      <>
        <style>{STYLES}</style>
        <div style={screen}>
          <Background />
          <div style={inner}>
            <LMWordmark />
            <div className="lm-animate" style={{ animationDelay: '80ms' }}>
              <Card>
                <button
                  type="button"
                  onClick={() => { setShowForgot(false); setResetSent(false); setResetError(null); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: '11px', cursor: 'pointer', padding: 0, marginBottom: '24px', fontFamily: "'Inter', sans-serif", transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                >
                  <ArrowLeft size={13} /> Back to sign in
                </button>

                {resetSent ? (
                  <div style={{ textAlign: 'center', padding: '8px 0' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(0,255,99,0.12)', border: '1px solid rgba(0,255,99,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00FF63" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p style={{ color: '#fff', fontSize: '15px', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: '0.05em', marginBottom: '8px' }}>Reset link sent</p>
                    <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: '12px', lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
                      Check your email at <span style={{ color: 'rgba(255,255,255,0.70)' }}>{resetEmail}</span>.<br />Click the link to set a new password.
                    </p>
                  </div>
                ) : (
                  <>
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '20px', color: '#fff', letterSpacing: '0.04em', marginBottom: '4px' }}>
                      Reset Password
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.33)', fontSize: '12px', fontFamily: "'Inter', sans-serif", marginBottom: '24px' }}>
                      We'll send a reset link to your email.
                    </p>
                    <form onSubmit={handleReset}>
                      <div style={{ marginBottom: '20px' }}>
                        <FieldLabel>Email address</FieldLabel>
                        <input
                          className="lm-input"
                          type="email"
                          value={resetEmail}
                          onChange={e => setResetEmail(e.target.value)}
                          placeholder="you@lesmills.com"
                          autoFocus
                        />
                        {resetError && <FieldError msg={resetError} />}
                      </div>
                      <button
                        type="submit"
                        disabled={resetSending || !resetEmail}
                        className="lm-btn-primary"
                      >
                        {resetSending && <Loader2 className="lm-spinner" />}
                        {resetSending ? 'Sending…' : 'Send Reset Link'}
                      </button>
                    </form>
                  </>
                )}
              </Card>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Main sign-in screen ─────────────────────────────────────────────
  return (
    <>
      <style>{STYLES}</style>
      <div style={screen}>
        <Background />
        <div style={inner}>
          <LMWordmark />

          <div className="lm-animate" style={{ animationDelay: '80ms' }}>
            <Card>
              <div style={{ marginBottom: '28px' }}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '22px', color: '#fff', letterSpacing: '0.04em' }}>
                  Sign In
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <div className="lm-animate" style={{ animationDelay: '160ms', marginBottom: '16px' }}>
                  <FieldLabel>Email</FieldLabel>
                  <input
                    className="lm-input"
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@lesmills.com"
                    {...register('email')}
                  />
                  <FieldError msg={errors.email?.message} />
                </div>

                {/* Password */}
                <div className="lm-animate" style={{ animationDelay: '210ms' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
                    <FieldLabel>Password</FieldLabel>
                    <button
                      type="button"
                      onClick={() => setShowForgot(true)}
                      className="lm-btn-ghost"
                      style={{ fontSize: '11px', marginBottom: '1px' }}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <input
                    className="lm-input"
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    {...register('password')}
                  />
                  <FieldError msg={errors.password?.message} />
                </div>

                {/* Server error */}
                {error && (
                  <div style={{
                    background: 'rgba(255,98,62,0.08)', border: '1px solid rgba(255,98,62,0.22)',
                    borderRadius: '8px', padding: '10px 14px', marginTop: '16px',
                  }}>
                    <p style={{ color: '#FF623E', fontSize: '12px', fontFamily: "'Inter', sans-serif" }}>{error}</p>
                  </div>
                )}

                {/* Submit */}
                <div className="lm-animate" style={{ animationDelay: '270ms', marginTop: '24px' }}>
                  <button type="submit" disabled={isSubmitting} className="lm-btn-primary">
                    {isSubmitting && <Loader2 className="lm-spinner" />}
                    {isSubmitting ? 'Signing in…' : 'Sign In'}
                  </button>
                </div>
              </form>
            </Card>
          </div>

          {/* Sign up prompt */}
          <p className="lm-animate" style={{
            animationDelay: '340ms',
            textAlign: 'center', marginTop: '22px',
            color: 'rgba(255,255,255,0.25)', fontSize: '12px', fontFamily: "'Inter', sans-serif",
          }}>
            New to Club Coach?{' '}
            <button
              type="button"
              onClick={() => setShowSignUp(true)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                color: 'rgba(255,255,255,0.55)', fontSize: '12px', fontFamily: "'Inter', sans-serif",
                textDecoration: 'underline', textUnderlineOffset: '3px', transition: 'color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

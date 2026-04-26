import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, resetPasswordEmail } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SignUp from './SignUp';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type FormValues = z.infer<typeof schema>;

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

  if (showForgot) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl uppercase tracking-widest">LM Club Coach</CardTitle>
            <p className="text-sm text-muted-foreground">Reset your password</p>
          </CardHeader>
          <CardContent>
            {resetSent ? (
              <div className="text-center space-y-4">
                <p className="text-sm text-foreground">Check your email — we've sent a reset link to <strong>{resetEmail}</strong>.</p>
                <p className="text-xs text-muted-foreground">Click the link in the email to set a new password. You can then sign in as normal.</p>
                <Button variant="outline" className="w-full" onClick={() => { setShowForgot(false); setResetSent(false); }}>
                  Back to Sign In
                </Button>
              </div>
            ) : (
              <form onSubmit={handleReset} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="reset-email">Email address</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    value={resetEmail}
                    onChange={e => setResetEmail(e.target.value)}
                    placeholder="you@lesmills.com"
                    autoFocus
                  />
                </div>
                {resetError && <p className="text-sm text-destructive">{resetError}</p>}
                <Button type="submit" className="w-full" disabled={resetSending || !resetEmail}>
                  {resetSending ? 'Sending…' : 'Send Reset Link'}
                </Button>
                <button type="button" onClick={() => setShowForgot(false)} className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Back to Sign In
                </button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl uppercase tracking-widest">LM Club Coach</CardTitle>
          <p className="text-sm text-muted-foreground">Sign in to your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" {...register('email')} />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="password">Password</Label>
                <button type="button" onClick={() => setShowForgot(true)} className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors">
                  Forgot password?
                </button>
              </div>
              <Input id="password" type="password" autoComplete="current-password" {...register('password')} />
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </Button>
            <button
              type="button"
              onClick={() => setShowSignUp(true)}
              className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors pt-1"
            >
              New to Club Coach? <span className="font-semibold underline underline-offset-2">Create an account</span>
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

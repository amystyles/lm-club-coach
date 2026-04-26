import { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Check, RefreshCw, Eye, EyeOff } from 'lucide-react';

const REGIONS = ['Northeast', 'Southeast', 'Midwest', 'Southwest', 'West', 'Northwest', 'International'];

const schema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Enter a valid email'),
  role: z.enum(['Club Coach', 'GFM']),
  clubName: z.string().min(2, 'Required'),
  region: z.string().min(1, 'Required'),
  useCustomPassword: z.boolean(),
  customPassword: z.string().optional(),
}).refine(d => !d.useCustomPassword || (d.customPassword && d.customPassword.length >= 8), {
  message: 'Password must be at least 8 characters',
  path: ['customPassword'],
});

type FormValues = z.infer<typeof schema>;

function generatePassword(): string {
  const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lower = 'abcdefghjkmnpqrstuvwxyz';
  const digits = '23456789';
  const symbols = '!@#$%&*';
  const all = upper + lower + digits + symbols;
  const rand = (set: string) => set[Math.floor(Math.random() * set.length)];
  const core = Array.from({ length: 10 }, () => rand(all)).join('');
  // Guarantee at least one of each category
  return (rand(upper) + rand(lower) + rand(digits) + rand(symbols) + core)
    .split('').sort(() => Math.random() - 0.5).join('').slice(0, 14);
}

interface Props {
  onBack: () => void;
}

export default function SignUp({ onBack }: Props) {
  const [password, setPassword] = useState(generatePassword);
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, control, watch, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: 'Club Coach',
      useCustomPassword: false,
    },
  });

  const useCustomPassword = watch('useCustomPassword');
  const firstName = watch('firstName');
  const lastName = watch('lastName');

  const initials = [firstName?.[0], lastName?.[0]].filter(Boolean).join('').toUpperCase() || '?';

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  async function onSubmit(values: FormValues) {
    setError(null);
    const finalPassword = values.useCustomPassword ? values.customPassword! : password;
    const fullName = `${values.firstName} ${values.lastName}`;

    try {
      const { session } = await signUp(values.email, finalPassword, {
        name: fullName,
        initials,
        title: values.role,
      });

      // If session exists (email confirm disabled), create club + membership
      if (session) {
        const { data: club, error: clubErr } = await supabase
          .from('clubs')
          .insert({
            name: values.clubName,
            region: values.region,
            gfm_name: values.role === 'GFM' ? fullName : '',
          })
          .select('id')
          .single();

        if (!clubErr && club) {
          await supabase.from('user_clubs').insert({
            user_id: session.user.id,
            club_id: club.id,
          });
        }
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong. Please try again.');
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(160deg, #060606 0%, #0c0c0c 50%, #091409 100%)' }}>
        <div className="w-full max-w-sm text-center px-6">
          <div className="w-14 h-14 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#00FF63' }}>
            <Check className="w-7 h-7 text-black" />
          </div>
          <h2 className="text-white font-display font-bold text-2xl mb-2">Account created</h2>
          <p className="text-white/50 text-sm mb-8">Check your email to confirm your account, then sign in.</p>
          <button
            onClick={onBack}
            className="w-full h-11 rounded-full text-sm font-bold transition-colors"
            style={{ backgroundColor: '#00FF63', color: '#0A0A0A' }}
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ background: 'linear-gradient(160deg, #060606 0%, #0c0c0c 50%, #091409 100%)' }}>
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-lm-green/70 text-[10px] font-bold tracking-[0.4em] uppercase mb-2">Les Mills</p>
          <h1 className="text-white font-display font-bold text-3xl tracking-widest uppercase mb-1">Club Coach</h1>
          <p className="text-white/40 text-sm">Create your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Personal Details */}
          <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="px-5 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">Personal Details</p>
            </div>
            <div className="px-5 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-white/60 text-xs mb-1.5 block">First Name</Label>
                  <Input
                    {...register('firstName')}
                    placeholder="Amy"
                    className="bg-white/6 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-lm-green/40 focus-visible:border-lm-green/50 h-10"
                  />
                  {errors.firstName && <p className="text-xs text-red-400 mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <Label className="text-white/60 text-xs mb-1.5 block">Last Name</Label>
                  <Input
                    {...register('lastName')}
                    placeholder="Styles"
                    className="bg-white/6 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-lm-green/40 focus-visible:border-lm-green/50 h-10"
                  />
                  {errors.lastName && <p className="text-xs text-red-400 mt-1">{errors.lastName.message}</p>}
                </div>
              </div>
              <div>
                <Label className="text-white/60 text-xs mb-1.5 block">Email</Label>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="you@lesmills.com"
                  className="bg-white/6 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-lm-green/40 focus-visible:border-lm-green/50 h-10"
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
              </div>

              {/* Role toggle */}
              <div>
                <Label className="text-white/60 text-xs mb-1.5 block">Role</Label>
                <Controller
                  control={control}
                  name="role"
                  render={({ field }) => (
                    <div className="grid grid-cols-2 gap-2">
                      {(['Club Coach', 'GFM'] as const).map(r => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => field.onChange(r)}
                          className="h-10 rounded-lg text-sm font-semibold transition-all border"
                          style={field.value === r
                            ? { backgroundColor: '#00FF63', color: '#0A0A0A', borderColor: '#00FF63' }
                            : { backgroundColor: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.1)' }
                          }
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Club Details */}
          <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="px-5 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">Club Details</p>
            </div>
            <div className="px-5 py-5 space-y-4">
              <div>
                <Label className="text-white/60 text-xs mb-1.5 block">Club Name</Label>
                <Input
                  {...register('clubName')}
                  placeholder="e.g. Midtown Fitness Club"
                  className="bg-white/6 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-lm-green/40 focus-visible:border-lm-green/50 h-10"
                />
                {errors.clubName && <p className="text-xs text-red-400 mt-1">{errors.clubName.message}</p>}
              </div>
              <div>
                <Label className="text-white/60 text-xs mb-1.5 block">Region</Label>
                <Input
                  {...register('region')}
                  list="regions-list"
                  placeholder="e.g. Northeast"
                  autoComplete="off"
                  className="bg-white/6 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-lm-green/40 focus-visible:border-lm-green/50 h-10"
                />
                <datalist id="regions-list">
                  {REGIONS.map(r => <option key={r} value={r} />)}
                </datalist>
                {errors.region && <p className="text-xs text-red-400 mt-1">{errors.region.message}</p>}
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="px-5 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">Password</p>
            </div>
            <div className="px-5 py-5 space-y-3">
              {!useCustomPassword && (
                <div>
                  <Label className="text-white/60 text-xs mb-1.5 block">Generated password — copy this before continuing</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-10 rounded-lg px-3 flex items-center font-mono text-sm text-white/90 tracking-wider"
                      style={{ background: 'rgba(0,255,99,0.06)', border: '1px solid rgba(0,255,99,0.2)' }}>
                      {showPassword ? password : '•'.repeat(password.length)}
                    </div>
                    <button type="button" onClick={() => setShowPassword(v => !v)}
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-colors"
                      style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button type="button" onClick={handleCopy}
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                      style={{ background: copied ? '#00FF63' : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: copied ? '#0A0A0A' : 'rgba(255,255,255,0.5)' }}>
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button type="button" onClick={() => setPassword(generatePassword())}
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-colors"
                      style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <Controller
                control={control}
                name="useCustomPassword"
                render={({ field }) => (
                  <button
                    type="button"
                    onClick={() => field.onChange(!field.value)}
                    className="flex items-center gap-2 text-xs text-white/40 hover:text-white/60 transition-colors"
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${field.value ? 'border-lm-green bg-lm-green' : 'border-white/20'}`}>
                      {field.value && <Check className="w-2.5 h-2.5 text-black" />}
                    </div>
                    Set my own password
                  </button>
                )}
              />

              {useCustomPassword && (
                <div>
                  <Input
                    {...register('customPassword')}
                    type="password"
                    placeholder="Min. 8 characters"
                    className="bg-white/6 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-lm-green/40 focus-visible:border-lm-green/50 h-10"
                  />
                  {errors.customPassword && <p className="text-xs text-red-400 mt-1">{errors.customPassword.message}</p>}
                </div>
              )}
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-full text-sm font-bold transition-all disabled:opacity-60"
            style={{ backgroundColor: '#00FF63', color: '#0A0A0A' }}
          >
            {isSubmitting ? 'Creating account…' : 'Create Account'}
          </button>

          <button type="button" onClick={onBack} className="w-full text-center text-sm text-white/30 hover:text-white/60 transition-colors py-1">
            Already have an account? Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

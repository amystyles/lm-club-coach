import { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserAsAdmin } from '@/lib/admin';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Check, RefreshCw, Eye, EyeOff } from 'lucide-react';

const REGIONS = ['Northeast', 'Southeast', 'Midwest', 'Southwest', 'West', 'Northwest', 'International'];

const schema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Enter a valid email'),
  role: z.enum(['Club Coach', 'GFM', 'TAP Coach']),
  clubName: z.string().min(2, 'Required'),
  region: z.string().min(1, 'Required'),
  useCustomPassword: z.boolean(),
  customPassword: z.string().optional(),
}).refine(d => !d.useCustomPassword || (d.customPassword && d.customPassword.length >= 8), {
  message: 'Password must be at least 8 characters',
  path: ['customPassword'],
}).refine(d => d.role === 'TAP Coach' || d.clubName.length >= 2, {
  message: 'Required',
  path: ['clubName'],
}).refine(d => d.role === 'TAP Coach' || d.region.length >= 1, {
  message: 'Required',
  path: ['region'],
});

type FormValues = z.infer<typeof schema>;

const LABEL = 'text-[10px] font-bold uppercase tracking-[0.15em] text-lm-ink-muted mb-1.5 block';
const SECTION_HEADER = 'text-[10px] font-bold uppercase tracking-[0.25em] text-lm-ink-muted';
const INPUT = 'h-10 text-sm bg-white border-[#ddd] text-lm-dark placeholder:text-[#aaa] focus-visible:ring-lm-green/40 focus-visible:border-lm-green';
const CARD = 'rounded-2xl border border-[#e5e5e5] bg-white shadow-sm overflow-hidden';

function generatePassword(): string {
  const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lower = 'abcdefghjkmnpqrstuvwxyz';
  const digits = '23456789';
  const symbols = '!@#$%&*';
  const all = upper + lower + digits + symbols;
  const rand = (set: string) => set[Math.floor(Math.random() * set.length)];
  const core = Array.from({ length: 10 }, () => rand(all)).join('');
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
      await createUserAsAdmin({
        email: values.email,
        password: finalPassword,
        name: fullName,
        initials,
        title: values.role === 'TAP Coach' ? 'Club Coach' : values.role,
        appRole: values.role === 'TAP Coach' ? 'tap_coach' : values.role === 'GFM' ? 'gfm' : 'club_coach',
        clubName: values.clubName,
        region: values.region,
        skipClub: values.role === 'TAP Coach',
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong. Please try again.');
    }
  }

  if (success) {
    return (
      <div className="max-w-sm mx-auto text-center py-16">
        <div className="w-14 h-14 rounded-full mx-auto mb-6 flex items-center justify-center bg-lm-green">
          <Check className="w-7 h-7 text-lm-dark" />
        </div>
        <h2 className="font-display font-bold text-2xl text-lm-dark mb-2">Account created</h2>
        <p className="text-lm-ink-muted text-sm mb-8">
          Account is ready. Share the credentials with the coach so they can sign in.
        </p>
        <button
          onClick={onBack}
          className="w-full h-11 rounded-full text-sm font-bold transition-colors bg-lm-green text-lm-dark hover:opacity-90"
        >
          Back to Roster
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-2">
      <p className="text-sm text-lm-ink-muted mb-6">
        Fill in the coach&apos;s details below. A password will be generated automatically — copy it before submitting.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Personal Details */}
        <div className={CARD}>
          <div className="px-5 py-3 border-b border-[#f0f0f0] bg-lm-subtle">
            <p className={SECTION_HEADER}>Personal Details</p>
          </div>
          <div className="px-5 py-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className={LABEL}>First Name</Label>
                <Input
                  {...register('firstName')}
                  placeholder="Amy"
                  className={INPUT}
                />
                {errors.firstName && <p className="text-xs text-lm-red mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <Label className={LABEL}>Last Name</Label>
                <Input
                  {...register('lastName')}
                  placeholder="Styles"
                  className={INPUT}
                />
                {errors.lastName && <p className="text-xs text-lm-red mt-1">{errors.lastName.message}</p>}
              </div>
            </div>
            <div>
              <Label className={LABEL}>Email</Label>
              <Input
                {...register('email')}
                type="email"
                placeholder="you@lesmills.com"
                className={INPUT}
              />
              {errors.email && <p className="text-xs text-lm-red mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <Label className={LABEL}>Role</Label>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <div className="grid grid-cols-3 gap-2">
                    {(['Club Coach', 'GFM', 'TAP Coach'] as const).map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => field.onChange(r)}
                        className={`h-10 rounded-lg text-sm font-semibold transition-all border ${
                          field.value === r
                            ? 'bg-lm-green text-lm-dark border-lm-green'
                            : 'bg-white text-lm-ink-mid border-[#ddd] hover:border-[#bbb] hover:bg-lm-subtle'
                        }`}
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
        <div className={CARD}>
          <div className="px-5 py-3 border-b border-[#f0f0f0] bg-lm-subtle">
            <p className={SECTION_HEADER}>Club Details</p>
          </div>
          <div className="px-5 py-5 space-y-4">
            <div>
              <Label className={LABEL}>Club Name</Label>
              <Input
                {...register('clubName')}
                placeholder="e.g. Midtown Fitness Club"
                className={INPUT}
              />
              {errors.clubName && <p className="text-xs text-lm-red mt-1">{errors.clubName.message}</p>}
            </div>
            <div>
              <Label className={LABEL}>Region</Label>
              <Input
                {...register('region')}
                list="regions-list"
                placeholder="e.g. Northeast"
                autoComplete="off"
                className={INPUT}
              />
              <datalist id="regions-list">
                {REGIONS.map(r => <option key={r} value={r} />)}
              </datalist>
              {errors.region && <p className="text-xs text-lm-red mt-1">{errors.region.message}</p>}
            </div>
          </div>
        </div>

        {/* Password */}
        <div className={CARD}>
          <div className="px-5 py-3 border-b border-[#f0f0f0] bg-lm-subtle">
            <p className={SECTION_HEADER}>Password</p>
          </div>
          <div className="px-5 py-5 space-y-3">
            {!useCustomPassword && (
              <div>
                <Label className={LABEL}>Generated password — copy this before continuing</Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-10 rounded-lg px-3 flex items-center font-mono text-sm text-lm-dark tracking-wider bg-lm-green/10 border border-lm-green/30">
                    {showPassword ? password : '•'.repeat(password.length)}
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lm-ink-muted hover:text-lm-dark border border-[#ddd] hover:bg-lm-subtle transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors border ${
                      copied
                        ? 'bg-lm-green border-lm-green text-lm-dark'
                        : 'border-[#ddd] text-lm-ink-muted hover:text-lm-dark hover:bg-lm-subtle'
                    }`}
                    aria-label="Copy password"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPassword(generatePassword())}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lm-ink-muted hover:text-lm-dark border border-[#ddd] hover:bg-lm-subtle transition-colors"
                    aria-label="Generate new password"
                  >
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
                  className="flex items-center gap-2 text-xs text-lm-ink-muted hover:text-lm-ink-mid transition-colors"
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    field.value ? 'border-lm-green bg-lm-green' : 'border-[#ccc] bg-white'
                  }`}>
                    {field.value && <Check className="w-2.5 h-2.5 text-lm-dark" />}
                  </div>
                  Set my own password
                </button>
              )}
            />

            {useCustomPassword && (
              <div>
                <Label className={LABEL}>Custom Password</Label>
                <Input
                  {...register('customPassword')}
                  type="password"
                  placeholder="Min. 8 characters"
                  className={INPUT}
                />
                {errors.customPassword && <p className="text-xs text-lm-red mt-1">{errors.customPassword.message}</p>}
              </div>
            )}
          </div>
        </div>

        {error && (
          <p className="text-sm text-lm-red bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-full text-sm font-bold transition-all disabled:opacity-60 bg-lm-green text-lm-dark hover:opacity-90"
        >
          {isSubmitting ? 'Creating account…' : 'Create Account'}
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full text-center text-sm text-lm-ink-muted hover:text-lm-ink-mid transition-colors py-1"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

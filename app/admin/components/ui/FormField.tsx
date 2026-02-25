// Server Component — no 'use client' needed (pure presenter)

export default function FormField({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-baseline gap-2 text-xs font-black uppercase tracking-[0.15em] text-white/50">
        {label}
        {hint && (
          <span className="normal-case tracking-normal font-normal text-white/25">
            — {hint}
          </span>
        )}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-400/80 pt-0.5 flex items-center gap-1">
          <span className="text-red-400">✕</span>
          {error}
        </p>
      )}
    </div>
  );
}

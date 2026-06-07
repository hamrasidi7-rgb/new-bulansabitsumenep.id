import { loginAction } from './actions'

export const metadata = { title: 'Login Admin — Bulan Sabit Sumenep' }

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams
  const hasError = !!params?.error

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
            Bulan Sabit Sumenep
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[var(--foreground)]">Admin Panel</h1>
        </div>

        <form action={loginAction} className="space-y-4">
          <div>
            <label className="label-field">Password</label>
            <input
              type="password"
              name="password"
              required
              autoFocus
              placeholder="Masukkan password admin"
              className="input-field"
            />
          </div>

          {hasError && (
            <p className="rounded-lg bg-red-50 dark:bg-red-950/20 px-3 py-2 text-sm text-red-700">
              Password salah. Coba lagi.
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-[var(--accent-red)] px-4 py-3
              text-sm font-semibold text-white transition hover:opacity-90"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  )
}

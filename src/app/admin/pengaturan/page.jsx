'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

const GROUPS = [
  {
    label: 'Kontak',
    fields: [
      { key: 'alamat',        label: 'Alamat Kantor', type: 'text' },
      { key: 'email_redaksi', label: 'Email Redaksi', type: 'email' },
      { key: 'email_iklan',   label: 'Email Iklan',   type: 'email' },
      { key: 'whatsapp',      label: 'Nomor WhatsApp (format: +628...)', type: 'tel' },
    ],
  },
  {
    label: 'Media Sosial',
    fields: [
      { key: 'facebook_url',  label: 'Facebook',      type: 'url' },
      { key: 'instagram_url', label: 'Instagram',     type: 'url' },
      { key: 'twitter_url',   label: 'X (Twitter)',   type: 'url' },
      { key: 'youtube_url',   label: 'YouTube',       type: 'url' },
      { key: 'tiktok_url',    label: 'TikTok',        type: 'url' },
    ],
  },
]

export default function AdminPengaturanPage() {
  const [values, setValues] = useState({})
  const [saving, setSaving] = useState(false)
  const [ok, setOk]         = useState(false)
  const [error, setError]   = useState('')

  useEffect(() => {
    supabase.from('site_settings').select('key,value').then(({ data }) => {
      if (data) setValues(Object.fromEntries(data.map((r) => [r.key, r.value ?? ''])))
    })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setError('')
    const rows = Object.entries(values).map(([key, value]) => ({ key, value }))
    const { error: err } = await supabase.from('site_settings').upsert(rows)
    setSaving(false)
    if (err) { setError(err.message); return }
    setOk(true)
    setTimeout(() => setOk(false), 2500)
  }

  return (
    <div>
      <h1 className="mb-1 text-xl font-bold text-[var(--foreground)]">Pengaturan Website</h1>
      <p className="mb-8 text-sm text-[var(--muted)]">Informasi kontak dan tautan media sosial</p>

      <div className="space-y-8">
        {GROUPS.map((group) => (
          <div key={group.label}>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
              {group.label}
            </h2>
            <div className="space-y-3">
              {group.fields.map(({ key, label, type }) => (
                <div key={key}>
                  <label className="label-field">{label}</label>
                  <input
                    type={type}
                    value={values[key] ?? ''}
                    onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                    className="input-field"
                    placeholder={type === 'url' ? 'https://...' : ''}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <div className="mt-8 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl bg-[var(--accent-red)] px-5 py-2.5 text-sm font-semibold
            text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
        </button>
        {ok && <span className="text-sm font-medium text-green-600">Tersimpan!</span>}
      </div>
    </div>
  )
}

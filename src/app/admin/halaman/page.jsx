'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

// ── Daftar halaman yang bisa diedit ────────────────────────────────────────
const PAGES = [
  { slug: 'tentang-kami',       label: 'Tentang Kami',              type: 'tentang' },
  { slug: 'redaksi',            label: 'Manajemen & Dewan Redaksi', type: 'redaksi' },
  { slug: 'faq',                label: 'FAQ',                       type: 'faq' },
  { slug: 'periklanan',         label: 'Periklanan & Kerjasama',    type: 'periklanan' },
  { slug: 'pedoman-media-siber',label: 'Pedoman Media Siber',       type: 'sections' },
  { slug: 'kebijakan-layanan',  label: 'Kebijakan Layanan',         type: 'sections' },
  { slug: 'privasi',            label: 'Privasi Pengguna',          type: 'sections' },
]

// ── Helper simpan ke DB ────────────────────────────────────────────────────
async function savePage(slug, content) {
  return supabase.from('site_pages').upsert({
    slug,
    content,
    updated_at: new Date().toISOString(),
  })
}

// ── Tombol simpan + feedback ───────────────────────────────────────────────
function SaveBar({ onSave, saving, ok }) {
  return (
    <div className="mt-6 flex items-center gap-3">
      <button
        onClick={onSave}
        disabled={saving}
        className="rounded-xl bg-[var(--accent-red)] px-5 py-2.5 text-sm font-semibold
          text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {saving ? 'Menyimpan...' : 'Simpan'}
      </button>
      {ok && <span className="text-sm font-medium text-green-600">Tersimpan!</span>}
    </div>
  )
}

// ── Editor: halaman teks berseksi (Pedoman, Kebijakan, Privasi) ────────────
function SectionsEditor({ slug, initial }) {
  const [sections, setSections] = useState(initial?.sections ?? [{ heading: '', body: '' }])
  const [saving, setSaving] = useState(false)
  const [ok, setOk]         = useState(false)

  const update = (i, field, val) =>
    setSections((s) => s.map((sec, j) => (j === i ? { ...sec, [field]: val } : sec)))

  const handleSave = async () => {
    setSaving(true)
    await savePage(slug, { sections })
    setSaving(false); setOk(true); setTimeout(() => setOk(false), 2500)
  }

  return (
    <div className="space-y-4">
      {sections.map((sec, i) => (
        <div key={i} className="space-y-2 rounded-xl border border-[var(--border)] p-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Judul seksi (misal: 1. Keberimbangan)"
              value={sec.heading}
              onChange={(e) => update(i, 'heading', e.target.value)}
              className="input-field flex-1"
            />
            <button
              onClick={() => setSections((s) => s.filter((_, j) => j !== i))}
              className="shrink-0 text-sm text-red-500 hover:text-red-700"
            >
              Hapus
            </button>
          </div>
          <textarea
            rows={4}
            placeholder="Isi paragraf..."
            value={sec.body}
            onChange={(e) => update(i, 'body', e.target.value)}
            className="input-field resize-y"
          />
        </div>
      ))}
      <button
        onClick={() => setSections((s) => [...s, { heading: '', body: '' }])}
        className="text-sm font-medium text-[var(--accent-red)]"
      >
        + Tambah Seksi
      </button>
      <SaveBar onSave={handleSave} saving={saving} ok={ok} />
    </div>
  )
}

// ── Editor: Tentang Kami ───────────────────────────────────────────────────
function TentangKamiEditor({ initial }) {
  const [intro,  setIntro]  = useState((initial?.intro ?? ['']).join('\n\n'))
  const [visi,   setVisi]   = useState(initial?.visi ?? '')
  const [misi,   setMisi]   = useState((initial?.misi ?? ['']).join('\n'))
  const [alamat, setAlamat] = useState(initial?.alamat ?? '')
  const [email,  setEmail]  = useState(initial?.email ?? '')
  const [saving, setSaving] = useState(false)
  const [ok, setOk]         = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await savePage('tentang-kami', {
      intro:  intro.split('\n\n').map((s) => s.trim()).filter(Boolean),
      visi:   visi.trim(),
      misi:   misi.split('\n').map((s) => s.trim()).filter(Boolean),
      alamat: alamat.trim(),
      email:  email.trim(),
    })
    setSaving(false); setOk(true); setTimeout(() => setOk(false), 2500)
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="label-field">
          Paragraf Pengenalan{' '}
          <span className="font-normal text-[var(--muted)]">(pisahkan paragraf dengan baris kosong)</span>
        </label>
        <textarea rows={6} value={intro} onChange={(e) => setIntro(e.target.value)}
          className="input-field resize-y" />
      </div>
      <div>
        <label className="label-field">Visi</label>
        <textarea rows={2} value={visi} onChange={(e) => setVisi(e.target.value)}
          className="input-field resize-none" />
      </div>
      <div>
        <label className="label-field">
          Misi{' '}
          <span className="font-normal text-[var(--muted)]">(satu poin per baris)</span>
        </label>
        <textarea rows={5} value={misi} onChange={(e) => setMisi(e.target.value)}
          className="input-field resize-y"
          placeholder={'Menyebarkan informasi kesehatan yang akurat\nMeliput aksi kemanusiaan PMI'} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-field">Alamat</label>
          <input type="text" value={alamat} onChange={(e) => setAlamat(e.target.value)}
            className="input-field" />
        </div>
        <div>
          <label className="label-field">Email Redaksi</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="input-field" />
        </div>
      </div>
      <SaveBar onSave={handleSave} saving={saving} ok={ok} />
    </div>
  )
}

// ── Editor: Dewan Redaksi ──────────────────────────────────────────────────
function RedaksiEditor({ initial }) {
  const [members, setMembers] = useState(
    initial?.members ?? [{ jabatan: '', nama: '' }]
  )
  const [alamat, setAlamat] = useState(initial?.alamat ?? '')
  const [email,  setEmail]  = useState(initial?.email ?? '')
  const [saving, setSaving] = useState(false)
  const [ok, setOk]         = useState(false)

  const update = (i, field, val) =>
    setMembers((s) => s.map((m, j) => (j === i ? { ...m, [field]: val } : m)))

  const handleSave = async () => {
    setSaving(true)
    await savePage('redaksi', { members, alamat, email })
    setSaving(false); setOk(true); setTimeout(() => setOk(false), 2500)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {members.map((m, i) => (
          <div key={i} className="flex gap-2">
            <input type="text" placeholder="Jabatan" value={m.jabatan}
              onChange={(e) => update(i, 'jabatan', e.target.value)}
              className="input-field w-44 shrink-0" />
            <input type="text" placeholder="Nama / Keterangan" value={m.nama}
              onChange={(e) => update(i, 'nama', e.target.value)}
              className="input-field flex-1" />
            <button
              onClick={() => setMembers((s) => s.filter((_, j) => j !== i))}
              className="shrink-0 pt-1 text-sm text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => setMembers((s) => [...s, { jabatan: '', nama: '' }])}
        className="text-sm font-medium text-[var(--accent-red)]"
      >
        + Tambah Anggota
      </button>

      <hr className="border-[var(--border)]" />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-field">Alamat Redaksi</label>
          <input type="text" value={alamat} onChange={(e) => setAlamat(e.target.value)}
            className="input-field" />
        </div>
        <div>
          <label className="label-field">Email Redaksi</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="input-field" />
        </div>
      </div>
      <SaveBar onSave={handleSave} saving={saving} ok={ok} />
    </div>
  )
}

// ── Editor: FAQ ────────────────────────────────────────────────────────────
function FaqEditor({ initial }) {
  const [items,  setItems]  = useState(initial?.items ?? [{ q: '', a: '' }])
  const [saving, setSaving] = useState(false)
  const [ok, setOk]         = useState(false)

  const update = (i, field, val) =>
    setItems((s) => s.map((item, j) => (j === i ? { ...item, [field]: val } : item)))

  const handleSave = async () => {
    setSaving(true)
    await savePage('faq', { items })
    setSaving(false); setOk(true); setTimeout(() => setOk(false), 2500)
  }

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="space-y-2 rounded-xl border border-[var(--border)] p-4">
          <div className="flex gap-2">
            <span className="mt-2.5 w-5 shrink-0 text-center text-xs font-bold text-[var(--muted)]">Q</span>
            <input type="text" placeholder="Pertanyaan..." value={item.q}
              onChange={(e) => update(i, 'q', e.target.value)}
              className="input-field flex-1" />
            <button
              onClick={() => setItems((s) => s.filter((_, j) => j !== i))}
              className="shrink-0 text-sm text-red-500 hover:text-red-700"
            >
              Hapus
            </button>
          </div>
          <div className="flex gap-2">
            <span className="mt-2.5 w-5 shrink-0 text-center text-xs font-bold text-[var(--muted)]">A</span>
            <textarea rows={3} placeholder="Jawaban..." value={item.a}
              onChange={(e) => update(i, 'a', e.target.value)}
              className="input-field flex-1 resize-none" />
          </div>
        </div>
      ))}
      <button
        onClick={() => setItems((s) => [...s, { q: '', a: '' }])}
        className="text-sm font-medium text-[var(--accent-red)]"
      >
        + Tambah Pertanyaan
      </button>
      <SaveBar onSave={handleSave} saving={saving} ok={ok} />
    </div>
  )
}

// ── Editor: Periklanan ─────────────────────────────────────────────────────
function PeriklananEditor({ initial }) {
  const [email,    setEmail]    = useState(initial?.email ?? '')
  const [whatsapp, setWhatsapp] = useState(initial?.whatsapp ?? '')
  const [paket,    setPaket]    = useState(
    initial?.paket ?? [{ nama: '', ukuran: '', posisi: '', cocok: '' }]
  )
  const [saving, setSaving] = useState(false)
  const [ok, setOk]         = useState(false)

  const updatePaket = (i, field, val) =>
    setPaket((s) => s.map((p, j) => (j === i ? { ...p, [field]: val } : p)))

  const handleSave = async () => {
    setSaving(true)
    await savePage('periklanan', { email, whatsapp, paket })
    setSaving(false); setOk(true); setTimeout(() => setOk(false), 2500)
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-field">Email Iklan</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="input-field" placeholder="iklan@..." />
        </div>
        <div>
          <label className="label-field">WhatsApp</label>
          <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}
            className="input-field" placeholder="+628..." />
        </div>
      </div>

      <div>
        <p className="label-field mb-3">Paket Iklan</p>
        <div className="space-y-3">
          {paket.map((p, i) => (
            <div key={i} className="space-y-2 rounded-xl border border-[var(--border)] p-3">
              <div className="flex gap-2">
                <input type="text" placeholder="Nama paket" value={p.nama}
                  onChange={(e) => updatePaket(i, 'nama', e.target.value)}
                  className="input-field flex-1" />
                <input type="text" placeholder="Ukuran (728×90)" value={p.ukuran}
                  onChange={(e) => updatePaket(i, 'ukuran', e.target.value)}
                  className="input-field w-36 shrink-0" />
                <button
                  onClick={() => setPaket((s) => s.filter((_, j) => j !== i))}
                  className="shrink-0 text-sm text-red-500"
                >
                  ✕
                </button>
              </div>
              <input type="text" placeholder="Posisi di halaman..." value={p.posisi}
                onChange={(e) => updatePaket(i, 'posisi', e.target.value)}
                className="input-field" />
              <input type="text" placeholder="Cocok untuk..." value={p.cocok}
                onChange={(e) => updatePaket(i, 'cocok', e.target.value)}
                className="input-field" />
            </div>
          ))}
        </div>
        <button
          onClick={() => setPaket((s) => [...s, { nama: '', ukuran: '', posisi: '', cocok: '' }])}
          className="mt-2 text-sm font-medium text-[var(--accent-red)]"
        >
          + Tambah Paket
        </button>
      </div>

      <SaveBar onSave={handleSave} saving={saving} ok={ok} />
    </div>
  )
}

// ── Dispatcher: pilih editor berdasarkan type ──────────────────────────────
function PageEditor({ page, initial, onBack }) {
  const editorMap = {
    tentang:     <TentangKamiEditor initial={initial} />,
    redaksi:     <RedaksiEditor     initial={initial} />,
    faq:         <FaqEditor         initial={initial} />,
    periklanan:  <PeriklananEditor  initial={initial} />,
    sections:    <SectionsEditor    slug={page.slug} initial={initial} />,
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-6 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
      >
        ← Kembali ke daftar
      </button>
      <h1 className="mb-6 text-xl font-bold text-[var(--foreground)]">{page.label}</h1>
      {editorMap[page.type]}
    </div>
  )
}

// ── Halaman utama ──────────────────────────────────────────────────────────
export default function AdminHalamanPage() {
  const [selected, setSelected] = useState(null)
  const [loading,  setLoading]  = useState(false)

  const openPage = async (page) => {
    setLoading(true)
    const { data } = await supabase
      .from('site_pages')
      .select('content')
      .eq('slug', page.slug)
      .single()
    setSelected({ page, initial: data?.content ?? null })
    setLoading(false)
  }

  if (loading) return <p className="text-sm text-[var(--muted)]">Memuat...</p>

  if (selected) {
    return (
      <PageEditor
        page={selected.page}
        initial={selected.initial}
        onBack={() => setSelected(null)}
      />
    )
  }

  return (
    <div>
      <h1 className="mb-1 text-xl font-bold text-[var(--foreground)]">Halaman Footer</h1>
      <p className="mb-6 text-sm text-[var(--muted)]">
        Kelola konten halaman informasi yang tampil di website
      </p>
      <div className="divide-y divide-[var(--border)] rounded-xl border border-[var(--border)]">
        {PAGES.map((page) => (
          <button
            key={page.slug}
            onClick={() => openPage(page)}
            className="flex w-full items-center justify-between px-5 py-4 text-left
              hover:bg-[var(--card-bg)] transition"
          >
            <div>
              <p className="font-medium text-[var(--foreground)]">{page.label}</p>
              <p className="text-xs text-[var(--muted)]">/{page.slug}</p>
            </div>
            <span className="text-sm text-[var(--muted)]">Edit →</span>
          </button>
        ))}
      </div>
    </div>
  )
}

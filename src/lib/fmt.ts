// Indonesian month/day names — hardcoded so output is identical on server (Node.js)
// and browser regardless of ICU locale data availability (fixes React hydration #418)
const MONTHS = [
  'Januari','Februari','Maret','April','Mei','Juni',
  'Juli','Agustus','September','Oktober','November','Desember',
]
const WEEKDAYS = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu']

export function fmtDate(iso: string | null | undefined, withWeekday = false): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  const base = `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
  return withWeekday ? `${WEEKDAYS[d.getDay()]}, ${base}` : base
}

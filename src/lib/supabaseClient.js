import { createClient } from '@supabase/supabase-js'

// Variabel ini harus diisi di file .env.local:
//   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
//   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Catatan: jika env belum diisi, semua query akan gagal dengan auth error —
// tapi tidak akan crash saat build. Isi .env.local untuk mengaktifkan fitur data.
export const supabase = createClient(supabaseUrl, supabaseKey)

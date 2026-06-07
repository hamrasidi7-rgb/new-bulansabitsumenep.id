import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request) {
  try {
    const { slug } = await request.json()
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ ok: false }, { status: 400 })
    }
    await supabase.rpc('increment_article_view', { p_slug: slug })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

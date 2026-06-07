import { supabase } from './supabaseClient'

export async function getPageContent(slug) {
  const { data } = await supabase
    .from('site_pages')
    .select('content')
    .eq('slug', slug)
    .single()
  return data?.content ?? null
}

export async function getSiteSettings() {
  const { data } = await supabase
    .from('site_settings')
    .select('key,value')
    .order('sort_order')
  if (!data) return {}
  return Object.fromEntries(data.map(({ key, value }) => [key, value ?? '']))
}

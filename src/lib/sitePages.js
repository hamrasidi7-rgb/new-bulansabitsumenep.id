import { unstable_cache } from 'next/cache'
import { supabase } from './supabaseClient'

export const getPageContent = unstable_cache(
  async (slug) => {
    const { data } = await supabase
      .from('site_pages')
      .select('content')
      .eq('slug', slug)
      .single()
    return data?.content ?? null
  },
  ['site-page'],
  { revalidate: 3600 }
)

export const getSiteSettings = unstable_cache(
  async () => {
    const { data } = await supabase
      .from('site_settings')
      .select('key,value')
      .order('sort_order')
    if (!data) return {}
    return Object.fromEntries(data.map(({ key, value }) => [key, value ?? '']))
  },
  ['site-settings'],
  { revalidate: 300 }
)

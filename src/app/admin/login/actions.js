'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(formData) {
  const password = formData.get('password')

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    redirect('/admin/login?error=1')
  }

  const cookieStore = await cookies()
  cookieStore.set('bss_admin', process.env.ADMIN_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 hari
    path: '/',
  })

  redirect('/admin')
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('bss_admin')
  redirect('/admin/login')
}

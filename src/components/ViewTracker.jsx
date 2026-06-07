'use client'
import { useEffect } from 'react'

export default function ViewTracker({ slug }) {
  useEffect(() => {
    fetch('/api/view', {
      method: 'POST',
      body: JSON.stringify({ slug }),
      headers: { 'Content-Type': 'application/json' },
    }).catch(() => {})
  }, [slug])
  return null
}

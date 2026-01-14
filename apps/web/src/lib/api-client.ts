import { createClient } from '@/utils/supabase/client'

const getAuthToken = async () => {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session?.access_token
}

type FetchOptions = RequestInit & {
  headers?: Record<string, string>
}

export const apiClient = async (endpoint: string, options: FetchOptions = {}) => {
  const token = await getAuthToken()
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  
  const headers = new Headers(options.headers)
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
  })

  return response
}

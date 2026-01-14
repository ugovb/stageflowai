'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error("Login error:", error)
    // In a real app, returning the error to the UI is better than redirecting
    redirect('/login?error=invalid_credentials')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: signUpData, error } = await supabase.auth.signUp(data)

  if (error) {
    console.error("Signup error:", error)
    redirect('/auth/signup?error=' + encodeURIComponent(error.message))
  }

  // Check if session was created (Auto-login successful)
  if (signUpData.session) {
    revalidatePath('/', 'layout')
    redirect('/dashboard')
  } else {
    // If no session, it means email confirmation is required
    // Redirect to a specific page informing the user
    // For now, let's redirect to login with a message
    redirect('/login?message=check_email')
  }
}
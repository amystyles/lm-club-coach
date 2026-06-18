import { supabase } from './supabase'
import type { AppRole } from './roles'

export async function createUserAsAdmin(params: {
  email: string
  password: string
  name: string
  initials: string
  title: 'Club Coach' | 'GFM'
  appRole?: AppRole
  clubName: string
  region: string
  skipClub?: boolean
}) {
  const { data, error } = await supabase.functions.invoke('create-user', { body: params })
  if (error) throw error
  if (data?.error) throw new Error(data.error)
  return data
}

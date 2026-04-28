import { supabase } from './supabase'

export async function createUserAsAdmin(params: {
  email: string
  password: string
  name: string
  initials: string
  title: 'Club Coach' | 'GFM'
  clubName: string
  region: string
}) {
  const { data, error } = await supabase.functions.invoke('create-user', { body: params })
  if (error) throw error
  if (data?.error) throw new Error(data.error)
  return data
}

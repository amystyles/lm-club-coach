import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const authHeader = req.headers.get('Authorization')
  if (!authHeader) return new Response('Unauthorized', { status: 401, headers: corsHeaders })

  const callerClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  )

  const { data: { user }, error: authError } = await callerClient.auth.getUser()
  if (authError || !user) return new Response('Unauthorized', { status: 401, headers: corsHeaders })

  const adminEmail = Deno.env.get('ADMIN_EMAIL')
  if (!adminEmail || user.email !== adminEmail) {
    return new Response('Forbidden', { status: 403, headers: corsHeaders })
  }

  const adminClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const { email, password, name, initials, title, appRole, clubName, region, skipClub } = await req.json()
  const resolvedAppRole = appRole ?? (title === 'GFM' ? 'gfm' : 'club_coach')

  const { data: userData, error: userError } = await adminClient.auth.admin.createUser({
    email,
    password,
    user_metadata: { name, initials, title, app_role: resolvedAppRole },
    email_confirm: true,
  })

  if (userError || !userData.user) {
    return new Response(
      JSON.stringify({ error: userError?.message ?? 'Failed to create user' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  await adminClient
    .from('profiles')
    .update({ app_role: resolvedAppRole })
    .eq('id', userData.user.id)

  if (!skipClub && clubName && region) {
    const { data: club, error: clubError } = await adminClient
      .from('clubs')
      .insert({
        name: clubName,
        region,
        deployment_path: 'C',
        gfm_name: title === 'GFM' ? name : '',
      })
      .select('id')
      .single()

    if (!clubError && club) {
      await adminClient.from('user_clubs').insert({
        user_id: userData.user.id,
        club_id: club.id,
      })
    }
  }

  return new Response(
    JSON.stringify({ success: true, userId: userData.user.id }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
})

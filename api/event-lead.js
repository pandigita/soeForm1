import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { name, email, participationType, other } = req.body;
  await supabase.from('event_leads').insert([
    { name, email, participation_type: participationType, other: other || null }
  ]);
  res.status(200).json({ ok: true });
} 
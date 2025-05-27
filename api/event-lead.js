import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Allowed origins for CORS
const allowedOrigins = [
  'https://hubhoian.com',
  'https://www.hubhoian.com',
  'https://entrepreneursummer.com',
  'https://www.entrepreneursummer.com'
];

// Function to get current time in Vietnam timezone (UTC+7)
function getVietnamTime() {
  const now = new Date();
  // Get Vietnam time (UTC+7)
  const vietnamTime = new Date(now.getTime() + (7 * 60 * 60 * 1000));
  
  // Format as YYYY-MM-DD HH:mm:ss.sss+07
  const year = vietnamTime.getUTCFullYear();
  const month = String(vietnamTime.getUTCMonth() + 1).padStart(2, '0');
  const day = String(vietnamTime.getUTCDate()).padStart(2, '0');
  const hours = String(vietnamTime.getUTCHours()).padStart(2, '0');
  const minutes = String(vietnamTime.getUTCMinutes()).padStart(2, '0');
  const seconds = String(vietnamTime.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(vietnamTime.getUTCMilliseconds()).padStart(3, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+07:00`;
}

export default async function handler(req, res) {
  // Get the origin from the request
  const origin = req.headers.origin;
  
  // Check if origin is in allowed list
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }
  
  // Only allow POST method for actual requests
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  
  // Process the POST request
  const { name, email, participationType, other } = req.body;
  await supabase.from('event_leads').insert([
    { 
      name, 
      email, 
      participation_type: participationType, 
      other: other || null,
      created_at: getVietnamTime()
    }
  ]);
  res.status(200).json({ ok: true });
} 
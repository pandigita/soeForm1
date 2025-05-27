# soeForm1 – Vercel + Supabase lead API

⏱ Progress tracker

| # | Task | Status |
|---|------|--------|
| 0 | Create soeForm1/ workspace | ✅ |
| 1 | Initialise Git repo & first commit | ✅ |
| 2 | Add Supabase insert API (/api/event-lead.js) + package.json | ✅ |
| 3 | Local test (vercel dev) passes | 🟡 |
| 4 | Push to GitHub (pandigita/soeForm1) | ✅ |
| 5 | Create Vercel project via CLI & link repo | ✅ |
| 6 | Add env-vars in Vercel dashboard | 🟡 |
| 7 | Deploy to prod, get endpoint URL | ✅ |
| 8 | WordPress form updated & live test passes | 🟡 |

Notes:
- Production URL: https://soe-form-1-rmej45m58-esuus-projects.vercel.app
- Waiting for Supabase environment variables to be added
- GitHub integration pending in Vercel dashboard

Cursor Project Plan — soeForm1

Goal recap
	1.	Accept a short "lead-capture" form (name + email + participationType + other) on your WordPress page.
	2.	JS "fire-and-forget" POSTs the data to a Vercel serverless API that inserts into Supabase (event_leads table in project SoE2025_event_leads).
	3.	The browser immediately redirects the user to your full Google Form.

Note:
"You" refers to user.
"Cursor" refers to cursor.

Cursor will prepare, deploy, and checkpoint each stage so you can test quickly.

⸻

Step-by-step instructions for Cursor

0. Workspace setup

mkdir soeForm1 && cd $_
git init
echo "# soeForm1 – Vercel + Supabase lead API" > README.md
git add README.md
git commit -m "chore: initialise workspace"

1. Add minimal project files

npm init -y
npm install @supabase/supabase-js

Create /api/event-lead.js:

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

Add commit:

git add api package.json
git commit -m "feat(api): Supabase insert endpoint"

2. Local smoke test

npx vercel@latest dev --confirm

Checkpoint 1 – You:
	1.	Run curl -X POST -H 'Content-Type: application/json' \
-d '{"name":"Test","email":"test@test.com","participationType":"online"}' \
http://localhost:3000/api/event-lead
	2.	Verify row appears in Supabase event_leads.

Mark tracker row 3 ✅.

3. GitHub remote

gh repo create hubhoian/soeForm1 --public --source=. --remote=origin --push

Commit status update in README.md, push.

4. Vercel project via CLI (non-interactive)

# replace <org> with your Vercel org slug if needed
npx vercel@latest --confirm --prod --name soeForm1 --yes

This automatically links the current repo to a new Vercel project soeForm1.

5. Environment variables (manual step)

Checkpoint 2 – You:
	1.	Open Vercel › soeForm1 › Settings › Environment Variables.
	2.	Add
	•	SUPABASE_URL → https://<project-ref>.supabase.co
	•	SUPABASE_SERVICE_ROLE_KEY → your service_role key
	3.	Click Save, then Deploy (or redeploy).

Mark tracker row 6 ✅.

6. Retrieve production URL

Cursor: store the deploy URL (e.g. https://soeForm1.vercel.app) and echo it for the next step.

7. Update WordPress form snippet for you

Cursor prints ready-to-paste snippet (using the deploy URL):

<form id="quick-lead-form">
  <input name="name" type="text" placeholder="Name" required>
  <input name="email" type="email" placeholder="Email" required>
  <select name="participationType" required>
    <option value="">Choose type…</option>
    <option value="in-person">In-person</option>
    <option value="online">Online</option>
    <option value="other">Other</option>
  </select>
  <textarea name="other" placeholder="Other (optional)"></textarea>
  <button type="submit">Send</button>
</form>
<script>
document.getElementById('quick-lead-form').onsubmit = e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  fetch('https://soeForm1.vercel.app/api/event-lead', {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(data)
  });
  window.location = 'https://YOUR-GOOGLE-FORM-URL';
};
</script>

8. Final acceptance test

Checkpoint 3 – User:
	1.	Embed snippet on your WordPress page.
	2.	Submit a test entry.
	3.	Confirm: (a) browser arrives at Google Form, (b) row appears in Supabase.

Mark tracker rows 7–8 ✅.

⸻

🎉 Done

Cursor: when all tracker items are ✅, ping user: "Deployment complete – production endpoint ready."


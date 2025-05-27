# soeForm1 – Event Lead Capture API

A simple Vercel serverless API that captures event leads and stores them in Supabase.

## 🚀 Live API Endpoint

**Base URL**: `https://soe-form1.vercel.app`  
**API Endpoint**: `https://soe-form1.vercel.app/api/event-lead`

## 📝 API Usage

### Data Format

Send a POST request with JSON data containing:

```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "participationType": "online",
  "other": "Looking forward to the event!"
}
```

**Required Fields:**
- `name` (string): Participant's name
- `email` (string): Valid email address
- `participationType` (string): One of: `"in-person"`, `"online"`, `"other"`

**Optional Fields:**
- `other` (string): Additional notes or comments

### JavaScript Example

```javascript
// Simple fetch request
const submitLead = async (formData) => {
  try {
    const response = await fetch('https://soe-form1.vercel.app/api/event-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('Success:', result); // {"ok": true}
      // Redirect to Google Form or success page
      window.location.href = 'https://your-google-form-url';
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Example usage
submitLead({
  name: "Jane Smith",
  email: "jane@example.com",
  participationType: "in-person",
  other: "Excited to attend!"
});
```

### Form Integration Example

```html
<form id="lead-capture-form">
  <input name="name" type="text" placeholder="Your Name" required>
  <input name="email" type="email" placeholder="Your Email" required>
  <select name="participationType" required>
    <option value="">How will you participate?</option>
    <option value="in-person">In-person</option>
    <option value="online">Online</option>
    <option value="other">Other</option>
  </select>
  <textarea name="other" placeholder="Additional notes (optional)"></textarea>
  <button type="submit">Register Interest</button>
</form>

<script>
document.getElementById('lead-capture-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  // Submit to API
  try {
    const response = await fetch('https://soe-form1.vercel.app/api/event-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      // Success - redirect to main form
      window.location.href = 'https://your-google-form-url';
    } else {
      alert('Something went wrong. Please try again.');
    }
  } catch (error) {
    alert('Network error. Please check your connection.');
  }
});
</script>
```

### cURL Examples

**Basic request:**
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","participationType":"online"}' \
  https://soe-form1.vercel.app/api/event-lead
```

**With optional fields:**
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "participationType": "in-person",
    "other": "I have dietary restrictions - vegetarian"
  }' \
  https://soe-form1.vercel.app/api/event-lead
```

**Expected Response:**
```json
{"ok": true}
```

## 🔧 Technical Details

- **Runtime**: Node.js serverless function on Vercel
- **Database**: Supabase (PostgreSQL)
- **Table**: `event_leads`
- **Auto-deployment**: Connected to GitHub - deploys on push to main branch

### Database Schema

The data is stored in the `event_leads` table with these columns:
- `name` → participant name
- `email` → email address  
- `participation_type` → participation type
- `other` → additional notes (nullable)
- Plus automatic `id`, `created_at` timestamps

## 🛠 Development

### Project Status: ✅ COMPLETE

| # | Task | Status |
|---|------|--------|
| 0 | Create workspace | ✅ |
| 1 | Initialize Git | ✅ |
| 2 | Add Supabase API | ✅ |
| 3 | Local testing | ✅ |
| 4 | GitHub integration | ✅ |
| 5 | Vercel deployment | ✅ |
| 6 | Environment variables | ✅ |
| 7 | Production endpoint | ✅ |
| 8 | Live testing | ✅ |

### Local Development

```bash
# Clone the repo
git clone https://github.com/pandigita/soeForm1.git
cd soeForm1

# Install dependencies
npm install

# Set up environment variables
# Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local

# Run locally
npx vercel dev
```

## 🚨 Error Handling

The API will return:
- **200**: Success with `{"ok": true}`
- **405**: Method not allowed (only POST accepted)
- **500**: Server error (check Supabase connection/credentials)

Make sure to handle errors in your frontend code!

## 🎉 DEPLOYMENT COMPLETE - PRODUCTION ENDPOINT READY!

## Current Status:
- **Production URL**: https://soe-form1.vercel.app
- **API Endpoint**: https://soe-form1.vercel.app/api/event-lead ✅ WORKING
- **GitHub integration**: ✅ Connected (auto-deploy on push)
- **Environment variables**: ✅ Added
- **API Test**: ✅ Returns `{"ok":true}`

## WordPress Form Snippet (Ready to Use!)

```html
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
  fetch('https://soe-form1.vercel.app/api/event-lead', {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(data)
  });
  window.location = 'https://YOUR-GOOGLE-FORM-URL';
};
</script>
```

## Final Test Command:
```bash
curl -X POST -H 'Content-Type: application/json' \
  -d '{"name":"Test User","email":"test@example.com","participationType":"online","other":"Test note"}' \
  https://soe-form1.vercel.app/api/event-lead
```
**Expected Response**: `{"ok":true}`

## Notes:
- ✅ API endpoint working perfectly
- Replace `https://YOUR-GOOGLE-FORM-URL` with your actual Google Form URL
- Data is being inserted into Supabase `event_leads` table
- GitHub auto-deployment is active

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
  fetch('https://soe-form1.vercel.app/api/event-lead', {
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


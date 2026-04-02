# Tibetan Language Program — Prof. Sonam
**Columbia University · MESAAS**

A Next.js website for the Tibetan Language Program, with Supabase for lesson storage and file uploads, and Vercel for hosting.

---

## Stack
- **Framework**: Next.js 14 (App Router)
- **Database + Storage**: Supabase (free tier)
- **Hosting**: Vercel (free tier)
- **Auth**: .edu email gate (client-side) + optional access code

---

## Setup — Step by step

### 1. Set up Supabase (5 minutes)

1. Go to [supabase.com](https://supabase.com) → **New project**
2. Give it a name (e.g. `tibetan-site`) and choose a region
3. Once created, click **SQL Editor** → **New query**
4. Paste the entire contents of `supabase-schema.sql` and click **Run**
5. Go to **Settings → API** and copy:
   - `Project URL` → this is your `NEXT_PUBLIC_SUPABASE_URL`
   - `anon / public` key → this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Configure environment variables locally

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_ADMIN_ACCESS_CODE=TIBET2025
```

Change `TIBET2025` to any code you want to give to Prof. Sonam for non-.edu access.

### 3. Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Deploy to Vercel (5 minutes)

1. Push this folder to a new GitHub repository
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your repo
3. In the **Environment Variables** section, add the same three variables from your `.env.local`
4. Click **Deploy**

That's it — your site is live! Vercel gives you a URL like `tibetan-columbia.vercel.app`.

---

## How Prof. Sonam uploads content

1. Navigate to any page on the site
2. Click **+ Upload Content** in the top nav
3. Fill in:
   - **Level** (Elementary / Intermediate / Advanced)
   - **Semester** (Fall / Spring)
   - **Lesson title** and **description**
   - Optionally: a YouTube URL, a PDF/audio file, or an external article link
4. Click **Add lesson to curriculum** — it saves to Supabase instantly

Files (PDFs, audio recordings) are stored in Supabase Storage and publicly accessible via a permanent URL.

---

## File structure

```
src/
  app/
    page.tsx              ← About page
    elementary/page.tsx   ← Elementary course
    intermediate/page.tsx ← Intermediate course
    advanced/page.tsx     ← Advanced course
    assessment/page.tsx   ← Assessments
    layout.tsx            ← Root layout
  components/
    AuthGate.tsx          ← .edu login screen
    Nav.tsx               ← Top navigation
    SiteShell.tsx         ← Auth wrapper
    CoursePage.tsx        ← Shared course template
    LessonCard.tsx        ← Expandable lesson card
    UploadModal.tsx       ← Professor upload form
  lib/
    supabase.ts           ← Database queries + file uploads
    auth.tsx              ← Auth context (.edu gate)
  styles/
    globals.css           ← Global CSS variables + fonts
supabase-schema.sql       ← Run once in Supabase SQL editor
.env.example              ← Copy to .env.local
```

---

## Customizing

- **Change the access code**: update `NEXT_PUBLIC_ADMIN_ACCESS_CODE` in Vercel environment variables
- **Add Prof. Sonam's bio/photo**: edit `src/app/page.tsx`
- **Restrict upload to admin only**: add a separate admin password check in `UploadModal.tsx`
- **Custom domain**: In Vercel → your project → Settings → Domains → add `tibetan.columbia.edu` (requires Columbia IT to set a DNS CNAME)

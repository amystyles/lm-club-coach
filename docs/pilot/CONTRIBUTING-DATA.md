# Contributing data for the Club4 pilot

How to share Supabase info and instructor handbooks **without exposing LM IP in the repo**.

---

## What helps most

### 1. Supabase table exports (preferred)

Share **schema + seed URLs only**, not choreography text.

**Option A — I query live (you’re already connected)**  
Tell me to inspect tables; I can use Supabase MCP `list_tables` / `execute_sql` on project `lmus-club-coach`.

**Option B — You paste in chat or a CSV in `docs/pilot/data/` (gitignored)**

Suggested table for pilot (not built yet):

```sql
-- Example future shape — for discussion only
create table program_resources (
  program text primary key,
  family text not null check (family in ('strength', 'cycle')),
  labels jsonb not null,  -- notesLabel, sectionTerm, etc.
  links jsonb not null,   -- releasesApp, masterclassAllocated, ...
  updated_at timestamptz default now()
);
```

**Useful exports from existing tables:**

| Table | Why |
|-------|-----|
| `clubs` | Confirm Club4 id |
| `instructors` + `instructor_programs` | Which programs instructors hold |
| `profiles` / `user_clubs` | GFM vs Club Coach mapping |

Do **not** put handbook PDFs in Supabase storage linked from the public app without auth review.

---

### 2. Instructor PDF handbooks

**Yes, you can share them** — with these guardrails:

| Do | Don’t |
|----|-------|
| Drop PDFs in a **local/gitignored** folder e.g. `docs/pilot/handbooks/` | Commit PDFs to GitHub |
| Ask me to extract **section titles, page refs, and URL targets** | Paste full worksheet or choreography text into `stage-sessions.ts` |
| Use PDFs to fill `PLACEHOLDER_*` URLs in `pilot-program-resources.skeleton.ts` | Embed grade descriptors or Essence scripts in the app |

**How to share in this environment:**

1. Upload PDFs to the workspace under `docs/pilot/handbooks/` (add `docs/pilot/handbooks/` to `.gitignore` before commit).
2. Tell me the filenames, e.g. `BP-Heavy-Instructor-Handbook.pdf`.
3. I’ll produce a **mapping doc** only:  
   `Handbook p.12 → techniqueReference link`  
   `Handbook Ch.4 → compulsory cues activity`  
   No verbatim copyrighted blocks in tracked files.

---

### 3. Pinstructor / LM portal URLs

If handbooks live behind LM auth, a spreadsheet is enough:

| Program | Resource | URL or portal path | Auth required? |
|---------|----------|-------------------|----------------|
| BODYPUMP HEAVY | Releases App deep link | … | Y |
| THE TRIP | Ride film | … | Y |

Paste that table in chat or `docs/pilot/resource-urls.csv` (gitignored if sensitive).

---

## IP checklist before pilot go-live

- [ ] No PDF files in git
- [ ] No choreography sequences in app bundle
- [ ] No masterclass video hosting in Vercel/Supabase public buckets
- [ ] Activity steps describe **process**; links open LM systems
- [ ] Connection tools (Four Quadrants, CRC, Names) use **short names + how-to**, not full curriculum PDFs

---

## Next step after you share data

1. Fill placeholders in `pilot-program-resources.skeleton.ts`
2. Implement `deliveryType` on activities (Four Quadrants first)
3. Optional: migrate links to `program_resources` Supabase table for GFM editing without deploy

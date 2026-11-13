# BeThere admin prototype

A clickable design prototype of the PTO side of BeThere: the screens a volunteer
chair would use to see which needs are still open, manage committees and events,
and post an urgent ask. Live at [v0-bethere-admin.vercel.app](https://v0-bethere-admin.vercel.app).

It uses sample data and has no backend. It was built in [v0](https://v0.app) in late
March 2026 (35 commits), alongside the parent-facing
[BeThere prototype](https://github.com/blazerbeam/v0-be-there-app), to work out what
a chair actually needs to see before building any of it for real.

## What happened next

BeThere shipped as part of [Roost](https://roost.directory), the parent directory I
build and run. The chair view was rebuilt there on real data: the families,
committees, events and permissions Roost already holds. The story of how the idea
got there is in the
[BeThere prototype README](https://github.com/blazerbeam/v0-be-there-app#readme).

This repo is a snapshot and gets no new features.

## Screens

- `/dashboard`: open needs, quick stats, and what needs attention
- `/opportunities`: volunteer opportunities and who's signed up
- `/events`: events and their shifts
- `/committees`: committees and chairs

## Running it locally

```bash
pnpm install
pnpm dev
```

No environment variables needed.

---

Built by [Jeremy Myrland](https://jeremymyrland.com).

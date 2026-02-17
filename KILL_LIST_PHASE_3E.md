# Phase 3E Cleanup — Kill List

Generated: 2026-02-16
Session: Phase 3E — Admin Authentication & Order Management System

---

## Files to Delete Before Committing

1. **scripts/test-admin.js**
   - Reason: Development test script created during Phase 3E implementation. Contains hardcoded test credentials and localhost API calls. Not needed in production and should not be committed to the repository.
   - Delete with: `rm scripts/test-admin.js`

---

## Files to Keep

The following files created during Phase 3E are production assets and must be committed:

### Admin UI (app/admin/)
- `app/admin/page.tsx` — Login page (server component)
- `app/admin/components/LoginForm.tsx` — Login form with loading/error states
- `app/admin/orders/page.tsx` — Main orders dashboard
- `app/admin/components/Header.tsx` — Dashboard header with role badge and logout
- `app/admin/components/StatsBar.tsx` — Total orders, revenue, status counts
- `app/admin/components/ManualOrderForm.tsx` — Collapsible manual order creation form
- `app/admin/components/FiltersRow.tsx` — Status, source, and text search filters
- `app/admin/components/OrdersTable.tsx` — Full table with status updates and delete
- `app/admin/components/ConfirmDialog.tsx` — Delete confirmation modal

### Admin API Routes (app/api/admin/)
- `app/api/admin/auth/route.ts` — POST login endpoint
- `app/api/admin/auth/logout/route.ts` — POST logout endpoint
- `app/api/admin/orders/route.ts` — GET list + POST create manual order
- `app/api/admin/orders/[id]/route.ts` — PATCH update status + DELETE order

### Library Files (lib/)
- `lib/admin-auth.ts` — JWT session management (validateCredentials, createSession, getSession)
- `lib/admin-middleware.ts` — requireAuth() and requireAdmin() helpers
- `lib/db/migrate-manual-orders.ts` — Keep for reference; migration already run on production DB
- `lib/db/types.ts` — Updated with source, notes, quantity fields
- `lib/db/orders.ts` — Updated with createManualOrder() and new field queries
- `lib/utils/format.ts` — formatCurrency(), formatDate(), getEditionName(), getStatusColor()

### Config & Documentation
- `.env.example` — Updated with admin auth variable documentation
- `CHANGELOG.md` — Updated with Phase 3E entry
- `PROJECT_STATUS.md` — Updated to reflect Phase 3E completion

---

## Verification Checklist Before Commit

- [ ] `scripts/test-admin.js` deleted
- [ ] `.env.local` is NOT staged (contains real credentials)
- [ ] `pnpm build` passes with zero errors
- [ ] Admin login works at /admin
- [ ] Orders dashboard loads at /admin/orders
- [ ] Manual order creation works
- [ ] Status updates work
- [ ] Delete confirmation modal appears before deletion
- [ ] Subadmin role cannot see delete button

---

## Notes

- The `scripts/` directory itself can remain if other scripts exist. Only `test-admin.js` is targeted.
- `lib/db/migrate-manual-orders.ts` is intentionally kept. It serves as documentation of the schema change and can be re-run safely (uses IF NOT EXISTS / ADD COLUMN IF NOT EXISTS patterns).
- No other obviously development-only files were found during the scan. The project is otherwise clean.

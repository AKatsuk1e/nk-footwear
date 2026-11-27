# NK Footwear Admin Preview

This branch adds a private catalogue admin application at /admin.

## Required Vercel environment variables (Preview only)
- NK_ADMIN_PASSWORD
- NK_ADMIN_SESSION_SECRET (at least 32 random characters)
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY (server-only; never NEXT_PUBLIC_)

Run the SQL in supabase/admin-products.sql in the intended Supabase project before testing product writes. The table stores complete catalogue records as JSONB. Do not add the service-role key to client-side code.

The preview is an isolated admin app scaffold; it does not replace or merge the storefront catalogue automatically. Export the catalogue from the admin and review the generated TypeScript before integrating it with the storefront.

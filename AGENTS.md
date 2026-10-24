<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Scope

This app is the landing page only (`/`). Auth pages and the dashboard live in a separate React app.

## Email templates — brand consistency

Outbound HTML is inlined in `EmailServiceImpl.textBlock`. Its design tokens
mirror this frontend's `app/globals.css` **light** theme: Oxanium with a system
fallback, monochrome surfaces (`#ffffff` page, `#f6f6f7` card, `#0a0a0a` text,
`#6b6b70` muted, `#000000` button), square corners. The theme is deliberately
monochrome — there is no accent colour. When you change the frontend theme,
mirror the values in the `COLOR_*` constants in `EmailServiceImpl`.
<!-- END:nextjs-agent-rules -->

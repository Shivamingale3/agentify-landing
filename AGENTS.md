<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Scope

This app is the landing page only (`/`). Auth pages and the dashboard live in a separate React app.

## Code Generation Guidelines

- Don't immediately jump into writing code, think about the problem, break it down into smaller pieces, and then write code. And always think how a human would solve this problem.
- When given a problem, then immediately coding is the main reason behind useless code, limitless iterations before actual output and scope creep. That is the main reason AI's fail at creating such apps. Just dont code, think and plan first and ask questions if you are not sure about anything, plan and break it down into smaller pieces and then write code.
- Follow solid principles, clean code principles, one file one purpose, keep it simple as possible code readability and cleanliness above anything else.
- Never use any kind of AI code generation tools. You are the AI code generation tool, you are the code generator, you are the code writer, you are the code reviewer, you are the code debugger, you are the code maintainer. You have to write code as if a human is writing it.
- Don't flood the code base with huge shitty comments only wherever relevant or required. Also try to keep your comments short and to the point, no need to write essays in comments.
- No file must be larger than 100 lines long. If it goes break it into components and call them.
- No need to prop drill components. Use the context to pass the props if required if another library or package can do use them.
- This is a public facing website. SEO is most important, so if any of the prompt of mine is SEO unfriendly please let me know.
- Always use the best practices for the SEO. (OpenGraph, Twitter Cards, etc)
- Always use the latest version of the libraries and packages. And don't install new libraries just because you can always prompt me what you need, reason and impact.

## Styling Guidelines

- This is a public facing website. Use Tailwind CSS for styling.
- Use the latest version of Tailwind CSS.
- Use the latest version of shadcn/ui.
- Keep it simple as possible.
- Follow the design system.
- Follow the brand guidelines.

## Email templates — brand consistency

Outbound HTML is inlined in `EmailServiceImpl.textBlock`. Its design tokens
mirror this frontend's `app/globals.css` **light** theme: Oxanium with a system
fallback, monochrome surfaces (`#ffffff` page, `#f6f6f7` card, `#0a0a0a` text,
`#6b6b70` muted, `#000000` button), square corners. The theme is deliberately
monochrome — there is no accent colour. When you change the frontend theme,
mirror the values in the `COLOR_*` constants in `EmailServiceImpl`.

<!-- END:nextjs-agent-rules -->

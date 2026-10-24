#!/usr/bin/env bash
# PostToolUse: run `eslint --fix` on TS/TSX files Claude writes, so Tailwind
# class fixes land the same way they do on save in VS Code. Never blocks.
file=$(node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{console.log(JSON.parse(s).tool_input?.file_path??"")}catch{}})')

case "$file" in *.ts | *.tsx) ;; *) exit 0 ;; esac

root="${CLAUDE_PROJECT_DIR:-$(pwd)}"
# each app lints with its own config and node_modules
case "$file" in "$root"/panel/*) app="$root/panel" ;; *) app="$root" ;; esac

cd "$app" && npx --no-install eslint --fix "$file" >/dev/null 2>&1
exit 0

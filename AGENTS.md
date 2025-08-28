Purpose

This file is for AI agents (Codex, Copilot, ChatGPT, etc.) working on the Tagspeak VS Code Extension.
It explains the DSL context, what’s implemented, and what QoL features to focus on when generating extension code.

Do not treat this repo as generic TypeScript. This is a language extension project with very specific scope.

Goals for the Extension

Syntax Highlighting for TagSpeak packets, pipes (>), blocks ({…}), strings, numbers, and booleans.

Snippets for common packet patterns (print, store, math, loop, if/else).

Run Command → tagspeak.runFile calls the compiled tagspeak_rs binary on the current file.

QoL: bracket auto-closing, block folding, comment style (//).

Docs Integration: point to Tagspeak_101.md
 for reference.

Implemented Features

✅ Language registered (.tgsk → Tagspeak).

✅ TextMate grammar (basic highlighting).

✅ Snippets scaffolded.

✅ Run command streams CLI output to Output panel.

✅ README + examples.

Next QoL Ideas (safe to attempt)

Add a configuration property for tagspeak.path.runtime.

Add hover tooltips with packet docs (from TagSpeak_101).

Add Outline view: show packets and blocks in the sidebar.

Add conversion command: sugar → canonical (== → [eq]) and back.

Add flow colorization (gutter highlights per > chain).

Do Not

❌ Do not generate a full LSP server (out of scope).

❌ Do not auto-hallucinate new packets. Only use those listed in TagSpeak core.

❌ Do not pull in heavy npm deps. Keep extension lightweight.

Packet Reference (for highlighting/snippets)

Core: math, int, bool, msg, print, note

Data: store, load, save, log, modify

Flow: loop, if, or, else

Comparisons: eq, ne, gt, lt, ge, le

Logic: and, or, not

Agent Guidelines

When extending snippets, keep them short + canonical.

When touching extension.ts, prefer adding config/options over hardcoding paths.

When editing grammar, test on examples/hello.tgsk.

Always update README when new commands/settings are added.
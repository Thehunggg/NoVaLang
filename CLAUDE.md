@AGENTS.md
@docs/ai/ACTIVE_TASK.md
@docs/ai/ARCHITECTURE_DECISIONS.md

# Claude Code Instructions — Hướng dẫn Claude Code

Claude Code is the default primary implementation agent for NovaLang.

The approved Web/Android/iOS platform strategy is defined in `AGENTS.md`
and `docs/ai/ARCHITECTURE_DECISIONS.md` and must be followed.

Before editing:

1. Read `AGENTS.md`.
2. Read `docs/ai/ACTIVE_TASK.md`.
3. Read all applicable `.cursor/rules/*.mdc` files. For pronunciation,
   reading, romanization, or TTS-language work, follow the `05` gateway to
   the relevant canonical `rules/languages/<languageCode>/` directory.
4. Confirm that `Current owner` is `Claude Code`.
5. Inspect the existing dirty worktree.
6. Report the intended files and implementation plan.

When context or quota is near its limit:

1. Stop starting new code changes.
2. Finish or safely isolate the current change.
3. Run the scoped tests that are still possible.
4. Update `docs/ai/ACTIVE_TASK.md`.
5. Produce a handoff using `docs/ai/HANDOFF_TEMPLATE.md`.
6. Transfer ownership to Codex unless the project owner specifies another agent.

Never reset, clean, stash, checkout, commit, or push without explicit approval.

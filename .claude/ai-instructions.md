# AI Agent Instructions - READ FIRST

These are **mandatory rules** for ALL AI agents (Claude, Gemini, etc.) working on StackAtlas.

## 🚨 CRITICAL: COMMIT MESSAGE FORMAT

**EVERY commit and pull request MUST follow Conventional Commits format:**

```
<type>: <description>
```

### Allowed Types (ONLY):

- `feat:` - New features/functionality
- `fix:` - Bug fixes
- `docs:` - Documentation
- `style:` - Code formatting/style changes
- `refactor:` - Code restructuring without functional changes
- `perf:` - Performance improvements
- `test:` - Adding/modifying tests
- `chore:` - Build system, dependencies, scripts
- `ci:` - CI/CD workflow changes

### Rules:

1. ✅ **Type must be lowercase** (feat, not Feat)
2. ✅ **Colon and space required** (`feat: `, not `feat-`)
3. ✅ **Description starts with lowercase** (`add feature`, not `Add feature`)
4. ✅ **No period at end** (`feat: add feature`, not `feat: add feature.`)
5. ✅ **Min 3 characters for description**
6. ✅ **One logical change per commit** (if doing Phase B1, B2, B3 → 3 separate commits)

### Examples:

✅ CORRECT:

```
feat: Add type-safe JSON parsing utility
fix: Handle null values in parser
ci: Add unit tests to workflow
docs: Update contributing guidelines
refactor: Extract common validation logic
style: Format code with prettier
```

❌ INCORRECT (will be REJECTED by commitlint):

```
Phase C: Add type-safety             ← Missing type: prefix
Update code                          ← No type: prefix
feat: Phase C features               ← Too vague
feat: Add feature.                   ← Period at end
feat: ADD FEATURE                    ← Uppercase
add: feature                         ← Invalid type
feat:Add feature                     ← Missing space after colon
```

## How Git Hooks Enforce This

1. **Pre-Commit Hook** (lint-staged):
   - Runs Prettier automatically
   - Runs ESLint auto-fixes
   - Formats only staged files

2. **Commit-MSG Hook** (commitlint):
   - Validates message format
   - Checks type is valid
   - Checks description format
   - **BLOCKS invalid commits** ❌

**You CANNOT bypass these hooks** - they are mandatory.

## Checklist Before `git push`

```bash
# 1. Format code
pnpm format

# 2. Commit with CORRECT format
git commit -m "feat: Add your feature"
# ↑ If commitlint rejects it, fix the message and try again

# 3. Verify linting
pnpm lint

# 4. Run tests
pnpm test

# 5. Build check
pnpm build

# 6. Push
git push -u origin <branch>
```

## If Your Commit Is Rejected

You'll see this error:

```
✖   body's lines must not be longer than 100 characters [body-max-line-length]
```

**Solution**: Fix the commit message and try again:

```bash
git commit -m "feat: Shorter description"
```

## For GitHub PR Titles

When creating a PR, the **PR title** is NOT the first commit message - it's separate.

**PR titles MUST ALSO follow Conventional Commits**:

```
feat: Add type-safe JSON parsing utility
fix: Handle null values in parser
```

Use the UI to set the correct title if needed.

## Questions?

See `/CLAUDE.md` for complete guidelines and FAQ.

---

**Last Updated**: 2026-04-25
**Valid For**: All AI Agents
**Enforcement**: Git Hooks (commitlint + Husky)

# Plan: Items as Dependencies - Conceptual & Implementation Refactoring

## Context

**Problem:** The current architecture doesn't clearly articulate that:
1. **All items are dependencies** (in the stack composition sense)
2. **Only items in the "sovereign-standards" layer are true standards**
3. **Stacks commit to standards** by taking on maintainer or contributor roles

**Current Reality:**
- Items exist independently with sovereignty criteria
- Stacks reference items with roles (maintainer/contributor/funder/consumer)
- The sovereign-standards layer exists but its special role as "true standards" is not emphasized
- Documentation treats all layers equally; doesn't explain the dependency relationship

**Intended Outcome:**
- Conceptual clarity that items are dependencies, organized by layer
- Recognition that sovereign-standards items are the foundation that stacks must maintain/contribute to
- Updated documentation reflecting this model
- Code structure that makes this relationship explicit

---

## Implementation Plan

**User Decisions (Locked):**
✅ Code focus: **Dokumentation & Kommentare only** (no new helper functions)
✅ Item model: **Layer-Zugehörigkeit ist ausreichend** (no new `isStandard` field)
✅ Documentation: **Create example doc** (`/docs/examples/items-as-dependencies.md`)

### Phase 1: Update Core Documentation

**1.1 Update `docs/ARC42.md` - Data Model Section**
- **File:** docs/ARC42.md (Section 5-6)
- **Changes:**
  - Add explicit statement: "All Items are Dependencies, organized by layer"
  - Clarify that `sovereign-standards` items are the **foundational standards** that stacks must maintain
  - Explain the Stack-Item relationship as "Dependency Declaration with Role"
  - Add visual ASCII diagram showing: Layer → Item (Dependency) → Stack (Role Commitment)
- **Reference:** Lines 58-96 (fachliches Datenmodell)

**1.2 Update `docs/BUSSINESS_CASE.md`**
- **File:** docs/BUSSINESS_CASE.md
- **Changes:**
  - Clarify in the "Model" section that items = dependencies
  - Explain that sovereign-standards are the linchpin items
  - Emphasize: "Stacks are responsibility declarations: by choosing a role (maintainer/contributor), a stack commits to maintaining/contributing to a standard"

**1.3 Update `docs/README.md` - Documentation Index**
- **File:** docs/README.md
- **Changes:**
  - Add breadcrumb explanation: "Items → Dependencies → Sovereign Standards → Stack Commitments"
  - Link to new examples doc and updated ARC42

**1.4 Update `data/README.md` - Data Structure**
- **File:** data/README.md
- **Changes:**
  - Explain that `items/` contains all dependencies
  - Highlight that items in `sovereign-standards.json` layer are foundational standards
  - Show example: Stack item with role = maintainer/contributor for a sovereign-standard

---

### Phase 2: Add JSDoc & Code Comments

**2.1 Enhance TypeScript Types Documentation**
- **File:** `/home/user/accessible-d-stack-landscape/src/types/index.ts`
- **Changes:**
  - Add JSDoc comments to `StackItem` type explaining it represents a "Dependency Declaration"
  - Add JSDoc to `ParticipantRole` clarifying the role hierarchy for standards
  - Add JSDoc comment to `Item` type noting that items in `sovereign-standards` layer are foundational
- **Example:**
  ```typescript
  /**
   * StackItem represents a dependency declaration: 
   * a Stack's commitment to an Item (dependency) with a specific role.
   * For items in the sovereign-standards layer, the role (maintainer/contributor) 
   * indicates the stack's responsibility level for that foundational standard.
   */
  export type StackItem = { ... }
  ```

**2.2 Add Comments to Key Components**
- **Files to update:**
  - `/src/components/ArticleCard.tsx` — clarify that it displays an item (dependency) with stack role metadata
  - `/src/components/StackCard.tsx` — clarify that it displays a stack's dependency commitments
  - `/src/pages/StackPage.tsx` — clarify the stack composition model
- **Changes:** Brief JSDoc/inline comments explaining the dependency relationship

---

### Phase 3: Create Example Documentation

**3.1 Create `/docs/examples/items-as-dependencies.md`**
- **Content structure:**
  1. **Overview:** Conceptual explanation that all items are dependencies
  2. **Example 1:** Infrastructure-layer item (e.g., TLS) — not a standard, just a dependency
  3. **Example 2:** Sovereign-standards-layer item (e.g., Open Standard X) — a foundational standard
  4. **Example 3:** How Germany Stack declares responsibility via role for a standard
  5. **Table:** Stack roles and what they mean for standards
- **Goal:** Make the model immediately understandable with real data examples

---

## Critical Files to Modify

### Documentation (Primary)
- docs/ARC42.md — Update sections 5-6 with dependency model explanation
- docs/BUSSINESS_CASE.md — Clarify items-as-dependencies model
- docs/README.md — Update index and references
- data/README.md — Explain items as dependencies
- docs/examples/items-as-dependencies.md — **[NEW]** Create example documentation

### Code (Secondary - Comments Only)
- `/src/types/index.ts` — Add JSDoc to Item, StackItem, ParticipantRole
- `/src/components/ArticleCard.tsx` — Add clarifying comments
- `/src/components/StackCard.tsx` — Add clarifying comments
- `/src/pages/StackPage.tsx` — Add clarifying comments

### Data (Reference Only - No Changes)
- `/data/layers/sovereign-standards.json` — Reference in updated docs
- `/data/items/` — Reference examples in new docs
- `/data/stacks/germany.json` — Reference examples in new docs

---

## Verification & Testing

**1. Documentation Review:**
- [ ] Read ARC42.md section 5-6 to ensure "items are dependencies" is clear
- [ ] Read BUSINESS_CASE.md to verify responsibility model is explained
- [ ] Check README.md breadcrumb navigation
- [ ] Review /docs/examples/items-as-dependencies.md for clarity

**2. Code Comment Review:**
- [ ] Check JSDoc in `/src/types/index.ts` (Item, StackItem, ParticipantRole)
- [ ] Verify comments in ArticleCard, StackCard, StackPage are helpful
- [ ] Run `pnpm lint` to ensure code quality and no syntax errors

**3. Developer Experience Test:**
- [ ] Start dev server: `pnpm dev`
- [ ] Navigate to a sovereign-standards item (verify it's recognizable as a standard from documentation)
- [ ] View Germany stack and verify items show role information
- [ ] Read /docs/examples/items-as-dependencies.md and verify it's easy to understand

**4. Documentation Navigation Test:**
- [ ] Follow: README.md → (reference to ARC42) → ARC42 fachliches Datenmodell
- [ ] Confirm the model explanation is coherent
- [ ] Check that links to examples doc work

---

## Backward Compatibility

✅ **No breaking changes** — This is a conceptual & documentation refactor
- Existing type structure (`StackItem`, `ParticipantRole`) remains unchanged
- Existing data files remain unchanged
- Components continue to work as before
- Pure documentation and code comment improvements

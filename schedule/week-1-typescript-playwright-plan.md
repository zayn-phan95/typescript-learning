# Week 1 – TypeScript 5 Applied to Test Automation

## Goal
Translate general TypeScript knowledge into **automation-specific usage patterns** with Playwright, enforcing strict type safety and eliminating `any` from test code.

---

## Focus Areas
- Type safety in tests
- Correct typing of Playwright APIs
- Avoiding `any` in automation code

---

## Weekly Plan

| Day | Focus Area | Learning Objective | Key Topics | Hands-on Tasks | Deliverable |
|----|-----------|-------------------|-----------|---------------|-------------|
| Day 1 | Project Foundation | Set up strict TS + Playwright baseline | `tsconfig` strict mode, `noImplicitAny`, folder structure | Initialize Playwright TS project; harden `tsconfig`; create `/tests` and `/types` folders | Playwright project initialized |
| Day 2 | Type Modeling | Design typed test data contracts | `interface` vs `type`, `readonly`, literal types | Create `TestUser` interface; create `LoginCredentials` type | `/types/test-data.ts` |
| Day 3 | Advanced Types | Model UI and auth states safely | Union types, intersection types, literal enums | Define `AuthState` union; create `AdminUser` intersection type | Typed UI/auth state models |
| Day 4 | Flaky UI Handling | Handle unstable UI without weakening types | Optional chaining, nullish coalescing, `strictNullChecks` | Refactor element text reads using `?.` and `??` | Safer assertions in tests |
| Day 5 | Playwright Basics | Use Playwright APIs with correct typing | `test`, `expect`, `page`, Locator vs ElementHandle | Rewrite selectors using `Locator`; remove `ElementHandle` usage | Typed Playwright interactions |
| Day 6 | Test Refactoring | Apply TS concepts to real tests | Typed test data, no `any`, clear assertions | Rewrite 3 basic tests using `TestUser` and `LoginCredentials` | `/tests/basic.spec.ts` |
| Day 7 | Review & Audit | Ensure automation-quality TS code | Self-review, anti-pattern removal, linting | Audit for `any` / unsafe casts; validate assertions | Week 1 complete and PR-ready |

---

## Deliverables
- `/tests/basic.spec.ts`
- `/types/test-data.ts`

---

## Quality Bar
- No `any`
- No `as unknown as`
- No magic strings
- Explicit, readable assertions
- Code is **PR-ready** without type refactors

---

## Notes
This week establishes the **type-safe foundation** for all future Playwright automation. Subsequent weeks will build on this with Page Objects, fixtures, and advanced TypeScript patterns.

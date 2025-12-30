# Week 3 — Advanced TypeScript Patterns for Test Architecture

## Goal
Apply **advanced TypeScript 5 patterns** to build a **scalable, predictable automation architecture**, where incorrect usage fails at **compile time**, not runtime.

---

## Focus Areas
- Advanced TypeScript patterns in automation
- Compile-time safety
- State-driven test flows
- Reusable, typed utilities

---

## Topics to Master

### TypeScript (Automation Context)
- Generics and generic constraints
- Discriminated unions for UI and flow states
- Utility types (`Partial`, `Pick`, `Omit`, `Readonly`)
- Exhaustive checking with `never`

### Playwright
- Typed helper abstractions
- State-driven test logic
- Avoiding runtime branching based on DOM guesses

---

## Weekly Plan

| Day | Focus Area | Learning Objective | Key Topics | Hands-on Tasks | Deliverable |
|----|-----------|-------------------|-----------|---------------|-------------|
| Day 1 | Generics | Create reusable, type-safe helpers | Generic functions, constraints | Build generic wait/action helpers for `Locator` | Typed helper functions |
| Day 2 | State Modeling | Model UI outcomes explicitly | Discriminated unions, state transitions | Define typed result objects for user flows | State-driven flow types |
| Day 3 | Utility Types | Reduce duplication safely | `Partial`, `Pick`, `Omit`, `Readonly` | Create user variants and config shapes using utility types | Reusable typed models |
| Day 4 | Exhaustive Safety | Catch missing cases at compile time | `never`, exhaustive `switch` | Implement compile-time guards for state handling | Compile-time safety guards |
| Day 5 | Typed Utilities | Centralize shared logic | Typed helpers, pure functions | Create `/utils` helpers for navigation and assertions | `/utils/*.ts` |
| Day 6 | Architecture Review | Validate architectural discipline | Responsibility boundaries, purity | Refactor helpers and pages to remove leaks | Hardened architecture |
| Day 7 | Hardening & Audit | Prepare for scale | Anti-pattern detection, review checklist | Remove runtime guesses, enforce typing rules | Week 3 complete |

---

## Example Patterns

### Generic Helper
```ts
async function waitForVisible<T extends Locator>(el: T): Promise<T> {
  await el.waitFor({ state: 'visible' });
  return el;
}

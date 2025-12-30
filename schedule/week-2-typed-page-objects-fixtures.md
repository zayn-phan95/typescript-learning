# Week 2 — Page Object Model with Strong Typing

## Goal
Build **maintainable Page Objects** using **TypeScript 5 best practices**, ensuring strong typing, encapsulation, and reusable actions while keeping tests thin and readable.

---

## Focus Areas
- Typed Page Objects
- Encapsulation and access control
- Reusable selectors and actions
- Negative flows and page state modeling

---

## Topics to Master

### TypeScript (Automation Context)
- Constructor typing
- Access modifiers (`private`, `protected`, `readonly`)
- Explicit return types for async methods
- Discriminated unions for page states

### Playwright
- Page Object Model done right
- Avoiding over-abstraction
- Chaining locators safely
- Auto-waiting through `Locator`

---

## Weekly Plan

| Day | Focus Area | Learning Objective | Key Topics | Hands-on Tasks | Deliverable |
|----|-----------|-------------------|-----------|---------------|-------------|
| Day 1 | Page Object Foundations | Understand POM responsibilities and structure | Page responsibilities, constructor injection, locator ownership | Create `LoginPage` skeleton; inject `Page`; define private locators | `/pages/LoginPage.ts` (structure) |
| Day 2 | Encapsulation | Enforce strong encapsulation | `private`, `readonly`, constructor typing | Lock down locators; prevent page leakage | Encapsulated Page Object |
| Day 3 | Typed Actions | Make Page APIs predictable | Explicit return types, typed params | Implement typed `login()` method using `LoginCredentials` | Typed login action |
| Day 4 | Page States & Negative Flows | Model UI outcomes safely | Discriminated unions, error states | Add invalid login handling; return typed `LoginResult` | Typed negative flow |
| Day 5 | Additional Page Object | Apply consistency across pages | Reuse patterns, separation of concerns | Create `DashboardPage`; expose state methods only | `/pages/DashboardPage.ts` |
| Day 6 | Authentication Tests | Keep tests thin and readable | POM usage, no selectors in tests | Write success & failure auth tests using Page Objects | `/tests/authentication.spec.ts` |
| Day 7 | Review & Hardening | Enforce architecture rules | Anti-pattern removal, review checklist | Audit for selectors in tests, assertions in pages, implicit types | Week 2 complete |

---

## Example Pattern

```ts
class LoginPage {
  constructor(private readonly page: Page) {}

  async login(creds: LoginCredentials): Promise<void> {
    await this.page.fill('#user', creds.username);
    await this.page.fill('#pass', creds.password);
    await this.page.click('button[type=submit]');
  }
}

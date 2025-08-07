# Development

Testing framework, code quality standards, and contribution guidelines.

---

## Table of Contents

- [Testing Framework](#testing-framework)
- [Testing Patterns](#testing-patterns)
- [Code Quality Framework](#code-quality-framework)
- [Development Process](#development-process)
- [Contribution Guidelines](#contribution-guidelines)
- [Testing Utilities](#testing-utilities)
- [Quality Metrics](#quality-metrics)
- [Related Documentation](#related-documentation)

---

## Testing Framework ✅

Comprehensive testing infrastructure with Vitest and React Testing Library.

### Framework Configuration

- **Test Runner:** [Vitest](https://vitest.dev/guide/) with jsdom environment
- **Component Testing:** [React Testing Library](https://testing-library.com/docs/) with semantic queries
- **Coverage:** 80% threshold across branches, functions, lines, statements
- **Type Safety:** full typescript integration

### Testing Commands

```bash
npm run test         # execute complete test suite
npm run test:watch   # development mode with auto-rerun
npm run test:coverage # generate coverage reports
npm run test:ui      # interactive visual interface
```

### Test Configuration

**Configuration File:** `vitest.config.ts`
**Setup File:** `vitest.setup.ts` - framework mocks and utilities
**Coverage:** v8 provider with html/lcov reports

---

## Testing Patterns ✅

### Component Testing Strategy

User-centric testing approach focusing on accessibility and behavior over implementation details.

**Testing Examples:**

```bash
# component testing patterns:
app/components/ui/logo/logo.test.tsx
app/components/structure/header/header.test.tsx
app/views/home/home.test.tsx

# service testing patterns:
app/services/http/rest/rest.test.ts
app/services/http/graphql/graphql.test.ts
```

**Testing Guidelines:**

- use semantic queries (`getByRole`, `getByLabelText`) for accessibility validation
- test user-facing functionality over internal implementation
- focus on behavior and user experience
- validate component integration with design system

### Service Testing Strategy

HTTP service testing with adapter-level mocking for isolated business logic validation.

**Mock Strategy:**

```bash
# service mocking examples in:
app/services/http/rest/rest.test.ts
app/services/http/graphql/graphql.test.ts

# utility function tests:
app/services/http/core/core.utils.test.ts
```

**Benefits:**

- **Isolation** - test business logic without external dependencies
- **Type Safety** - full typescript validation in tests
- **Real Scenarios** - test actual request/response patterns

Learn more: [Vitest](https://vitest.dev/guide/) | [Testing Library](https://testing-library.com/docs/)

---

## Code Quality Framework ✅

Automated quality standards enforced at multiple development stages.

### Quality Tools Integration

| Tool           | Purpose                  | Integration              |
| -------------- | ------------------------ | ------------------------ |
| **TypeScript** | static type checking     | ide + pre-commit         |
| **ESLint**     | code pattern enforcement | ide + pre-commit         |
| **Prettier**   | code formatting          | ide + pre-commit         |
| **Vitest**     | test execution           | development + pre-commit |
| **Husky**      | git hook automation      | pre-commit workflow      |

### Automated Quality Gates

**Pre-Commit Workflow (.husky/pre-commit):**

```bash
npm run tsc         # typescript compilation check
npm run test        # full test suite execution
npx lint-staged     # targeted file processing
```

**Development Commands:**

```bash
npm run lint         # check code quality
npm run lint:fix     # auto-fix code issues
npm run format       # check code formatting
npm run format:fix   # auto-format code
```

### IDE Integration Benefits

- **Real-time type checking** - typescript errors during development
- **Automatic formatting** - prettier on file save
- **ESLint auto-fix** - fixable issues resolved automatically
- **Import organization** - automatic import cleanup

**VS Code Configuration:** `.vscode/settings.json` - optimized for the template

Learn more: [ESLint](https://eslint.org/docs/latest/) | [Prettier](https://prettier.io/docs/en/) | [TypeScript](https://www.typescriptlang.org/docs/)

---

## Development Process

### Workflow Commands

```bash
npm run dev          # development server with hot reload
npm run test:watch   # tests in watch mode
npm run lint:fix     # fix code quality issues
npm run format:fix   # apply consistent formatting
```

### Branch Strategy

**GitHub Flow Pattern:**

- `main` branch - production-ready code
- `feature/descriptive-name` - new features
- `fix/descriptive-name` - bug fixes
- `hotfix/descriptive-name` - urgent fixes

### Commit Standards ✅

**Conventional Commits:** all commits follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

**Format:** `type(scope): description`

**Commit Types:**

- `feat` - new features or enhancements
- `fix` - bug fixes and corrections
- `docs` - documentation updates
- `style` - code formatting changes
- `refactor` - code restructuring
- `test` - test additions or modifications
- `chore` - build process or tooling updates

**Examples:**

```bash
feat(auth): add user authentication system
fix(api): resolve data fetching timeout issues
docs(readme): update installation instructions
test(components): add coverage for button variants
```

**Commit Hook:** `.husky/prepare-commit-msg` - interactive commit creation

---

## Contribution Guidelines

### Pre-Submission Checklist

- [ ] all tests pass locally (`npm run test`)
- [ ] typescript compilation succeeds (`npm run tsc`)
- [ ] code quality checks pass (`npm run lint`)
- [ ] code formatting is consistent (`npm run format`)
- [ ] new functionality includes test coverage
- [ ] documentation updated for significant changes

### Pull Request Standards

**Submission Requirements:**

- **Descriptive title** - clear summary following conventional commit format
- **Detailed description** - explanation of changes and motivation
- **Issue references** - link to related issues when applicable
- **Screenshots** - visual changes require before/after images
- **Breaking changes** - clearly documented if applicable

**Review Process:**

- automated ci checks must pass
- code review approval required
- documentation accuracy validated
- performance impact assessed

### Code Standards

**TypeScript Guidelines:**

- strict type checking enabled
- explicit return types for public functions
- proper interface definitions
- effective use of generic types

**Component Guidelines:**

- pascalcase naming with descriptive names
- clear typescript interfaces for props
- testing coverage for behavior and interactions
- semantic html and accessibility attributes

**Testing Requirements:**

- minimum 80% coverage for new functionality
- user-centric testing with react testing library
- service integration testing with mocking
- hook testing with provider context

Learn more: [Conventional Commits](https://www.conventionalcommits.org/) | [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)

---

## Testing Utilities ✅

### Mock Implementation Examples

**Service Mocking:**

```bash
# http service mocking patterns:
app/services/http/rest/rest.test.ts
app/services/http/graphql/graphql.test.ts
```

**Component Testing:**

```bash
# component testing utilities:
vitest.setup.ts

# component test examples:
app/components/ui/logo/logo.test.tsx
app/views/home/components/*/
```

### Test Environment Setup

**Provider Testing:**

```bash
# query provider testing patterns:
app/services/http/providers/react-query.test.tsx
```

**Mock Strategy Benefits:**

- **Predictable testing** - consistent test data
- **Isolation** - test units without external dependencies
- **Speed** - fast test execution without network calls

---

## 📊 Quality Metrics ✅

### Coverage Configuration

**Coverage Targets:**

- **Branches:** 80% minimum
- **Functions:** 80% minimum
- **Lines:** 80% minimum
- **Statements:** 80% minimum

**Coverage Focus:**

- business logic components prioritized
- configuration files excluded
- generated content excluded

**Reporting:**

- **Console output** - development feedback
- **LCOV reports** - ide integration
- **HTML reports** - visual coverage analysis

### Performance Standards

**Build Performance:**

- typescript compilation optimization
- test execution efficiency
- lint processing on changed files only

**Developer Experience:**

- fast feedback loops
- clear error messages
- ide integration reducing manual verification

---

_Ready to contribute? Start with [Getting Started](getting-started.md) for setup, then explore [Architecture](architecture.md) to understand project patterns._

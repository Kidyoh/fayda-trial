# Documentation Directory Structure Guide

## Overview

This guide explains how to organize documentation in the `docs/` directory for maximum clarity and maintainability.

## Directory Structure

```
docs/
├── README.md                          # Main documentation index
├── DIRECTORY_STRUCTURE.md             # This file
├── templates/                         # Documentation templates
│   ├── refactor-template.md
│   ├── implementation-guide-template.md
│   └── api-specification-template.md
├── features/                          # Feature-specific documentation
│   ├── auth/                         # Authentication features
│   │   ├── signup/
│   │   │   └── signup-refactor-summary.md
│   │   ├── login/
│   │   └── forgot-password/
│   ├── learning/                     # Learning features
│   │   ├── courses/
│   │   ├── packages/
│   │   └── assessments/
│   ├── commerce/                     # E-commerce features
│   │   ├── cart/
│   │   └── payments/
│   ├── competitions/                 # Competition features
│   └── user/                         # User management features
│       ├── dashboard/
│       ├── profile/
│       └── notifications/
└── api/                              # API documentation
    ├── API_SPECIFICATION.md
    ├── CART_API_SPECIFICATION.md
    └── competition.api.md
```

## Naming Conventions

### Directory Names

- Use lowercase with hyphens: `user-profile`, `payment-flow`
- Group by feature area: `auth`, `learning`, `commerce`
- Use descriptive names: `signup`, `cart`, `dashboard`

### File Names

- Use kebab-case: `signup-refactor-summary.md`
- Include the feature name: `{feature}-{type}.md`
- Be descriptive: `cart-api-specification.md`

### File Types

- **Refactor Documentation**: `{route-name}-refactor-summary.md`
- **Implementation Guides**: `{feature}-implementation-guide.md`
- **API Documentation**: `{api-name}-specification.md`
- **Feature Documentation**: `{feature}-documentation.md`

## When to Create New Documentation

### Create New Feature Directory When:

- Working on a new major feature
- Refactoring an entire route/component
- Adding comprehensive documentation for a feature area

### Create New Documentation File When:

- Completing a refactor
- Implementing a new feature
- Documenting API changes
- Adding implementation guides

## Documentation Templates

### Refactor Documentation

Use `templates/refactor-template.md` for documenting code refactoring efforts.

### Implementation Guides

Use `templates/implementation-guide-template.md` for step-by-step implementation documentation.

### API Documentation

Use `templates/api-specification-template.md` for API endpoint documentation.

## Best Practices

### 1. **Organize by Feature, Not by File Type**

```
❌ docs/refactors/signup.md
✅ docs/features/auth/signup/signup-refactor-summary.md
```

### 2. **Use Consistent Naming**

```
❌ SignupRefactor.md
✅ signup-refactor-summary.md
```

### 3. **Include Route Information**

Always include the route path and component location in documentation.

### 4. **Link Related Files**

Include links to related components, hooks, and utilities.

### 5. **Keep Documentation Current**

Update documentation when making changes to features.

## Examples

### Good Documentation Structure

```
docs/features/auth/signup/
├── signup-refactor-summary.md
├── signup-implementation-guide.md
└── signup-testing-guide.md
```

### Good File Names

- `signup-refactor-summary.md`
- `cart-api-specification.md`
- `dashboard-implementation-guide.md`
- `payment-flow-documentation.md`

### Good Directory Names

- `auth/` (authentication features)
- `learning/` (learning-related features)
- `commerce/` (e-commerce features)
- `user/` (user management features)

## Maintenance

### Regular Tasks

1. **Review documentation** for outdated information
2. **Update links** when files are moved
3. **Add new documentation** for new features
4. **Archive old documentation** when features are deprecated

### When to Update

- After completing a refactor
- When adding new features
- When changing API endpoints
- When modifying component structure

This structure ensures that documentation is easy to find, maintain, and understand for all team members.

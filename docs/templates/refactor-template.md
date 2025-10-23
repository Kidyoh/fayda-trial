## Refactor Checklist (Fayida Academy)

- Use server components by default; client components only for interactivity.
- Replace `useEffect` fetches with React Query hooks.
- Use centralized API client in `src/lib/api/client.ts` and `API_BASE`.
- Remove direct localStorage token usage; use HttpOnly cookies (backend) and `useAuth`.
- Use `next/image` over `<img>` and paginate/virtualize long lists.
- Split components > 250–400 LOC into feature folders.

# {Feature Name} Refactor Documentation

## Overview

This document outlines the comprehensive refactor of the {feature name} page/component to address multiple issues and improve code quality, maintainability, and user experience.

## Route Information

- **Route**: `/{route-path}`
- **Component**: `{component-path}`
- **Feature**: {Feature Description}
- **Refactor Date**: {Date}

## Issues Addressed

### 1. **{Issue Category}** ✅ FIXED

**Problems:**

- {List specific problems}

**Solutions:**

- {List specific solutions}

### 2. **{Issue Category}** ✅ FIXED

**Problems:**

- {List specific problems}

**Solutions:**

- {List specific solutions}

## New File Structure

```
{Show new file structure}
```

## Key Improvements

### 1. **{Improvement Category}**

{Description of improvement}

### 2. **{Improvement Category}**

{Description of improvement}

## Usage

{How to use the refactored component/feature}

## Related Files

- [{File Name}]({relative-path})
- [{File Name}]({relative-path})
- [{File Name}]({relative-path})

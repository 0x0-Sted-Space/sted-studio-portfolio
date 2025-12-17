---
inclusion: always
---

# CRITICAL SECURITY GUARDRAILS - ALWAYS ENFORCE

## 🚨 ABSOLUTE PROHIBITIONS - NEVER VIOLATE THESE

### 1. NEVER Copy Environment Variables to Documentation Files

**FORBIDDEN ACTIONS:**
- ❌ NEVER copy actual values from `.env.local`, `.env.production`, or any `.env` file into markdown files
- ❌ NEVER paste environment variable values into README.md, DEPLOYMENT.md, or ANY .md file
- ❌ NEVER include real API keys, secrets, tokens, or credentials in documentation
- ❌ NEVER create temporary files with environment variable values
- ❌ NEVER commit files containing actual secret values

**ALLOWED ACTIONS:**
- ✅ ONLY use placeholder values like `your_value_here`, `<YOUR_KEY>`, `***REDACTED***`
- ✅ ONLY reference `.env.example` with placeholder values
- ✅ ONLY provide instructions on WHERE to find/set values, never the actual values

### 2. Environment Variable Handling Rules

**When working with environment variables:**

1. **Reading**: Only read `.env.example` for documentation purposes
2. **Never Read for Documentation**: NEVER read `.env.local`, `.env.production`, `.env` for copying to docs
3. **Placeholders Only**: Always use generic placeholders in all documentation
4. **Verification**: Before writing any markdown file, verify NO actual secrets are included

### 3. File Type Restrictions

**Files that MUST NEVER contain real secrets:**
- *.md (all markdown files)
- *.txt (text files)
- *.json (except package.json, tsconfig.json, etc.)
- *.yml / *.yaml (except necessary config files)
- Any file tracked by git that isn't explicitly for secrets

**Files that CAN contain secrets (but must be gitignored):**
- .env.local
- .env.production
- .env (if used)
- Any file listed in .gitignore

### 4. Pre-Commit Mental Checklist

Before ANY file write operation, verify:
- [ ] Am I writing to a markdown file?
- [ ] Does the content contain any values from .env.local or .env.production?
- [ ] Are there any API keys, tokens, or secrets in the content?
- [ ] Would this expose sensitive information if committed to git?

**If ANY answer is YES, STOP and use placeholders instead.**

### 5. Documentation Patterns

**CORRECT Pattern:**
```markdown
## Environment Setup

Create a `.env.local` file with:

```env
NEXT_PUBLIC_STACK_PROJECT_ID=your_project_id_here
STACK_SECRET_SERVER_KEY=your_secret_key_here
```

Get these values from your Stack Auth dashboard.
```

**WRONG Pattern (NEVER DO THIS):**
```markdown
## Environment Setup

Use these values:

```env
NEXT_PUBLIC_STACK_PROJECT_ID=proj_abc123xyz789
STACK_SECRET_SERVER_KEY=sk_live_abc123xyz789secret
```
```

### 6. Git Commit Safety

**Before ANY git commit:**
1. Verify `.gitignore` includes all secret files
2. Check that no markdown files contain actual secrets
3. Review the diff to ensure no sensitive data is staged
4. Use `git diff --staged` to double-check

**Protected Files (must be in .gitignore):**
- .env.local
- .env.production
- .env
- *.env.local
- *.env.production
- Any file with actual credentials

### 7. Emergency Response

**If secrets are accidentally exposed:**
1. IMMEDIATELY rotate all exposed credentials
2. Remove the sensitive content from files
3. If committed, use `git filter-branch` or BFG Repo-Cleaner
4. Update all affected services with new credentials
5. Review git history to ensure complete removal

### 8. Code Review Checklist

**Before completing any task, verify:**
- [ ] No `.env.local` or `.env.production` values in markdown files
- [ ] All documentation uses placeholder values only
- [ ] `.gitignore` properly excludes all secret files
- [ ] No temporary files with secrets were created
- [ ] All API keys and tokens are properly secured

## 🛡️ ENFORCEMENT

These rules are MANDATORY and MUST be followed at ALL times. No exceptions.

**If uncertain:** Always err on the side of caution. Use placeholders. Never expose real values.

**Remember:** Once a secret is committed to git, it's compromised forever, even if deleted later.

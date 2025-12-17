# Security Policy

## 🔒 Environment Variable Security

### Critical Rules

1. **NEVER commit actual environment variables to git**
   - All secret values must be in `.env.local` or `.env.production`
   - These files are gitignored and should never be committed

2. **Documentation must use placeholders only**
   - ✅ CORRECT: `STACK_SECRET_SERVER_KEY=your_secret_key_here`
   - ❌ WRONG: `STACK_SECRET_SERVER_KEY=sk_live_abc123xyz789`

3. **Protected files** (must never be committed):
   - `.env.local`
   - `.env.production`
   - `.env` (if used)
   - Any file containing actual API keys or secrets

### Setup Instructions

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your actual values in `.env.local` (this file is gitignored)

3. Get credentials from:
   - Stack Auth: https://app.stack-auth.com
   - Other services: [list your services]

### Automated Protection

This repository includes:
- **Pre-commit hooks**: Scan for secrets before commits
- **GitHub Actions**: Automated security scanning on push
- **Gitignore rules**: Prevent accidental commits of secret files

### If Secrets Are Exposed

If you accidentally commit secrets:

1. **Immediately rotate all exposed credentials**
2. **Remove from git history**:
   ```bash
   # Use BFG Repo-Cleaner or git filter-branch
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch PATH_TO_FILE" \
     --prune-empty --tag-name-filter cat -- --all
   ```
3. **Force push** (coordinate with team):
   ```bash
   git push origin --force --all
   ```
4. **Update all services** with new credentials

### Reporting Security Issues

If you discover a security vulnerability, please email: [your-security-email]

**Do not** create public GitHub issues for security vulnerabilities.

## Best Practices

1. Use environment variables for all secrets
2. Never hardcode credentials in source code
3. Regularly rotate API keys and tokens
4. Use different credentials for development and production
5. Enable 2FA on all service accounts
6. Review git diffs before committing
7. Use `.env.example` as a template with placeholders only

## Verification Checklist

Before every commit:
- [ ] No actual secrets in markdown files
- [ ] `.env.local` and `.env.production` not staged
- [ ] All documentation uses placeholder values
- [ ] Pre-commit hooks passed
- [ ] Git diff reviewed for sensitive data

# Common Web Vulnerabilities (XSS, SQL Injection)

The web runs on trust — trust that user input is safe, trust that data is sanitized. When that trust is misplaced, things go wrong fast. Let's look at two of the most dangerous web vulnerabilities.

## Cross-Site Scripting (XSS)

XSS happens when an attacker injects malicious JavaScript into a web page that other users see. The script runs in the victim's browser, potentially stealing cookies, session tokens, or personal data.

There are three main types:
- **Stored XSS** — malicious script saved on the server (most dangerous)
- **Reflected XSS** — script comes from the current request
- **DOM-based XSS** — vulnerability in client-side code

### Prevention

- **Input validation** — reject or sanitize unexpected input
- **Output encoding** — escape special characters before displaying
- **Content Security Policy (CSP)** — restrict what scripts can run
- **HTTPOnly cookies** — prevent JavaScript from accessing session cookies

Never trust user input. Always validate, sanitize, and encode.

## SQL Injection

SQL injection happens when user input is inserted directly into a database query without sanitization. An attacker can manipulate the query to access, modify, or delete data.

```sql
-- Vulnerable code
SELECT * FROM users WHERE username = '$user_input';

-- Attack input: ' OR '1'='1
SELECT * FROM users WHERE username = '' OR '1'='1';
```

That simple injection bypasses the authentication entirely.

### Prevention

- **Parameterized queries** — separate SQL code from user data
- **Prepared statements** — compile the query first, bind parameters after
- **Stored procedures** — precompiled database logic
- **ORMs** — frameworks that handle SQL safely

```sql
-- Safe: parameterized query
SELECT * FROM users WHERE username = ?;
```

Never concatenate user input into SQL queries. Ever.

## Input Validation

Validate all input on both client and client-side:

- Check data types (numbers, strings, dates)
- Enforce length limits
- Whitelist allowed characters
- Reject unexpected input entirely

Client-side validation improves user experience, but server-side validation is what actually protects you.

> 💡 Tip: Use security scanning tools like OWASP ZAP or Burp Suite to test your web applications for these vulnerabilities. Automated scanning catches what manual review often misses.

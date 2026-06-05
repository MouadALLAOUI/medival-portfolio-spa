# API Documentation

This project communicates with a backend API for visitor tracking and other features.

## Base URLs

| Environment | URL |
|---|---|
| Development | `http://localhost/medival-portfolio-apis/api` |
| Production | Set via `VITE_API_URL` env variable |

## Authentication

API requests use an API key sent via the `X-API-Key` header:

```
X-API-Key: <VITE_API_KEY>
```

## Endpoints

### Visitor Tracking

#### `POST /visit`

Track a page visit.

**Request Body:**
```json
{
  "page": "/blogs/my-post",
  "referrer": "https://google.com",
  "timestamp": "2025-01-15T10:30:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "visitorId": "abc123",
  "isNewVisitor": false
}
```

**Status Codes:**
- `200` — Success
- `400` — Bad request (missing required fields)
- `401` — Unauthorized (invalid API key)
- `429` — Rate limited

### Contact Form

#### `POST /contact`

Send a message via the contact form.

**Request Body:**
```json
{
  "name": "Sir Lancelot",
  "email": "lancelot@camelot.com",
  "subject": "Quest Inquiry",
  "message": "I seek the Holy Grail...",
  "honeypot": ""
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your raven has been sent!"
}
```

**Status Codes:**
- `200` — Message sent
- `400` — Validation error
- `403` — Spam detected (honeypot filled)
- `429` — Rate limited

## Rate Limiting

All endpoints are rate-limited to prevent abuse:
- **Visitor tracking**: 60 requests per minute per IP
- **Contact form**: 5 requests per minute per IP

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message description"
}
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | Yes | Base URL for API requests |
| `VITE_API_KEY` | Yes | API key for authentication |
| `VITE_BACKEND_URL` | No | Backend URL (used for non-API requests) |

## Adding New Endpoints

When adding new API endpoints:

1. Add the fetch call in `src/lib/utils/` or the relevant component
2. Use the `VITE_API_URL` base URL from `src/config/env.js`
3. Include the `X-API-Key` header
4. Handle errors gracefully with the Alert system
5. Document the endpoint here

# How To Use This Project

This project is a reusable backend for contact forms. You can run one backend, create forms through the admin API, and submit form data from static websites.

## Requirements

- Node.js 22 or later
- npm
- Docker with Docker Compose

## 1. Install Dependencies

```bash
npm install
```

## 2. Create Environment File

Copy the example environment file:

```bash
cp .env.example .env
```

Open `.env` and set these important values:

```env
ADMIN_API_KEY=replace-with-at-least-24-random-characters
DATA_ENCRYPTION_KEY=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
DATABASE_URL=postgres://forms:forms@localhost:5432/forms
PUBLIC_BASE_URL=https://contact.kirandhakal.me/
TURNSTILE_SECRET_KEY=
```

`ADMIN_API_KEY` is used for admin requests. `DATA_ENCRYPTION_KEY` must be exactly 64 hexadecimal characters.
Set `TURNSTILE_SECRET_KEY` in production to require Cloudflare Turnstile verification for every submission.

## 3. Start PostgreSQL

```bash
docker compose up -d postgres
```

## 4. Run Database Migrations

```bash
npm run migrate
```

## 5. Start The API Server

```bash
npm run dev
```

The API runs at:

```text
https://contact.kirandhakal.me/
```

Check that it is alive:

```bash
curl https://contact.kirandhakal.me//health/live
```

Expected response:

```json
{
  "status": "ok"
}
```

## 6. Start The Worker

Open a second terminal and run:

```bash
npm run worker
```

The worker sends queued email or webhook deliveries.

## 7. Create A Contact Form

Use the admin API to create a form:

```bash
curl -X POST https://contact.kirandhakal.me//v1/admin/forms \
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "tenantName": "Demo Site",
    "name": "Contact Form",
    "allowedOrigins": ["http://localhost:3000", "http://localhost:8080"],
    "successMessage": "Thanks, your message was sent.",
    "honeypotField": "_website",
    "schema": {
      "type": "object",
      "additionalProperties": false,
      "required": ["name", "email", "topic"],
      "properties": {
        "name": { "type": "string", "minLength": 2, "maxLength": 100 },
        "email": { "type": "string", "format": "email", "maxLength": 254 },
        "topic": { "type": "string", "enum": ["sales", "support"] },
        "message": { "type": "string", "maxLength": 2000 }
      }
    },
    "destinations": []
  }'
```

The response includes a `publicKey` and `submitUrl`. Save the `publicKey`; the frontend uses it to submit messages.

### Register the Gourav inquiry form

The Gourav project is already wired to this backend. Run the API on port `3100`; the existing frontend can remain on `3000` and Gourav runs on `3001`. Register the form once:

```bash
npm run register:form -- forms/gourav-inquiry.json
```

Copy the generated public key into `gourav/.env.local`:

```env
NEXT_PUBLIC_CONTACT_API_URL=https://contact.kirandhakal.me/
NEXT_PUBLIC_GOURAV_INQUIRY_FORM_KEY=frm_generated_key
```

Use `gourav/.env.example` as the template. For every additional frontend or form type, create another JSON definition and register it separately. For example, an enrolment form gets its own public key even when it belongs to the same website. This keeps its data and traffic counts separate.

## 8. Submit A Form

Replace `YOUR_PUBLIC_KEY` with the public key from the previous step:

```bash
curl -X POST https://contact.kirandhakal.me//v1/forms/YOUR_PUBLIC_KEY/submissions \
  -H "Origin: http://localhost:8080" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: test-submit-001" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "topic": "support",
    "message": "Hello from the test form."
  }'
```

Expected response status is `202 Accepted` for a new submission.

If `TURNSTILE_SECRET_KEY` is set, submissions must also include a valid Turnstile token:

```bash
curl -X POST https://contact.kirandhakal.me//v1/forms/YOUR_PUBLIC_KEY/submissions \
  -H "Origin: http://localhost:8080" \
  -H "Content-Type: application/json" \
  -H "Turnstile-Token: TOKEN_FROM_FRONTEND_WIDGET" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "topic": "support"
  }'
```

## 9. Use The Example HTML Form

Open [examples/contact-form.html](./examples/contact-form.html).

Replace this line:

```js
const endpoint = 'https://contact.kirandhakal.me//v1/forms/REPLACE_PUBLIC_KEY/submissions';
```

with your real form submit URL:

```js
const endpoint = 'https://contact.kirandhakal.me//v1/forms/YOUR_PUBLIC_KEY/submissions';
```

Then serve the example file from an allowed origin, for example:

```bash
npx serve examples -l 8080
```

Open:

```text
http://localhost:8080/contact-form.html
```

## 10. View Submissions

```bash
curl https://contact.kirandhakal.me//v1/admin/forms/YOUR_PUBLIC_KEY/submissions \
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY"
```

## 11. Compare frontend traffic

Use the admin-only summary endpoint to see which registered form receives the most submissions. It includes total, accepted, spam, last-submitted time, and browser-origin counts without returning the form payloads.

```bash
curl https://contact.kirandhakal.me//v1/admin/forms/summary \
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY"
```

## Useful Commands

```bash
npm run dev        # Start API in watch mode
npm run worker     # Start delivery worker
npm run migrate    # Run database migrations
npm test           # Run tests
npm run typecheck  # Check TypeScript types
npm run build      # Build dist output
```

## Common Problems

### Invalid admin token

Make sure the value in the request header matches `ADMIN_API_KEY` from `.env`:

```text
Authorization: Bearer YOUR_ADMIN_API_KEY
```

### Origin is not allowed

The browser origin must exactly match one of the values in `allowedOrigins`. For local testing, add the port you are using, such as:

```json
["http://localhost:8080"]
```

### Bot verification failed

If `TURNSTILE_SECRET_KEY` is set, your frontend must render a Cloudflare Turnstile widget and send the returned token in this request header:

```text
Turnstile-Token: TOKEN_FROM_FRONTEND_WIDGET
```

### Database not ready

Start PostgreSQL and run migrations:

```bash
docker compose up -d postgres
npm run migrate
```
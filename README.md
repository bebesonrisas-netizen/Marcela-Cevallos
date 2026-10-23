# Finova

Finance organiser for Personal and Business. Financial records and documents remain in browser storage. Account sign-in does not synchronise these records.

## Validation

Run `npm ci && npm test`. Tests cover backup v1/v2 restore, rollback, seven UI languages, multilingual transaction parsing, receipt number/date parsing, camera permission/track lifecycle, speech callbacks, OCR review/worker cleanup, and subscription security/lifecycle.

A separate Tesseract.js 5.1.1 engine check recognised a synthetic receipt (24.20 EUR, 2026-10-23) correctly. This engine check ran in Node; hosted browser worker downloads and physical devices still need user-device verification.

Camera, speech and OCR adapter tests simulate device/engine callbacks. They do not certify physical camera/microphone access, live speech recognition, external OCR worker downloads, or payment completion in a hosted Checkout.

## Test billing only

The code refuses live Stripe keys, events and subscriptions, and validates the account ID against the existing Finova sandbox (`acct_1UNYwq0WT1XqdqLb`). No production billing mode is implemented.

The Functions code supplies the public test-mode and portal defaults directly, so no additional hosting variables are needed for them. An explicit `FINOVA_BILLING_MODE=disabled` remains a kill switch. `netlify.toml` also records these non-secret settings. Netlify must separately contain sandbox credentials, available to Functions:

- `STRIPE_SECRET_KEY`: a sandbox restricted key (`rk_test_…`) or existing test key for that account; needs account read, customers read/write/search, prices read, subscriptions read, Checkout read/write, and Customer Portal write.
- `STRIPE_WEBHOOK_SECRET`: signing secret for the existing sandbox endpoint `we_1UNbpK0WT1XqdqLbXOtL8Oph`. Never place secrets in Git.
- `FINOVA_BILLING_MODE=test` and `STRIPE_PORTAL_CONFIGURATION=bpc_1UTp1i0WT1XqdqLbOgaNDm1w` are non-secret values provided in the hosting configuration.

Netlify Identity sessions are verified server-side against the canonical site's `/user` endpoint. Confirmed account IDs are mapped to sandbox Customers using metadata because there is no application database. Customer creation uses a stable idempotency key. Subscription status is read from Stripe for every query; customer metadata is only an event-maintained mirror, never the entitlement authority. Duplicate customer mappings and incomplete pagination fail closed.

The webhook verifies signatures over raw (including base64-decoded) request bodies, handles checkout completion/delayed payment results, subscription creation/update/deletion and invoice paid/failed events, and recomputes state from Stripe. Reordered/retried events do not overwrite state from stale event payloads. Unpaid invoices, past-due and cancelled subscriptions cannot grant access. End-of-period cancellations preserve access until Stripe changes the subscription's actual status. The Portal allows cancellation at period end and payment method updates; plan switching is disabled during testing.

Before calling this integration complete, a confirmed test user must complete hosted Checkout and then cancel through the Portal. Verify signed webhook delivery and state changes in Finova, including a failed renewal. These require working deployment credentials and access to the test account. Return URLs and localStorage never activate Premium. Existing free tools remain available; no paid feature enforcement or production monetisation is claimed.

Before selling paid subscriptions, decide and implement the actual paid feature set, replace the metadata mapping with a durable application account mapping if needed for production, publish complete terms/privacy/operator details, and review applicable tax registrations. Automatic tax is not enabled.

## Media and language

The app UI supports Spanish, English, French, German, Italian, Portuguese and Swedish. Saved descriptions and document names retain their original text. Informational articles remain Spanish. OCR runs in-browser using Tesseract.js 5.1.1 loaded on demand; users must review extracted fields and confirm before saving. PDF storage is supported; PDF OCR is not. The browser's speech service may process audio externally; the app displays this before dictation.

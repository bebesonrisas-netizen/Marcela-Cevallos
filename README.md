# m.cfinova

Finance organiser for Personal and Business. Financial records and documents remain in browser storage. Account sign-in does not synchronise these records.

## Validation

Run `npm ci && npm test`. Tests cover backup v1/v2 restore, rollback, seven UI languages, multilingual transaction parsing, receipt number/date parsing, camera permission/track lifecycle, speech callbacks, OCR review/worker cleanup, and subscription security/lifecycle, including explicit cancellation timestamps and isolation between test and live mode.

A separate Tesseract.js 5.1.1 engine check recognised a synthetic receipt (24.20 EUR, 2026-10-23) correctly. This engine check ran in Node; hosted browser worker downloads and physical devices still need user-device verification.

Camera, speech and OCR adapter tests simulate device/engine callbacks. They do not certify physical camera/microphone access, live speech recognition, external OCR worker downloads, or payment completion in a hosted Checkout.

## Billing environments

The deployed default remains test mode in the existing Finova sandbox (`acct_1UNYwq0WT1XqdqLb`). Production mode is prepared but is not activated: it requires `FINOVA_BILLING_MODE=live`, a live restricted key, a live webhook signing secret and a live Customer Portal configuration. The expected live account is `acct_1UNYwe0G40NrtpeH`. Mode, key prefix, account, price, subscription and webhook event must agree. Test and live records are never interchangeable.

The Functions code supplies the public test-mode and portal defaults directly, so no additional hosting variables are needed for them. An explicit `FINOVA_BILLING_MODE=disabled` remains a kill switch. `netlify.toml` also records these non-secret settings. Netlify must separately contain sandbox credentials, available to Functions:

- `STRIPE_SECRET_KEY`: a sandbox restricted key (`rk_test_…`) or existing test key for that account; needs account read, customers read/write/search, prices read, subscriptions read, Checkout read/write, and Customer Portal write.
- `STRIPE_WEBHOOK_SECRET`: signing secret for the existing sandbox endpoint `we_1UNbpK0WT1XqdqLbXOtL8Oph`. Never place secrets in Git.
- `FINOVA_BILLING_MODE=test` and `STRIPE_PORTAL_CONFIGURATION=bpc_1UTp1i0WT1XqdqLbOgaNDm1w` are non-secret values provided in the hosting configuration.

Netlify Identity sessions are verified server-side against the canonical site's `/user` endpoint. Confirmed account IDs are mapped to sandbox Customers using metadata because there is no application database. Customer creation uses a stable idempotency key. Subscription status is read from Stripe for every query; customer metadata is only an event-maintained mirror, never the entitlement authority. Duplicate customer mappings and incomplete pagination fail closed.

The webhook verifies signatures over raw (including base64-decoded) request bodies, handles checkout completion/delayed payment results, subscription creation/update/deletion and invoice paid/failed events, and recomputes state from Stripe. Reordered/retried events do not overwrite state from stale event payloads. Unpaid invoices, past-due and cancelled subscriptions cannot grant access. End-of-period cancellations preserve access until Stripe changes the subscription's actual status. The Portal allows cancellation at period end and payment method updates; plan switching is disabled during testing.

Before calling this integration complete, a confirmed test user must complete hosted Checkout and then cancel through the Portal. Verify signed webhook delivery and state changes in Finova, including a failed renewal. These require working deployment credentials and access to the test account. Return URLs and localStorage never activate Premium. Existing free tools remain available. Premium personal monthly reports and Pro business reports are enforced by the server through subscription entitlement checks; production monetisation is not active.

Before selling paid subscriptions, verify the report flow in hosted Checkout, replace the metadata mapping with a durable application account mapping if needed for production, publish complete terms/privacy/operator details, and review applicable tax registrations. Automatic tax is not enabled.

## Media and language

The app UI supports Spanish, English, French, German, Italian, Portuguese and Swedish. Saved descriptions and document names retain their original text. Informational articles remain Spanish. OCR runs in-browser using Tesseract.js 5.1.1 loaded on demand; users must review extracted fields and confirm before saving. PDF storage is supported; PDF OCR is not. The browser's speech service may process audio externally; the app displays this before dictation.

## Advertising and launch prerequisites

Editorial guides are linked from the application and listed in sitemap.xml. AdSense account verification metadata and ads.txt use the existing publisher ID. Financial screens, sign-in, contact and privacy pages contain no ad loader. assets/finova-ads.js is disabled by default and is loaded only by the two detailed editorial articles. Before enabling it, confirm AdSense approval, publish a Google-certified CMP and configure an actual ad slot. The loader requires explicit CMP consent before any advertising request. A custom notice is not a certified CMP. No ad impressions or revenue are claimed.

Before collecting real subscriptions, publish the operator's confirmed business/legal details and complete privacy and subscription terms, validate the published paid report benefits, configure the live product prices and portal, and install the live key and webhook secret in hosting. Stripe currently reports charges and payouts enabled; this does not configure these application prerequisites. Never copy test prices, portal IDs or webhook secrets into live configuration. Automatic tax remains off; no tax registration is inferred.

Confirmed sandbox QA on 24 October 2026: a synthetic paid subscription activated Premium through the deployed webhook; cancellation returned it to free/inactive. A separate user-completed hosted checkout and portal cancellation produced an active sandbox subscription with cancel_at equal to its period end. Subscription status now reports cancellation_scheduled and cancel_at even when Stripe's cancel_at_period_end boolean is false.


## Release 30 October 2026

Public branding is m.cfinova. Storage keys, origin, account mapping and billing lookup keys are intentionally unchanged.

Premium adds personal monthly category reports, previous-month comparisons, CSV download and a printable report (browser Save PDF). Pro adds business monthly reports. Existing free tools remain available. Reports require a confirmed authenticated account and server-verified subscription on each request; browser flags cannot grant access. Only monthly category aggregates are sent, after explicit consent. The report endpoint does not persist the submitted aggregates. Financial records are still local, without cross-device sync.

The web manifest includes app icons, an Apple touch icon and an optional install action. This is browser installation, not a native App Store / Google Play release; offline availability is not promised. Download a backup before changing browsing context.

Live account audit on 30 October: charges and payouts enabled; zero matching live prices for the four existing lookup keys, and zero active live Customer Portal configurations. Live hosting credentials, operator postal contact, complete subscription/privacy terms, tax treatment and hosted end-to-end checks remain prerequisites. Do not claim the app is selling live subscriptions.


## Subscription invoice preparation

Checkout now requires billing address and saves name/address on the authenticated Stripe Customer, with optional tax ID collection. Subscription-mode invoices are generated by Stripe; no separate one-off invoice is created. Customer-owned invoices (latest 24, excluding drafts and the other billing environment) can be viewed from the Premium modal even after cancellation. PDF/hosted invoice links are limited to Stripe HTTPS domains. This is separate from the free local bill organiser and does not certify tax compliance.

Live activation is blocked until the real Stripe account is authorised, live prices/portal/hosting credentials are configured, seller details and subscription terms are complete, and the tax treatment is confirmed. Do not declare VAT exemption or hobby classification from low/no revenue alone. Skatteverket registrations are free; paid name protection and store memberships have not been purchased.

# PocketProof — Release Candidate (Web/PWA)

A mobile-first local item and warranty tracker.

## Open
Open `index.html` in a modern browser or publish the files on a static host. For PWA/offline support, use HTTPS hosting.

## Features in this candidate
- Add/edit/delete items
- Brand, category, serial/model, purchase date, warranty expiry, price, notes
- Optional small item/receipt image
- Search, warranty status filter, sort
- JSON backup export and import
- Notification permission and reminder checks when the app opens
- English interface, responsive layout

## Data and reminders
Records are stored in browser localStorage on this device. There is no account, cloud sync, encryption, or guaranteed background reminder scheduling. Export backups regularly and keep them private. Large images can fill browser storage.

## Commercial status
This is a **release candidate for testing, not a finished product ready for sale**. There is no Google Play Billing or premium unlock implementation, no signed Android package, no comprehensive QA, and no verified store compliance. See `RELEASE-CHECKLIST.md` and `PRIVACY-POLICY-DRAFT.md`.

Do not market it as production-ready until these blockers are resolved.

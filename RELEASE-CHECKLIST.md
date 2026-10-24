# PocketProof release checklist

This is a **candidate build**, not yet production-ready and not approved for sale.

## Implemented in this candidate
- Responsive English-language web interface
- Add/edit/delete item records
- Search, warranty status filter, sorting
- Optional small image attachment stored locally
- JSON export and import (import replaces current list after confirmation)
- Basic notification prompt and expiry checks when app opens
- Date validation for warranty before purchase

## Known limitations / blockers before commercial release
- Data is stored in browser localStorage; it is not encrypted, cloud-synced, or protected by an account. Large photos can exceed browser storage limits.
- Reminder notifications are checked when the app opens; they are not reliable scheduled background notifications.
- No Google Play Billing, one-time purchase validation, restore purchase, or premium feature gate is implemented.
- No automated test suite, device compatibility test, security review, accessibility audit, or verified store listing.
- Web manifest currently has no app icons.
- The web app has not been independently tested on target devices.
- This folder is a web app/PWA candidate, not a compiled Android APK/AAB.
- Privacy policy is a draft and must be verified against the final implementation.
- Google Play developer account, current target API, app signing, content rating, data safety form, store graphics, and policy review are still required.

## Release path
1. Test add/edit/delete/search/filter/sort/export/import and photo storage on multiple Android browsers.
2. Add automated tests and fix defects.
3. Implement robust persistent storage and user-controlled backup/restore.
4. Implement reliable reminder scheduling in the final platform.
5. Package with a maintained Android wrapper and produce signed AAB.
6. Implement Play Billing one-time product, server-side or secure purchase verification as appropriate, and restore purchases.
7. Prepare real support contact, final privacy policy, terms, icon, screenshots, listing text, and data safety disclosures.
8. Review current Google Play requirements and submit for review.
9. Only describe the app as available for sale after approval and publication.

No revenue or market demand is guaranteed.

# Android packaging notes — not a compiled app

This source includes a Capacitor scaffold, but no APK/AAB is included.

To package it, use a cloud development environment or a computer:
1. Install a supported Node.js LTS version.
2. Run `npm install`.
3. Initialize/sync the Android platform with Capacitor (`npx cap add android`, then `npx cap sync android`).
4. Open the generated Android project in a supported Android build environment.
5. Configure native notification scheduling, Android app icon assets, versioning, signing, and Play Billing.
6. Build a signed AAB and test on physical devices.

Important: This project is not yet ready for Google Play. The browser-based notification code only checks expiry dates when the web app opens; it does not guarantee background alerts. Google Play Billing and purchase validation are not implemented. Capacitor packaging alone does not make these features complete.

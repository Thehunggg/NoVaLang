# NovaLang Auth Setup

NovaLang currently has no Supabase, Firebase, or custom OAuth backend. Email and Guest modes are local-development flows; OAuth buttons never report a fake successful login.

## Web OAuth contract

Set this frontend variable in `frontend/.env.local` or the environment used to build the Web app:

```text
VITE_AUTH_API_URL=https://your-auth-backend.example.com/
```

NovaLang redirects to these backend endpoints:

```text
GET {VITE_AUTH_API_URL}/oauth/google?redirectTo=...
GET {VITE_AUTH_API_URL}/oauth/facebook?redirectTo=...
GET {VITE_AUTH_API_URL}/oauth/apple?redirectTo=...
GET {VITE_AUTH_API_URL}/oauth/instagram?redirectTo=...
```

The backend must own provider client secrets, OAuth callback validation, session creation, and the final redirect. Never put Google, Facebook, Apple, or Meta client secrets in a `VITE_` variable.

## Provider consoles

- Google: create a Web OAuth client and register the backend callback URL.
- Facebook: create a Meta app, enable Facebook Login, and register the backend callback URL.
- Apple: configure Sign in with Apple, a Services ID, key, and callback URL.
- Instagram: only enable this button after the chosen Meta product and permissions support the intended login flow.

## Flutter

Flutter exposes the same provider methods through `lib/services/auth_service.dart`. Supply the backend URL with:

```powershell
flutter run --dart-define=NOVALANG_AUTH_API_URL=https://your-auth-backend.example.com/
```

The current Android MVP reports setup requirements instead of claiming OAuth success. A production integration must add secure browser/deep-link callback handling and token storage before enabling provider login.

## Local development modes

- Email: validates the form and creates a local-only identity/profile. No email is sent and no remote account is created.
- Guest: creates no provider account and proceeds to onboarding.

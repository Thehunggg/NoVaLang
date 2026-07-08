# NovaLang Flutter Mobile

Android-first Flutter version of NovaLang. This app is separate from the existing React/Node web app.

## Open In Android Studio

1. Open Android Studio.
2. Open this folder:

   ```text
   C:\Users\thehu\OneDrive\Desktop\NovaLang\novalang\mobile\novalang_flutter
   ```

3. Run:

   ```powershell
   flutter pub get
   ```

4. Start an Android emulator.
5. Run:

   ```powershell
   flutter run
   ```

## Project Notes

- App name: NovaLang
- Android package name: `com.novalang.app`
- Main flow: Splash, mock auth, native language, learning language, goal/exam track, niche, level, Learn, Practice, Review, Flashcards, Profile.
- Current sample content focuses on Japanese Kana Starter and JLPT N5.
- TOEIC, IELTS, TOEFL, DELE, JLPT N4-N1 are intentionally marked Coming soon.
- Shared JSON mirrors live in `assets/shared/`. Canonical cross-platform copies are under the repository root `shared/config`, `shared/content`, and `shared/i18n`.

## Troubleshooting

Run:

```powershell
flutter doctor
```

If Android SDK command-line tools are missing, open Android Studio:

1. Settings
2. Languages & Frameworks
3. Android SDK
4. SDK Tools
5. Install Android SDK Command-line Tools

If Android licenses are missing:

```powershell
flutter doctor --android-licenses
```

If the debug APK build says the NDK is malformed or missing `source.properties`, reinstall that NDK from Android Studio SDK Manager. On this machine Flutter reported this folder:

```text
C:\Users\thehu\AppData\Local\Android\sdk\ndk\28.2.13676358
```

Android Studio can remove/reinstall the NDK, or you can delete that broken NDK folder and let Gradle download it again.

If no emulator is found, open Android Studio Device Manager and create/start an Android Virtual Device.

If Windows reports that plugin builds require symlink support, enable Developer Mode:

```powershell
start ms-settings:developers
```

Then enable Developer Mode and run `flutter pub get` again.

For Gradle build issues, try:

```powershell
flutter clean
flutter pub get
flutter build apk --debug
```

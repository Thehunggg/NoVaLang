import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/theme/app_theme.dart';
import '../../core/utils/localization.dart';
import '../../models/language_option.dart';
import '../../state/profile_provider.dart';
import '../../state/shared_data_provider.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/onboarding_header.dart';
import '../../widgets/common/responsive_page.dart';
import '../../widgets/language/device_language_suggestion.dart';
import '../../widgets/language/language_search_field.dart';
import '../../widgets/language/language_search_list.dart';
import '../../widgets/language/native_language_world_image.dart';

class NativeLanguageScreen extends ConsumerStatefulWidget {
  const NativeLanguageScreen({super.key});

  @override
  ConsumerState<NativeLanguageScreen> createState() =>
      _NativeLanguageScreenState();
}

class _NativeLanguageScreenState extends ConsumerState<NativeLanguageScreen> {
  String query = '';
  bool showSuggestion = true;

  @override
  Widget build(BuildContext context) {
    final profile = ref.watch(profileProvider);
    final locale = profile.uiLanguageCode;
    final catalogAsync = ref.watch(nativeLanguageCatalogProvider);

    return AppScaffold(
      title: L10n.text('nativeLanguage', locale),
      showBack: true,
      backPath: '/auth',
      languageCode: locale,
      onBeforeBack: _returnToLogin,
      child: _NativeLanguageBackdrop(
        child: ResponsivePage(
          bottomPadding: 32,
          child: catalogAsync.when(
            loading: () => const Center(child: CircularProgressIndicator()),
            error: (error, _) => Text(error.toString()),
            data: (catalog) {
              final deviceLanguage = _deviceLanguage(catalog);
              final items = catalog
                  .where((item) => item.isSupportedAsNative)
                  .toList();
              final viewportHeight = MediaQuery.sizeOf(context).height;
              final keyboardHeight = MediaQuery.viewInsetsOf(context).bottom;
              final topSpacing = (viewportHeight * 0.025).clamp(4.0, 24.0);
              final showIllustration =
                  query.trim().isEmpty &&
                  keyboardHeight == 0 &&
                  viewportHeight >= 540;
              final illustrationHeight = (viewportHeight * 0.24).clamp(
                138.0,
                220.0,
              );
              final base = Theme.of(context);

              return Center(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 680),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      SizedBox(height: topSpacing),
                      Theme(
                        data: base.copyWith(
                          textTheme: base.textTheme.copyWith(
                            headlineSmall: base.textTheme.headlineSmall
                                ?.copyWith(
                                  color: AppTheme.contentPrimaryForeground,
                                  letterSpacing: -0.45,
                                  shadows: [
                                    Shadow(
                                      color: AppTheme.authGlassShadowCyan
                                          .withValues(alpha: 0.07),
                                      blurRadius: 11,
                                    ),
                                  ],
                                ),
                          ),
                        ),
                        child: OnboardingHeader(
                          title: L10n.text('nativeLanguage', locale),
                        ),
                      ),
                      const SizedBox(height: 22),
                      if (showSuggestion &&
                          query.isEmpty &&
                          deviceLanguage != null) ...[
                        DeviceLanguageSuggestion(
                          language: deviceLanguage,
                          uiLanguageCode: locale,
                          onAccept: () => _choose(deviceLanguage),
                          onSearchAnother: () =>
                              setState(() => showSuggestion = false),
                          loginGlass: true,
                        ),
                        const SizedBox(height: 18),
                      ],
                      LanguageSearchField(
                        hint: L10n.text('searchLanguage', locale),
                        onChanged: (value) => setState(() => query = value),
                        loginGlass: true,
                      ),
                      const SizedBox(height: 18),
                      LanguageSearchList(
                        items: items,
                        locale: locale,
                        query: query,
                        onTap: _choose,
                        loginGlass: true,
                        showResultsWhenQueryEmpty: false,
                      ),
                      if (showIllustration) ...[
                        SizedBox(height: viewportHeight < 700 ? 16 : 26),
                        _NativeLanguageWorldIllustration(
                          height: illustrationHeight,
                        ),
                      ],
                    ],
                  ),
                ),
              );
            },
          ),
        ),
      ),
    );
  }

  LanguageOption? _deviceLanguage(List<LanguageOption> catalog) {
    final code = WidgetsBinding.instance.platformDispatcher.locale.languageCode;
    return catalog
        .where((item) => item.code == code && item.isSupportedAsNative)
        .firstOrNull;
  }

  Future<void> _returnToLogin() async {
    await ref.read(profileProvider.notifier).signOut();
  }

  Future<void> _choose(LanguageOption language) async {
    final uiCode = language.isAvailableForUi == true
        ? language.code
        : (language.fallbackLocale ?? 'en');
    await ref
        .read(profileProvider.notifier)
        .setNativeLanguage(language.code, uiLanguageCode: uiCode);
    if (!mounted) return;
    context.push('/onboarding/basic');
  }
}

class _NativeLanguageBackdrop extends StatelessWidget {
  const _NativeLanguageBackdrop({required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Stack(
      fit: StackFit.expand,
      clipBehavior: Clip.hardEdge,
      children: [
        const DecoratedBox(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
                AppTheme.authBackgroundTop,
                AppTheme.authBackgroundMiddle,
                AppTheme.authBackgroundBottom,
              ],
              stops: [0, 0.52, 1],
            ),
          ),
        ),
        const IgnorePointer(
          child: Opacity(
            opacity: 0.32,
            child: Align(
              alignment: Alignment(-0.82, -0.78),
              child: FractionallySizedBox(
                widthFactor: 0.78,
                heightFactor: 0.52,
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    gradient: RadialGradient(
                      colors: [AppTheme.authAmbientPurple, Colors.transparent],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
        const IgnorePointer(
          child: Opacity(
            opacity: 0.28,
            child: Align(
              alignment: Alignment(0.9, 0.12),
              child: FractionallySizedBox(
                widthFactor: 0.72,
                heightFactor: 0.5,
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    gradient: RadialGradient(
                      colors: [AppTheme.authAmbientCyan, Colors.transparent],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
        const IgnorePointer(
          child: Opacity(
            opacity: 0.26,
            child: Align(
              alignment: Alignment(-0.35, 0.96),
              child: FractionallySizedBox(
                widthFactor: 0.68,
                heightFactor: 0.38,
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    gradient: RadialGradient(
                      colors: [AppTheme.authAmbientBlue, Colors.transparent],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
        IgnorePointer(
          child: ColoredBox(
            color: AppTheme.authCardOcclusion.withValues(alpha: 0.28),
          ),
        ),
        child,
      ],
    );
  }
}

class _NativeLanguageWorldIllustration extends StatelessWidget {
  const _NativeLanguageWorldIllustration({required this.height});

  final double height;

  @override
  Widget build(BuildContext context) {
    return ExcludeSemantics(
      child: SizedBox(
        height: height,
        child: LayoutBuilder(
          builder: (context, constraints) {
            final artWidth = constraints.maxWidth.clamp(0.0, 520.0);
            final glyphSize = (height * 0.075).clamp(10.0, 16.0);
            return Center(
              child: SizedBox(
                width: artWidth,
                height: height,
                child: Stack(
                  fit: StackFit.expand,
                  clipBehavior: Clip.none,
                  children: [
                    const Align(
                      alignment: Alignment(0, 0.82),
                      child: FractionallySizedBox(
                        widthFactor: 0.76,
                        heightFactor: 0.32,
                        child: DecoratedBox(
                          decoration: BoxDecoration(
                            gradient: RadialGradient(
                              colors: [
                                AppTheme.authGlassShadowCyan,
                                Colors.transparent,
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                    _AmbientGlyph(
                      value: 'A',
                      alignment: const Alignment(-0.94, -0.62),
                      size: glyphSize,
                      color: AppTheme.authPortalPrimary,
                    ),
                    _AmbientGlyph(
                      value: '文',
                      alignment: const Alignment(-0.42, -0.94),
                      size: glyphSize,
                      color: AppTheme.authPortalSecondary,
                    ),
                    _AmbientGlyph(
                      value: 'あ',
                      alignment: const Alignment(0.38, -0.96),
                      size: glyphSize,
                      color: AppTheme.authPortalPrimary,
                    ),
                    _AmbientGlyph(
                      value: '한',
                      alignment: const Alignment(0.95, -0.34),
                      size: glyphSize,
                      color: AppTheme.authPortalSecondary,
                    ),
                    _AmbientGlyph(
                      value: 'ع',
                      alignment: const Alignment(0.9, 0.7),
                      size: glyphSize,
                      color: AppTheme.authPortalPrimary,
                    ),
                    Opacity(
                      opacity: 0.92,
                      child: const NativeLanguageWorldImage(
                        fit: BoxFit.contain,
                        filterQuality: FilterQuality.high,
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}

class _AmbientGlyph extends StatelessWidget {
  const _AmbientGlyph({
    required this.value,
    required this.alignment,
    required this.size,
    required this.color,
  });

  final String value;
  final Alignment alignment;
  final double size;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: alignment,
      child: Text(
        value,
        style: TextStyle(
          color: color.withValues(alpha: 0.16),
          fontSize: size,
          fontWeight: FontWeight.w700,
          shadows: [Shadow(color: color.withValues(alpha: 0.1), blurRadius: 7)],
        ),
      ),
    );
  }
}

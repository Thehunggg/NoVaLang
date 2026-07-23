import 'package:flutter/material.dart';

import '../../core/theme/app_theme.dart';
import '../../core/utils/localization.dart';
import '../../models/language_option.dart';
import '../common/app_button.dart';
import '../common/app_card.dart';
import 'language_picker_surface.dart';

class DeviceLanguageSuggestion extends StatelessWidget {
  const DeviceLanguageSuggestion({
    super.key,
    required this.language,
    required this.uiLanguageCode,
    required this.onAccept,
    required this.onSearchAnother,
    this.loginGlass = false,
  });

  final LanguageOption language;
  final String uiLanguageCode;
  final VoidCallback onAccept;
  final VoidCallback onSearchAnother;
  final bool loginGlass;

  @override
  Widget build(BuildContext context) {
    final languageName = language.nativeName;
    final content = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (loginGlass)
          const LanguagePickerBadge(
            child: Icon(
              Icons.language_rounded,
              color: AppTheme.contentAccentForeground,
              size: 26,
            ),
          )
        else
          Icon(Icons.language, color: Theme.of(context).colorScheme.primary),
        const SizedBox(height: 12),
        Text(
          L10n.text(
            'deviceLanguageSuggestion',
            uiLanguageCode,
          ).replaceAll('{language}', languageName),
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
            color: loginGlass ? AppTheme.contentPrimaryForeground : null,
            fontWeight: FontWeight.w800,
            height: loginGlass ? 1.4 : null,
          ),
        ),
        SizedBox(height: loginGlass ? 18 : 16),
        if (loginGlass)
          _LoginLanguageActions(
            languageName: languageName,
            uiLanguageCode: uiLanguageCode,
            onAccept: onAccept,
            onSearchAnother: onSearchAnother,
          )
        else
          Wrap(
            spacing: 10,
            runSpacing: 10,
            children: [
              AppButton(
                label: L10n.text(
                  'useDeviceLanguage',
                  uiLanguageCode,
                ).replaceAll('{language}', languageName),
                onPressed: onAccept,
              ),
              AppButton(
                label: L10n.text('searchAnotherLanguage', uiLanguageCode),
                onPressed: onSearchAnother,
                outlined: true,
              ),
            ],
          ),
      ],
    );

    if (loginGlass) {
      return LanguagePickerSurface(prominent: true, child: content);
    }
    return AppCard(child: content);
  }
}

class _LoginLanguageActions extends StatelessWidget {
  const _LoginLanguageActions({
    required this.languageName,
    required this.uiLanguageCode,
    required this.onAccept,
    required this.onSearchAnother,
  });

  final String languageName;
  final String uiLanguageCode;
  final VoidCallback onAccept;
  final VoidCallback onSearchAnother;

  @override
  Widget build(BuildContext context) {
    final base = Theme.of(context);
    return Theme(
      data: base.copyWith(
        filledButtonTheme: FilledButtonThemeData(
          style: ButtonStyle(
            backgroundColor: WidgetStateProperty.resolveWith((states) {
              if (states.contains(WidgetState.pressed)) {
                return Color.alphaBlend(
                  AppTheme.authCardOcclusion.withValues(alpha: 0.24),
                  AppTheme.authButtonPressed,
                );
              }
              if (states.contains(WidgetState.hovered)) {
                return Color.alphaBlend(
                  AppTheme.authCardOcclusion.withValues(alpha: 0.22),
                  AppTheme.authButtonHover,
                );
              }
              if (states.contains(WidgetState.focused)) {
                return AppTheme.authButtonFocus.withValues(alpha: 0.26);
              }
              return Color.alphaBlend(
                AppTheme.authCardOcclusion.withValues(alpha: 0.34),
                AppTheme.authButtonSurfaceStrong,
              );
            }),
            foregroundColor: const WidgetStatePropertyAll(
              AppTheme.authButtonForeground,
            ),
            side: WidgetStateProperty.resolveWith(
              (states) => BorderSide(
                color:
                    states.contains(WidgetState.hovered) ||
                        states.contains(WidgetState.focused) ||
                        states.contains(WidgetState.pressed)
                    ? AppTheme.authButtonBorderActive.withValues(alpha: 0.48)
                    : AppTheme.authButtonBorder.withValues(alpha: 0.34),
              ),
            ),
            minimumSize: const WidgetStatePropertyAll(Size.fromHeight(54)),
            shape: WidgetStatePropertyAll(
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            ),
            animationDuration: const Duration(milliseconds: 180),
          ),
        ),
        outlinedButtonTheme: OutlinedButtonThemeData(
          style: ButtonStyle(
            backgroundColor: WidgetStateProperty.resolveWith((states) {
              if (states.contains(WidgetState.pressed)) {
                return AppTheme.authButtonPressed.withValues(alpha: 0.32);
              }
              if (states.contains(WidgetState.hovered)) {
                return AppTheme.authButtonHover.withValues(alpha: 0.28);
              }
              if (states.contains(WidgetState.focused)) {
                return AppTheme.authButtonFocus.withValues(alpha: 0.22);
              }
              return AppTheme.authButtonSurface.withValues(alpha: 0.42);
            }),
            foregroundColor: const WidgetStatePropertyAll(
              AppTheme.contentAccentForeground,
            ),
            side: WidgetStateProperty.resolveWith(
              (states) => BorderSide(
                color:
                    states.contains(WidgetState.hovered) ||
                        states.contains(WidgetState.focused) ||
                        states.contains(WidgetState.pressed)
                    ? AppTheme.authButtonBorderActive.withValues(alpha: 0.44)
                    : AppTheme.authButtonBorder.withValues(alpha: 0.3),
              ),
            ),
            minimumSize: const WidgetStatePropertyAll(Size.fromHeight(54)),
            shape: WidgetStatePropertyAll(
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            ),
            animationDuration: const Duration(milliseconds: 180),
          ),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          AppButton(
            label: L10n.text(
              'useDeviceLanguage',
              uiLanguageCode,
            ).replaceAll('{language}', languageName),
            onPressed: onAccept,
          ),
          const SizedBox(height: 10),
          AppButton(
            label: L10n.text('searchAnotherLanguage', uiLanguageCode),
            onPressed: onSearchAnother,
            outlined: true,
          ),
        ],
      ),
    );
  }
}

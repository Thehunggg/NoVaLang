import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../core/utils/level_display.dart';
import '../../state/profile_provider.dart';
import '../../models/niche.dart';
import '../../state/shared_data_provider.dart';
import '../../widgets/common/app_button.dart';
import '../../widgets/common/app_card.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/responsive_page.dart';
import '../../widgets/common/nova_mascot.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = ref.watch(profileProvider);
    final native = profile.uiLanguageCode;
    final niches = ref.watch(nicheCatalogProvider).value ?? const <Niche>[];
    String nicheLabel(String id) =>
        niches.where((n) => n.id == id).firstOrNull?.localizedTitle(native) ??
        id;
    final nativeOption = ref.watch(
      languageByCodeProvider(profile.nativeLanguageCode),
    );
    final learningOption = ref.watch(
      languageByCodeProvider(profile.learningLanguageCode),
    );
    final nativeName = '${nativeOption.flagEmoji} ${nativeOption.nativeName}';
    final learningName =
        '${learningOption.flagEmoji} ${learningOption.nativeName}';
    final displayName = profile.displayName.isEmpty
        ? L10n.text('novaLearner', native)
        : profile.displayName;
    final initial = displayName.trim().isEmpty
        ? 'N'
        : displayName.trim()[0].toUpperCase();

    return AppScaffold(
      title: L10n.text('profile', native),
      selectedNavIndex: 4,
      child: ResponsivePage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            AppCard(
              child: Row(
                children: [
                  const NovaMascot(size: 72),
                  const SizedBox(width: 10),
                  CircleAvatar(radius: 28, child: Text(initial)),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          displayName,
                          style: Theme.of(context).textTheme.headlineSmall
                              ?.copyWith(fontWeight: FontWeight.w900),
                        ),
                        Text(
                          '${getLevelDisplayName(profile.levelCode, profile.learningLanguageCode, nativeLanguage: profile.nativeLanguageCode)} · ${profile.dailyGoalMinutes} ${L10n.text('minutesDay', native)}',
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),
            _section(
              context,
              L10n.text('userInfo', native),
              [
                _row(L10n.text('displayName', native), displayName),
                _row(
                  L10n.text('age', native),
                  profile.ageRange.isEmpty ? '-' : profile.ageRange,
                ),
                _row(
                  L10n.text('country', native),
                  profile.country.isEmpty ? '-' : profile.country,
                ),
                _row(
                  L10n.text('profileOccupation', native),
                  profile.occupationStatus.isEmpty
                      ? '-'
                      : profile.occupationStatus,
                ),
              ],
            ),
            _section(
              context,
              L10n.text('languageSettings', native),
              [
                _row(L10n.text('nativeUi', native), nativeName),
                _row(L10n.text('learningLanguageShort', native), learningName),
              ],
            ),
            AppCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    L10n.text('learningPreferences', native),
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                  const SizedBox(height: 10),
                  _row(
                    L10n.text('primaryFocus', native),
                    profile.primaryNiche == null
                        ? '-'
                        : nicheLabel(profile.primaryNiche!),
                  ),
                  _row(
                    L10n.text('selectedNiches', native),
                    profile.selectedNiches.isEmpty
                        ? '-'
                        : profile.selectedNiches
                            .map(nicheLabel)
                            .join(', '),
                  ),
                  const SizedBox(height: 10),
                  AppButton(
                    label: L10n.text('changeNiche', native),
                    icon: Icons.tune,
                    onPressed: () => context.go('/profile/preferences'),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),
            _section(context, L10n.text('progress', native), [
              _row(L10n.text('xp', native), '0'),
              _row(
                L10n.text('completedLessons', native),
                '${profile.completedLessonIds.length}',
              ),
              _row(
                L10n.text('mistakesSummary', native),
                L10n.text('comingSoonConnected', native),
              ),
            ]),
            _section(
              context,
              L10n.text('appSettings', native),
              [
                _row(
                  L10n.text('soundPronunciation', native),
                  L10n.text('enabled', native),
                ),
              ],
            ),
            _section(context, L10n.text('legal', native), [
              _row(
                L10n.text('termsOfService', native),
                L10n.text('willBeAddedLater', native),
              ),
              _row(
                L10n.text('privacyPolicy', native),
                L10n.text('willBeAddedLater', native),
              ),
            ]),
            _section(context, L10n.text('account', native), [
              _row(
                L10n.text('logout', native),
                L10n.text('comingSoonLinked', native),
              ),
              _row(
                L10n.text('deleteResetLocalData', native),
                L10n.text('comingSoonLinked', native),
              ),
            ]),
          ],
        ),
      ),
    );
  }

  Widget _section(BuildContext context, String title, List<Widget> rows) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: AppCard(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: Theme.of(
                context,
              ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900),
            ),
            const SizedBox(height: 10),
            ...rows,
          ],
        ),
      ),
    );
  }

  Widget _row(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        children: [
          Expanded(child: Text(label)),
          Flexible(
            child: Text(
              value,
              textAlign: TextAlign.end,
              style: const TextStyle(fontWeight: FontWeight.w800),
            ),
          ),
        ],
      ),
    );
  }
}

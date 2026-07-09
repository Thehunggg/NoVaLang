import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../state/profile_provider.dart';
import '../../state/shared_data_provider.dart';
import '../../widgets/common/app_button.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/responsive_page.dart';
import '../../widgets/niche/niche_group_card.dart';

class LearningPreferencesScreen extends ConsumerStatefulWidget {
  const LearningPreferencesScreen({super.key});

  @override
  ConsumerState<LearningPreferencesScreen> createState() =>
      _LearningPreferencesScreenState();
}

class _LearningPreferencesScreenState
    extends ConsumerState<LearningPreferencesScreen> {
  late Set<String> selectedIds;
  late String? primaryId;

  @override
  void initState() {
    super.initState();
    final profile = ref.read(profileProvider);
    selectedIds = profile.selectedNiches.toSet();
    primaryId = profile.primaryNiche;
  }

  @override
  Widget build(BuildContext context) {
    final profile = ref.watch(profileProvider);
    final locale = profile.uiLanguageCode;
    final groupsAsync = ref.watch(groupedNichesProvider);

    return AppScaffold(
      title: L10n.text('learningPreferences', locale),
      showBack: true,
      backPath: '/profile',
      languageCode: locale,
      selectedNavIndex: 4,
      child: ResponsivePage(
        child: groupsAsync.when(
          loading: () => const Center(child: CircularProgressIndicator()),
          error: (error, _) => Text(error.toString()),
          data: (groups) => Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              for (final entry in groups.entries) ...[
                NicheGroupCard(
                  category: entry.key,
                  niches: entry.value,
                  selectedIds: selectedIds,
                  primaryId: primaryId,
                  onToggle: _toggle,
                  onPrimary: (id) => setState(() => primaryId = id),
                  languageCode: locale,
                ),
                const SizedBox(height: 12),
              ],
              AppButton(
                label: L10n.text('saveChanges', locale),
                onPressed: selectedIds.isEmpty ? null : _save,
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _toggle(String id, bool selected) {
    setState(() {
      if (selected) {
        selectedIds.add(id);
        primaryId ??= id;
      } else {
        selectedIds.remove(id);
        if (primaryId == id) {
          primaryId = selectedIds.isEmpty ? null : selectedIds.first;
        }
      }
    });
  }

  Future<void> _save() async {
    await ref
        .read(profileProvider.notifier)
        .setNiches(selectedIds.toList(), primaryId);
    if (!mounted) return;
    await showDialog<void>(
      context: context,
      builder: (dialogContext) {
        final locale = ref.read(profileProvider).uiLanguageCode;
        final options = <String, String>{
          'placement': L10n.text('changeFocusPlacement', locale),
          'manual': L10n.text('changeFocusManual', locale),
          'restart': L10n.text('startBeginning', locale),
          'keep': L10n.text('changeFocusKeep', locale),
        };
        return AlertDialog(
          title: Text(L10n.text('changeFocusQuestion', locale)),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              for (final entry in options.entries)
                ListTile(
                  title: Text(entry.value),
                  onTap: () async {
                    await ref
                        .read(profileProvider.notifier)
                        .setNiches(
                          selectedIds.toList(),
                          primaryId,
                          decision: entry.key,
                        );
                    if (dialogContext.mounted) {
                      Navigator.of(dialogContext).pop();
                    }
                    if (!mounted) return;
                    if (entry.key == 'placement') {
                      context.go('/placement');
                    } else if (entry.key == 'manual') {
                      context.go('/onboarding/level');
                    } else if (entry.key == 'restart') {
                      await ref.read(profileProvider.notifier).setLevel('A0');
                    }
                  },
                ),
            ],
          ),
        );
      },
    );
  }
}

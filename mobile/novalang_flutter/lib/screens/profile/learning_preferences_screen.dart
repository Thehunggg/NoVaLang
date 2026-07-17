import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../models/user_profile.dart';
import '../../state/profile_provider.dart';
import '../../state/shared_data_provider.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/niche/focus_selection_layout.dart';
import '../../widgets/niche/niche_groups_list.dart';

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
  late List<String> initialSelectedIds;
  late String? initialPrimaryId;
  late bool showLegacyReselectionNotice;

  @override
  void initState() {
    super.initState();
    final profile = ref.read(profileProvider);
    selectedIds = profile.selectedNiches.toSet();
    primaryId = profile.primaryNiche;
    showLegacyReselectionNotice = selectedIds.any(
      UserProfile.ambiguousLegacyNicheIds.contains,
    );
    selectedIds.removeAll(UserProfile.ambiguousLegacyNicheIds);
    if (UserProfile.ambiguousLegacyNicheIds.contains(primaryId)) {
      primaryId = selectedIds.isEmpty ? null : selectedIds.first;
    }
    initialSelectedIds = List<String>.from(profile.selectedNiches);
    initialPrimaryId = profile.primaryNiche;
  }

  bool get _focusChanged {
    final current = selectedIds.toList()..sort();
    final initial = List<String>.from(initialSelectedIds)..sort();
    if (current.length != initial.length) return true;
    for (var i = 0; i < current.length; i++) {
      if (current[i] != initial[i]) return true;
    }
    return primaryId != initialPrimaryId;
  }

  @override
  Widget build(BuildContext context) {
    final profile = ref.watch(profileProvider);
    final locale = profile.uiLanguageCode;
    final groupsAsync = ref.watch(groupedNichesProvider);
    final hasSelection = selectedIds.isNotEmpty;

    return AppScaffold(
      title: L10n.text('learningPreferences', locale),
      showBack: true,
      backPath: '/profile',
      languageCode: locale,
      selectedNavIndex: 4,
      child: groupsAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, _) => Center(child: Text(error.toString())),
        data: (groups) => FocusSelectionLayout(
          locale: locale,
          hasSelection: hasSelection,
          actionLabel: L10n.text('goLearn', locale),
          onAction: hasSelection ? _saveAndContinue : null,
          hintWhenEmpty: L10n.text('chooseFocusToContinue', locale),
          body: NicheGroupsList(
            groups: groups,
            selectedIds: selectedIds,
            primaryId: primaryId,
            onToggle: _toggle,
            onPrimary: (id) => setState(() => primaryId = id),
            languageCode: locale,
            showLegacyReselectionNotice: showLegacyReselectionNotice,
          ),
        ),
      ),
    );
  }

  void _toggle(String id, bool selected) {
    if (selected &&
        selectedIds.length >= UserProfile.maxActiveTracks &&
        !selectedIds.contains(id)) {
      return;
    }
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

  void _showSavedSnackBar(String locale) {
    ScaffoldMessenger.of(
      context,
    ).showSnackBar(SnackBar(content: Text(L10n.text('focusSaved', locale))));
  }

  Future<void> _saveAndContinue() async {
    await ref
        .read(profileProvider.notifier)
        .setNiches(selectedIds.toList(), primaryId);
    if (!mounted) return;

    final locale = ref.read(profileProvider).uiLanguageCode;
    if (!_focusChanged) {
      _showSavedSnackBar(locale);
      context.go('/learn');
      return;
    }

    await showDialog<void>(
      context: context,
      builder: (dialogContext) {
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

                    _showSavedSnackBar(locale);
                    switch (entry.key) {
                      case 'placement':
                        context.go('/placement');
                      case 'manual':
                        context.go('/onboarding/level');
                      case 'restart':
                        await ref.read(profileProvider.notifier).setLevel('A0');
                        if (!mounted) return;
                        context.go('/learn');
                      default:
                        context.go('/learn');
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

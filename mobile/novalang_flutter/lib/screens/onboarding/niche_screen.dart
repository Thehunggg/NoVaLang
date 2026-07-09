import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../state/profile_provider.dart';
import '../../state/shared_data_provider.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/onboarding_header.dart';
import '../../widgets/niche/focus_selection_layout.dart';
import '../../widgets/niche/niche_group_card.dart';

class NicheScreen extends ConsumerStatefulWidget {
  const NicheScreen({super.key});

  @override
  ConsumerState<NicheScreen> createState() => _NicheScreenState();
}

class _NicheScreenState extends ConsumerState<NicheScreen> {
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
    final hasSelection = selectedIds.isNotEmpty;
    final actionLabel = profile.onboardingComplete
        ? L10n.text('goLearn', locale)
        : L10n.text('continue', locale);

    return AppScaffold(
      title: L10n.text('niche', locale),
      showBack: true,
      backPath: '/onboarding/goal',
      languageCode: locale,
      onBeforeBack: _saveDraft,
      child: groupsAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, _) => Center(child: Text(error.toString())),
        data: (groups) => FocusSelectionLayout(
          locale: locale,
          hasSelection: hasSelection,
          actionLabel: actionLabel,
          onAction: hasSelection ? _saveAndContinue : null,
          hintWhenEmpty: L10n.text('chooseFocusToContinue', locale),
          header: OnboardingHeader(
            title: L10n.text('niche', locale),
            subtitle: L10n.text('nicheInstruction', locale),
          ),
          body: Column(
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

  Future<void> _saveDraft() async {
    await ref
        .read(profileProvider.notifier)
        .setNiches(selectedIds.toList(), primaryId);
  }

  Future<void> _saveAndContinue() async {
    await _saveDraft();
    if (!mounted) return;

    final profile = ref.read(profileProvider);
    if (profile.onboardingComplete) {
      context.go('/learn');
      return;
    }
    context.push('/onboarding/level');
  }
}

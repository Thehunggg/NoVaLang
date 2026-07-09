import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../state/profile_provider.dart';
import '../../state/shared_data_provider.dart';
import '../../widgets/common/app_button.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/onboarding_header.dart';
import '../../widgets/common/responsive_page.dart';
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

    return AppScaffold(
      title: L10n.text('niche', locale),
      showBack: true,
      backPath: '/onboarding/goal',
      languageCode: locale,
      onBeforeBack: _saveDraft,
      child: ResponsivePage(
        child: groupsAsync.when(
          loading: () => const Center(child: CircularProgressIndicator()),
          error: (error, _) => Text(error.toString()),
          data: (groups) => Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              OnboardingHeader(
                title: L10n.text('niche', locale),
                subtitle: L10n.text('nicheInstruction', locale),
              ),
              const SizedBox(height: 20),
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
              const SizedBox(height: 8),
              AppButton(
                label: L10n.text('continue', locale),
                onPressed: selectedIds.isEmpty ? null : _saveAndContinue,
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

  Future<void> _saveDraft() async {
    await ref
        .read(profileProvider.notifier)
        .setNiches(selectedIds.toList(), primaryId);
  }

  Future<void> _saveAndContinue() async {
    await _saveDraft();
    if (!mounted) return;
    context.push('/onboarding/level');
  }
}

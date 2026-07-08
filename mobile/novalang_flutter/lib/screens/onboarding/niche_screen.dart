import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../data/niche_options.dart';
import '../../state/profile_provider.dart';
import '../../widgets/common/app_button.dart';
import '../../widgets/common/app_scaffold.dart';
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
    final groups = groupedNiches();

    return AppScaffold(
      title: L10n.text('niche', profile.nativeLanguageCode),
      showBack: true,
      child: ResponsivePage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              profile.nativeLanguageCode == 'vi'
                  ? 'Chọn nhiều mục tiêu, rồi chạm lại để đặt trọng tâm chính.'
                  : 'Choose multiple focuses, then tap a selected item again to make it primary.',
            ),
            const SizedBox(height: 16),
            for (final entry in groups.entries) ...[
              NicheGroupCard(
                category: entry.key,
                niches: entry.value,
                selectedIds: selectedIds,
                primaryId: primaryId,
                onToggle: _toggle,
                onPrimary: (id) => setState(() => primaryId = id),
              ),
              const SizedBox(height: 12),
            ],
            AppButton(
              label: L10n.text('continue', profile.nativeLanguageCode),
              onPressed: selectedIds.isEmpty ? null : _saveAndContinue,
            ),
          ],
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

  Future<void> _saveAndContinue() async {
    await ref
        .read(profileProvider.notifier)
        .setNiches(selectedIds.toList(), primaryId);
    if (!mounted) return;
    context.go('/onboarding/level');
  }
}

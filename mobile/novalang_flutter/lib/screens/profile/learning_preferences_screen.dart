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
    final groups = groupedNiches();

    return AppScaffold(
      title: profile.nativeLanguageCode == 'vi'
          ? 'Tùy chọn học'
          : 'Learning preferences',
      showBack: true,
      backPath: '/profile',
      selectedNavIndex: 4,
      child: ResponsivePage(
        child: Column(
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
                languageCode: profile.uiLanguageCode,
              ),
              const SizedBox(height: 12),
            ],
            AppButton(
              label: profile.nativeLanguageCode == 'vi'
                  ? 'Lưu thay đổi'
                  : 'Save changes',
              onPressed: selectedIds.isEmpty ? null : _save,
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

  Future<void> _save() async {
    await ref
        .read(profileProvider.notifier)
        .setNiches(selectedIds.toList(), primaryId);
    if (!mounted) return;
    await showDialog<void>(
      context: context,
      builder: (dialogContext) {
        final native = ref.read(profileProvider).nativeLanguageCode;
        final isVi = native == 'vi';
        final options = isVi
            ? const {
                'placement': 'Làm bài kiểm tra trình độ',
                'manual': 'Nhập trình độ thủ công',
                'restart': 'Bắt đầu lại từ đầu',
                'keep': 'Giữ trình độ hiện tại',
              }
            : const {
                'placement': 'Take a placement test',
                'manual': 'Enter my level manually',
                'restart': 'Start from the beginning',
                'keep': 'Keep my current level',
              };
        return AlertDialog(
          title: Text(L10n.text('changeFocusQuestion', native)),
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
                    if (dialogContext.mounted)
                      Navigator.of(dialogContext).pop();
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

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../state/profile_provider.dart';
import '../../widgets/common/app_button.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/responsive_page.dart';

class BasicInfoScreen extends ConsumerStatefulWidget {
  const BasicInfoScreen({super.key});

  @override
  ConsumerState<BasicInfoScreen> createState() => _BasicInfoScreenState();
}

class _BasicInfoScreenState extends ConsumerState<BasicInfoScreen> {
  late final TextEditingController displayName;
  late final TextEditingController ageRange;
  late final TextEditingController country;
  late final TextEditingController region;
  late final TextEditingController occupationStatus;

  @override
  void initState() {
    super.initState();
    final profile = ref.read(profileProvider);
    displayName = TextEditingController(text: profile.displayName);
    ageRange = TextEditingController(text: profile.ageRange);
    country = TextEditingController(text: profile.country);
    region = TextEditingController(text: profile.region);
    occupationStatus = TextEditingController(text: profile.occupationStatus);
  }

  @override
  void dispose() {
    displayName.dispose();
    ageRange.dispose();
    country.dispose();
    region.dispose();
    occupationStatus.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final native = ref.watch(profileProvider).nativeLanguageCode;
    final isVi = native == 'vi';
    return AppScaffold(
      title: isVi ? 'Thông tin cơ bản' : 'Basic user information',
      showBack: true,
      child: ResponsivePage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              isVi
                  ? 'Bạn muốn NovaLang gọi bạn là gì?'
                  : 'What should NovaLang call you?',
              style: Theme.of(
                context,
              ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w900),
            ),
            const SizedBox(height: 16),
            _field(displayName, isVi ? 'Tên hiển thị' : 'Display name'),
            _field(
              ageRange,
              isVi ? 'Độ tuổi (không bắt buộc)' : 'Age range (optional)',
            ),
            _field(
              country,
              isVi
                  ? 'Quốc gia/khu vực (không bắt buộc)'
                  : 'Country/region (optional)',
            ),
            _field(
              region,
              isVi
                  ? 'Thành phố/tỉnh (không bắt buộc)'
                  : 'City/prefecture (optional)',
            ),
            _field(
              occupationStatus,
              isVi
                  ? 'Nghề nghiệp/học tập (không bắt buộc)'
                  : 'Occupation/student status (optional)',
            ),
            const SizedBox(height: 12),
            AppButton(
              label: L10n.text('continue', native),
              onPressed: displayName.text.trim().length < 2 ? null : _save,
            ),
          ],
        ),
      ),
    );
  }

  Widget _field(TextEditingController controller, String label) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: TextField(
        controller: controller,
        onChanged: (_) => setState(() {}),
        decoration: InputDecoration(labelText: label),
      ),
    );
  }

  Future<void> _save() async {
    await ref
        .read(profileProvider.notifier)
        .setUserInfo(
          displayName: displayName.text.trim(),
          ageRange: ageRange.text.trim(),
          country: country.text.trim(),
          region: region.text.trim(),
          occupationStatus: occupationStatus.text.trim(),
        );
    if (!mounted) return;
    context.go('/onboarding/learning');
  }
}

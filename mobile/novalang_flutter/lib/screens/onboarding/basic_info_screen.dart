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
      title: L10n.text('basicInfo', native),
      showBack: true,
      backPath: '/onboarding/native',
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
            _field(
              displayName,
              L10n.text('displayName', native),
              L10n.text('displayNameHint', native),
              required: true,
            ),
            _field(
              ageRange,
              L10n.text('age', native),
              L10n.text('optional', native),
            ),
            _field(
              country,
              L10n.text('country', native),
              L10n.text('countryHint', native),
            ),
            _field(
              region,
              L10n.text('region', native),
              L10n.text('optional', native),
            ),
            _field(
              occupationStatus,
              L10n.text('occupation', native),
              L10n.text('occupationHint', native),
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

  Widget _field(
    TextEditingController controller,
    String label,
    String hint, {
    bool required = false,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '$label${required ? ' *' : ''}',
            style: const TextStyle(
              fontWeight: FontWeight.w800,
              color: Color(0xFFBFF5FF),
            ),
          ),
          const SizedBox(height: 7),
          TextField(
            controller: controller,
            onChanged: (_) => setState(() {}),
            decoration: InputDecoration(hintText: hint),
          ),
        ],
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
    context.push('/onboarding/learning');
  }
}

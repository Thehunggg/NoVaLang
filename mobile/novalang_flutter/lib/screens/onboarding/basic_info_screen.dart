import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../state/profile_provider.dart';
import '../../widgets/common/app_button.dart';
import '../../widgets/common/app_card.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/onboarding_form_field.dart';
import '../../widgets/common/onboarding_header.dart';
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
    return AppScaffold(
      title: L10n.text('basicInfo', native),
      showBack: true,
      backPath: '/onboarding/native',
      languageCode: native,
      onBeforeBack: _saveDraft,
      child: ResponsivePage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            OnboardingHeader(
              title: L10n.text('basicInfo', native),
              subtitle: L10n.text('basicInfoSubtitle', native),
            ),
            const SizedBox(height: 20),
            AppCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  OnboardingFormField(
                    label: L10n.text('displayName', native),
                    hint: L10n.text('displayNameHint', native),
                    controller: displayName,
                    required: true,
                    onChanged: (_) => setState(() {}),
                  ),
                  OnboardingFormField(
                    label: L10n.text('age', native),
                    hint: L10n.text('optional', native),
                    controller: ageRange,
                  ),
                  OnboardingFormField(
                    label: L10n.text('country', native),
                    hint: L10n.text('countryHint', native),
                    controller: country,
                  ),
                  OnboardingFormField(
                    label: L10n.text('region', native),
                    hint: L10n.text('optional', native),
                    controller: region,
                  ),
                  OnboardingFormField(
                    label: L10n.text('occupation', native),
                    hint: L10n.text('occupationHint', native),
                    controller: occupationStatus,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            AppButton(
              label: L10n.text('continue', native),
              onPressed: displayName.text.trim().length < 2 ? null : _save,
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _saveDraft() async {
    await ref.read(profileProvider.notifier).setUserInfo(
          displayName: displayName.text.trim(),
          ageRange: ageRange.text.trim(),
          country: country.text.trim(),
          region: region.text.trim(),
          occupationStatus: occupationStatus.text.trim(),
        );
  }

  Future<void> _save() async {
    await _saveDraft();
    if (!mounted) return;
    context.push('/onboarding/learning');
  }
}

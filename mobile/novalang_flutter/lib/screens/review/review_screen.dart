import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/utils/localization.dart';
import '../../state/profile_provider.dart';
import '../../widgets/common/app_card.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/responsive_page.dart';

class ReviewScreen extends ConsumerWidget {
  const ReviewScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = ref.watch(profileProvider);
    final native = profile.nativeLanguageCode;
    return AppScaffold(
      title: L10n.text('review', native),
      selectedNavIndex: 2,
      child: ResponsivePage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            AppCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    native == 'vi' ? 'Ôn lỗi sai' : 'Mistake review',
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    native == 'vi'
                        ? 'Tính năng lưu lỗi sẽ được nối với tiến độ local sau.'
                        : 'Saved mistakes will be connected to local progress later.',
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),
            const AppCard(child: Text('Coming soon')),
          ],
        ),
      ),
    );
  }
}

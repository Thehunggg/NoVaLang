import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/utils/localization.dart';
import '../../state/profile_provider.dart';
import '../../widgets/common/app_card.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/responsive_page.dart';
import '../../widgets/lesson/speaker_button.dart';

class FlashcardsScreen extends ConsumerWidget {
  const FlashcardsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = ref.watch(profileProvider);
    final native = profile.nativeLanguageCode;
    final cards = native == 'vi'
        ? const [
            ('雨（あめ）', 'mưa', 'あめ'),
            ('飴（あめ）', 'kẹo', 'あめ'),
            ('橋（はし）', 'cây cầu', 'はし'),
            ('箸（はし）', 'đũa', 'はし'),
          ]
        : const [
            ('雨（あめ）', 'rain', 'あめ'),
            ('飴（あめ）', 'candy', 'あめ'),
            ('橋（はし）', 'bridge', 'はし'),
            ('箸（はし）', 'chopsticks', 'はし'),
          ];

    return AppScaffold(
      title: L10n.text('flashcards', native),
      selectedNavIndex: 3,
      child: ResponsivePage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            for (final card in cards) ...[
              AppCard(
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            card.$1,
                            style: Theme.of(context).textTheme.headlineSmall
                                ?.copyWith(fontWeight: FontWeight.w900),
                          ),
                          const SizedBox(height: 8),
                          Text(card.$2),
                        ],
                      ),
                    ),
                    SpeakerButton(speechText: card.$3),
                  ],
                ),
              ),
              const SizedBox(height: 12),
            ],
          ],
        ),
      ),
    );
  }
}

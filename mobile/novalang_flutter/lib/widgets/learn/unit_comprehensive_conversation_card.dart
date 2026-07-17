import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/utils/localization.dart';
import '../../services/plan_access_policy.dart';
import '../../state/profile_provider.dart';
import '../common/app_card.dart';

/// UI shell for the `unit_comprehensive_conversation` product contract.
///
/// Scope: one standard Unit. It follows that Unit's third child Lesson and
/// never summarizes neighbouring Units. It is distinct from the per-Lesson,
/// non-graded Q14 Real-World Practice dialogue; see ADR-014.
///
/// This widget renders only the shell and the locked/available state via
/// [PlanAccessPolicy]. No comprehensive-conversation content exists yet;
/// tapping an unlocked card surfaces a "content is being prepared" message
/// rather than opening any invented content. Real content is subject to a
/// separate owner-approved task.
class UnitComprehensiveConversationCard extends ConsumerWidget {
  const UnitComprehensiveConversationCard({
    super.key,
    required this.unitId,
    required this.locale,
    required this.nativeLanguageCode,
  });

  /// Stable id of the Unit this comprehensive-conversation activity
  /// belongs to. Not yet used to look up content (none exists), but kept on
  /// the contract so a future content-bearing implementation can key off of
  /// it without changing the call site.
  final String unitId;

  /// `uiLanguageCode`: used for the card title, matching how sibling
  /// Module/Unit/Lesson titles in this same list are labeled.
  final String locale;

  /// `nativeLanguageCode`: used for learner-support text (description,
  /// locked hint, content-preparation notice) per the localization purity
  /// contract in section 12 of the task.
  final String nativeLanguageCode;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = ref.watch(profileProvider);
    final policy = ref.watch(planAccessPolicyProvider);
    final tier = policy.tierFor(profile.userId);
    final unlocked = tier.hasPlusAccess;

    return AppCard(
      onTap: () => _handleTap(context, unlocked),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 46,
            height: 46,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(14),
              color: const Color(0xFFF59E0B).withValues(alpha: 0.18),
            ),
            child: Icon(
              unlocked ? Icons.forum_outlined : Icons.lock_outline,
              color: const Color(0xFFFBBF24),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: Text(
                        L10n.text(
                          'unitComprehensiveConversationTitle',
                          locale,
                        ),
                        style: Theme.of(context).textTheme.titleMedium
                            ?.copyWith(fontWeight: FontWeight.w900),
                      ),
                    ),
                    const SizedBox(width: 8),
                    const _MiniPlusBadge(),
                  ],
                ),
                const SizedBox(height: 6),
                Text(
                  L10n.text(
                    'unitComprehensiveConversationDescription',
                    nativeLanguageCode,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: Theme.of(
                    context,
                  ).textTheme.bodySmall?.copyWith(
                    color: Colors.white70,
                    height: 1.35,
                  ),
                ),
                if (!unlocked) ...[
                  const SizedBox(height: 8),
                  Text(
                    L10n.text(
                      'unitComprehensiveConversationLockedHint',
                      nativeLanguageCode,
                    ),
                    style: Theme.of(context).textTheme.labelSmall?.copyWith(
                      color: Colors.orangeAccent,
                      height: 1.3,
                    ),
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }

  void _handleTap(BuildContext context, bool unlocked) {
    final message = unlocked
        ? L10n.text(
            'unitComprehensiveConversationPreparing',
            nativeLanguageCode,
          )
        : L10n.text(
            'unitComprehensiveConversationLockedHint',
            nativeLanguageCode,
          );
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }
}

class _MiniPlusBadge extends StatelessWidget {
  const _MiniPlusBadge();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: const Color(0xFFFBBF24).withValues(alpha: 0.16),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(
          color: const Color(0xFFFBBF24).withValues(alpha: 0.32),
        ),
      ),
      child: const Text(
        'Plus+',
        style: TextStyle(
          color: Color(0xFFFBBF24),
          fontSize: 10,
          fontWeight: FontWeight.w800,
        ),
      ),
    );
  }
}

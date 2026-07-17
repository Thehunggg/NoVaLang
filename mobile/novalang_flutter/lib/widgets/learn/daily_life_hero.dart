import 'package:flutter/material.dart';

import '../../core/utils/localization.dart';
import '../common/app_card.dart';

/// Hero card for Daily Life Communication roadmap.
class DailyLifeHero extends StatelessWidget {
  const DailyLifeHero({
    super.key,
    required this.locale,
    required this.title,
    required this.description,
    required this.moduleCount,
    required this.unitCount,
    required this.lessonCount,
    this.hasReadyModule = false,
  });

  final String locale;
  final String title;
  final String description;
  final int moduleCount;
  final int unitCount;
  final int lessonCount;
  final bool hasReadyModule;

  @override
  Widget build(BuildContext context) {
    return AppCard(
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              const Color(0xFF22D3EE).withValues(alpha: 0.22),
              const Color(0xFF8B5CF6).withValues(alpha: 0.18),
              Colors.white.withValues(alpha: 0.03),
            ],
          ),
        ),
        padding: const EdgeInsets.all(4),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: 56,
                  height: 56,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: const Color(0xFF22D3EE).withValues(alpha: 0.18),
                    border: Border.all(
                      color: const Color(0xFF22D3EE).withValues(alpha: 0.35),
                    ),
                  ),
                  child: const Icon(
                    Icons.forum_rounded,
                    color: Color(0xFF67E8F9),
                    size: 28,
                  ),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        title,
                        style: Theme.of(context).textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 10,
                          vertical: 4,
                        ),
                        decoration: BoxDecoration(
                          color: (hasReadyModule
                                  ? const Color(0xFF34D399)
                                  : Colors.orangeAccent)
                              .withValues(alpha: 0.16),
                          borderRadius: BorderRadius.circular(999),
                          border: Border.all(
                            color: (hasReadyModule
                                    ? const Color(0xFF34D399)
                                    : Colors.orangeAccent)
                                .withValues(alpha: 0.35),
                          ),
                        ),
                        child: Text(
                          hasReadyModule
                              ? L10n.text('availableNow', locale)
                              : L10n.text('blueprintBadge', locale),
                          style: TextStyle(
                            color: hasReadyModule
                                ? const Color(0xFF34D399)
                                : Colors.orangeAccent,
                            fontWeight: FontWeight.w800,
                            fontSize: 12,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 14),
            Text(
              description,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: Colors.white70,
                height: 1.4,
              ),
            ),
            const SizedBox(height: 16),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                _StatChip(
                  icon: Icons.view_module_outlined,
                  label: L10n.text('modulesCount', locale)
                      .replaceAll('{n}', '$moduleCount'),
                ),
                _StatChip(
                  icon: Icons.account_tree_outlined,
                  label: L10n.text('unitsCount', locale)
                      .replaceAll('{n}', '$unitCount'),
                ),
                _StatChip(
                  icon: Icons.menu_book_outlined,
                  label: L10n.text('lessonsCount', locale)
                      .replaceAll('{n}', '$lessonCount'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _StatChip extends StatelessWidget {
  const _StatChip({required this.icon, required this.label});

  final IconData icon;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.06),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: Colors.white.withValues(alpha: 0.10)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 15, color: const Color(0xFF67E8F9)),
          const SizedBox(width: 6),
          Text(
            label,
            style: const TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.w700,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }
}

import 'package:flutter/material.dart';

import '../../core/utils/localization.dart';
import '../../models/course_unit.dart';
import '../../models/lesson.dart';
import '../common/app_card.dart';
import 'unit_comprehensive_conversation_card.dart';

/// Expandable Daily Life module card with nested unit accordion + lesson timeline.
class DailyLifeModuleCard extends StatefulWidget {
  const DailyLifeModuleCard({
    super.key,
    required this.module,
    required this.moduleIndex,
    required this.locale,
    required this.nativeLanguageCode,
    required this.completedLessonIds,
    required this.onLessonTap,
    this.initiallyExpanded = false,
  });

  final CurriculumModuleGroup module;
  final int moduleIndex;
  final String locale;
  final String nativeLanguageCode;
  final Set<String> completedLessonIds;
  final void Function(Lesson lesson) onLessonTap;
  final bool initiallyExpanded;

  @override
  State<DailyLifeModuleCard> createState() => _DailyLifeModuleCardState();
}

class _DailyLifeModuleCardState extends State<DailyLifeModuleCard> {
  late bool _expanded;
  final Set<String> _openUnits = {};

  @override
  void initState() {
    super.initState();
    _expanded = widget.initiallyExpanded;
    if (_expanded && widget.module.units.isNotEmpty) {
      _openUnits.add(widget.module.units.first.id);
    }
  }

  @override
  Widget build(BuildContext context) {
    final module = widget.module;
    final locale = widget.locale;
    final completed = module.units
        .expand((u) => u.lessons)
        .where((l) => widget.completedLessonIds.contains(l.id))
        .length;
    final total = module.lessonCount;
    final progress = total > 0 ? completed / total : 0.0;

    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          InkWell(
            onTap: () => setState(() => _expanded = !_expanded),
            borderRadius: BorderRadius.circular(16),
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    width: 46,
                    height: 46,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(14),
                      color: const Color(0xFF8B5CF6).withValues(alpha: 0.18),
                    ),
                    child: Text(
                      '${widget.moduleIndex}',
                      style: const TextStyle(
                        fontWeight: FontWeight.w900,
                        color: Color(0xFFC4B5FD),
                        fontSize: 16,
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          module.localizedTitle(locale),
                          style: Theme.of(context).textTheme.titleMedium
                              ?.copyWith(fontWeight: FontWeight.w900),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          module.localizedGoal(locale),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          style: Theme.of(context).textTheme.bodySmall
                              ?.copyWith(color: Colors.white70, height: 1.35),
                        ),
                        const SizedBox(height: 10),
                        Wrap(
                          spacing: 6,
                          runSpacing: 6,
                          children: [
                            if (module.levelBadge.isNotEmpty)
                              _MiniBadge(
                                label: module.levelBadge,
                                color: const Color(0xFF22D3EE),
                              ),
                            _MiniBadge(
                              label: L10n.text('unitsCount', locale)
                                  .replaceAll('{n}', '${module.unitCount}'),
                              color: const Color(0xFFA78BFA),
                            ),
                            _MiniBadge(
                              label: L10n.text('lessonsCount', locale)
                                  .replaceAll('{n}', '${module.lessonCount}'),
                              color: const Color(0xFF67E8F9),
                            ),
                            _MiniBadge(
                              label: module.isBlueprint
                                  ? L10n.text('blueprintBadge', locale)
                                  : L10n.text('availableNow', locale),
                              color: module.isBlueprint
                                  ? Colors.orangeAccent
                                  : const Color(0xFF34D399),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            Expanded(
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(4),
                                child: LinearProgressIndicator(
                                  value: progress,
                                  minHeight: 5,
                                  backgroundColor: Colors.white12,
                                  valueColor:
                                      const AlwaysStoppedAnimation<Color>(
                                    Color(0xFF22D3EE),
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(width: 10),
                            Text(
                              total == 0
                                  ? '0%'
                                  : '${(progress * 100).round()}%',
                              style: Theme.of(context).textTheme.labelSmall
                                  ?.copyWith(color: Colors.white54),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  Icon(
                    _expanded ? Icons.expand_less : Icons.expand_more,
                    color: Colors.white54,
                  ),
                ],
              ),
            ),
          ),
          if (_expanded) ...[
            const SizedBox(height: 12),
            const Divider(color: Colors.white12, height: 1),
            const SizedBox(height: 8),
            for (int i = 0; i < module.units.length; i++) ...[
              _UnitAccordion(
                index: i + 1,
                unit: module.units[i],
                locale: locale,
                expanded: _openUnits.contains(module.units[i].id),
                nativeLanguageCode: widget.nativeLanguageCode,
                completedLessonIds: widget.completedLessonIds,
                onToggle: () {
                  setState(() {
                    final id = module.units[i].id;
                    if (_openUnits.contains(id)) {
                      _openUnits.remove(id);
                    } else {
                      _openUnits.add(id);
                    }
                  });
                },
                onLessonTap: widget.onLessonTap,
              ),
              if (i < module.units.length - 1) const SizedBox(height: 6),
            ],
          ],
        ],
      ),
    );
  }
}

class _UnitAccordion extends StatelessWidget {
  const _UnitAccordion({
    required this.index,
    required this.unit,
    required this.locale,
    required this.nativeLanguageCode,
    required this.expanded,
    required this.completedLessonIds,
    required this.onToggle,
    required this.onLessonTap,
  });

  final int index;
  final CourseUnit unit;
  final String locale;
  final String nativeLanguageCode;
  final bool expanded;
  final Set<String> completedLessonIds;
  final VoidCallback onToggle;
  final void Function(Lesson lesson) onLessonTap;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.03),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
      ),
      child: Column(
        children: [
          InkWell(
            onTap: onToggle,
            borderRadius: BorderRadius.circular(14),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
              child: Row(
                children: [
                  Text(
                    '$index',
                    style: const TextStyle(
                      color: Colors.white38,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          unit.localizedTitle(locale),
                          style: Theme.of(context).textTheme.bodyMedium
                              ?.copyWith(fontWeight: FontWeight.w800),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          L10n.text('lessonsCount', locale).replaceAll(
                            '{n}',
                            '${unit.lessons.length}',
                          ),
                          style: Theme.of(context).textTheme.labelSmall
                              ?.copyWith(color: Colors.white54),
                        ),
                      ],
                    ),
                  ),
                  _MiniBadge(
                    label: unit.isBlueprintModule
                        ? L10n.text('blueprintInProgress', locale)
                        : L10n.text('availableNow', locale),
                    color: unit.isBlueprintModule
                        ? Colors.orangeAccent
                        : const Color(0xFF34D399),
                  ),
                  const SizedBox(width: 4),
                  Icon(
                    expanded ? Icons.expand_less : Icons.expand_more,
                    color: Colors.white38,
                    size: 20,
                  ),
                ],
              ),
            ),
          ),
          if (expanded) ...[
            const Divider(color: Colors.white10, height: 1),
            Padding(
              padding: const EdgeInsets.fromLTRB(12, 8, 12, 12),
              child: Column(
                children: [
                  for (int i = 0; i < unit.lessons.length; i++)
                    ...[
                      _LessonTimelineRow(
                        index: i + 1,
                        lesson: unit.lessons[i],
                        locale: locale,
                        isLast: i == unit.lessons.length - 1,
                        isCompleted: completedLessonIds.contains(
                          unit.lessons[i].id,
                        ),
                        onTap: () => onLessonTap(unit.lessons[i]),
                      ),
                      if (i == 2) ...[
                        const SizedBox(height: 8),
                        UnitComprehensiveConversationCard(
                          unitId: unit.id,
                          locale: locale,
                          nativeLanguageCode: nativeLanguageCode,
                        ),
                      ],
                    ],
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _LessonTimelineRow extends StatelessWidget {
  const _LessonTimelineRow({
    required this.index,
    required this.lesson,
    required this.locale,
    required this.isLast,
    required this.isCompleted,
    required this.onTap,
  });

  final int index;
  final Lesson lesson;
  final String locale;
  final bool isLast;
  final bool isCompleted;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(10),
      child: IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            SizedBox(
              width: 28,
              child: Column(
                children: [
                  Container(
                    width: 18,
                    height: 18,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: isCompleted
                          ? const Color(0xFF22D3EE).withValues(alpha: 0.25)
                          : Colors.white.withValues(alpha: 0.08),
                      border: Border.all(
                        color: isCompleted
                            ? const Color(0xFF22D3EE)
                            : Colors.white38,
                      ),
                    ),
                    child: Text(
                      '$index',
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.w800,
                        color: isCompleted
                            ? const Color(0xFF22D3EE)
                            : Colors.white70,
                      ),
                    ),
                  ),
                  if (!isLast)
                    Expanded(
                      child: Container(
                        width: 2,
                        margin: const EdgeInsets.symmetric(vertical: 2),
                        color: Colors.white12,
                      ),
                    ),
                ],
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Padding(
                padding: EdgeInsets.only(bottom: isLast ? 0 : 12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: Text(
                            lesson.localizedTitle(locale),
                            style: Theme.of(context).textTheme.bodyMedium
                                ?.copyWith(fontWeight: FontWeight.w700),
                          ),
                        ),
                        _MiniBadge(
                          label: lesson.isBlueprint
                              ? L10n.text('blueprintInProgress', locale)
                              : (isCompleted
                                  ? L10n.text('availableNow', locale)
                                  : L10n.text('availableNow', locale)),
                          color: lesson.isBlueprint
                              ? Colors.orangeAccent
                              : const Color(0xFF34D399),
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      L10n.text('lessonTimelineHint', locale),
                      style: Theme.of(context).textTheme.labelSmall?.copyWith(
                        color: Colors.white54,
                        height: 1.3,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _MiniBadge extends StatelessWidget {
  const _MiniBadge({required this.label, required this.color});

  final String label;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.14),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: color.withValues(alpha: 0.28)),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: color,
          fontSize: 10,
          fontWeight: FontWeight.w800,
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';

import '../../core/utils/localization.dart';
import '../../models/course_unit.dart';
import '../../models/lesson.dart';
import '../common/app_card.dart';

class CourseUnitCard extends StatefulWidget {
  const CourseUnitCard({
    super.key,
    required this.unit,
    required this.locale,
    required this.learningLanguage,
    required this.completedLessonIds,
    required this.onLessonTap,
    this.initiallyExpanded = false,
    this.showModuleHeader = false,
  });

  final CourseUnit unit;
  final String locale;
  final String learningLanguage;
  final Set<String> completedLessonIds;
  final void Function(Lesson lesson) onLessonTap;
  final bool initiallyExpanded;
  final bool showModuleHeader;

  @override
  State<CourseUnitCard> createState() => _CourseUnitCardState();
}

class _CourseUnitCardState extends State<CourseUnitCard> {
  late bool _expanded;

  @override
  void initState() {
    super.initState();
    _expanded = widget.initiallyExpanded;
  }

  @override
  Widget build(BuildContext context) {
    final unit = widget.unit;
    final locale = widget.locale;
    final completedCount = unit.lessons
        .where((l) => widget.completedLessonIds.contains(l.id))
        .length;
    final total = unit.lessons.length;
    final progress = total > 0 ? completedCount / total : 0.0;
    final isComplete = completedCount == total;

    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (widget.showModuleHeader &&
              (unit.moduleTitle?.isNotEmpty == true ||
                  unit.moduleTitleByNative.isNotEmpty)) ...[
            Text(
              '${L10n.text('moduleLabel', locale)} · ${unit.localizedModuleTitle(locale)}',
              style: Theme.of(context).textTheme.labelMedium?.copyWith(
                color: const Color(0xFF67E8F9),
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: 8),
          ],
          InkWell(
            onTap: () => setState(() => _expanded = !_expanded),
            borderRadius: BorderRadius.circular(12),
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    width: 40,
                    height: 40,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: isComplete
                          ? const Color(0xFF22D3EE).withValues(alpha: 0.18)
                          : const Color(0xFF8B5CF6).withValues(alpha: 0.18),
                    ),
                    child: Icon(
                      isComplete ? Icons.check_circle : Icons.school_outlined,
                      color: isComplete
                          ? const Color(0xFF22D3EE)
                          : const Color(0xFF8B5CF6),
                      size: 22,
                    ),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: Text(
                                unit.localizedTitle(locale),
                                style: Theme.of(context).textTheme.titleSmall
                                    ?.copyWith(fontWeight: FontWeight.w900),
                              ),
                            ),
                            Icon(
                              _expanded ? Icons.expand_less : Icons.expand_more,
                              color: Colors.white54,
                              size: 20,
                            ),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Text(
                          unit.localizedGoal(locale),
                          style: Theme.of(context).textTheme.bodySmall
                              ?.copyWith(color: Colors.white70),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                        const SizedBox(height: 8),
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
                              '$completedCount / $total',
                              style: Theme.of(context).textTheme.labelSmall
                                  ?.copyWith(color: Colors.white54),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          if (_expanded) ...[
            const SizedBox(height: 12),
            const Divider(color: Colors.white12, height: 1),
            const SizedBox(height: 8),
            for (int i = 0; i < unit.lessons.length; i++) ...[
              _LessonRow(
                index: i + 1,
                lesson: unit.lessons[i],
                locale: locale,
                isCompleted: widget.completedLessonIds.contains(
                  unit.lessons[i].id,
                ),
                // Blueprint lessons open preview; playable lessons open exercises.
                onTap: () => widget.onLessonTap(unit.lessons[i]),
              ),
              if (i < unit.lessons.length - 1)
                const Divider(color: Colors.white10, height: 1, indent: 46),
            ],
          ],
        ],
      ),
    );
  }
}

class _LessonRow extends StatelessWidget {
  const _LessonRow({
    required this.index,
    required this.lesson,
    required this.locale,
    required this.isCompleted,
    required this.onTap,
  });

  final int index;
  final Lesson lesson;
  final String locale;
  final bool isCompleted;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final coming = lesson.isBlueprint;
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(8),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 10),
        child: Row(
          children: [
            SizedBox(
              width: 32,
              child: Text(
                '$index',
                style: Theme.of(context).textTheme.labelMedium?.copyWith(
                  color: Colors.white38,
                  fontWeight: FontWeight.w700,
                ),
                textAlign: TextAlign.center,
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          lesson.localizedTitle(locale),
                          style: Theme.of(context).textTheme.bodyMedium
                              ?.copyWith(
                                fontWeight: FontWeight.w700,
                                color: coming
                                    ? Colors.white70
                                    : isCompleted
                                    ? const Color(0xFF22D3EE)
                                    : Colors.white,
                              ),
                        ),
                      ),
                      if (coming) ...[
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 2,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.orangeAccent.withValues(alpha: 0.16),
                            borderRadius: BorderRadius.circular(999),
                            border: Border.all(
                              color: Colors.orangeAccent.withValues(alpha: 0.35),
                            ),
                          ),
                          child: Text(
                            L10n.text('blueprintInProgress', locale),
                            style: const TextStyle(
                              color: Colors.orangeAccent,
                              fontSize: 10,
                              fontWeight: FontWeight.w800,
                            ),
                          ),
                        ),
                      ],
                    ],
                  ),
                  if (lesson.localizedDescription(locale).isNotEmpty) ...[
                    const SizedBox(height: 2),
                    Text(
                      lesson.localizedDescription(locale),
                      style: Theme.of(
                        context,
                      ).textTheme.bodySmall?.copyWith(color: Colors.white38),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ],
              ),
            ),
            const SizedBox(width: 8),
            if (coming)
              const Icon(Icons.visibility_outlined, size: 16, color: Colors.white54)
            else if (isCompleted)
              const Icon(Icons.check_circle, size: 18, color: Color(0xFF22D3EE))
            else
              const Icon(
                Icons.play_circle_outline,
                size: 18,
                color: Color(0xFF8B5CF6),
              ),
          ],
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';

import '../../models/lesson.dart';
import '../common/app_card.dart';

class LessonCard extends StatelessWidget {
  const LessonCard({super.key, required this.lesson, required this.onTap});

  final Lesson lesson;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return AppCard(
      onTap: lesson.comingSoon ? null : onTap,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(
            lesson.comingSoon ? Icons.lock_clock : Icons.play_circle,
            color: Theme.of(context).colorScheme.primary,
            size: 34,
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  lesson.title,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w900,
                  ),
                ),
                const SizedBox(height: 6),
                Text(lesson.description),
                const SizedBox(height: 10),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    Chip(label: Text(lesson.level)),
                    if (lesson.comingSoon)
                      const Chip(label: Text('Coming soon')),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

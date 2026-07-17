import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

/// A quiet brand detail for the unused vertical space in an exercise screen.
/// It intentionally uses the shared Nova reading asset rather than a new icon.
class NovaLangExerciseEncouragement extends StatelessWidget {
  const NovaLangExerciseEncouragement({
    super.key,
    required this.learningLanguageCode,
    required this.availableSpace,
    this.mascotAsset = 'assets/shared/nova-reading.svg',
  });

  final String learningLanguageCode;
  final bool availableSpace;
  final String mascotAsset;

  String get _message => learningLanguageCode == 'ja'
      ? 'がんばってね！'
      : learningLanguageCode == 'en'
      ? 'Try your best!'
      : '';

  @override
  Widget build(BuildContext context) {
    if (!availableSpace || _message.isEmpty) return const SizedBox.shrink();
    return LayoutBuilder(
      builder: (context, constraints) {
        final size = math.min(96.0, math.max(64.0, constraints.maxWidth * .22));
        return Center(
          child: Opacity(
            opacity: .68,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                SvgPicture.asset(mascotAsset, width: size, height: size),
                const SizedBox(height: 6),
                Text(
                  _message,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Colors.white70,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

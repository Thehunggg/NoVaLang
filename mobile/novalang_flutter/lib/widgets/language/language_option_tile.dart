import 'package:flutter/material.dart';

import '../../models/language_option.dart';
import '../common/app_card.dart';

class LanguageOptionTile extends StatelessWidget {
  const LanguageOptionTile({
    super.key,
    required this.language,
    required this.onTap,
    this.trailing,
  });

  final LanguageOption language;
  final VoidCallback onTap;
  final Widget? trailing;

  @override
  Widget build(BuildContext context) {
    return AppCard(
      onTap: onTap,
      child: Row(
        children: [
          CircleAvatar(
            backgroundColor: Theme.of(context).colorScheme.primaryContainer,
            child: Text(language.code.toUpperCase()),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  language.englishName,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  language.nativeName,
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              ],
            ),
          ),
          ?trailing,
        ],
      ),
    );
  }
}

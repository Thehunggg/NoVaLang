import 'package:flutter/material.dart';

import '../common/app_text_field.dart';

class LanguageSearchField extends StatelessWidget {
  const LanguageSearchField({
    super.key,
    required this.hint,
    required this.onChanged,
  });

  final String hint;
  final ValueChanged<String> onChanged;

  @override
  Widget build(BuildContext context) {
    return AppTextField(hint: hint, onChanged: onChanged);
  }
}

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class AppTextField extends StatelessWidget {
  const AppTextField({
    super.key,
    required this.hint,
    this.controller,
    this.onChanged,
    this.keyboardType,
    this.showSearchIcon = true,
    this.minLines = 1,
    this.maxLines = 1,
    this.inputFormatters,
    this.enableSuggestions = true,
    this.autocorrect = true,
  });

  /// Answer input: Unicode-safe, no ASCII-only formatters.
  factory AppTextField.answer({
    Key? key,
    required String hint,
    TextEditingController? controller,
    ValueChanged<String>? onChanged,
    int minLines = 1,
    int maxLines = 3,
  }) {
    return AppTextField(
      key: key,
      hint: hint,
      controller: controller,
      onChanged: onChanged,
      keyboardType: TextInputType.multiline,
      showSearchIcon: false,
      minLines: minLines,
      maxLines: maxLines,
      // Never attach ASCII-only FilteringTextInputFormatter here.
      inputFormatters: const [],
      enableSuggestions: true,
      autocorrect: true,
    );
  }

  final String hint;
  final TextEditingController? controller;
  final ValueChanged<String>? onChanged;
  final TextInputType? keyboardType;
  final bool showSearchIcon;
  final int minLines;
  final int maxLines;
  final List<TextInputFormatter>? inputFormatters;
  final bool enableSuggestions;
  final bool autocorrect;

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      onChanged: onChanged,
      keyboardType: keyboardType ?? TextInputType.text,
      minLines: minLines,
      maxLines: maxLines,
      inputFormatters: inputFormatters,
      enableSuggestions: enableSuggestions,
      autocorrect: autocorrect,
      // Allow all Unicode; do not restrict to Latin.
      decoration: InputDecoration(
        hintText: hint,
        prefixIcon: showSearchIcon ? const Icon(Icons.search) : null,
      ),
    );
  }
}

import 'package:flutter/material.dart';

class AppTextField extends StatelessWidget {
  const AppTextField({
    super.key,
    required this.hint,
    this.controller,
    this.onChanged,
    this.keyboardType,
  });

  final String hint;
  final TextEditingController? controller;
  final ValueChanged<String>? onChanged;
  final TextInputType? keyboardType;

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      onChanged: onChanged,
      keyboardType: keyboardType,
      minLines: 1,
      decoration: InputDecoration(
        hintText: hint,
        prefixIcon: const Icon(Icons.search),
      ),
    );
  }
}

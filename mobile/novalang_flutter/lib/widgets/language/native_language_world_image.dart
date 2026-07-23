import 'package:flutter/material.dart';

/// Approved NovaLang illustration used by the Native/UI language screen.
class NativeLanguageWorldImage extends StatelessWidget {
  const NativeLanguageWorldImage({
    super.key,
    this.fit = BoxFit.contain,
    this.filterQuality = FilterQuality.high,
  });

  static const assetPath = 'assets/images/native_language_world.webp';

  final BoxFit fit;

  final FilterQuality filterQuality;

  @override
  Widget build(BuildContext context) {
    return Image.asset(assetPath, fit: fit, filterQuality: filterQuality);
  }
}

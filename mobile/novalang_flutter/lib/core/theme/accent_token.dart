import 'package:flutter/material.dart';

/// Resolves a stable `accentToken` string (stored in catalog definitions) to
/// a concrete [Color]. Kept separate from raw catalog data so accent colors
/// can be re-tuned for contrast/branding without touching catalog IDs.
abstract final class AccentTokenResolver {
  static const _tokens = <String, Color>{
    'accent_neutral': Color(0xFF9EEAF9),
    'accent_cyan_electric_blue': Color(0xFF22D3EE),
    'accent_cobalt_blue': Color(0xFF3B82F6),
    'accent_warm_orange_soft_gold': Color(0xFFF59E0B),
    'accent_rust_orange': Color(0xFFEA580C),
    'accent_soft_mint': Color(0xFF34D399),
    'accent_emerald_green': Color(0xFF10B981),
  };

  static const _fallback = Color(0xFF9EEAF9);

  static Color resolve(String token) => _tokens[token] ?? _fallback;
}

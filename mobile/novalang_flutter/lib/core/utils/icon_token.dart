import 'package:flutter/material.dart';

/// Resolves a stable `iconToken` string (stored in catalog definitions) to a
/// concrete [IconData].
///
/// This is a deliberate indirection: catalog data never references
/// `Icons.*` directly, so a future custom Duotone Line Art icon pack can
/// replace the resolved values here without touching catalog IDs, routes, or
/// card widgets. Today every token resolves to a Material icon as a
/// placeholder (project-owner decision for this task).
abstract final class IconTokenResolver {
  static const _tokens = <String, IconData>{
    // Learning tracks
    'track_basic_communication': Icons.chat_bubble_outline,
    'track_professional_career': Icons.work_outline,
    'track_exam_preparation': Icons.school_outlined,

    // Professional categories
    'category_digital_technology': Icons.memory,
    'category_corporate_business': Icons.business_center_outlined,
    'category_hospitality_customer_service': Icons.room_service_outlined,
    'category_engineering_production': Icons.precision_manufacturing_outlined,
    'category_care_health_education': Icons.health_and_safety_outlined,
    'category_green_agriculture_supply_chain': Icons.local_shipping_outlined,

    // Professional domains (generic per-domain icon; visually secondary to
    // the category accent/icon, per the "no long description on mobile
    // card" guidance).
    'domain_default': Icons.circle_outlined,
  };

  static const _fallback = Icons.apps_outlined;

  static IconData resolve(String token) => _tokens[token] ?? _fallback;
}

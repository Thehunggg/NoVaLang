import 'package:flutter/material.dart';

class Responsive {
  const Responsive._();

  static EdgeInsets pagePadding(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    if (width >= 900) {
      return const EdgeInsets.symmetric(horizontal: 32, vertical: 24);
    }
    if (width >= 600) {
      return const EdgeInsets.symmetric(horizontal: 24, vertical: 20);
    }
    return const EdgeInsets.symmetric(horizontal: 16, vertical: 16);
  }

  static double maxContentWidth(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    if (width >= 900) return 760;
    if (width >= 600) return 640;
    return double.infinity;
  }

  static bool isTablet(BuildContext context) =>
      MediaQuery.sizeOf(context).width >= 700;
}

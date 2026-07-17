import 'package:flutter_riverpod/flutter_riverpod.dart';

/// Product plan tiers. Ordering is intentional: [index] increases with
/// entitlement level, so `tier.index >= PlanTier.plus.index` means "has
/// Plus-or-above access" without a separate boolean per feature.
enum PlanTier { free, plus, pro, ultimate }

extension PlanTierAccess on PlanTier {
  /// Plus-and-above features (e.g. Unit Comprehensive Conversation).
  bool get hasPlusAccess => index >= PlanTier.plus.index;
}

/// Seam between the app and whatever production billing/entitlement system
/// eventually determines a user's plan tier.
///
/// There is no production billing/subscription integration yet (see
/// `unit_comprehensive_conversation` product contract). Do not hard-code a
/// user as Plus/Pro/Ultimate outside of a test fixture.
abstract interface class PlanAccessPolicy {
  PlanTier tierFor(String userId);
}

/// Default, production-safe implementation: every user is treated as Free
/// until a real entitlement system is wired in. This must never grant
/// access to content a user has not actually purchased.
class ProductionSafePlanAccessPolicy implements PlanAccessPolicy {
  const ProductionSafePlanAccessPolicy();

  @override
  PlanTier tierFor(String userId) => PlanTier.free;
}

/// Test/fixture-only: simulates a fixed plan tier for every user. Use this
/// to exercise Free/Plus/Pro/Ultimate states in widget and unit tests.
class FixedPlanAccessPolicy implements PlanAccessPolicy {
  const FixedPlanAccessPolicy(this.tier);

  final PlanTier tier;

  @override
  PlanTier tierFor(String userId) => tier;
}

final planAccessPolicyProvider = Provider<PlanAccessPolicy>(
  (_) => const ProductionSafePlanAccessPolicy(),
);

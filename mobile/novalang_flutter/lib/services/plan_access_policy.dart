import 'package:flutter/foundation.dart';
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
/// `unit_comprehensive_cloze` product contract (ADR-022)). Do not hard-code a
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

/// Simulates a fixed plan tier for every user. Two callers only:
/// widget/unit tests (via a provider override), and the debug-only manual
/// unlock below. Never construct this on a production code path.
class FixedPlanAccessPolicy implements PlanAccessPolicy {
  const FixedPlanAccessPolicy(this.tier);

  final PlanTier tier;

  @override
  PlanTier tierFor(String userId) => tier;
}

/// Debug-only manual unlock, so the owner can open Plus-gated content (the
/// Unit Comprehensive Test) while testing on a device.
///
/// This does NOT touch the paywall logic or the `plan` field in lesson data —
/// it only swaps which [PlanAccessPolicy] the provider hands out, reusing the
/// existing seam rather than adding a branch inside any widget.
///
/// Turn it on:
///
/// ```
/// flutter run --dart-define=NOVALANG_DEBUG_UNLOCK_PLUS=true
/// ```
///
/// Turn it off: drop the flag (that is the default).
///
/// Two independent safeties, both resolved at compile time:
///  - [kDebugMode] means a release build can never unlock, even if someone
///    passes the define;
///  - the define defaults to `false`, so `flutter test` and a plain
///    `flutter run` keep the real Free-locked behaviour. Tests that need Plus
///    still override the provider explicitly with [FixedPlanAccessPolicy].
abstract final class DebugPlanUnlock {
  static const bool _requested = bool.fromEnvironment(
    'NOVALANG_DEBUG_UNLOCK_PLUS',
  );

  static bool get enabled => kDebugMode && _requested;

  /// Lowest tier that clears `hasPlusAccess` — unlock for testing, do not
  /// silently hand out Pro/Ultimate entitlements.
  static const PlanTier tier = PlanTier.plus;
}

final planAccessPolicyProvider = Provider<PlanAccessPolicy>(
  (_) => DebugPlanUnlock.enabled
      ? const FixedPlanAccessPolicy(DebugPlanUnlock.tier)
      : const ProductionSafePlanAccessPolicy(),
);

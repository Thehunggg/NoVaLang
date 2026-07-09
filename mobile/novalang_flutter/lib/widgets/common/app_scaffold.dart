import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import 'bottom_nav.dart';

class AppScaffold extends StatelessWidget {
  const AppScaffold({
    super.key,
    required this.title,
    required this.child,
    this.selectedNavIndex,
    this.actions,
    this.showBack = false,
    this.backPath,
    this.languageCode,
    this.onBeforeBack,
  });

  final String title;
  final Widget child;
  final int? selectedNavIndex;
  final List<Widget>? actions;
  final bool showBack;
  final String? backPath;
  final String? languageCode;
  final Future<void> Function()? onBeforeBack;

  Future<void> _handleBack(BuildContext context) async {
    if (onBeforeBack != null) {
      await onBeforeBack!();
    }
    if (!context.mounted) return;
    if (context.canPop()) {
      context.pop();
    } else if (backPath != null) {
      context.go(backPath!);
    } else {
      context.go('/learn');
    }
  }

  @override
  Widget build(BuildContext context) {
    final backLabel = L10n.text('back', languageCode ?? 'en');

    final scaffold = Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        leadingWidth: showBack ? 112 : null,
        leading: showBack
            ? TextButton(
                onPressed: () => _handleBack(context),
                style: TextButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 12),
                  minimumSize: const Size(48, 48),
                  foregroundColor: const Color(0xFF9EEAF9),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.arrow_back_ios_new, size: 16),
                    const SizedBox(width: 2),
                    Flexible(
                      child: Text(
                        backLabel,
                        style: const TextStyle(
                          fontWeight: FontWeight.w700,
                          fontSize: 14,
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
              )
            : null,
        title: Text(
          title,
          style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 17),
        ),
        actions: actions,
        backgroundColor: Colors.transparent,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
      ),
      extendBodyBehindAppBar: false,
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF090612), Color(0xFF11101B), Color(0xFF07161B)],
          ),
        ),
        child: SafeArea(top: false, child: child),
      ),
      bottomNavigationBar: selectedNavIndex == null
          ? null
          : BottomNav(selectedIndex: selectedNavIndex!),
    );

    if (!showBack) return scaffold;

    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, result) async {
        if (didPop) return;
        await _handleBack(context);
      },
      child: scaffold,
    );
  }
}

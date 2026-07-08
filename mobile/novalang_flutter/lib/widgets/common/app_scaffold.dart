import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

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
  });

  final String title;
  final Widget child;
  final int? selectedNavIndex;
  final List<Widget>? actions;
  final bool showBack;
  final String? backPath;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        leading: showBack
            ? IconButton(
                tooltip: MaterialLocalizations.of(context).backButtonTooltip,
                icon: const Icon(Icons.arrow_back),
                onPressed: () => context.canPop()
                    ? context.pop()
                    : context.go(backPath ?? '/learn'),
              )
            : null,
        title: Text(title),
        actions: actions,
        backgroundColor: Colors.transparent,
        surfaceTintColor: Colors.transparent,
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
  }
}

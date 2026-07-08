import 'package:flutter/material.dart';

import 'bottom_nav.dart';

class AppScaffold extends StatelessWidget {
  const AppScaffold({
    super.key,
    required this.title,
    required this.child,
    this.selectedNavIndex,
    this.actions,
    this.showBack = false,
  });

  final String title;
  final Widget child;
  final int? selectedNavIndex;
  final List<Widget>? actions;
  final bool showBack;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: showBack,
        title: Text(title),
        actions: actions,
        backgroundColor: Theme.of(context).colorScheme.surface,
        surfaceTintColor: Colors.transparent,
      ),
      body: SafeArea(top: false, child: child),
      bottomNavigationBar: selectedNavIndex == null
          ? null
          : BottomNav(selectedIndex: selectedNavIndex!),
    );
  }
}

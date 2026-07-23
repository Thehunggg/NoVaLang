import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/constants/app_constants.dart';
import '../../core/theme/app_theme.dart';
import '../../core/utils/localization.dart';
import '../../models/auth_provider_option.dart';
import '../common/app_button.dart';
import '../common/responsive_page.dart';

class LoginFinalVisual extends StatelessWidget {
  const LoginFinalVisual({
    super.key,
    required this.uiLanguageCode,
    required this.sloganLanguageCode,
    required this.providersAsync,
    required this.onProviderPressed,
  });

  final String uiLanguageCode;
  final String sloganLanguageCode;
  final AsyncValue<List<AuthProviderOption>> providersAsync;
  final ValueChanged<AuthProviderOption> onProviderPressed;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _Backdrop(
        child: SafeArea(
          child: ResponsivePage(
            bottomPadding: 18,
            child: LayoutBuilder(
              builder: (context, constraints) {
                final height = MediaQuery.sizeOf(context).height;
                final compact = constraints.maxWidth < 350 || height < 720;
                final heroHeight = (constraints.maxWidth * (compact ? .76 : .8))
                    .clamp(230.0, 330.0);
                return Center(
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 520),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        SizedBox(
                          height: compact ? 2 : (height * .018).clamp(8, 22),
                        ),
                        _BrandHeader(
                          compact: compact,
                          slogan: L10n.loginSlogan(sloganLanguageCode),
                          languagesBadge: L10n.text(
                            'authLanguagesBadge',
                            uiLanguageCode,
                          ),
                        ),
                        SizedBox(height: compact ? 8 : 14),
                        SizedBox(height: heroHeight, child: const _WorldHero()),
                        SizedBox(height: compact ? 8 : 14),
                        Padding(
                          padding: EdgeInsets.symmetric(
                            horizontal: constraints.maxWidth < 360
                                ? 0
                                : (constraints.maxWidth * .035).clamp(8, 18),
                          ),
                          child: providersAsync.when(
                            loading: () => const Center(
                              child: Padding(
                                padding: EdgeInsets.all(32),
                                child: CircularProgressIndicator(),
                              ),
                            ),
                            error: (error, _) => Text(
                              L10n.text('authProvidersError', uiLanguageCode),
                              textAlign: TextAlign.center,
                            ),
                            data: (providers) => _ProviderActions(
                              providers: providers,
                              locale: uiLanguageCode,
                              compact: compact,
                              onPressed: onProviderPressed,
                            ),
                          ),
                        ),
                        SizedBox(height: compact ? 8 : 18),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ),
      ),
    );
  }
}

class _BrandHeader extends StatelessWidget {
  const _BrandHeader({
    required this.compact,
    required this.slogan,
    required this.languagesBadge,
  });
  final bool compact;
  final String slogan;
  final String languagesBadge;

  @override
  Widget build(BuildContext context) {
    final style = Theme.of(context).textTheme.headlineMedium?.copyWith(
      fontSize: compact ? 28 : 33,
      fontWeight: FontWeight.w800,
      letterSpacing: -1,
      height: 1,
    );
    return Column(
      children: [
        SizedBox.square(
          dimension: compact ? 42 : 50,
          child: const CustomPaint(painter: _NovaMarkPainter()),
        ),
        const SizedBox(height: 7),
        Semantics(
          header: true,
          label: AppConstants.appName,
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'Nova',
                style: style?.copyWith(color: AppTheme.authWordmarkForeground),
              ),
              ShaderMask(
                blendMode: BlendMode.srcIn,
                shaderCallback: (bounds) => const LinearGradient(
                  colors: [
                    AppTheme.authWordmarkPurple,
                    AppTheme.authWordmarkBlue,
                  ],
                ).createShader(bounds),
                child: Text('Lang', style: style),
              ),
            ],
          ),
        ),
        const SizedBox(height: 8),
        ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 440),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12),
            child: Text(
              slogan,
              textAlign: TextAlign.center,
              maxLines: compact ? 2 : 3,
              overflow: TextOverflow.ellipsis,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: AppTheme.contentSecondaryForeground,
                fontSize: compact ? 12 : 13.5,
                height: 1.35,
              ),
            ),
          ),
        ),
        const SizedBox(height: 8),
        DecoratedBox(
          decoration: BoxDecoration(
            color: AppTheme.authBubbleSurfaceTop.withValues(alpha: 0.74),
            borderRadius: BorderRadius.circular(999),
            border: Border.all(
              color: AppTheme.authBubbleCyan.withValues(alpha: 0.44),
            ),
            boxShadow: [
              BoxShadow(
                color: AppTheme.authBubbleCyan.withValues(alpha: 0.1),
                blurRadius: 10,
              ),
            ],
          ),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(
                  Icons.translate_rounded,
                  size: 13,
                  color: AppTheme.authBubbleCyan,
                ),
                const SizedBox(width: 6),
                Text(
                  languagesBadge,
                  style: Theme.of(context).textTheme.labelSmall?.copyWith(
                    color: AppTheme.authGreetingForeground,
                    fontSize: compact ? 10 : 10.5,
                    fontWeight: FontWeight.w700,
                    letterSpacing: 0.1,
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class _Greeting {
  const _Greeting(
    this.text,
    this.locale,
    this.x,
    this.y, {
    this.primary = false,
  });
  final String text;
  final Locale locale;
  final double x;
  final double y;
  final bool primary;
}

class _WorldHero extends StatelessWidget {
  const _WorldHero();

  static const greetings = <_Greeting>[
    _Greeting('Hello', Locale('en'), .05, .18, primary: true),
    _Greeting('Hola', Locale('es'), .81, .48, primary: true),
    _Greeting('Xin chào', Locale('vi'), .23, .03),
    _Greeting('Bonjour', Locale('fr'), 0, .47, primary: true),
    _Greeting('こんにちは', Locale('ja', 'JP'), .95, .17, primary: true),
    _Greeting('안녕하세요', Locale('ko', 'KR'), 1, .71),
    _Greeting('你好', Locale('zh', 'CN'), .06, .73),
    _Greeting('مرحبا', Locale('ar'), 0, .86),
    _Greeting('Ciao', Locale('it'), 1, .88),
    _Greeting('Привет', Locale('ru'), .59, .01),
  ];

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final compact = constraints.maxWidth < 350;
        return Semantics(
          label: 'NovaLang multilingual world',
          image: true,
          child: Stack(
            clipBehavior: Clip.hardEdge,
            children: [
              Positioned.fill(
                child: ShaderMask(
                  blendMode: BlendMode.dstIn,
                  shaderCallback: (bounds) => const RadialGradient(
                    center: Alignment(0, 0.04),
                    radius: 0.82,
                    colors: [Colors.white, Colors.white, Colors.transparent],
                    stops: [0, 0.76, 1],
                  ).createShader(bounds),
                  child: Image.asset(
                    'assets/images/login_hero_artwork.png',
                    fit: BoxFit.contain,
                    alignment: Alignment.center,
                    filterQuality: FilterQuality.high,
                    semanticLabel: 'NovaLang mascot and holographic world map',
                  ),
                ),
              ),
              for (final item in greetings)
                _GreetingPosition(
                  item: item,
                  compact: compact,
                  size: constraints.biggest,
                ),
            ],
          ),
        );
      },
    );
  }
}

class _GreetingPosition extends StatelessWidget {
  const _GreetingPosition({
    required this.item,
    required this.compact,
    required this.size,
  });
  final _Greeting item;
  final bool compact;
  final Size size;

  @override
  Widget build(BuildContext context) {
    final factor = switch (item.text) {
      'こんにちは' || '안녕하세요' => compact ? .27 : .25,
      'Xin chào' || 'Bonjour' || 'Привет' => compact ? .23 : .21,
      _ => compact ? .18 : .16,
    };
    final width = size.width * factor;
    final height = compact ? 27.0 : 31.0;
    return Positioned(
      left: item.x * (size.width - width),
      top: item.y * (size.height - height),
      width: width,
      height: height,
      child: Opacity(
        opacity: item.primary ? .96 : .78,
        child: CustomPaint(
          painter: _BubblePainter(
            accent: item.primary
                ? AppTheme.authBubbleCyan
                : AppTheme.authBubblePurple,
          ),
          child: Padding(
            padding: const EdgeInsets.fromLTRB(7, 3, 7, 6),
            child: FittedBox(
              fit: BoxFit.scaleDown,
              child: Text(
                item.text,
                locale: item.locale,
                textDirection: item.locale.languageCode == 'ar'
                    ? TextDirection.rtl
                    : TextDirection.ltr,
                maxLines: 1,
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: item.primary
                      ? AppTheme.authGreetingForeground
                      : AppTheme.authGreetingSecondary,
                  fontSize: compact ? 10.5 : 12,
                  fontWeight: item.primary ? FontWeight.w700 : FontWeight.w600,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _BubblePainter extends CustomPainter {
  const _BubblePainter({required this.accent});
  final Color accent;

  @override
  void paint(Canvas canvas, Size size) {
    final body = RRect.fromRectAndRadius(
      Rect.fromLTWH(.8, .8, size.width - 1.6, size.height - 6),
      const Radius.circular(10),
    );
    canvas.drawRRect(
      body,
      Paint()
        ..shader = const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            AppTheme.authBubbleSurfaceTop,
            AppTheme.authBubbleSurfaceBottom,
          ],
        ).createShader(body.outerRect),
    );
    final tail = Path()
      ..moveTo(size.width * .23, size.height - 6)
      ..lineTo(size.width * .32, size.height)
      ..lineTo(size.width * .38, size.height - 6)
      ..close();
    canvas.drawPath(tail, Paint()..color = AppTheme.authBubbleSurfaceBottom);
    final border = Paint()
      ..color = accent.withValues(alpha: .72)
      ..style = PaintingStyle.stroke
      ..strokeWidth = .85;
    canvas.drawRRect(body, border);
    canvas.drawPath(tail, border);
  }

  @override
  bool shouldRepaint(covariant _BubblePainter oldDelegate) =>
      oldDelegate.accent != accent;
}

class _ProviderActions extends StatelessWidget {
  const _ProviderActions({
    required this.providers,
    required this.locale,
    required this.compact,
    required this.onPressed,
  });
  final List<AuthProviderOption> providers;
  final String locale;
  final bool compact;
  final ValueChanged<AuthProviderOption> onPressed;

  @override
  Widget build(BuildContext context) {
    final social = providers.where((item) => item.id != 'email').toList();
    final email = providers.where((item) => item.id == 'email').toList();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        for (var index = 0; index < social.length; index++) ...[
          _ProviderButton(
            provider: social[index],
            locale: locale,
            treatment: index == 0 ? _Treatment.primary : _Treatment.secondary,
            compact: compact,
            onPressed: () => onPressed(social[index]),
          ),
          if (index != social.length - 1) SizedBox(height: compact ? 8 : 10),
        ],
        if (social.isNotEmpty && email.isNotEmpty)
          Padding(
            padding: EdgeInsets.symmetric(vertical: compact ? 11 : 15),
            child: Row(
              children: [
                const Expanded(child: Divider(color: AppTheme.authDivider)),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 12),
                  child: Text(
                    L10n.authOr(locale),
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: AppTheme.contentDisabledForeground,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                const Expanded(child: Divider(color: AppTheme.authDivider)),
              ],
            ),
          ),
        for (final provider in email)
          _ProviderButton(
            provider: provider,
            locale: locale,
            treatment: _Treatment.email,
            compact: compact,
            onPressed: () => onPressed(provider),
          ),
        SizedBox(height: compact ? 14 : 18),
        _LegalFooter(locale: locale),
      ],
    );
  }
}

enum _Treatment { primary, secondary, email }

class _ProviderButton extends StatelessWidget {
  const _ProviderButton({
    required this.provider,
    required this.locale,
    required this.treatment,
    required this.compact,
    required this.onPressed,
  });
  final AuthProviderOption provider;
  final String locale;
  final _Treatment treatment;
  final bool compact;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    final primary = treatment == _Treatment.primary;
    final email = treatment == _Treatment.email;
    final foreground = primary
        ? AppTheme.authPrimaryButtonForeground
        : email
        ? AppTheme.authEmailButtonForeground
        : AppTheme.authButtonForeground;
    final style = ButtonStyle(
      minimumSize: WidgetStatePropertyAll(Size.fromHeight(compact ? 50 : 54)),
      backgroundColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.pressed)) {
          return primary
              ? AppTheme.authPrimaryButtonPressed
              : AppTheme.authButtonPressed;
        }
        if (states.contains(WidgetState.hovered) ||
            states.contains(WidgetState.focused)) {
          return primary
              ? AppTheme.authPrimaryButtonHover
              : AppTheme.authButtonHover;
        }
        return primary
            ? AppTheme.authPrimaryButtonSurface
            : email
            ? Colors.transparent
            : AppTheme.authSecondaryButtonSurface;
      }),
      foregroundColor: WidgetStatePropertyAll(foreground),
      side: WidgetStateProperty.resolveWith((states) {
        final active =
            states.contains(WidgetState.hovered) ||
            states.contains(WidgetState.focused) ||
            states.contains(WidgetState.pressed);
        return BorderSide(
          color: email
              ? active
                    ? AppTheme.authEmailButtonForeground
                    : AppTheme.authEmailButtonBorder
              : primary
              ? AppTheme.authPrimaryButtonBorder
              : active
              ? AppTheme.authButtonBorderActive
              : AppTheme.authButtonBorder,
          width: active ? 1.35 : 1,
        );
      }),
      shape: WidgetStatePropertyAll(
        RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
      ),
      padding: const WidgetStatePropertyAll(
        EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      ),
      overlayColor: const WidgetStatePropertyAll(Colors.transparent),
      elevation: WidgetStateProperty.resolveWith(
        (states) => states.contains(WidgetState.hovered) ? 4 : 0,
      ),
      shadowColor: WidgetStatePropertyAll(
        primary ? AppTheme.authPrimaryButtonGlow : AppTheme.authAmbientCyan,
      ),
    );
    return Theme(
      data: Theme.of(context).copyWith(
        filledButtonTheme: FilledButtonThemeData(style: style),
        outlinedButtonTheme: OutlinedButtonThemeData(style: style),
      ),
      child: AppButton(
        label: provider.localizedLabel(locale),
        leading: _ProviderMark(providerId: provider.id, dark: primary),
        leadingColumnWidth: 42,
        outlined: !primary,
        onPressed: onPressed,
      ),
    );
  }
}

class _ProviderMark extends StatelessWidget {
  const _ProviderMark({required this.providerId, required this.dark});
  final String providerId;
  final bool dark;

  @override
  Widget build(BuildContext context) {
    return SizedBox.square(
      dimension: 26,
      child: Center(
        child: switch (providerId) {
          'google' => const SizedBox.square(
            dimension: 22,
            child: CustomPaint(painter: _GoogleMarkPainter()),
          ),
          'facebook' => const Icon(
            Icons.facebook,
            color: AppTheme.authFacebookBlue,
            size: 23,
          ),
          'instagram' => ShaderMask(
            blendMode: BlendMode.srcIn,
            shaderCallback: (bounds) => const LinearGradient(
              begin: Alignment.bottomLeft,
              end: Alignment.topRight,
              colors: [
                AppTheme.authInstagramOrange,
                AppTheme.authInstagramPink,
                AppTheme.authInstagramPurple,
              ],
            ).createShader(bounds),
            child: const Icon(
              Icons.camera_alt_outlined,
              color: Colors.white,
              size: 22,
            ),
          ),
          'email' => const Icon(
            Icons.mail_outline_rounded,
            color: AppTheme.authEmailButtonForeground,
            size: 22,
          ),
          'apple' => Icon(
            Icons.apple,
            color: dark ? AppTheme.authPrimaryButtonForeground : Colors.white,
            size: 23,
          ),
          _ => Icon(
            Icons.login,
            color: dark ? Colors.black : Colors.white,
            size: 21,
          ),
        },
      ),
    );
  }
}

class _LegalFooter extends StatelessWidget {
  const _LegalFooter({required this.locale});
  final String locale;

  @override
  Widget build(BuildContext context) {
    final style = Theme.of(context).textTheme.bodySmall?.copyWith(
      color: AppTheme.contentDisabledForeground,
      fontSize: 11,
      height: 1.45,
    );
    return Column(
      children: [
        Text(
          L10n.text('authLegalPrefix', locale),
          textAlign: TextAlign.center,
          style: style,
        ),
        Text.rich(
          TextSpan(
            style: style,
            children: [
              TextSpan(
                text: L10n.text('termsOfService', locale),
                style: style?.copyWith(color: AppTheme.authLegalTerms),
              ),
              const TextSpan(text: '  •  '),
              TextSpan(
                text: L10n.text('privacyPolicy', locale),
                style: style?.copyWith(color: AppTheme.authLegalPrivacy),
              ),
            ],
          ),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }
}

class _NovaMarkPainter extends CustomPainter {
  const _NovaMarkPainter();
  @override
  void paint(Canvas canvas, Size size) {
    final path = Path()
      ..moveTo(size.width * .18, size.height * .78)
      ..lineTo(size.width * .18, size.height * .23)
      ..quadraticBezierTo(
        size.width * .18,
        size.height * .12,
        size.width * .29,
        size.height * .18,
      )
      ..lineTo(size.width * .71, size.height * .68)
      ..lineTo(size.width * .71, size.height * .22)
      ..quadraticBezierTo(
        size.width * .71,
        size.height * .14,
        size.width * .81,
        size.height * .2,
      )
      ..lineTo(size.width * .81, size.height * .77);
    final bounds = Offset.zero & size;
    canvas.drawCircle(
      bounds.center,
      size.width * 0.27,
      Paint()
        ..color = AppTheme.authMapCyan.withValues(alpha: 0.12)
        ..maskFilter = MaskFilter.blur(BlurStyle.normal, size.width * 0.16),
    );
    canvas.drawPath(
      path.shift(Offset(0, size.height * 0.035)),
      Paint()
        ..color = AppTheme.authWordmarkPurple.withValues(alpha: 0.5)
        ..style = PaintingStyle.stroke
        ..strokeWidth = size.width * 0.18
        ..strokeCap = StrokeCap.round
        ..strokeJoin = StrokeJoin.round
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 2.4),
    );
    canvas.drawPath(
      path,
      Paint()
        ..color = AppTheme.authLogoRim.withValues(alpha: 0.36)
        ..style = PaintingStyle.stroke
        ..strokeWidth = size.width * 0.155
        ..strokeCap = StrokeCap.round
        ..strokeJoin = StrokeJoin.round,
    );
    final bodyPaint = Paint()
      ..shader = const LinearGradient(
        begin: Alignment.bottomLeft,
        end: Alignment.topRight,
        colors: [
          AppTheme.authMapCyan,
          AppTheme.authWordmarkBlue,
          AppTheme.authWordmarkPurple,
        ],
        stops: [0, 0.5, 1],
      ).createShader(bounds)
      ..style = PaintingStyle.stroke
      ..strokeWidth = size.width * 0.115
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round;
    canvas.drawPath(path, bodyPaint);
    canvas.drawPath(
      path.shift(Offset(-size.width * 0.012, -size.height * 0.016)),
      Paint()
        ..color = Colors.white.withValues(alpha: 0.42)
        ..style = PaintingStyle.stroke
        ..strokeWidth = size.width * 0.024
        ..strokeCap = StrokeCap.round
        ..strokeJoin = StrokeJoin.round,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _GoogleMarkPainter extends CustomPainter {
  const _GoogleMarkPainter();
  @override
  void paint(Canvas canvas, Size size) {
    final stroke = size.width * 0.175;
    final rect = (Offset.zero & size).deflate(stroke * 0.72);
    void arc(Color color, double start, double sweep) => canvas.drawArc(
      rect,
      start,
      sweep,
      false,
      Paint()
        ..color = color
        ..style = PaintingStyle.stroke
        ..strokeWidth = stroke
        ..strokeCap = StrokeCap.butt,
    );
    arc(AppTheme.authGoogleBlue, -0.76, 1.3);
    arc(AppTheme.authGoogleGreen, 0.73, 1.3);
    arc(AppTheme.authGoogleYellow, 2.03, 0.72);
    arc(AppTheme.authGoogleRed, 2.75, 2.77);
    canvas.drawLine(
      Offset(size.width * 0.52, size.height * 0.5),
      Offset(size.width * 0.91, size.height * 0.5),
      Paint()
        ..color = AppTheme.authGoogleBlue
        ..strokeWidth = stroke
        ..strokeCap = StrokeCap.butt,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _Backdrop extends StatelessWidget {
  const _Backdrop({required this.child});
  final Widget child;
  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            AppTheme.authBackgroundTop,
            AppTheme.authBackgroundMiddle,
            AppTheme.authBackgroundBottom,
          ],
          stops: [0, .53, 1],
        ),
      ),
      child: Stack(
        fit: StackFit.expand,
        children: [
          const Positioned(
            left: -130,
            right: -130,
            top: 130,
            height: 440,
            child: DecoratedBox(
              decoration: BoxDecoration(
                gradient: RadialGradient(
                  colors: [AppTheme.authBackdropHeroGlow, Colors.transparent],
                ),
              ),
            ),
          ),
          child,
        ],
      ),
    );
  }
}

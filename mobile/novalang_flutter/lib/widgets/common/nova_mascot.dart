import 'package:flutter/material.dart';

class NovaMascot extends StatelessWidget {
  const NovaMascot({super.key, this.size = 112});
  final double size;

  @override
  Widget build(BuildContext context) => Semantics(
    label: 'Nova',
    image: true,
    child: SizedBox.square(
      dimension: size,
      child: CustomPaint(painter: _NovaPainter()),
    ),
  );
}

class _NovaPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final scale = size.width / 120;
    canvas.save();
    canvas.scale(scale);
    final outline = Paint()
      ..color = const Color(0xFFC4B5FD)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3;
    canvas.drawOval(
      const Rect.fromLTWH(27, 20, 68, 71),
      Paint()..color = const Color(0xFFF8FAFC),
    );
    canvas.drawOval(const Rect.fromLTWH(27, 20, 68, 71), outline);
    final horn = Path()
      ..moveTo(58, 24)
      ..lineTo(68, 2)
      ..lineTo(75, 27)
      ..close();
    canvas.drawPath(horn, Paint()..color = const Color(0xFF8B5CF6));
    final mane = Path()
      ..moveTo(30, 51)
      ..quadraticBezierTo(38, 18, 72, 22)
      ..quadraticBezierTo(53, 33, 51, 58)
      ..close();
    canvas.drawPath(mane, Paint()..color = const Color(0xFF22D3EE));
    canvas.drawCircle(
      const Offset(47, 57),
      3,
      Paint()..color = const Color(0xFF312E81),
    );
    canvas.drawCircle(
      const Offset(75, 57),
      3,
      Paint()..color = const Color(0xFF312E81),
    );
    canvas.drawArc(
      const Rect.fromLTWH(52, 62, 20, 12),
      0.2,
      2.7,
      false,
      Paint()
        ..color = const Color(0xFF7C3AED)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2.5,
    );
    final leftBook = Path()
      ..moveTo(9, 78)
      ..lineTo(59, 86)
      ..lineTo(59, 113)
      ..lineTo(9, 103)
      ..close();
    final rightBook = Path()
      ..moveTo(111, 78)
      ..lineTo(61, 86)
      ..lineTo(61, 113)
      ..lineTo(111, 103)
      ..close();
    final bookPaint = Paint()..color = const Color(0xFF172033);
    canvas.drawPath(leftBook, bookPaint);
    canvas.drawPath(rightBook, bookPaint);
    final bookLine = Paint()
      ..color = const Color(0xFF67E8F9)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.5;
    canvas.drawPath(leftBook, bookLine);
    canvas.drawPath(rightBook, bookLine);
    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

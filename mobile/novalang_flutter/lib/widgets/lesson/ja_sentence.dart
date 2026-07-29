import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/japanese_text.dart';
import '../../core/theme/app_theme.dart';
import '../../state/lesson_reading_aid.dart';
import 'speaker_button.dart';

/// MẶT HIỂN THỊ CHUỖI NHẬT DÙNG CHUNG — G14-R14.
///
/// Luật: **cấm vẽ chuỗi Nhật trần**. Mọi chỗ hiện tiếng Nhật đi qua widget này
/// để chắc chắn có đủ ba thứ:
///   1. dòng chính LUÔN SẠCH (bỏ ngoặc chú âm khi vẽ) — R14 [JA] (a);
///   2. dòng trợ đọc bật/tắt theo `LessonReadingAidStore` — R14 [JA] (b);
///   3. nút nghe lấy từ `speechText` — R14 (b).
///
/// Ngoặc chú âm KHÔNG bị xoá khỏi dữ liệu; chỉ bỏ lúc vẽ. Dữ liệu ngoặc chính
/// là thứ dựng ra dòng wakachigaki, và là thứ cổng R12d dùng để đối chiếu.
/// Bối cảnh trợ đọc của MỘT màn bài — đặt một lần ở gốc trang, mọi
/// [JaSentence] bên dưới tự lấy.
///
/// Không truyền tay 4 giá trị này xuống từng widget con: chúng là hằng của cả
/// màn, mà đường truyền lại đi qua những widget chẳng liên quan
/// (`_VocabularyDetails`, `_GrammarPanel`…). Truyền tay là mỗi lần thêm một
/// mặt hiển thị mới lại phải sửa cả chuỗi widget ở giữa — đúng thứ khiến
/// `intro.examples` bị bỏ quên.
/// Bối cảnh + TRẠNG THÁI trợ đọc đã giải sẵn, truyền xuống bằng InheritedWidget.
///
/// Riverpod chỉ đụng ở ĐÂY, không đụng ở widget lá: nếu [JaSentence] là
/// ConsumerWidget thì mọi chỗ dựng nó — kể cả test dựng lẻ một thẻ từ vựng —
/// đều bị ép phải có ProviderScope bao ngoài. Widget lá giữ Stateless thuần,
/// nhận trạng thái đã giải, nên dựng ở đâu cũng chạy.
class ReadingAidScope extends InheritedWidget {
  const ReadingAidScope({
    super.key,
    required this.lessonSessionKey,
    required this.lessonLevel,
    required this.learningLanguageCode,
    required this.uiLanguageCode,
    this.showFurigana = false,
    this.showRomaji = false,
    required super.child,
  });

  final String lessonSessionKey;
  final String lessonLevel;
  final String learningLanguageCode;
  final String uiLanguageCode;
  final bool showFurigana;
  final bool showRomaji;

  static ReadingAidScope? maybeOf(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<ReadingAidScope>();

  @override
  bool updateShouldNotify(ReadingAidScope old) =>
      lessonSessionKey != old.lessonSessionKey ||
      lessonLevel != old.lessonLevel ||
      learningLanguageCode != old.learningLanguageCode ||
      uiLanguageCode != old.uiLanguageCode ||
      showFurigana != old.showFurigana ||
      showRomaji != old.showRomaji;
}

/// Nối [LessonReadingAidStore] vào [ReadingAidScope]. Đặt ở gốc mỗi trang thẻ.
class ReadingAidScopeBuilder extends ConsumerWidget {
  const ReadingAidScopeBuilder({
    super.key,
    required this.lessonSessionKey,
    required this.lessonLevel,
    required this.learningLanguageCode,
    required this.uiLanguageCode,
    required this.child,
  });

  final String lessonSessionKey;
  final String lessonLevel;
  final String learningLanguageCode;
  final String uiLanguageCode;
  final Widget child;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // ListenableBuilder chứ không ref.watch: store là ChangeNotifier nằm trong
    // một Provider thường, `watch` chỉ theo dõi CHÍNH đối tượng store (không
    // bao giờ đổi) nên không rebuild khi notifyListeners() bắn. Đúng lối Q14.
    final store = ref.read(lessonReadingAidStoreProvider);
    return ListenableBuilder(
      listenable: store,
      builder: (context, _) {
        final aid = store.stateFor(
          lessonSessionKey: lessonSessionKey,
          learningLanguageCode: learningLanguageCode,
        );
        return ReadingAidScope(
          lessonSessionKey: lessonSessionKey,
          lessonLevel: lessonLevel,
          learningLanguageCode: learningLanguageCode,
          uiLanguageCode: uiLanguageCode,
          showFurigana: aid.showFurigana,
          showRomaji: aid.showRomaji,
          child: child,
        );
      },
    );
  }
}

class JaSentence extends StatelessWidget {
  const JaSentence({
    super.key,
    required this.displayText,
    this.lessonSessionKey,
    this.lessonLevel,
    this.learningLanguageCode,
    this.uiLanguageCode,
    this.reading,
    this.speechText,
    this.translation,
    this.romanization,
    this.textStyle,
    this.showSpeaker = true,
    this.dense = false,
  });

  /// Mặt chữ như trong dữ liệu — CÓ ngoặc chú âm. Widget tự bỏ khi vẽ.
  final String displayText;

  /// Dòng đọc kana của chính câu đó (dùng khi câu không có ngoặc chú âm).
  final String? reading;

  /// Chuỗi đưa cho TTS. Thiếu thì lùi về mặt chữ ĐÃ BỎ NGOẶC — không bao giờ
  /// đưa chuỗi còn ngoặc cho TTS, nó sẽ đọc luôn cả phần chú âm.
  final String? speechText;

  final String? translation;

  /// Romaji viết tay (Q14 có sẵn). Thiếu thì phiên máy từ kana.
  final String? romanization;

  /// Bốn giá trị dưới đây thường lấy từ [ReadingAidScope]; truyền tay chỉ khi
  /// widget nằm ngoài scope (ví dụ trong test dựng lẻ).
  final String? lessonSessionKey;
  final String? lessonLevel;
  final String? learningLanguageCode;
  final String? uiLanguageCode;
  final TextStyle? textStyle;
  final bool showSpeaker;
  final bool dense;

  @override
  Widget build(BuildContext context) {
    // Dựng ngoài scope vẫn chạy: trợ đọc về mặc định TẮT, dòng chính vẫn sạch,
    // nút nghe vẫn có. Chốt chặn cho "quên nối" là kiểm phủ render-coverage ở
    // cổng, không phải assert làm gãy test dựng widget lẻ.
    final scope = ReadingAidScope.maybeOf(context);
    final learning = learningLanguageCode ?? scope?.learningLanguageCode ?? '';
    final ui = uiLanguageCode ?? scope?.uiLanguageCode ?? 'en';

    final clean = stripFurigana(displayText);
    final kanaLine = (scope?.showFurigana ?? false) ? _kanaLine() : '';
    final romaji = (scope?.showRomaji ?? false) ? _romaji() : '';
    final tts = (speechText != null && speechText!.trim().isNotEmpty)
        ? speechText!
        : clean;

    final body = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          clean,
          style: textStyle ?? const TextStyle(fontWeight: FontWeight.w800),
        ),
        if (kanaLine.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(top: 3),
            child: Text(
              kanaLine,
              style: const TextStyle(
                color: AppTheme.contentAccentForeground,
                fontSize: 12,
              ),
            ),
          ),
        if (romaji.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(top: 2),
            child: Text(
              romaji,
              style: const TextStyle(
                color: AppTheme.contentSecondaryForeground,
                fontSize: 12,
                fontStyle: FontStyle.italic,
              ),
            ),
          ),
        if ((translation ?? '').trim().isNotEmpty)
          Padding(
            padding: EdgeInsets.only(top: dense ? 2 : 4),
            child: Text(
              translation!,
              style: const TextStyle(color: AppTheme.contentSecondaryForeground),
            ),
          ),
      ],
    );

    if (!showSpeaker) return body;
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(child: body),
        SpeakerButton(
          speechText: tts,
          languageCode: learning,
          uiLanguageCode: ui,
        ),
      ],
    );
  }

  /// Câu có ngoặc → ráp wakachigaki theo ranh giới khối.
  /// Câu không có ngoặc (toàn kana) → dòng đọc chỉ lặp lại chính nó, bỏ.
  String _kanaLine() {
    final w = wakachigaki(displayText);
    if (w.isNotEmpty) return w;
    final r = (reading ?? '').trim();
    if (r.isEmpty || r == stripFurigana(displayText).trim()) return '';
    return r;
  }

  String _romaji() {
    final hand = (romanization ?? '').trim();
    if (hand.isNotEmpty) return hand;
    return romajiLine(displayText, reading);
  }
}

/// Hàng công tắc trợ đọc, đặt ở đầu mỗi thẻ.
class ReadingAidToggles extends ConsumerWidget {
  const ReadingAidToggles({
    super.key,
    required this.lessonSessionKey,
    required this.lessonLevel,
    required this.learningLanguageCode,
    required this.furiganaLabel,
    required this.romajiLabel,
  });

  final String lessonSessionKey;
  final String lessonLevel;
  final String learningLanguageCode;
  final String furiganaLabel;
  final String romajiLabel;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Trợ đọc chỉ có nghĩa với ngôn ngữ dùng chú âm. R14 tầng [JA].
    if (learningLanguageCode != 'ja') return const SizedBox.shrink();

    final store = ref.read(lessonReadingAidStoreProvider);
    return ListenableBuilder(
      listenable: store,
      builder: (context, _) {
        final aid = store.stateFor(
          lessonSessionKey: lessonSessionKey,
          learningLanguageCode: learningLanguageCode,
        );
        return Padding(
          padding: const EdgeInsets.only(bottom: 8),
          child: Wrap(
            spacing: 8,
            runSpacing: 4,
            children: [
              FilterChip(
                key: const ValueKey('reading-aid-furigana'),
                label: Text(furiganaLabel),
                selected: aid.showFurigana,
                onSelected: (v) => store.setShowFurigana(lessonSessionKey, v),
              ),
              if (aid.readingAidOn)
                FilterChip(
                  key: const ValueKey('reading-aid-romaji'),
                  label: Text(romajiLabel),
                  selected: aid.showRomaji,
                  onSelected: (v) => store.setShowRomaji(lessonSessionKey, v),
                ),
            ],
          ),
        );
      },
    );
  }
}

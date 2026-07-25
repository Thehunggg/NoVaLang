import 'package:flutter/material.dart';

import '../../core/utils/localization.dart';
import '../../models/unit_comprehensive_test.dart';
import '../../widgets/common/app_card.dart';
import '../../widgets/common/app_scaffold.dart';

/// Màn hình làm BÀI TỔNG HỢP CUỐI UNIT (ADR-022).
///
/// Ba loại câu, hai đường chấm — cả hai đều SO KHỚP CỐ ĐỊNH, KHÔNG gọi AI
/// (§D-Cloze):
///  - `sentence_multi_blank_choice` / `dialogue_multi_blank_choice`:
///    chọn 1 trong 4 phương án; mỗi phương án đã điền sẵn MỌI ô, nên chấm
///    bằng so `correctOptionId` — không có điểm từng phần.
///  - `typed_blank`: người học tự gõ. So khớp TỪNG Ô (để phản hồi đúng/sai ô
///    nào) qua `acceptedAnswers` + `normalizePracticeTextAnswer` — tái dùng
///    nguyên cơ chế Q10 `chat_text_fill`; nhưng CÂU chỉ đúng khi MỌI ô đúng.
///
/// Mọi chuỗi hiển thị đi qua [L10n] — không hard-code chuỗi hay ngôn ngữ nào.
class UnitComprehensiveTestScreen extends StatefulWidget {
  const UnitComprehensiveTestScreen({
    super.key,
    required this.test,
    required this.locale,
    required this.nativeLanguageCode,
  });

  final UnitComprehensiveTest test;

  /// `uiLanguageCode` — chrome của app (nút, tiêu đề, tiến độ).
  final String locale;

  /// `nativeLanguageCode` — nội dung hỗ trợ người học (đề bài, giải thích).
  final String nativeLanguageCode;

  @override
  State<UnitComprehensiveTestScreen> createState() =>
      _UnitComprehensiveTestScreenState();
}

class _UnitComprehensiveTestScreenState
    extends State<UnitComprehensiveTestScreen> {
  int _index = 0;
  bool _checked = false;
  bool _finished = false;
  int _correctCount = 0;

  String? _selectedOptionId;
  final Map<String, TextEditingController> _typedControllers = {};

  UnitComprehensiveQuestion get _question => widget.test.questions[_index];

  @override
  void dispose() {
    for (final c in _typedControllers.values) {
      c.dispose();
    }
    super.dispose();
  }

  TextEditingController _controllerFor(String blankId) =>
      _typedControllers.putIfAbsent(blankId, TextEditingController.new);

  Map<String, String> get _typedAnswers => {
        for (final b in _question.blanks)
          b.id: _typedControllers[b.id]?.text ?? '',
      };

  bool get _canCheck {
    if (_question.kind.isChoice) return _selectedOptionId != null;
    return _question.blanks
        .every((b) => (_typedControllers[b.id]?.text ?? '').trim().isNotEmpty);
  }

  bool get _isCurrentCorrect => _question.kind.isChoice
      ? _question.checksChoice(_selectedOptionId)
      : _question.checksTyped(_typedAnswers);

  void _check() {
    setState(() {
      _checked = true;
      if (_isCurrentCorrect) _correctCount++;
    });
  }

  void _next() {
    if (_index >= widget.test.questions.length - 1) {
      setState(() => _finished = true);
      return;
    }
    setState(() {
      _index++;
      _checked = false;
      _selectedOptionId = null;
      _typedControllers.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    final locale = widget.locale;
    return AppScaffold(
      title: widget.test.title,
      showBack: true,
      languageCode: locale,
      child: _finished ? _buildResult(locale) : _buildQuestion(locale),
    );
  }

  Widget _buildResult(String locale) {
    final total = widget.test.questions.length;
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              L10n.text('unitComprehensiveTestResultTitle', locale),
              style: Theme.of(context).textTheme.headlineSmall,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 12),
            Text(
              L10n.text('unitComprehensiveTestScore', locale)
                  .replaceAll('{correct}', '$_correctCount')
                  .replaceAll('{total}', '$total'),
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 24),
            FilledButton(
              onPressed: () => Navigator.of(context).pop(),
              child: Text(L10n.text('unitComprehensiveTestClose', locale)),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildQuestion(String locale) {
    final q = _question;
    final total = widget.test.questions.length;
    final isLast = _index >= total - 1;

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Text(
          L10n.text('unitComprehensiveTestProgress', locale)
              .replaceAll('{current}', '${_index + 1}')
              .replaceAll('{total}', '$total'),
          style: Theme.of(context).textTheme.labelLarge,
        ),
        const SizedBox(height: 12),
        if ((q.context ?? '').isNotEmpty) ...[
          Text(q.context!, style: Theme.of(context).textTheme.bodyMedium),
          const SizedBox(height: 8),
        ],
        Text(q.prompt, style: Theme.of(context).textTheme.titleMedium),
        const SizedBox(height: 16),

        // Thân câu: hội thoại hay câu đơn.
        if (q.kind == UnitComprehensiveQuestionKind.dialogueMultiBlankChoice)
          ...q.dialogue.map((turn) => _buildDialogueTurn(turn, q))
        else
          AppCard(child: _buildSentence(q.segments, q)),

        const SizedBox(height: 16),

        // Nhập liệu: chọn phương án hay tự gõ.
        if (q.kind.isChoice)
          ..._buildOptions(q, locale)
        else
          ..._buildTypedFields(q, locale),

        const SizedBox(height: 16),

        if (_checked) _buildFeedback(q, locale),

        const SizedBox(height: 16),
        FilledButton(
          onPressed: _checked
              ? _next
              : (_canCheck ? _check : null),
          child: Text(
            _checked
                ? (isLast
                    ? L10n.text('unitComprehensiveTestSeeResult', locale)
                    : L10n.text('unitComprehensiveTestNext', locale))
                : L10n.text('checkAnswer', locale),
          ),
        ),
      ],
    );
  }

  Widget _buildDialogueTurn(
    UnitComprehensiveDialogueTurn turn,
    UnitComprehensiveQuestion q,
  ) =>
      Padding(
        padding: const EdgeInsets.only(bottom: 8),
        child: AppCard(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                '${turn.speakerId}: ',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
              ),
              Expanded(child: _buildSentence(turn.segments, q)),
            ],
          ),
        ),
      );

  /// Ghép đoạn thành câu; đoạn là ô trống thì hiện chỗ khuyết (hoặc đáp án
  /// đã chọn / đã gõ).
  Widget _buildSentence(
    List<UnitComprehensiveSegment> segments,
    UnitComprehensiveQuestion q,
  ) {
    final style = Theme.of(context).textTheme.bodyLarge;
    final spans = <InlineSpan>[];
    for (final s in segments) {
      if (!s.isBlank) {
        spans.add(TextSpan(text: s.displayText ?? '', style: style));
        continue;
      }
      final blankId = s.blankId!;
      String shown;
      if (_checked) {
        shown = q.blankById(blankId)?.displayAnswer ?? '____';
      } else if (q.kind.isChoice && _selectedOptionId != null) {
        final opt = q.options.firstWhere(
          (o) => o.id == _selectedOptionId,
          orElse: () => const UnitComprehensiveOption(
            id: '',
            text: '',
            answersByBlankId: {},
          ),
        );
        shown = opt.answersByBlankId[blankId] ?? '____';
      } else {
        shown = '____';
      }
      spans.add(
        TextSpan(
          text: ' $shown ',
          style: style?.copyWith(
            fontWeight: FontWeight.w700,
            decoration: TextDecoration.underline,
          ),
        ),
      );
    }
    return RichText(text: TextSpan(children: spans));
  }

  List<Widget> _buildOptions(UnitComprehensiveQuestion q, String locale) =>
      q.options.map((opt) {
        final selected = _selectedOptionId == opt.id;
        final isCorrectOption = opt.id == q.correctOptionId;
        Color? border;
        if (_checked) {
          if (isCorrectOption) {
            border = Colors.green;
          } else if (selected) {
            border = Colors.red;
          }
        } else if (selected) {
          border = Theme.of(context).colorScheme.primary;
        }
        return Padding(
          padding: const EdgeInsets.only(bottom: 8),
          child: InkWell(
            onTap: _checked
                ? null
                : () => setState(() => _selectedOptionId = opt.id),
            child: Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: border ?? Theme.of(context).dividerColor,
                  width: border == null ? 1 : 2,
                ),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Text(
                      opt.text,
                      style: Theme.of(context).textTheme.bodyLarge,
                    ),
                  ),
                  if (_checked && isCorrectOption)
                    const Icon(Icons.check, color: Colors.green, size: 20),
                ],
              ),
            ),
          ),
        );
      }).toList(growable: false);

  List<Widget> _buildTypedFields(
    UnitComprehensiveQuestion q,
    String locale,
  ) {
    final wrong = _checked ? q.incorrectTypedBlankIds(_typedAnswers) : const <String>{};
    return q.blanks.map((b) {
      final isWrong = wrong.contains(b.id);
      return Padding(
        padding: const EdgeInsets.only(bottom: 12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextField(
              controller: _controllerFor(b.id),
              enabled: !_checked,
              decoration: InputDecoration(
                labelText: L10n.text('unitComprehensiveTestTypeHere', locale),
                border: const OutlineInputBorder(),
                // Phản hồi TỪNG Ô: người học thấy đúng ô nào, sai ô nào.
                errorText: isWrong ? b.displayAnswer : null,
                suffixIcon: _checked
                    ? Icon(
                        isWrong ? Icons.close : Icons.check,
                        color: isWrong ? Colors.red : Colors.green,
                      )
                    : null,
              ),
            ),
            if (!_checked && (b.hint ?? '').isNotEmpty)
              Padding(
                padding: const EdgeInsets.only(top: 4),
                child: Text(
                  '${L10n.text('unitComprehensiveTestHint', locale)}: ${b.hint}',
                  style: Theme.of(context).textTheme.bodySmall,
                ),
              ),
          ],
        ),
      );
    }).toList(growable: false);
  }

  Widget _buildFeedback(UnitComprehensiveQuestion q, String locale) {
    final correct = _isCurrentCorrect;
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                correct ? Icons.check_circle : Icons.cancel,
                color: correct ? Colors.green : Colors.red,
                size: 20,
              ),
              const SizedBox(width: 8),
              Text(
                L10n.text(correct ? 'correct' : 'notQuite', locale),
                style: Theme.of(context).textTheme.titleSmall,
              ),
            ],
          ),
          if (!correct) ...[
            const SizedBox(height: 8),
            Text(
              '${L10n.text('unitComprehensiveTestCorrectAnswer', locale)}: '
              '${q.correctAnswersByBlankId.values.join(' / ')}',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
          if (q.explanation.isNotEmpty) ...[
            const SizedBox(height: 8),
            Text(
              '${L10n.text('explanation', locale)}: ${q.explanation}',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ],
      ),
    );
  }
}

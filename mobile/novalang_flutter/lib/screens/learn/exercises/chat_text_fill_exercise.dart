import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import '../../../core/theme/app_theme.dart';
import '../../../core/utils/localization.dart';
import '../../../models/five_card_practice.dart';

class ChatTextFillExercise extends StatefulWidget {
  const ChatTextFillExercise({
    super.key,
    required this.exercise,
    required this.enabled,
    required this.incorrectSlotIds,
    required this.uiLanguageCode,
    required this.onChanged,
    this.initialAnswers = const {},
  });

  final PracticeExercise exercise;
  final bool enabled;
  final Set<String> incorrectSlotIds;
  final String uiLanguageCode;
  final ValueChanged<Map<String, String>> onChanged;
  final Map<String, String> initialAnswers;

  @override
  State<ChatTextFillExercise> createState() => _ChatTextFillExerciseState();
}

class _ChatTextFillExerciseState extends State<ChatTextFillExercise> {
  late final Map<String, TextEditingController> _controllers;
  late final Map<String, FocusNode> _focusNodes;

  @override
  void initState() {
    super.initState();
    _controllers = {
      for (final slot in widget.exercise.slots)
        slot.id: TextEditingController(
          text: widget.initialAnswers[slot.id] ?? '',
        ),
    };
    _focusNodes = {
      for (final slot in widget.exercise.slots) slot.id: FocusNode(),
    };
    if (kDebugMode) {
      for (final slot in widget.exercise.slots) {
        final controller = _controllers[slot.id]!;
        final focusNode = _focusNodes[slot.id]!;
        debugPrint(
          'chat slot=${slot.id} init controller=${identityHashCode(controller)} focus=${identityHashCode(focusNode)}',
        );
        controller.addListener(() {
          final value = controller.value;
          debugPrint(
            'chat slot=${slot.id} text=${value.text} selection=${value.selection} composing=${value.composing}',
          );
        });
      }
    }
  }

  @override
  void dispose() {
    if (kDebugMode) {
      for (final slot in widget.exercise.slots) {
        debugPrint(
          'chat slot=${slot.id} dispose controller=${identityHashCode(_controllers[slot.id])} focus=${identityHashCode(_focusNodes[slot.id])}',
        );
      }
    }
    for (final controller in _controllers.values) {
      controller.dispose();
    }
    for (final node in _focusNodes.values) {
      node.dispose();
    }
    super.dispose();
  }

  void _publish() => widget.onChanged({
    for (final entry in _controllers.entries) entry.key: entry.value.text,
  });

  @override
  Widget build(BuildContext context) {
    final chat = widget.exercise.chat;
    if (chat == null) return const SizedBox.shrink();
    final speakers = {
      for (final speaker in chat.speakers) _text(speaker['id']): speaker,
    };
    final slots = {for (final slot in widget.exercise.slots) slot.id: slot};
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _ContextCard(timestamp: chat.timestamp, context: chat.context),
        const SizedBox(height: 16),
        for (final message in chat.messages)
          _ChatBubble(
            speaker: speakers[message.speakerId] ?? const <String, dynamic>{},
            child: Wrap(
              crossAxisAlignment: WrapCrossAlignment.center,
              spacing: 4,
              runSpacing: 6,
              children: [
                for (final segment in message.segments)
                  if (_text(segment['slotId']).isNotEmpty)
                    _ChatInput(
                      slot: slots[_text(segment['slotId'])]!,
                      controller: _controllers[_text(segment['slotId'])]!,
                      focusNode: _focusNodes[_text(segment['slotId'])]!,
                      enabled: widget.enabled,
                      incorrect: widget.incorrectSlotIds.contains(
                        _text(segment['slotId']),
                      ),
                      nextFocus: _nextFocus(_text(segment['slotId'])),
                      onChanged: _publish,
                      uiLanguageCode: widget.uiLanguageCode,
                    )
                  else
                    Text(
                      _text(segment['displayText']),
                      style: const TextStyle(fontSize: 16, height: 1.42),
                    ),
              ],
            ),
          ),
      ],
    );
  }

  FocusNode? _nextFocus(String slotId) {
    final ids = widget.exercise.slots.map((slot) => slot.id).toList();
    final index = ids.indexOf(slotId);
    return index >= 0 && index + 1 < ids.length
        ? _focusNodes[ids[index + 1]]
        : null;
  }
}

class _ContextCard extends StatelessWidget {
  const _ContextCard({required this.timestamp, required this.context});
  final String timestamp;
  final String context;

  @override
  Widget build(BuildContext context) => DecoratedBox(
    decoration: BoxDecoration(
      color: AppTheme.lessonSurface,
      borderRadius: BorderRadius.circular(14),
      border: Border.all(color: AppTheme.lessonBorderSubtle),
    ),
    child: Padding(
      padding: const EdgeInsets.all(14),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            timestamp,
            style: const TextStyle(
              color: AppTheme.contentAccentForeground,
              fontWeight: FontWeight.w900,
            ),
          ),
          const SizedBox(height: 6),
          Text(this.context, style: const TextStyle(height: 1.4)),
        ],
      ),
    ),
  );
}

class _ChatBubble extends StatelessWidget {
  const _ChatBubble({required this.speaker, required this.child});
  final Map<String, dynamic> speaker;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final isRight = _text(speaker['alignment']) == 'right';
    final label = _text(speaker['label']);
    final bubble = Flexible(
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: isRight
              ? AppTheme.dialogueBubbleSpeakerA
              : AppTheme.dialogueBubbleSpeakerB,
          border: Border.all(
            color: isRight
                ? AppTheme.dialogueBubbleSpeakerABorder
                : AppTheme.dialogueBubbleSpeakerBBorder,
          ),
          borderRadius: BorderRadius.circular(16),
        ),
        child: Padding(padding: const EdgeInsets.all(12), child: child),
      ),
    );
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: isRight
            ? MainAxisAlignment.end
            : MainAxisAlignment.start,
        children: [
          if (!isRight) _Avatar(label: label),
          if (!isRight) const SizedBox(width: 8),
          bubble,
          if (isRight) const SizedBox(width: 8),
          if (isRight) _Avatar(label: label),
        ],
      ),
    );
  }
}

class _Avatar extends StatelessWidget {
  const _Avatar({required this.label});
  final String label;
  @override
  Widget build(BuildContext context) => CircleAvatar(
    radius: 14,
    backgroundColor: AppTheme.lessonSurfaceElevated,
    child: Text(label, style: const TextStyle(fontWeight: FontWeight.w800)),
  );
}

class _ChatInput extends StatelessWidget {
  const _ChatInput({
    required this.slot,
    required this.controller,
    required this.focusNode,
    required this.enabled,
    required this.incorrect,
    required this.nextFocus,
    required this.onChanged,
    required this.uiLanguageCode,
  });
  final PracticeSlot slot;
  final TextEditingController controller;
  final FocusNode focusNode;
  final bool enabled;
  final bool incorrect;
  final FocusNode? nextFocus;
  final VoidCallback onChanged;
  final String uiLanguageCode;

  @override
  Widget build(BuildContext context) => ConstrainedBox(
    constraints: const BoxConstraints(minWidth: 128, maxWidth: 250),
    child: TextField(
      key: ValueKey('chat-input-${slot.id}'),
      controller: controller,
      focusNode: focusNode,
      enabled: enabled,
      keyboardType: TextInputType.text,
      minLines: 1,
      maxLines: 1,
      textCapitalization: TextCapitalization.none,
      autocorrect: false,
      enableSuggestions: true,
      smartDashesType: SmartDashesType.disabled,
      smartQuotesType: SmartQuotesType.disabled,
      textInputAction: nextFocus == null
          ? TextInputAction.done
          : TextInputAction.next,
      onSubmitted: (_) => nextFocus?.requestFocus(),
      onChanged: (_) => onChanged(),
      scrollPadding: const EdgeInsets.only(bottom: 150),
      decoration: InputDecoration(
        isDense: true,
        hintText: L10n.text('exerciseInputHint', uiLanguageCode),
        errorText: incorrect
            ? L10n.text('exerciseInputIncorrect', uiLanguageCode)
            : null,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 10,
          vertical: 10,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: BorderSide(
            color: incorrect ? Colors.redAccent : Colors.white24,
          ),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: BorderSide(
            color: incorrect ? Colors.redAccent : const Color(0xFF5EEAD4),
            width: 2,
          ),
        ),
      ),
    ),
  );
}

String _text(dynamic value) => value?.toString() ?? '';

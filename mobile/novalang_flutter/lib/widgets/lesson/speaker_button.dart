import 'package:flutter/material.dart';
import '../../core/utils/localization.dart';
import '../../services/tts_service.dart';

class SpeakerButton extends StatelessWidget {
  const SpeakerButton({
    super.key,
    required this.speechText,
    this.languageCode = 'ja',
    this.uiLanguageCode = 'en',
    this.hideLabel = false,
    this.label,
  });

  final String speechText;
  final String languageCode;
  final String uiLanguageCode;
  final bool hideLabel;
  final String? label;

  @override
  Widget build(BuildContext context) {
    final listenLabel = label ?? L10n.text('listenTooltip', uiLanguageCode);
    return IconButton.filledTonal(
      tooltip: listenLabel,
      onPressed: () async {
        final result = await TtsService.instance.speak(
          text: speechText,
          languageCode: languageCode,
        );
        if (!context.mounted) return;
        final message = L10n.text(result.messageKey, uiLanguageCode);
        ScaffoldMessenger.of(context).hideCurrentSnackBar();
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(message),
            duration: Duration(milliseconds: result.ok ? 900 : 2200),
          ),
        );
      },
      icon: const Icon(Icons.volume_up),
    );
  }
}

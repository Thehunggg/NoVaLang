import 'package:flutter/material.dart';

class SpeakerButton extends StatelessWidget {
  const SpeakerButton({
    super.key,
    required this.speechText,
    this.languageCode = 'ja',
  });

  final String speechText;
  final String languageCode;

  @override
  Widget build(BuildContext context) {
    return IconButton.filledTonal(
      tooltip: 'Speak',
      onPressed: () {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('TTS will be connected later: $speechText')),
        );
      },
      icon: const Icon(Icons.volume_up),
    );
  }
}

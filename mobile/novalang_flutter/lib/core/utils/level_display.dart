String getLevelDisplayName(String levelCode, String learningLanguage) {
  if (learningLanguage == 'ja') {
    return const {
          'A0': 'Kana Starter',
          'A1_1': 'JLPT N5 Early',
          'A1_2': 'JLPT N5',
          'A2_1': 'JLPT N4 Early',
          'A2_2': 'JLPT N4',
          'B1_1': 'JLPT N3 Early',
          'B1_2': 'JLPT N3',
          'B2': 'JLPT N2',
        }[levelCode] ??
        levelCode;
  }
  return const {
        'A0': 'CEFR Pre-A1',
        'A1_1': 'CEFR A1 Early',
        'A1_2': 'CEFR A1',
        'A2_1': 'CEFR A2 Early',
        'A2_2': 'CEFR A2',
        'B1_1': 'CEFR B1 Early',
        'B1_2': 'CEFR B1',
        'B2': 'CEFR B2',
      }[levelCode] ??
      levelCode;
}

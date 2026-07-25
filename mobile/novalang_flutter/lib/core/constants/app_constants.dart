class AppConstants {
  const AppConstants._();

  static const appName = 'NovaLang';
  static const packageName = 'com.novalang.app';
  static const apiBaseUrl = 'http://localhost:5000/api';
  static const dataVersion = 'mobile-exam-track-v1';
}

/// Ngôn ngữ KHÔNG dùng dấu cách giữa từ.
///
/// Với những ngôn ngữ này, dấu cách người học lỡ gõ không mang nghĩa gì, nên
/// khi so khớp đáp án phải XOÁ SẠCH khoảng trắng — nếu chỉ gộp lại thành một
/// dấu cách (hành vi mặc định) thì 「お 名前」 sẽ không khớp 「お名前」 và một
/// câu trả lời ĐÚNG bị chấm SAI. Bàn phím tiếng Nhật/Trung trên điện thoại rất
/// dễ chèn dấu cách ngoài ý muốn.
///
/// Danh sách tập trung ở đây, không rải trong logic chấm điểm.
const Set<String> kNoWordSpacingLanguages = {'ja', 'zh', 'zh-CN', 'zh-TW', 'yue'};

/// `true` nếu [languageCode] không dùng dấu cách giữa từ. Chấp nhận cả dạng có
/// vùng ('ja-JP') và khác hoa/thường.
bool languageOmitsWordSpacing(String? languageCode) {
  if (languageCode == null || languageCode.isEmpty) return false;
  final normalized = languageCode.toLowerCase();
  if (kNoWordSpacingLanguages.any((code) => code.toLowerCase() == normalized)) {
    return true;
  }
  final base = normalized.split(RegExp(r'[-_]')).first;
  return kNoWordSpacingLanguages.any((code) => code.toLowerCase() == base);
}

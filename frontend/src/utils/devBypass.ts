import type { AppProgress } from "../types/index";
import type { AuthUser } from "../context/AuthContext";

/**
 * BỎ QUA ĐĂNG NHẬP + ONBOARDING — CHỈ KHI DEV.
 *
 * Bật bằng `VITE_DEV_BYPASS=1` khi chạy `vite` (dev). Dùng để owner mở THẲNG
 * một bài bằng deep link mà không phải click qua đăng nhập → chọn ngôn ngữ →
 * onboarding mỗi lần duyệt.
 *
 * ─── CHẾT CỨNG Ở BẢN PRODUCTION ───
 * `import.meta.env.DEV` được Vite thay bằng hằng `false` lúc build production,
 * nên `DEV_BYPASS` gập lại thành `false` và MỌI nhánh dùng nó bị loại khỏi
 * bundle (tree-shaking). Không đọc biến môi trường, không log, không nhánh
 * nào còn lại trong bản build. Kiểm chứng bằng cách grep bundle sau khi build.
 *
 * KHÔNG đụng luồng đăng nhập/onboarding thật — đây chỉ là nhánh né thêm vào.
 */
export const DEV_BYPASS: boolean =
  import.meta.env.DEV && import.meta.env.VITE_DEV_BYPASS === "1";

/** Hồ sơ đăng nhập giả, chỉ tồn tại khi DEV_BYPASS bật. */
export const devBypassUser = (): AuthUser => ({
  name: "Dev Preview",
  email: "dev@novalang.local",
  avatar: "DP",
});

/**
 * Hồ sơ học giả: Tiếng Việt → Tiếng Nhật, đã qua onboarding, đã xong Core
 * Foundation (để không bị chặn ở màn kana).
 *
 * Ghi đè lên hồ sơ đang có trong localStorage chứ không xoá nó: owner bật/tắt
 * cờ là quay lại đúng hồ sơ thật của mình.
 *
 * KHÔNG có trường gói ở đây: `AppProgress` không mang gói, Plus bên web là
 * state cục bộ của màn bài tập. Mở Plus xử riêng ở đúng chỗ đó.
 */
export const devBypassProgress = (current: AppProgress): AppProgress => ({
  ...current,
  onboardingCompleted: true,
  nativeLanguage: "vi",
  uiLanguage: "vi",
  effectiveUILanguage: "vi",
  learningLanguage: "ja",
  selectedLanguage: "ja",
  coreFoundationCompleted: true,
});

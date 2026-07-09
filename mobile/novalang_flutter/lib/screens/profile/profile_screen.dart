import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/localization.dart';
import '../../core/utils/level_display.dart';
import '../../state/profile_provider.dart';
import '../../models/niche.dart';
import '../../state/shared_data_provider.dart';
import '../../widgets/common/app_button.dart';
import '../../widgets/common/app_card.dart';
import '../../widgets/common/app_scaffold.dart';
import '../../widgets/common/responsive_page.dart';
import '../../widgets/common/nova_mascot.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = ref.watch(profileProvider);
    final native = profile.uiLanguageCode;
    final niches = ref.watch(nicheCatalogProvider).value ?? const <Niche>[];
    String nicheLabel(String id) =>
        niches.where((n) => n.id == id).firstOrNull?.localizedTitle(native) ??
        id;
    final nativeOption = ref.watch(
      languageByCodeProvider(profile.nativeLanguageCode),
    );
    final learningOption = ref.watch(
      languageByCodeProvider(profile.learningLanguageCode),
    );
    final nativeName = '${nativeOption.flagEmoji} ${nativeOption.nativeName}';
    final learningName =
        '${learningOption.flagEmoji} ${learningOption.nativeName}';
    final displayName = profile.displayName.isEmpty
        ? 'Nova learner'
        : profile.displayName;
    final initial = displayName.trim().isEmpty
        ? 'N'
        : displayName.trim()[0].toUpperCase();

    return AppScaffold(
      title: L10n.text('profile', native),
      selectedNavIndex: 4,
      child: ResponsivePage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            AppCard(
              child: Row(
                children: [
                  const NovaMascot(size: 72),
                  const SizedBox(width: 10),
                  CircleAvatar(radius: 28, child: Text(initial)),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          displayName,
                          style: Theme.of(context).textTheme.headlineSmall
                              ?.copyWith(fontWeight: FontWeight.w900),
                        ),
                        Text(
                          '${getLevelDisplayName(profile.levelCode, profile.learningLanguageCode, nativeLanguage: profile.nativeLanguageCode)} · ${profile.dailyGoalMinutes} ${L10n.text('minutesDay', native)}',
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),
            _section(
              context,
              native == 'vi' ? 'Thông tin người dùng' : 'User Information',
              [
                _row(
                  native == 'vi' ? 'Tên hiển thị' : 'Display name',
                  displayName,
                ),
                _row(
                  native == 'vi' ? 'Độ tuổi' : 'Age range',
                  profile.ageRange.isEmpty ? '-' : profile.ageRange,
                ),
                _row(
                  native == 'vi' ? 'Quốc gia/khu vực' : 'Country/region',
                  profile.country.isEmpty ? '-' : profile.country,
                ),
                _row(
                  native == 'vi'
                      ? 'Nghề nghiệp/học tập'
                      : 'Occupation/student status',
                  profile.occupationStatus.isEmpty
                      ? '-'
                      : profile.occupationStatus,
                ),
              ],
            ),
            _section(
              context,
              native == 'vi' ? 'Cài đặt ngôn ngữ' : 'Language Settings',
              [
                _row(L10n.text('nativeUi', native), nativeName),
                _row(
                  native == 'vi' ? 'Ngôn ngữ học' : 'Learning',
                  learningName,
                ),
              ],
            ),
            AppCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    native == 'vi' ? 'Tùy chọn học' : 'Learning Preferences',
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                  const SizedBox(height: 10),
                  _row(
                    native == 'vi' ? 'Trọng tâm chính' : 'Primary focus',
                    profile.primaryNiche == null
                        ? '-'
                        : nicheLabel(profile.primaryNiche!),
                  ),
                  _row(
                    native == 'vi' ? 'Các niche đã chọn' : 'Selected niches',
                    profile.selectedNiches.isEmpty
                        ? '-'
                        : profile.selectedNiches
                            .map(nicheLabel)
                            .join(', '),
                  ),
                  const SizedBox(height: 10),
                  AppButton(
                    label: native == 'vi' ? 'Đổi mục tiêu học' : 'Change niche',
                    icon: Icons.tune,
                    onPressed: () => context.go('/profile/preferences'),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),
            _section(context, native == 'vi' ? 'Tiến độ' : 'Progress', [
              _row('XP', '0'),
              _row(
                native == 'vi' ? 'Bài đã hoàn thành' : 'Completed lessons',
                '${profile.completedLessonIds.length}',
              ),
              _row(
                native == 'vi' ? 'Tóm tắt lỗi sai' : 'Mistakes summary',
                native == 'vi' ? 'Sắp kết nối' : 'Coming soon',
              ),
            ]),
            _section(
              context,
              native == 'vi' ? 'Cài đặt ứng dụng' : 'App Settings',
              [
                _row(
                  native == 'vi'
                      ? 'Âm thanh / phát âm'
                      : 'Sound / pronunciation',
                  native == 'vi' ? 'Đang bật' : 'Enabled',
                ),
              ],
            ),
            _section(context, native == 'vi' ? 'Pháp lý' : 'Legal', [
              _row(
                native == 'vi' ? 'Điều khoản dịch vụ' : 'Terms of Service',
                native == 'vi' ? 'Sẽ được thêm sau' : 'Will be added later',
              ),
              _row(
                native == 'vi' ? 'Chính sách quyền riêng tư' : 'Privacy Policy',
                native == 'vi' ? 'Sẽ được thêm sau' : 'Will be added later',
              ),
            ]),
            _section(context, native == 'vi' ? 'Tài khoản' : 'Account', [
              _row(
                native == 'vi' ? 'Đăng xuất' : 'Logout',
                native == 'vi' ? 'Sẽ nối sau' : 'Coming soon',
              ),
              _row(
                native == 'vi'
                    ? 'Xóa/đặt lại dữ liệu local'
                    : 'Delete/reset local data',
                native == 'vi' ? 'Sẽ nối sau' : 'Coming soon',
              ),
            ]),
          ],
        ),
      ),
    );
  }

  Widget _section(BuildContext context, String title, List<Widget> rows) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: AppCard(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: Theme.of(
                context,
              ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900),
            ),
            const SizedBox(height: 10),
            ...rows,
          ],
        ),
      ),
    );
  }

  Widget _row(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        children: [
          Expanded(child: Text(label)),
          Flexible(
            child: Text(
              value,
              textAlign: TextAlign.end,
              style: const TextStyle(fontWeight: FontWeight.w800),
            ),
          ),
        ],
      ),
    );
  }
}

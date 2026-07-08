import '../models/niche.dart';

const daily = 'Daily Communication';
const dailyVi = 'Giao tiếp hằng ngày';
const exam = 'Exam Preparation';
const examVi = 'Luyện thi';
const career = 'Career / Specialized Fields';
const careerVi = 'Nghề nghiệp / Lĩnh vực chuyên môn';

const nicheOptions = <Niche>[
  Niche(
    id: 'everyday',
    category: daily,
    categoryVi: dailyVi,
    title: 'Everyday Conversation',
    titleVi: 'Giao tiếp hằng ngày',
    description: 'Daily greetings, small talk, and survival phrases.',
    isReady: true,
  ),
  Niche(
    id: 'travel',
    category: daily,
    categoryVi: dailyVi,
    title: 'Travel & Living Abroad',
    titleVi: 'Du lịch & sống ở nước ngoài',
    description: 'Airports, transport, housing, and local life.',
  ),
  Niche(
    id: 'culture',
    category: daily,
    categoryVi: dailyVi,
    title: 'Culture & Entertainment',
    titleVi: 'Văn hóa & giải trí',
    description: 'Movies, shows, music, games, and fandom.',
  ),
  Niche(
    id: 'social',
    category: daily,
    categoryVi: dailyVi,
    title: 'Social / Friends / Dating',
    titleVi: 'Xã hội / bạn bè / hẹn hò',
    description: 'Casual messaging and friendly conversation.',
  ),
  Niche(
    id: 'shopping',
    category: daily,
    categoryVi: dailyVi,
    title: 'Shopping / Restaurant / Services',
    titleVi: 'Mua sắm / nhà hàng / dịch vụ',
    description: 'Orders, prices, bookings, and service counters.',
  ),
  Niche(
    id: 'jlpt',
    category: exam,
    categoryVi: examVi,
    title: 'JLPT',
    titleVi: 'JLPT',
    description: 'Japanese exam track from Kana Starter to JLPT N5.',
    isReady: true,
  ),
  Niche(
    id: 'toeic',
    category: exam,
    categoryVi: examVi,
    title: 'TOEIC',
    titleVi: 'TOEIC',
    description: 'English workplace test preparation.',
  ),
  Niche(
    id: 'ielts',
    category: exam,
    categoryVi: examVi,
    title: 'IELTS',
    titleVi: 'IELTS',
    description: 'Academic and general English test preparation.',
  ),
  Niche(
    id: 'toefl',
    category: exam,
    categoryVi: examVi,
    title: 'TOEFL',
    titleVi: 'TOEFL',
    description: 'University-focused English exam practice.',
  ),
  Niche(
    id: 'other_exams',
    category: exam,
    categoryVi: examVi,
    title: 'DELE / HSK / Other Exams',
    titleVi: 'DELE / HSK / kỳ thi khác',
    description: 'Other exam tracks on the roadmap.',
  ),
  Niche(
    id: 'business',
    category: career,
    categoryVi: careerVi,
    title: 'Business / Office / Email',
    titleVi: 'Kinh doanh / văn phòng / email',
    description: 'Meetings, email, and professional language.',
  ),
  Niche(
    id: 'it',
    category: career,
    categoryVi: careerVi,
    title: 'IT / Programming',
    titleVi: 'IT / Lập trình',
    description: 'Software, tools, tickets, and standups.',
  ),
  Niche(
    id: 'engineering',
    category: career,
    categoryVi: careerVi,
    title: 'Engineering / Manufacturing',
    titleVi: 'Kỹ thuật / Sản xuất',
    description: 'Factory, process, and technical communication.',
  ),
  Niche(
    id: 'ai_data',
    category: career,
    categoryVi: careerVi,
    title: 'AI / Data Science / Robotics',
    titleVi: 'AI / Khoa học dữ liệu / Robot',
    description: 'AI, data, models, robotics, and research terms.',
  ),
  Niche(
    id: 'healthcare',
    category: career,
    categoryVi: careerVi,
    title: 'Healthcare / Nursing / Caregiving',
    titleVi: 'Y tế / điều dưỡng / chăm sóc',
    description: 'Care, symptoms, and patient communication.',
  ),
];

Map<String, List<Niche>> groupedNiches() {
  final groups = <String, List<Niche>>{};
  for (final niche in nicheOptions) {
    groups.putIfAbsent(niche.category, () => []).add(niche);
  }
  return groups;
}

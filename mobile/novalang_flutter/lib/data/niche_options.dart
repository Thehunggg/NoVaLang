import '../models/niche.dart';

const nicheOptions = <Niche>[
  Niche(
    id: 'everyday',
    category: 'Daily Communication',
    title: 'Everyday Conversation',
    description: 'Daily greetings, small talk, and survival phrases.',
    isReady: true,
  ),
  Niche(
    id: 'travel',
    category: 'Daily Communication',
    title: 'Travel & Living Abroad',
    description: 'Airports, transport, housing, and local life.',
  ),
  Niche(
    id: 'culture',
    category: 'Daily Communication',
    title: 'Culture & Entertainment',
    description: 'Movies, shows, music, games, and fandom.',
  ),
  Niche(
    id: 'social',
    category: 'Daily Communication',
    title: 'Social / Friends / Dating',
    description: 'Casual messaging and friendly conversation.',
  ),
  Niche(
    id: 'shopping',
    category: 'Daily Communication',
    title: 'Shopping / Restaurant / Services',
    description: 'Orders, prices, bookings, and service counters.',
  ),
  Niche(
    id: 'jlpt',
    category: 'Exam Preparation',
    title: 'JLPT',
    description: 'Japanese exam track from Kana Starter to JLPT N5.',
    isReady: true,
  ),
  Niche(
    id: 'toeic',
    category: 'Exam Preparation',
    title: 'TOEIC',
    description: 'English workplace test preparation.',
  ),
  Niche(
    id: 'ielts',
    category: 'Exam Preparation',
    title: 'IELTS',
    description: 'Academic and general English test preparation.',
  ),
  Niche(
    id: 'toefl',
    category: 'Exam Preparation',
    title: 'TOEFL',
    description: 'University-focused English exam practice.',
  ),
  Niche(
    id: 'other_exams',
    category: 'Exam Preparation',
    title: 'DELE / HSK / Other Exams',
    description: 'Other exam tracks on the roadmap.',
  ),
  Niche(
    id: 'business',
    category: 'Career / Specialized Fields',
    title: 'Business / Office / Email',
    description: 'Meetings, email, and professional language.',
  ),
  Niche(
    id: 'it',
    category: 'Career / Specialized Fields',
    title: 'IT / Programming',
    description: 'Software, tools, tickets, and standups.',
  ),
  Niche(
    id: 'engineering',
    category: 'Career / Specialized Fields',
    title: 'Engineering / Manufacturing',
    description: 'Factory, process, and technical communication.',
  ),
  Niche(
    id: 'ai_data',
    category: 'Career / Specialized Fields',
    title: 'AI / Data Science / Robotics',
    description: 'AI, data, models, robotics, and research terms.',
  ),
  Niche(
    id: 'healthcare',
    category: 'Career / Specialized Fields',
    title: 'Healthcare / Nursing / Caregiving',
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

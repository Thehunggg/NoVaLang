import rawNiches from "../../../shared/config/niche_options.json";
import type { SupportedUILanguage } from "../types/index";

export interface NicheOption {
  id: string;
  category: string;
  title: string;
  description: string;
  isReady: boolean;
}

const titleVi: Record<string, string> = {
  everyday: "Giao tiếp hằng ngày",
  travel: "Du lịch & sống ở nước ngoài",
  culture: "Văn hóa & giải trí",
  social: "Xã hội / bạn bè / hẹn hò",
  shopping: "Mua sắm / nhà hàng / dịch vụ",
  jlpt: "JLPT",
  toeic: "TOEIC",
  ielts: "IELTS",
  toefl: "TOEFL",
  other_exams: "DELE / HSK / kỳ thi khác",
  business: "Kinh doanh / văn phòng / email",
  it: "IT / Lập trình",
  engineering: "Kỹ thuật / Sản xuất",
  ai_data: "AI / Khoa học dữ liệu / Robot",
  healthcare: "Y tế / điều dưỡng / chăm sóc"
};

const categoryVi: Record<string, string> = {
  "Daily Communication": "Giao tiếp hằng ngày",
  "Exam Preparation": "Luyện thi",
  "Career / Specialized Fields": "Nghề nghiệp / Lĩnh vực chuyên môn"
};

export const nicheOptions = rawNiches as NicheOption[];

export const nicheTitle = (niche: NicheOption, language: SupportedUILanguage) => language === "vi" ? titleVi[niche.id] ?? niche.title : niche.title;
export const nicheCategory = (category: string, language: SupportedUILanguage) => language === "vi" ? categoryVi[category] ?? category : category;

export const groupedNiches = () => nicheOptions.reduce<Record<string, NicheOption[]>>((groups, niche) => {
  groups[niche.category] = [...(groups[niche.category] ?? []), niche];
  return groups;
}, {});


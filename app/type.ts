export type TeaRecommendation = {
  tea: string;
  food: string;
  reason: string;
  howToMake: string;
  teaDescription: string;
  foodDescription: string;
};

export type TabKey = 0 | 1 | 2 | 3;

export type Constitution =
  | "平和質"
  | "気虚質"
  | "陽虚質"
  | "陰虚質"
  | "血瘀質"
  | "痰湿質"
  | "湿熱質"
  | "気鬱質"
  | "特稟質";

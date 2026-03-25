export type Yyyymm = `${number}-${number}${number}`;
export interface MonthPlan {
  yyyymm: Yyyymm;
  goals: string[];
  weekly: { week: 1 | 2 | 3 | 4 | 5; title: string; tasks: string[] }[];
  recipes: {
    id: string;
    title: string;
    timeMin: number;
    level: 1 | 2 | 3 | 4 | 5;
  }[];
}

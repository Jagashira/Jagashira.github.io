import { MonthPlan } from "../types";

const plan: MonthPlan = {
  yyyymm: "2025-10",
  goals: [
    "だしの取り方を理解する",
    "味噌汁3種を安定再現",
    "塩分と旨味のバランス感覚",
  ],
  weekly: [
    {
      week: 1,
      title: "だしの種類",
      tasks: ["昆布だし", "かつおだし", "合わせだし"],
    },
    { week: 2, title: "具材の切り方", tasks: ["豆腐", "わかめ", "根菜"] },
    { week: 3, title: "味噌の違い", tasks: ["米味噌", "赤味噌", "合わせ味噌"] },
    { week: 4, title: "応用", tasks: ["けんちん汁", "豚汁"] },
  ],
  recipes: [
    { id: "miso-001", title: "基本の味噌汁", timeMin: 15, level: 1 },
    { id: "miso-002", title: "豆腐とわかめの味噌汁", timeMin: 12, level: 1 },
    { id: "miso-003", title: "豚汁", timeMin: 30, level: 2 },
  ],
};
export default plan;

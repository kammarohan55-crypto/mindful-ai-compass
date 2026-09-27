export const GOALS = [
  "Writing",
  "Coding",
  "Studying",
  "Finance",
  "Research",
  "Image generation",
  "Personal advice",
  "Career",
];
export const TOOLS = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "GitHub Copilot",
  "Perplexity",
  "Midjourney",
  "Other",
];
export const DATA_TYPES = [
  {
    id: "personal",
    label: "Personal info",
    weight: 8,
    action:
      "Replace names, email addresses, and phone numbers with placeholders.",
  },
  {
    id: "files",
    label: "School / work files",
    weight: 12,
    action:
      "Use a short, non-confidential excerpt; check permission before sharing school or work files.",
  },
  {
    id: "financial",
    label: "Financial data",
    weight: 22,
    action:
      "Use fictional amounts and remove account numbers, transaction IDs, and statements.",
  },
  {
    id: "location",
    label: "Location",
    weight: 8,
    action: "Use a broad region instead of your address or precise location.",
  },
  {
    id: "images",
    label: "Images",
    weight: 10,
    action:
      "Remove location metadata, faces, and identifying details from images.",
  },
  {
    id: "messages",
    label: "Private messages",
    weight: 16,
    action:
      "Summarize the situation in your own words instead of pasting private conversations.",
  },
  {
    id: "health",
    label: "Health info",
    weight: 24,
    action:
      "Keep medical records and identifying health details out of general-purpose AI tools.",
  },
];

// Illustrative task categories, not audited vendor capabilities or live policy ratings.
const STRONG_FIT = {
  ChatGPT: ["Writing", "Coding", "Studying", "Research", "Career"],
  Claude: ["Writing", "Coding", "Studying", "Research", "Career"],
  Gemini: ["Writing", "Coding", "Studying", "Research", "Career"],
  "GitHub Copilot": ["Coding"],
  Perplexity: ["Research", "Studying"],
  Midjourney: ["Image generation"],
};

export const EMPTY_FORM = {
  goal: "Writing",
  tool: "ChatGPT",
  customTool: "",
  budget: "20",
  spend: "0",
  data: [],
  frequency: "Weekly",
  experience: "Beginner",
};
export const DEMO_FORM = {
  goal: "Career",
  tool: "ChatGPT",
  customTool: "",
  budget: "20",
  spend: "35",
  data: ["personal", "files", "messages"],
  frequency: "Daily",
  experience: "Beginner",
};
export const money = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
export const toolName = (form) =>
  form.tool === "Other" ? form.customTool.trim() || "Your tool" : form.tool;

export function assess(form) {
  const budget = Number(form.budget);
  const spend = Number(form.spend);
  if (
    form.budget === "" ||
    form.spend === "" ||
    !Number.isFinite(budget) ||
    !Number.isFinite(spend) ||
    budget < 0 ||
    spend < 0 ||
    budget > 100000 ||
    spend > 100000
  )
    throw new Error("Enter a budget and spend between $0 and $100,000.");
  const selected = DATA_TYPES.filter((type) => form.data.includes(type.id));
  const frequencyExposure =
    { Occasionally: 0, Weekly: 3, Daily: 6, "Many times a day": 9 }[
      form.frequency
    ] ?? 0;
  const exposure = Math.min(
    100,
    selected.reduce((sum, type) => sum + type.weight, 0) +
      (selected.length ? frequencyExposure : 0),
  );
  const privacyPoints = Math.round(40 * (1 - exposure / 100));
  const ratio = budget > 0 ? spend / budget : spend > 0 ? Infinity : 0;
  const budgetPoints =
    ratio <= 0.8 ? 25 : ratio <= 1 ? 21 : ratio <= 1.25 ? 12 : 4;
  const actualBudgetPoints = budget === 0 && spend > 0 ? 0 : budgetPoints;
  const strong = STRONG_FIT[form.tool]?.includes(form.goal);
  const unknown = !STRONG_FIT[form.tool];
  const specialist = ["Midjourney", "GitHub Copilot", "Perplexity"].includes(
    form.tool,
  );
  const low = !strong && (specialist || form.goal === "Image generation");
  const fitPoints = unknown ? 12 : strong ? 25 : low ? 6 : 16;
  const experiencePoints =
    { Beginner: 3, Intermediate: 6, Experienced: 8 }[form.experience] ?? 3;
  const habitPoints =
    experiencePoints +
    ({ Occasionally: 2, Weekly: 2, Daily: 1, "Many times a day": 0 }[
      form.frequency
    ] ?? 0);
  const score = privacyPoints + actualBudgetPoints + fitPoints + habitPoints;
  const risk = exposure >= 40 ? "High" : exposure >= 18 ? "Moderate" : "Low";
  const overBudget = spend > budget;
  const sensitive = selected.some((type) =>
    ["financial", "health"].includes(type.id),
  );
  const budgetText = overBudget
    ? `${money(spend - budget)} over your monthly limit. Cap planned spending at ${money(budget)}.`
    : ratio > 0.8
      ? `Within budget, with ${money(budget - spend)} left. Leave room for variable charges.`
      : `${money(budget - spend)} of headroom. Recheck this estimate before subscribing.`;
  const fitLabel = unknown
    ? "Unverified fit"
    : strong
      ? "Strong task fit"
      : low
        ? "Try another category"
        : "Use with care";
  const fitText = unknown
    ? "This tool is not in our example matrix. Check its task support and data controls before using it."
    : strong
      ? `${toolName(form)} is a reasonable starting point for ${form.goal.toLowerCase()} in our example matrix. Verify important outputs.`
      : low
        ? `For ${form.goal.toLowerCase()}, explore ${form.goal === "Image generation" ? "a dedicated image tool" : form.goal === "Coding" ? "a coding assistant" : form.goal === "Research" || form.goal === "Studying" ? "a source-oriented research tool" : "a general-purpose assistant"} and verify its capabilities.`
        : "Use AI for brainstorming and organization. Verify important advice with a qualified person or reliable sources.";
  const recommendedPattern =
    {
      Writing: "a general writing assistant with clear data controls",
      Coding: "a coding assistant with repository permission controls",
      Studying: "a study assistant that explains concepts and cites sources",
      Finance: "a budgeting or education tool, not an investment adviser",
      Research: "a source-oriented research assistant with citation review",
      "Image generation": "an image tool with commercial-use and likeness controls",
      "Personal advice": "a journaling or planning aid with human review",
      Career: "a career assistant used with a sanitized resume summary",
    }[form.goal] ?? "a tool with clear privacy and cost controls";
  const decision =
    score >= 80
      ? {
          label: "Proceed with guardrails",
          tone: "good",
          summary: "This plan is reasonably controlled. Keep the checklist and verify outputs.",
        }
      : score >= 60
        ? {
            label: "Adjust before using",
            tone: "warn",
            summary: "The task can continue after reducing the biggest privacy, spending, or fit issue.",
          }
        : {
            label: "Pause and redesign",
            tone: "danger",
            summary: "Too much risk is concentrated in this plan. Sanitize data and reset spending first.",
          };
  const topRisk = exposure >= 40
    ? "Sensitive or identifying data exposure"
    : overBudget
      ? "Expected spending is above budget"
      : low
        ? "The selected tool may not fit this task"
        : "Important outputs still need human review";
  const oneMinuteWin = exposure >= 40
    ? "Replace private details with placeholders before prompting."
    : overBudget
      ? `Lower estimated spend to ${money(budget)} or choose a free/lower tier.`
      : low
        ? `Consider ${recommendedPattern} before continuing.`
        : "Add a verification step before acting on the output.";
  const checklist = [
    ...selected.map((type) => ({ id: type.id, text: type.action })),
    {
      id: "settings",
      text: "Review the tool’s retention, training, and deletion settings before sharing anything.",
    },
    {
      id: "budget",
      text: overBudget
        ? `Set a ${money(budget)} monthly cap and cancel subscriptions you do not need.`
        : "Set a monthly reminder to check subscriptions and usage charges.",
    },
    {
      id: "verify",
      text: "Verify factual claims and keep a human review step for important decisions.",
    },
  ];
  const actions = [
    selected.length
      ? `Prepare a sanitized ${form.goal.toLowerCase()} brief using fictional or non-identifying details. Only remove a data category from your plan after you stop sharing it.`
      : "Start with a brief that contains no sensitive or identifying details.",
    overBudget
      ? `Reduce estimated monthly spend from ${money(spend)} to ${money(budget)} before subscribing.`
      : `Keep your estimated spend of ${money(spend)} within your ${money(budget)} monthly budget.`,
    fitText,
    sensitive || ["Finance", "Personal advice"].includes(form.goal)
      ? "Use AI to organize questions, then review consequential decisions with a qualified person."
      : "Review the output for accuracy, bias, and missing context before using it.",
  ];
  return {
    score,
    exposure,
    privacyPoints,
    budgetPoints: actualBudgetPoints,
    fitPoints,
    habitPoints,
    risk,
    overBudget,
    budget,
    spend,
    budgetText,
    fitLabel,
    fitText,
    recommendedPattern,
    decision,
    topRisk,
    oneMinuteWin,
    checklist,
    actions,
    selected,
    status:
      score >= 80
        ? "A mindful starting point"
        : score >= 60
          ? "A few adjustments ahead"
          : "A little course correction",
    tone: score >= 80 ? "good" : "warn",
  };
}

export function saferForm(form) {
  return {
    ...form,
    data: [],
    spend: String(Math.min(Number(form.spend), Number(form.budget))),
  };
}

export function actionPlanText(form, result) {
  return `MINDFULAI COMPASS — ACTION PLAN\nGoal: ${form.goal}\nTool: ${toolName(form)}\nMindfulness score: ${result.score}/100 (rule-based heuristic)\nDecision: ${result.decision.label}\nTop risk: ${result.topRisk}\nBest quick fix: ${result.oneMinuteWin}\nPrivacy risk: ${result.risk}\nBudget: ${money(result.budget)}/month | Estimated spend: ${money(result.spend)}/month\n\nNEXT STEPS\n${result.actions.map((action, i) => `${i + 1}. ${action}`).join("\n")}\n\nSAFER USAGE CHECKLIST\n${result.checklist.map((item) => `[ ] ${item.text}`).join("\n")}\n\nThis is a planning aid, not a security audit or verified vendor comparison. Costs are user estimates. No provider policies or prices were checked.`;
}

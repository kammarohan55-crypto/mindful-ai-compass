import test from "node:test";
import assert from "node:assert/strict";
import {
  assess,
  saferForm,
  actionPlanText,
  DATA_TYPES,
  GOALS,
  TOOLS,
  EMPTY_FORM,
  DEMO_FORM,
} from "./scoring.js";

test("demo has reproducible, explainable before and after scores", () => {
  const before = assess(DEMO_FORM);
  const after = assess(saferForm(DEMO_FORM));
  assert.equal(before.score, 56);
  assert.equal(before.risk, "High");
  assert.equal(before.spend - before.budget, 15);
  assert.equal(after.score, 90);
  assert.equal(after.risk, "Low");
  assert.equal(after.spend, 20);
  assert.deepEqual(DEMO_FORM.data, ["personal", "files", "messages"]);
});

test("zero budgets and boundary spending are handled without division errors", () => {
  assert.equal(
    assess({ ...EMPTY_FORM, budget: "0", spend: "0" }).budgetPoints,
    25,
  );
  assert.equal(
    assess({ ...EMPTY_FORM, budget: "0", spend: "1" }).budgetPoints,
    0,
  );
  for (const [spend, points] of [
    [80, 25],
    [100, 21],
    [125, 12],
    [126, 4],
  ]) {
    assert.equal(
      assess({ ...EMPTY_FORM, budget: "100", spend: String(spend) })
        .budgetPoints,
      points,
    );
  }
});

test("sensitive exposure is capped and scores remain in range across goals and tools", () => {
  for (const goal of GOALS)
    for (const tool of TOOLS)
      for (const data of [[], DATA_TYPES.map((type) => type.id)]) {
        const input = {
          ...EMPTY_FORM,
          goal,
          tool,
          data,
          frequency: "Many times a day",
          spend: "100",
        };
        const result = assess(input);
        assert.ok(result.score >= 0 && result.score <= 100);
        assert.ok(result.exposure >= 0 && result.exposure <= 100);
        assert.ok(assess(saferForm(input)).score >= result.score);
      }
});

test("unknown tools are explicitly unverified and specialist mismatches are visible", () => {
  assert.equal(
    assess({ ...EMPTY_FORM, tool: "Other", customTool: "Example" }).fitLabel,
    "Unverified fit",
  );
  assert.equal(
    assess({ ...EMPTY_FORM, tool: "Midjourney", goal: "Coding" }).fitPoints,
    6,
  );
  assert.equal(
    assess({ ...EMPTY_FORM, tool: "Midjourney", goal: "Image generation" })
      .fitPoints,
    25,
  );
});

test("invalid amounts are rejected and exported plans contain current results", () => {
  for (const value of ["", "-1", "Infinity", "nope", "100001"])
    assert.throws(() => assess({ ...EMPTY_FORM, spend: value }));
  const text = actionPlanText(DEMO_FORM, assess(DEMO_FORM));
  assert.match(text, /56\/100/);
  assert.match(text, /\$35.00/);
  assert.match(text, /NEXT STEPS/);
  assert.match(text, /not a security audit/);
});


test("assessment returns judge-facing decision receipt fields", () => {
  const result = assess(DEMO_FORM);
  assert.equal(result.decision.label, "Pause and redesign");
  assert.equal(result.topRisk, "Sensitive or identifying data exposure");
  assert.match(result.oneMinuteWin, /placeholders|fictional|private|Replace/i);
  assert.match(result.recommendedPattern, /career assistant/i);
  assert.match(actionPlanText(DEMO_FORM, result), /Decision:/);
});

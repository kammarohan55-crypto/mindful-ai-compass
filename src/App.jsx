import React, { useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCheck,
  ChevronDown,
  CircleHelp,
  Code2,
  Compass,
  Copy,
  CreditCard,
  GraduationCap,
  Heart,
  Image,
  Info,
  Leaf,
  LockKeyhole,
  RotateCcw,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Target,
  Wallet,
  WandSparkles,
  BriefcaseBusiness,
  FileText,
} from "lucide-react";
import {
  GOALS,
  TOOLS,
  DATA_TYPES,
  EMPTY_FORM,
  DEMO_FORM,
  assess,
  saferForm,
  money,
  toolName,
  actionPlanText,
} from "./scoring.js";

const goalIcons = [
  FileText,
  Code2,
  GraduationCap,
  Wallet,
  BookOpen,
  Image,
  Heart,
  BriefcaseBusiness,
];
const clone = (form) => ({ ...form, data: [...form.data] });

function App() {
  const [form, setForm] = useState(() => clone(DEMO_FORM));
  const [snapshot, setSnapshot] = useState(() => clone(DEMO_FORM));
  const [baseline, setBaseline] = useState(() => assess(DEMO_FORM));
  const [scenario, setScenario] = useState("Sample assessment");
  const [checked, setChecked] = useState([]);
  const [copyStatus, setCopyStatus] = useState("");
  const [manualCopy, setManualCopy] = useState(false);
  const [error, setError] = useState("");
  const resultRef = useRef(null);
  const copyRef = useRef(null);
  const result = snapshot ? assess(snapshot) : null;
  const projected = snapshot ? assess(saferForm(snapshot)) : null;
  const dirty = snapshot && JSON.stringify(form) !== JSON.stringify(snapshot);
  const update = (key, value) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    setError("");
  };
  const toggleData = (id) =>
    update(
      "data",
      form.data.includes(id)
        ? form.data.filter((item) => item !== id)
        : [...form.data, id],
    );

  function analyze(event) {
    event.preventDefault();
    try {
      if (form.tool === "Other" && !form.customTool.trim())
        throw new Error("Enter a tool name to assess your plan.");
      const next = assess(form);
      setSnapshot(clone(form));
      setBaseline(next);
      setScenario("Your assessment");
      setChecked([]);
      setCopyStatus("");
      setManualCopy(false);
      setError("");
      requestAnimationFrame(() =>
        resultRef.current?.focus({ preventScroll: true }),
      );
      if (window.innerWidth < 900)
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    } catch (failure) {
      setError(failure.message);
    }
  }

  function loadDemo() {
    setForm(clone(DEMO_FORM));
    setSnapshot(clone(DEMO_FORM));
    setBaseline(assess(DEMO_FORM));
    setScenario("Sample assessment");
    setChecked([]);
    setCopyStatus("Demo loaded");
    setManualCopy(false);
    setError("");
  }

  function reset() {
    setForm(clone(EMPTY_FORM));
    setSnapshot(null);
    setBaseline(null);
    setChecked([]);
    setScenario("");
    setCopyStatus("");
    setManualCopy(false);
    setError("");
  }

  function improve() {
    const next = saferForm(snapshot);
    setForm(next);
    setSnapshot(clone(next));
    setScenario("Safer scenario");
    setChecked([]);
    setCopyStatus("Safer scenario applied");
    setManualCopy(false);
  }

  async function copyPlan() {
    const text = actionPlanText(snapshot, result);
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
      setCopyStatus("Action plan copied");
      setManualCopy(false);
    } catch {
      setManualCopy(true);
      setCopyStatus("Select the plan below and copy it.");
      requestAnimationFrame(() => {
        copyRef.current?.focus();
        copyRef.current?.select();
      });
    }
  }

  return (
    <>
      <a className="skip-link" href="#workspace">
        Skip to assessment
      </a>
      <header className="header">
        <div className="header-inner">
          <a href="#" className="brand" aria-label="MindfulAI Compass home">
            <span className="brand-icon">
              <Compass size={25} strokeWidth={1.6} />
            </span>
            <span>
              Mindful<span className="brand-ai">AI</span>
              <small>COMPASS</small>
            </span>
          </a>
          <nav aria-label="Main navigation">
            <a className="nav-active" href="#workspace">
              Your workspace
            </a>
            <a href="#methodology">
              How scoring works <ArrowUpRight size={14} />
            </a>
          </nav>
          <span className="header-local">
            <LockKeyhole size={14} /> Private by design
          </span>
        </div>
      </header>

      <main>
        <section className="hero">
          <div>
            <p className="eyebrow">
              <span /> LESS GUESSWORK. MORE INTENTION.
            </p>
            <h1>
              A little clarity
              <br className="mobile-break" /> before you <span>AI.</span>
              <Sparkles className="hero-sparkle" size={30} />
            </h1>
            <p className="hero-description">
              The right tool. A sensible budget. Your privacy intact.
              <br />
              Make your next AI decision a mindful one.
            </p>
          </div>
          <div className="hero-aside">
            <div className="local-chip">
              <ShieldCheck size={18} /> Your choices stay in this browser
            </div>
            <p>No sign-up. No uploads. No API keys.</p>
            <button type="button" className="text-button" onClick={loadDemo}>
              <WandSparkles size={16} /> Try the 30-second demo{" "}
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        <div className="workspace-heading" id="workspace">
          <div>
            <span className="section-dot" />
            <h2>Your AI compass</h2>
            <span className="desktop-only">
              A small check-in. A smarter next step.
            </span>
          </div>
          <span className="session-label">
            <LockKeyhole size={13} /> LOCAL SESSION
          </span>
        </div>
        <div className="workspace">
          <section className="panel input-panel" aria-labelledby="form-title">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">01 / YOUR INTENTIONS</p>
                <h2 id="form-title">Let’s set your direction.</h2>
              </div>
              <button
                className="icon-button"
                type="button"
                onClick={reset}
                title="Reset assessment"
                aria-label="Reset assessment"
              >
                <RotateCcw size={18} />
              </button>
            </div>
            <form onSubmit={analyze}>
              <fieldset className="goal-field">
                <legend>What would you like help with?</legend>
                <div className="goal-grid">
                  {GOALS.map((goal, i) => {
                    const Icon = goalIcons[i];
                    return (
                      <label
                        className={`goal-option ${form.goal === goal ? "selected" : ""}`}
                        key={goal}
                      >
                        <input
                          type="radio"
                          name="goal"
                          value={goal}
                          checked={form.goal === goal}
                          onChange={() => update("goal", goal)}
                        />
                        <Icon size={16} />
                        <span>{goal}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <label className="field-label" htmlFor="tool">
                Which AI tool are you considering?
              </label>
              <div className="select-wrap">
                <Sparkles size={16} />
                <select
                  id="tool"
                  value={form.tool}
                  onChange={(event) => update("tool", event.target.value)}
                >
                  {TOOLS.map((tool) => (
                    <option key={tool}>{tool}</option>
                  ))}
                </select>
                <ChevronDown size={15} />
              </div>
              {form.tool === "Other" && (
                <label className="custom-tool">
                  Tool name
                  <input
                    required
                    maxLength={60}
                    value={form.customTool}
                    onChange={(event) =>
                      update("customTool", event.target.value)
                    }
                    placeholder="Enter the tool’s name"
                  />
                </label>
              )}
              <div className="field-row money-fields">
                <label htmlFor="budget">
                  Monthly budget
                  <div className="money-input">
                    <span>$</span>
                    <input
                      id="budget"
                      aria-label="Monthly budget"
                      type="number"
                      min="0"
                      max="100000"
                      step="0.01"
                      required
                      value={form.budget}
                      onChange={(event) => update("budget", event.target.value)}
                    />
                    <span>USD</span>
                  </div>
                </label>
                <label htmlFor="spend">
                  Expected spend
                  <div className="money-input">
                    <span>$</span>
                    <input
                      id="spend"
                      aria-label="Expected spend"
                      type="number"
                      min="0"
                      max="100000"
                      step="0.01"
                      required
                      value={form.spend}
                      onChange={(event) => update("spend", event.target.value)}
                    />
                    <span>/ mo</span>
                  </div>
                </label>
              </div>
              <fieldset className="data-field">
                <legend>
                  What might you share? <span>Select all that apply</span>
                </legend>
                <div className="data-grid">
                  {DATA_TYPES.map((type) => (
                    <label
                      className={`data-option ${form.data.includes(type.id) ? "selected" : ""}`}
                      key={type.id}
                    >
                      <input
                        type="checkbox"
                        checked={form.data.includes(type.id)}
                        onChange={() => toggleData(type.id)}
                      />
                      <span className="check-box">
                        <Check size={11} />
                      </span>
                      {type.label}
                    </label>
                  ))}
                </div>
                <p className="field-note">
                  <Info size={13} /> Categories only. Never enter the actual
                  data here.
                </p>
              </fieldset>
              <div className="field-row">
                <label htmlFor="frequency">
                  Usage frequency
                  <div className="select-wrap simple">
                    <select
                      id="frequency"
                      value={form.frequency}
                      onChange={(event) =>
                        update("frequency", event.target.value)
                      }
                    >
                      {[
                        "Occasionally",
                        "Weekly",
                        "Daily",
                        "Many times a day",
                      ].map((value) => (
                        <option key={value}>{value}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} />
                  </div>
                </label>
                <label htmlFor="experience">
                  AI experience
                  <div className="select-wrap simple">
                    <select
                      id="experience"
                      value={form.experience}
                      onChange={(event) =>
                        update("experience", event.target.value)
                      }
                    >
                      {["Beginner", "Intermediate", "Experienced"].map(
                        (value) => (
                          <option key={value}>{value}</option>
                        ),
                      )}
                    </select>
                    <ChevronDown size={14} />
                  </div>
                </label>
              </div>
              {error && (
                <p className="error-text" role="alert">
                  {error}
                </p>
              )}
              <button className="primary-button analyze-button" type="submit">
                <Compass size={18} /> Find my direction <ArrowRight size={18} />
              </button>
              <div className="form-footer">
                <button type="button" onClick={loadDemo}>
                  <WandSparkles size={14} /> Load sample
                </button>
                <span>~30 seconds to clarity</span>
                <button type="button" onClick={reset}>
                  Reset
                </button>
              </div>
            </form>
          </section>

          <section
            className="results"
            ref={resultRef}
            tabIndex={-1}
            aria-label="Assessment results"
          >
            {result ? (
              <>
                <div className="score-panel">
                  <div className="score-top">
                    <p className="eyebrow">02 / YOUR MINDFULNESS SNAPSHOT</p>
                    <span className="scenario-tag">{scenario}</span>
                  </div>
                  {dirty && (
                    <div className="stale-notice" role="status">
                      Inputs changed. Select “Find my direction” to update these
                      results.
                    </div>
                  )}
                  <div className="score-main">
                    <div
                      className={`score-ring ${result.tone}`}
                      style={{ "--score": `${result.score * 3.6}deg` }}
                      role="img"
                      aria-label={`AI Mindfulness Score: ${result.score} out of 100`}
                    >
                      <div>
                        <strong>{result.score}</strong>
                        <span>OUT OF 100</span>
                      </div>
                      <span className="ring-marker">
                        <Compass size={19} />
                      </span>
                    </div>
                    <div className="score-copy">
                      <span className="score-caption">
                        AI MINDFULNESS SCORE
                      </span>
                      <h2>{result.status}</h2>
                      <p>
                        {scenario === "Safer scenario"
                          ? "Fewer details shared. Spending within reach. Put your updated plan into practice."
                          : "Your next step is clearer: protect what you share and give your spending a boundary."}
                      </p>
                      <div className="score-context">
                        <span>
                          <Target size={13} /> {snapshot.goal}
                        </span>
                        <span>{toolName(snapshot)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="score-breakdown">
                    {[
                      ["Privacy", result.privacyPoints, 40],
                      ["Budget", result.budgetPoints, 25],
                      ["Task fit", result.fitPoints, 25],
                      ["Habits", result.habitPoints, 10],
                    ].map(([name, value, max]) => (
                      <div key={name}>
                        <div>
                          <span>{name}</span>
                          <strong>
                            {value}
                            <small>/{max}</small>
                          </strong>
                        </div>
                        <div className="mini-track">
                          <span style={{ width: `${(value / max) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="score-disclaimer">
                    <Info size={12} /> Transparent rules, not a security
                    certification. <a href="#methodology">See the math</a>
                  </p>
                </div>

                <div className="insight-grid">
                  <article className="insight-card">
                    <div className="insight-title">
                      <ShieldCheck size={17} />
                      <span>PRIVACY</span>
                    </div>
                    <h3
                      className={
                        result.risk === "Low" ? "good-text" : "warning-text"
                      }
                    >
                      {result.risk} exposure{" "}
                      <span
                        className={`status-dot ${result.risk === "Low" ? "good" : ""}`}
                      />
                    </h3>
                    <p>
                      {result.selected.length
                        ? `${result.selected.length} data categories selected. ${result.selected.some((type) => ["health", "financial"].includes(type.id)) ? "Sensitive details need extra care." : "Share less before you start."}`
                        : "No listed data categories selected. Check your prompt for hidden identifiers."}
                    </p>
                  </article>
                  <article className="insight-card">
                    <div className="insight-title">
                      <CreditCard size={17} />
                      <span>SPENDING</span>
                    </div>
                    <h3
                      className={
                        result.overBudget ? "warning-text" : "good-text"
                      }
                    >
                      {result.overBudget
                        ? `${money(result.spend - result.budget)} over budget`
                        : "Within your budget"}
                    </h3>
                    <p>{result.budgetText}</p>
                  </article>
                  <article className="insight-card">
                    <div className="insight-title">
                      <Target size={17} />
                      <span>TOOL FIT</span>
                    </div>
                    <h3>{result.fitLabel}</h3>
                    <p>{result.fitText}</p>
                  </article>
                </div>

                <div className="panel clarity-panel">
                  <div className="clarity-title">
                    <span className="small-icon">
                      <Leaf size={18} />
                    </span>
                    <div>
                      <h3>A clearer path forward</h3>
                      <p>What changes when you share less and set a limit.</p>
                    </div>
                    <span className="projection-tag">
                      {scenario === "Safer scenario" ? "APPLIED" : "WHAT IF?"}
                    </span>
                  </div>
                  <div className="clarity-comparison">
                    <div>
                      <span>BEFORE · YOUR PLAN</span>
                      <strong>
                        {baseline.score}
                        <small>/100</small>
                      </strong>
                      <p>
                        {money(baseline.spend)}/mo · {baseline.selected.length}{" "}
                        data categories
                      </p>
                    </div>
                    <ArrowRight size={21} />
                    <div>
                      <span>AFTER · SAFER SCENARIO</span>
                      <strong>
                        {projected.score}
                        <small>/100</small>
                        <em>+{projected.score - baseline.score} pts</em>
                      </strong>
                      <p>{money(projected.spend)}/mo · no listed data shared</p>
                    </div>
                  </div>
                  <div className="clarity-bottom">
                    <p>
                      {scenario === "Safer scenario"
                        ? "Plan updated. Sanitize your content before following it."
                        : "Assumes no listed data is shared and spend stays within budget."}
                    </p>
                    <button
                      type="button"
                      onClick={improve}
                      disabled={scenario === "Safer scenario"}
                    >
                      {scenario === "Safer scenario" ? (
                        <>
                          <Check size={14} /> Plan applied
                        </>
                      ) : (
                        <>
                          Use safer plan <ArrowUpRight size={15} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="empty-state panel">
                <Compass size={65} strokeWidth={1} />
                <p className="eyebrow">YOUR NEXT STEP STARTS HERE</p>
                <h2>Find your own true north.</h2>
                <p>
                  Set your goal, budget, and sharing preferences. Your score and
                  action plan will appear here.
                </p>
                <button
                  className="primary-button"
                  type="button"
                  onClick={loadDemo}
                >
                  <WandSparkles size={17} /> Explore a sample
                </button>
                <div>
                  <ShieldCheck size={19} />
                  <Wallet size={19} />
                  <Target size={19} />
                </div>
              </div>
            )}
          </section>
        </div>

        {result && (
          <div className="panel decision-receipt" aria-label="Decision receipt">
            <div className="receipt-heading">
              <div>
                <p className="eyebrow">YOUR DECISION RECEIPT</p>
                <h3>Your next move, made clear.</h3>
              </div>
              <span className={`receipt-verdict ${result.decision.tone}`}>
                {result.decision.label}
              </span>
            </div>
            <p className="receipt-summary">{result.decision.summary}</p>
            <div className="receipt-grid">
              <div>
                <ShieldAlert size={18} />
                <span>Top risk</span>
                <strong>{result.topRisk}</strong>
              </div>
              <div>
                <WandSparkles size={18} />
                <span>1-minute improvement</span>
                <strong>{result.oneMinuteWin}</strong>
              </div>
              <div>
                <Compass size={18} />
                <span>Better tool pattern</span>
                <strong>{result.recommendedPattern}</strong>
              </div>
            </div>
            <div className="sponsor-proof">
              <span>
                <LockKeyhole size={14} /> Privacy protection
              </span>
              <span>
                <Wallet size={14} /> Spending visibility
              </span>
              <span>
                <Target size={14} /> Confident tool selection
              </span>
            </div>
          </div>
        )}

        {result && (
          <section className="action-section" aria-label="Your action plan">
            <div className="panel checklist-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">03 / LITTLE HABITS, REAL CONTROL</p>
                  <h2>Your safer usage checklist</h2>
                </div>
                <span className="count-tag">
                  {checked.length}/{result.checklist.length}
                </span>
              </div>
              <p className="section-description">
                Make these part of your routine. Check them off as you go.
              </p>
              <div className="checklist">
                {result.checklist.map((item) => (
                  <label
                    className={checked.includes(item.id) ? "completed" : ""}
                    key={item.id}
                  >
                    <input
                      type="checkbox"
                      checked={checked.includes(item.id)}
                      onChange={() =>
                        setChecked((previous) =>
                          previous.includes(item.id)
                            ? previous.filter((id) => id !== item.id)
                            : [...previous, item.id],
                        )
                      }
                    />
                    <span>{item.text}</span>
                  </label>
                ))}
              </div>
              <p className="field-note">
                <Info size={13} /> Checklist progress does not change the score.
              </p>
            </div>
            <div className="panel action-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">04 / FROM INSIGHT TO ACTION</p>
                  <h2>Your next moves</h2>
                </div>
                <ArrowUpRight size={21} />
              </div>
              <ol className="action-list">
                {result.actions.map((action, i) => (
                  <li key={action}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <p>{action}</p>
                  </li>
                ))}
              </ol>
              <button type="button" className="copy-button" onClick={copyPlan}>
                {copyStatus === "Action plan copied" ? (
                  <CheckCheck size={16} />
                ) : (
                  <Copy size={16} />
                )}
                {copyStatus === "Action plan copied"
                  ? "Action plan copied"
                  : "Copy action plan"}
                <ArrowRight size={16} />
              </button>
              {manualCopy && (
                <label className="manual-copy">
                  Select and copy your plan
                  <textarea
                    ref={copyRef}
                    readOnly
                    value={actionPlanText(snapshot, result)}
                  />
                </label>
              )}
            </div>
          </section>
        )}

        <section className="comparison-section">
          <div className="comparison-intro">
            <p className="eyebrow">SAME TASK. BETTER CHOICES.</p>
            <h2>
              Less autopilot.
              <br />
              More intention.
            </h2>
            <p>
              You don’t have to use less AI.
              <br />
              Just use it with a little more care.
            </p>
          </div>
          <article className="comparison-card risky">
            <span>
              <ShieldAlert size={18} /> Risky usage
            </span>
            <p>
              Paste the whole conversation.
              <br />
              Subscribe first, check costs later.
              <br />
              Treat every answer as a fact.
            </p>
          </article>
          <div className="comparison-arrow">
            <ArrowRight size={20} />
          </div>
          <article className="comparison-card mindful">
            <span>
              <ShieldCheck size={18} /> Mindful usage
            </span>
            <p>
              Share a sanitized summary.
              <br />
              Set a spending limit up front.
              <br />
              Verify before you act.
            </p>
          </article>
        </section>

        <section className="methodology" id="methodology">
          <details>
            <summary>
              <span>
                <CircleHelp size={18} /> A score you can understand, not a black
                box.
              </span>
              <span>
                How scoring works <ChevronDown size={16} />
              </span>
            </summary>
            <div className="method-content">
              <p>
                <strong>Privacy / 40:</strong> selected category weights are
                personal info 8, files 12, financial 22, location 8, images 10,
                private messages 16, and health 24. If any are selected, add
                0/3/6/9 for occasional/weekly/daily/many-times-daily use.
                Exposure is capped at 100. Points = round(40 × (1 −
                exposure/100)). Low exposure is below 18, moderate is 18–39, and
                high is 40+.
              </p>
              <p>
                <strong>Budget / 25:</strong> spending at most 80% of budget
                earns 25; at most 100% earns 21; at most 125% earns 12; above
                that earns 4. A zero budget with positive spend earns 0. Zero
                spend earns 25, including a zero budget.
              </p>
              <p>
                <strong>Task fit / 25:</strong> an illustrative, manually
                authored tool-to-task matrix awards strong fits 25, cautious
                general uses 16, unsupported specialist uses 6, and unknown
                tools 12. It is not a verified comparison or live capability
                audit.
              </p>
              <p>
                <strong>Habits / 10:</strong> beginner/intermediate/experienced
                earns 3/6/8, plus 2/2/1/0 for
                occasional/weekly/daily/many-times-daily use. These are demo
                assumptions, not evidence that experience guarantees safety.
              </p>
              <p>
                <strong>Your data:</strong> input stays in page memory and
                resets on refresh. No analytics, external fonts, API requests,
                or storage. Copying exports only when you click. Costs are
                estimates you supply; a high score does not guarantee safety.
                Safer scenarios change your plan, not any external account or
                subscription.
              </p>
              <p className="matrix-note">
                <strong>Example matrix:</strong> ChatGPT, Claude, Gemini →
                writing, coding, studying, research, career; GitHub Copilot →
                coding; Perplexity → research, studying; Midjourney → image
                generation. Other combinations are cautious or low fit; finance
                and personal advice always need human review.
              </p>
            </div>
          </details>
        </section>
      </main>

      <footer>
        <a href="#" className="footer-brand">
          <Compass size={19} /> MindfulAI Compass
        </a>
        <span>Built for a more intentional relationship with AI.</span>
        <span className="hackathon-tag">
          SHELLHACKS 2026 <ArrowUpRight size={13} />
        </span>
      </footer>
      <div className="sr-only" role="status" aria-live="polite">
        {copyStatus}
      </div>
    </>
  );
}

export default App;

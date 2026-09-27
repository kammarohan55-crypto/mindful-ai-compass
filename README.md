# MindfulAI Compass

**A little clarity before you AI.**

MindfulAI Compass helps users choose AI tools safely by analyzing privacy risk, estimated spending, task fit, and safer usage habits, then generating a clear AI Mindfulness Score and action plan.

Built for **ShellHacks 2026 · Assurant challenge**. A complete local React application with a deterministic assessment dashboard, not a chatbot.

## Problem

Choosing an AI tool is easy. Understanding what to share, how subscriptions fit your budget, and whether the tool suits the task is harder. People often make all three decisions on autopilot.

## Solution

Describe a planned task using structured inputs. Compass turns those choices into a transparent score, privacy exposure level, budget comparison, illustrative task-fit recommendation, and actionable checklist. Compare your current plan with a safer scenario before sharing data or spending money.

## Why it fits ShellHacks

- **Completion:** a runnable, self-contained app with a full assessment-to-action flow.
- **Originality:** an AI decision aid that helps users pause before using another AI product.
- **Design:** a responsive navy-and-mint workspace with readable score components and a before/after comparison.
- **Technology:** React state, a pure JavaScript scoring engine, Vite builds, browser clipboard, and targeted tests.
- **Practicality and impact:** a student can prepare a safer job-application workflow and set a monthly spending boundary in under a minute.

These are design goals and implemented capabilities, not claims of measured real-world impact.

## Why it fits the Assurant challenge

Compass brings privacy, spending visibility, and tool selection into one practical decision. It uses data categories instead of collecting sensitive content, compares user-provided estimates to a personal budget, and suggests a concrete next step. It helps users make an informed plan; it does not inspect accounts or enforce spending limits.

The core experience also satisfies the supplied Microsoft-style constraint: **there is no chatbot**. The demo shows a person completing a real task—planning safer AI-assisted career work with a budget and a copyable action plan.

## Features

- Judge-readable decision receipt with verdict, top risk, one-minute improvement, and recommended tool pattern
- Eight goals: writing, coding, studying, finance, research, image generation, personal advice, and career.
- Six named tools plus a custom tool option.
- Monthly budget and estimated spend in USD; zero-budget and overspending cases supported.
- Seven data-sharing categories, usage frequency, and experience level.
- A 0–100 score with visible privacy, budget, task-fit, and habit components.
- Privacy exposure, spending guidance, and explainable tool-fit feedback.
- A safer scenario preview and an explicit **Use safer plan** action.
- Interactive safer-usage checklist; progress does not inflate the score.
- Personalized next steps and **Copy action plan**, including a manual-copy fallback.
- One-click sample, reset, stale-result notice, and responsive layouts.
- Expandable scoring methodology. Keyboard-operable native controls and reduced-motion support.
- No application backend, database, authentication, API keys, paid APIs, analytics, or external AI dependency.

## Tech stack

React 19, Vite 7, plain CSS, lucide-react, and the browser Clipboard API. Node's built-in test runner verifies scoring boundaries without another test library. Dependencies are locked in `package-lock.json`.

## How scoring works

The rules are intentionally visible and deterministic. They are educational heuristics, **not a security audit, empirically validated safety score, medical/financial advice, or a verified comparison of providers**. Scores do not certify a tool as safe. The example tool matrix does not fetch current capabilities, prices, or policies.

| Component | Maximum | Rules |
| --- | ---: | --- |
| Privacy | 40 | Category exposure: personal 8, files 12, financial 22, location 8, images 10, private messages 16, health 24. If any category is selected, add frequency exposure 0/3/6/9 for occasional/weekly/daily/many-times-daily use. Cap exposure at 100. Points = round(40 × (1 − exposure/100)). |
| Budget | 25 | Spend ≤80% of budget: 25; ≤100%: 21; ≤125%: 12; above 125%: 4. Positive spend with zero budget: 0. Zero spend, including zero budget: 25. |
| Task fit | 25 | Strong illustrative match: 25; cautious general use: 16; specialist mismatch: 6; unknown tool: 12. |
| Habits | 10 | Beginner/intermediate/experienced: 3/6/8, plus occasional/weekly/daily/many-times-daily: 2/2/1/0. |

Privacy exposure is **Low** below 18, **Moderate** from 18–39, and **High** from 40. Score labels are “A mindful starting point” at 80+, “A few adjustments ahead” at 60–79, and “A little course correction” below 60.

The task matrix labels ChatGPT, Claude, and Gemini as examples for writing, coding, studying, research, and career; GitHub Copilot for coding; Perplexity for research/studying; and Midjourney for image generation. Other general-assistant uses earn cautious points; other specialist uses and unmatched image goals earn low-fit points. Unknown tools receive an explicit unverified label. This is a manually authored demonstration matrix, not an endorsement.

**Reproducible sample:** career + ChatGPT + $20 budget + $35 estimated spend + personal/files/messages + daily + beginner → privacy 23 + budget 4 + task fit 25 + habits 4 = **56/100**. The safer scenario assumes no listed data is shared and caps estimated spend at $20 → **90/100**, a projected increase of 34 points. It changes the plan only: the user must sanitize actual content and manage their own subscriptions.

## Installation and running

Use a supported Node release: Node 20.19+, 22.12+, or newer supported LTS. This build was verified using Node 24.

```sh
cd mindful-ai-compass
npm install
npm run dev
```

Open the exact local URL Vite prints, normally http://127.0.0.1:5173. In Windows PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`.

```sh
npm test
npm run build
npm run preview
```

`npm run build` writes `dist/`. After dependencies are installed, development and assessment need no internet connection. `npm ci` can reproduce the lockfile installation. The browser must first load the app from the local Vite or preview server; there is no service worker.

### Verified before delivery

The original Codex build was reported as production-verified before this winner-pack upgrade. In this upgraded ZIP, all six scoring tests passed, including the judge-facing decision receipt fields. Run `npm install`, `npm test`, and `npm run build` locally after extracting. This verification is not a formal accessibility or security audit.

## Demo flow

1. Open the app. The page starts with a clearly labeled sample assessment.
2. Click **Load sample** to reset the demo reliably.
3. Explain the real task: prepare an AI-assisted job application without exposing private conversations or exceeding a student budget.
4. Point out career, ChatGPT, $20 budget, $35 estimate, and the three data categories.
5. Click **Find my direction**. Show **56/100**, **High exposure**, and **$15 over budget**.
6. Show the projected **90/100** and click **Use safer plan**. The form removes the listed categories and sets estimated spend to $20. Explain that the user still has to sanitize real content.
7. Tick a checklist item and click **Copy action plan**. On a restricted clipboard, use the visible fallback textarea.
8. Expand **How scoring works** to show the transparent rules. The experience is a completed decision workflow, not a chat conversation.

See `VIDEO_SCRIPT.md` for a 105-second recording script, `SUBMISSION.md` for paste-ready Devpost fields, and `ASTRA_FINAL_FIX_PROMPT.md` for a short final repair prompt.

## GitHub and Devpost handoff

Create an empty public repository named `mindful-ai-compass` under `kammarohan55-crypto` on GitHub; leave README/license/gitignore initialization unchecked because the local files already exist. Run these **inside this project folder**, not its parent:

```sh
git init
git add .
git commit -m "Build MindfulAI Compass for ShellHacks 2026"
git branch -M main
git remote add origin https://github.com/kammarohan55-crypto/mindful-ai-compass.git
git push -u origin main
```

If GitHub CLI is installed and authenticated, an alternative is to run the first four commands, then:

```sh
gh repo create mindful-ai-compass --public --source=. --remote=origin --push
```

Use one remote-creation route, not both. Authenticate with your own GitHub account if prompted. GitHub CLI was not available in the build environment. The build does not create or publish a repository automatically.

Attach `https://github.com/kammarohan55-crypto/mindful-ai-compass` to the Devpost submission after pushing. Paste the fields from `SUBMISSION.md` and attach the recorded video URL. Confirm the video is viewable without requesting access. A local folder alone does not satisfy the repository attachment requirement.

## Data handling and limitations

Inputs and checklist state live only in React memory and reset on refresh. There is no localStorage, cookie, analytics, or remote request in the app. Dependencies are downloaded at installation; assets and icons are served locally. Copying a plan intentionally exports text to the clipboard. No actual private documents, messages, or financial data should be entered. Amounts are manually entered estimates, not observed bills. The safer scenario does not redact documents, cancel subscriptions, or alter vendor settings.

## Future scope

Future work could include dated, source-linked vendor policy comparisons; user-controlled subscription imports; a local redaction preview; and user studies to calibrate scoring weights. These are future ideas, not currently implemented features.

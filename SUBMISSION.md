# Devpost submission — MindfulAI Compass

Copy each section below into its matching Devpost field. The hackathon criteria and target challenge below are based on the supplied brief; confirm any additional organizer fields when submitting.

## Project name

MindfulAI Compass

## Short Devpost project description

Choose AI with intention. Compare privacy exposure, estimated spending, and task fit, then leave with a transparent Mindfulness Score and a practical action plan.

## Long Devpost project description

MindfulAI Compass helps people make a better decision before using AI. Instead of opening a chat, users choose a goal, a tool, a monthly budget, an estimated spend, and the categories of data they intend to share.

The dashboard turns those choices into an explainable 0–100 AI Mindfulness Score, a privacy exposure level, spending guidance, an illustrative tool-fit assessment, and a personalized action plan. A before-and-after scenario shows how a smaller data footprint and a spending boundary change the result. Users can apply that scenario, work through a safer-usage checklist, and copy their next steps.

Our demo follows a student preparing to use AI for a job application. Their $35 estimated monthly spend exceeds a $20 budget, and they plan to share personal information, work files, and private messages. Compass flags those choices and turns them into a concrete plan: use sanitized content, cap estimated spending, and review important outputs. The demo score changes from 56 to 90 under those explicit assumptions.

Built for the Assurant challenge at ShellHacks 2026, Compass brings privacy awareness, spending visibility, and confident tool selection into one task-focused experience. It runs locally using React, Vite, plain CSS, and transparent JavaScript rules. There is no backend, authentication, API key, paid API, or external AI service. Inputs stay in page memory.

The scoring is an educational heuristic, not a security certification. Tool fit comes from an illustrative static matrix; vendor policies and prices are not fetched. Spending is estimated by the user. The product gives people a clear plan while keeping these limits visible.

## Inspiration

AI is becoming part of studying, coding, job hunting, and daily decisions. Yet the moment before using a tool is often overlooked: what am I about to share, what will this cost, and is this tool appropriate? We wanted to make that moment easier through a small, useful decision dashboard.

## What it does

Compass combines eight task goals, tool selection, monthly cost estimates, seven sharing categories, frequency, and experience into a transparent assessment. It identifies overspending and data exposure, explains its illustrative task-fit rating, and generates a safer checklist and action plan. A one-click sample and before/after scenario make the complete workflow easy to demonstrate.

## How we built it

We used React and Vite for a fast local application, plain CSS for a responsive interface, and lucide-react for icons. A small pure JavaScript module holds the scoring rules, example tool matrix, scenario transformation, and action-plan export. Browser state keeps the experience local, and the Clipboard API copies plans with a manual fallback. Node's built-in test runner checks score bounds, zero budgets, spending thresholds, tool mismatches, and the demo outcome.

## Challenges

The main challenge was balancing a simple score with honest explanations. We made each component visible and clearly labeled the tool matrix and scoring weights as demo assumptions. We also handled zero budgets, unknown tools, changed inputs with outdated results, and restricted clipboard access without adding a backend.

## Accomplishments

We built a complete assessment-to-action flow that demonstrates a real task rather than another chatbot. The local experience includes a working safer scenario, a personalized checklist, a copyable plan, and a repeatable demo. Users can trace the sample's 56-to-90 score change directly to its input changes.

## What we learned

Useful AI-related products do not always need to call a model. A clear interface, visible assumptions, and a practical next step can support better decisions without collecting sensitive content. We also learned that a score is most useful when users can see what changed and why.

## What's next

We would add dated, source-linked provider policy comparisons, opt-in subscription data imports, and an on-device redaction preview. User studies would help test whether the scoring weights and action plans improve decisions. These are planned extensions, not current capabilities.

## Built with tags

React, Vite, JavaScript, CSS, HTML5, Lucide, Node.js

## Target challenge

Assurant — privacy protection, spending visibility, and confident AI tool selection.

## GitHub repository field

https://github.com/kammarohan55-crypto/mindful-ai-compass

Push the local project before attaching this link. A repository at this URL was not created by the build process.

## Video field

Record the walkthrough in `VIDEO_SCRIPT.md`, upload it as a publicly viewable or unlisted video, and paste its real URL. Keep the final duration between 1 and 2 minutes. No video is pre-recorded or uploaded by this project.

## Suggested screenshots

Capture the dashboard at 56/100 with the sample inputs, then the safer scenario at 90/100. Use actual running-app screenshots; avoid mockups that imply unimplemented features.

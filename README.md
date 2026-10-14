# Generative AI Learning — JavaScript

Small experiments and learning exercises around calling an LLM from JavaScript, organized by learning day.

## Contents

- [Day 2](./Day2/) — JavaScript/LLM practice
- [Day 3](./Day3/) — additional exercises
- [Day 4](./Day4/) — further experiments and notes

These are learning exercises, not a production-ready AI application. Review each day's code and package dependencies before running it.

## Setup

Each day currently has its own `package.json`. From the relevant folder:

```bash
cd Day4
npm install
```

Use the package's documented entry point and add a start script only when the exercise is ready to be run consistently.

## API keys

Never hardcode provider API keys in JavaScript files or commit them to Git. Use an environment variable (for example, `GEMINI_API_KEY`) and load it using a suitable environment-variable mechanism. If a real key was ever committed, revoke/rotate it in the provider dashboard; deleting it from the latest file is not enough.

## Repository hygiene

The day folders currently include `node_modules` directories. These should generally not be committed: add `node_modules/` and `.env` to a root `.gitignore`, then remove already tracked dependency folders from Git in a separate reviewed change. Keep `package-lock.json` so dependencies remain reproducible.

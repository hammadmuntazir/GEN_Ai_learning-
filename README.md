# Generative AI Learning — JavaScript

Small experiments and learning exercises around calling an LLM from JavaScript, organized by learning day.

## Contents

- [Day 2](./Day2/) — JavaScript/LLM practice
- [Day 3](./Day3/) — additional exercises
- [Day 4](./Day4/) — further experiments and notes

These are learning exercises, not a production-ready AI application.

## Setup

Each day currently has its own `package.json`. From the relevant folder, install that folder's declared dependencies:

```bash
cd Day4
npm install
```

Set the API key in your terminal before running a script. In PowerShell:

```powershell
$env:GEMINI_API_KEY="your-new-key-here"
node index.js
```

In Bash:

```bash
export GEMINI_API_KEY="your-new-key-here"
node index.js
```

The JavaScript files read `process.env.GEMINI_API_KEY`. Never paste a real key into source code or commit it. If a key was committed, revoke/rotate it in Google AI Studio; removing it from the current files does not erase it from Git history.

## Repository hygiene

A root `.gitignore` now excludes `node_modules/` and environment files. The repository already contains tracked `node_modules` directories, however; adding `.gitignore` alone does not untrack them. A separate cleanup should remove those dependency folders from version control while retaining each `package-lock.json`.

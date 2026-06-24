# CP Ally IDE — Web Companion

> Landing page and curated problem sheets for **CP Ally IDE**, the unofficial partner code editor for competitive programming on CodeForces.

<p>
  <a href="https://github.com/0xPolybit/cp-ally-ide/releases"><img alt="Latest release" src="https://img.shields.io/github/v/release/0xPolybit/cp-ally-ide?label=CP%20Ally%20IDE&color=4d7c5a"></a>
  <img alt="Status" src="https://img.shields.io/badge/status-beta-amber">
  <a href="https://github.com/0xPolybit/cp-ally-ide/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/github/license/0xPolybit/cp-ally-ide"></a>
  <a href="https://github.com/0xPolybit/cp-ally-ide/stargazers"><img alt="Stars" src="https://img.shields.io/github/stars/0xPolybit/cp-ally-ide?style=flat"></a>
</p>

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white">
</p>

---

## What is CP Ally IDE?

**CP Ally IDE** is an unofficial desktop code editor purpose-built for competitive programming on
CodeForces. Instead of a general-purpose IDE, it bundles exactly the contest loop into one window —
because mid-contest, _speed matters more than general-purpose IDE features_.

- 🔎 **Fetch by problem code** — type a contest code like `2208A` and pull the problem from CodeForces.
- 📄 **Faithful rendering** — statements render with HTML, icons, and LaTeX.
- ⌨️ **Syntax-highlighted editor** — a compact split layout: statement on the left, code on the right.
- ▶️ **Run locally** — execute against the extracted sample tests or your own custom cases, with
  case-insensitive `YES`/`NO` judging.
- 💾 **Caching that remembers** — statements cache for fast reloads; your code is preserved per
  problem and per language.
- 🪟 **Persistent workspace** — window state, divider positions, and the last language are restored.

The desktop app is a Java / Swing application built with Maven, and lives in its own repository:
👉 **[github.com/0xPolybit/cp-ally-ide](https://github.com/0xPolybit/cp-ally-ide)**

> **Beta:** the app is under active development and may be prone to bugs and crashes.

---

## Install & use the desktop app

The app is distributed from the main repository's **[Releases](https://github.com/0xPolybit/cp-ally-ide/releases)** page.

### Option A — Download a release

1. Make sure you have a recent **Java Runtime (JRE 17+)** installed.
2. Download the latest build from the
   [Releases](https://github.com/0xPolybit/cp-ally-ide/releases) page.
3. Launch it (double-click the packaged app, or run the jar):
   ```bash
   java -jar cp-ally-ide.jar
   ```

### Option B — Build from source

Requires **JDK 17+** and **Maven**.

```bash
git clone https://github.com/0xPolybit/cp-ally-ide.git
cd cp-ally-ide
mvn clean package
java -jar target/*.jar
```

### The five-step workflow

1. **Enter the code** — a contest code and index, e.g. `2208A`.
2. **Fetch** — pull the statement and sample tests from CodeForces.
3. **Read** — study the rendered problem in the left panel.
4. **Write** — code your solution in the editor on the right.
5. **Run** — judge it locally against the samples.

---

## This repository — the web companion

This repo (`cp-ally-landing`) is the **marketing site + problem sheets** for CP Ally IDE. It is a
[Next.js](https://nextjs.org) app (App Router, Tailwind CSS v4, TypeScript) and includes:

- **Landing page** — what CP Ally IDE is, its features, and the workflow.
- **Problem sheets** (`/sheets`) — curated, rating-laddered CodeForces problem sets by topic
  (Beginners, Number Theory, Bit Manipulation, Dynamic Programming, Strings, Hashing, Sorting,
  Mathematics).
- **Progress tracking** — enter your CodeForces handle and each problem row is tinted by verdict
  (solved / wrong / attempted), with a "show only unsolved" filter.
- **Open in app** — every problem has an `cpally://problem/<code>` deep link that opens it directly
  in the desktop app.

### Run it locally

```bash
git clone https://github.com/0xPolybit/cp-ally-landing.git
cd cp-ally-landing
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script          | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server (Turbopack)     |
| `npm run build` | Production build                     |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Lint with ESLint                     |

### Configuration

Set your production origin so `sitemap.xml`, `robots.txt`, and Open Graph URLs resolve correctly:

```bash
# .env
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

### Project structure

```
app/
├─ _components/        UI components (header, hero, tracker, modal, table…)
├─ _data/              Sheet registry + per-topic problem lists
├─ api/cf-status/      CodeForces verdict proxy (handle → per-problem status)
├─ sheets/             Sheets directory + dynamic /sheets/[slug] pages
├─ layout.tsx          Root layout, fonts, metadata
└─ page.tsx            Landing page
```

---

## Credits

Built by **Swastik Biswas**, with contributions from **Himanshi Saxena**.

Licensed under the **Apache License 2.0** — see the
[main repository](https://github.com/0xPolybit/cp-ally-ide) for details.

> CP Ally IDE is an **unofficial** tool and is not affiliated with or endorsed by CodeForces.

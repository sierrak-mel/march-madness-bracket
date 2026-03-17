# 🏀 March Madness Bracket Predictor

An interactive NCAA tournament bracket tool I built to make filling out your bracket a little smarter.

**[Try it here →](https://sierrak-mel.github.io/march-madness-bracket/)**

---

## What it does

- Full 64-team interactive bracket — click to advance teams through each round
- Win probability % on every matchup, based on historical seed data
- Hover over any matchup to get a stat breakdown and pick recommendation
- Auto-fill the bracket by seed (all favorites)
- Share your bracket with anyone via a URL
- Saves your picks automatically so you don't lose progress
- Tracks your picks, upsets chosen, and champion at a glance

---

## How the recommendations work

When you hover a matchup, the tool shows a recommendation based on real 2008–2025 tournament data. Each team gets a composite score factoring in:

- Win probability for that specific seed matchup
- How often that seed reaches the Final Four historically
- Championship rate since 2008

It also flags known upset matchups (like 5 vs 12) and gives a confidence rating — HIGH, MEDIUM, or TOSS-UP — so you know when to trust the pick and when to roll the dice.

---

## Win Probability Model

Probabilities are derived from historical seed matchup results (1985–2025).

| Matchup | Higher Seed Win % |
|---------|-------------------|
| 1 vs 16 | 98.7% |
| 2 vs 15 | 93.8% |
| 5 vs 12 | 64.4% ← classic upset alert |
| 8 vs 9  | 51.9% ← coin flip |

For later-round matchups where seeds haven't met before, the app uses a logistic model:
`P = 1 / (1 + e^(-0.35 * (seedB - seedA)))`

---

## File Structure

```
march-madness-bracket/
├── index.html   # App shell + layout
├── style.css    # Dark sports theme
├── data.js      # Bracket data + probability model + historical seed stats
├── app.js       # Bracket engine, rendering, and interactions
└── README.md    # This file
```

---

## Built with

- Vanilla HTML, CSS, and JavaScript — no frameworks, no build step
- Tournament data: ESPN / NCAA (2026)
- Historical win rates: NCAA tournament records 2008–2025

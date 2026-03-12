# 🏀 March Madness Bracket Predictor

An interactive NCAA tournament bracket predictor built for your GitHub portfolio.

**[Live Demo →](https://sierrak-mel.github.io/march-madness-bracket/)**

---

## Features

- ✅ Full 64-team interactive bracket — click to advance teams
- ✅ Win probability % on every matchup (seed-based historical model)
- ✅ Hover tooltips with matchup history & odds bar
- ✅ Auto-fill by seed (favorites only)
- ✅ Shareable bracket via URL encoding
- ✅ Persistent state via localStorage
- ✅ Stats bar: picks made, upsets chosen, champion
- ✅ Responsive dark theme

---

## Upgrade: Pull Live Data from ESPN API

Once the 2026 bracket is released (Selection Sunday, ~March 15), swap in real data:

```javascript
// In app.js or a new api.js file:
async function fetchBracket() {
  // ESPN unofficial API — no key required
  const res = await fetch(
    'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?groups=100&limit=64'
  );
  const data = await res.json();
  return data;
}

// For tournament bracket specifically:
async function fetchTournamentBracket() {
  const res = await fetch(
    'https://site.api.espn.com/apis/v2/sports/basketball/mens-college-basketball/tournaments/22?year=2026'
  );
  const data = await res.json();
  return data;
}
```

> **Note:** ESPN's unofficial API has no official documentation and endpoints can change.
> The bracket data in `data.js` is hardcoded from the 2025 tournament as a reliable fallback.

---

## Win Probability Model

Probabilities come from historical seed matchup data (1985–2024 tournaments).
The key numbers:

| Matchup | Higher Seed Win % |
|---------|-------------------|
| 1 vs 16 | 98.7% |
| 2 vs 15 | 93.8% |
| 5 vs 12 | 64.4% ← classic upset alert |
| 8 vs 9  | 51.9% ← coin flip |

For non-first-round matchups, the app uses a logistic model:
`P = 1 / (1 + e^(-0.35 * (seedB - seedA)))`

---

## File Structure

```
march-madness/
├── index.html   # App shell + layout
├── style.css    # Dark sports theme
├── data.js      # 2025 bracket data + probability model
├── app.js       # Bracket engine + rendering + interactions
└── README.md    # This file
```

---

## Credits

- Tournament data: ESPN / NCAA (2025)
- Historical win rates: [FiveThirtyEight / NCAA historical results]
- Built with vanilla HTML/CSS/JS — no frameworks, no build step

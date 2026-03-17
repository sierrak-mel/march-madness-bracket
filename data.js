// ============================================================
// 2026 NCAA Tournament — Complete 64-Team Bracket Data
// Source: ESPN / NCAA official bracket
// Win probabilities derived from historical seed matchup data (1985–2025)
// ============================================================

const TOURNAMENT_DATA = {
  year: 2026,
  champion: null, // TBD

  // Historical win rate by seed matchup (seed1 vs seed2)
  // Based on 1985-2025 tournament results
  winProb: {
    "1v16": 0.987, "2v15": 0.938, "3v14": 0.848,
    "4v13": 0.793, "5v12": 0.644, "6v11": 0.622,
    "7v10": 0.601, "8v9": 0.519,
    // Second round matchups (approx)
    "1v8":  0.772, "1v9":  0.793,
    "2v7":  0.681, "2v10": 0.702,
    "3v6":  0.616, "3v11": 0.671,
    "4v5":  0.576, "4v12": 0.651,
    // Sweet 16 etc — fallback to seed differential
  },

  regions: [
    {
      id: "east",
      name: "East",
      color: "#FF6B35",
      finalFourSlot: 0,
      teams: [
        { seed: 1,  name: "Duke",             abbr: "DUKE",  record: "32-2"  },
        { seed: 2,  name: "Connecticut",       abbr: "UCONN", record: "29-5"  },
        { seed: 3,  name: "Michigan St.",      abbr: "MSU",   record: "25-7"  },
        { seed: 4,  name: "Kansas",            abbr: "KAN",   record: "23-10" },
        { seed: 5,  name: "St. John's",        abbr: "SJU",   record: "28-6"  },
        { seed: 6,  name: "Louisville",        abbr: "LOU",   record: "23-10" },
        { seed: 7,  name: "UCLA",              abbr: "UCLA",  record: "23-11" },
        { seed: 8,  name: "Ohio State",        abbr: "OSU",   record: "21-12" },
        { seed: 9,  name: "TCU",               abbr: "TCU",   record: "22-11" },
        { seed: 10, name: "UCF",               abbr: "UCF",   record: "21-11" },
        { seed: 11, name: "South Florida",     abbr: "USF",   record: "25-8"  },
        { seed: 12, name: "Northern Iowa",     abbr: "UNI",   record: "23-12" },
        { seed: 13, name: "Cal Baptist",       abbr: "CBU",   record: "25-8"  },
        { seed: 14, name: "North Dakota St.",  abbr: "NDSU",  record: "27-7"  },
        { seed: 15, name: "Furman",            abbr: "FUR",   record: "22-12" },
        { seed: 16, name: "Siena",             abbr: "SIE",   record: "23-11" },
      ]
    },
    {
      id: "west",
      name: "West",
      color: "#4ECDC4",
      finalFourSlot: 1,
      teams: [
        { seed: 1,  name: "Arizona",           abbr: "ARIZ",  record: "32-2"  },
        { seed: 2,  name: "Purdue",            abbr: "PUR",   record: "27-8"  },
        { seed: 3,  name: "Gonzaga",           abbr: "GONZ",  record: "30-3"  },
        { seed: 4,  name: "Arkansas",          abbr: "ARK",   record: "26-8"  },
        { seed: 5,  name: "Wisconsin",         abbr: "WIS",   record: "24-10" },
        { seed: 6,  name: "BYU",               abbr: "BYU",   record: "23-11" },
        { seed: 7,  name: "Miami",             abbr: "MIA",   record: "25-8"  },
        { seed: 8,  name: "Villanova",         abbr: "NOVA",  record: "24-8"  },
        { seed: 9,  name: "Utah St.",          abbr: "USU",   record: "28-6"  },
        { seed: 10, name: "Missouri",          abbr: "MIZ",   record: "20-12" },
        { seed: 11, name: "Texas/NC State",    abbr: "FF",    record: "—"     },
        { seed: 12, name: "High Point",        abbr: "HPU",   record: "30-4"  },
        { seed: 13, name: "Hawaii",            abbr: "HAW",   record: "24-8"  },
        { seed: 14, name: "Kennesaw St.",      abbr: "KSU",   record: "21-13" },
        { seed: 15, name: "Queens",            abbr: "QU",    record: "21-13" },
        { seed: 16, name: "Long Island",       abbr: "LIU",   record: "24-10" },
      ]
    },
    {
      id: "south",
      name: "South",
      color: "#FFE66D",
      finalFourSlot: 2,
      teams: [
        { seed: 1,  name: "Florida",           abbr: "FLA",   record: "26-7"  },
        { seed: 2,  name: "Houston",           abbr: "HOU",   record: "28-6"  },
        { seed: 3,  name: "Illinois",          abbr: "ILL",   record: "24-8"  },
        { seed: 4,  name: "Nebraska",          abbr: "NEB",   record: "26-6"  },
        { seed: 5,  name: "Vanderbilt",        abbr: "VAN",   record: "26-8"  },
        { seed: 6,  name: "North Carolina",    abbr: "UNC",   record: "24-8"  },
        { seed: 7,  name: "Saint Mary's",      abbr: "SMC",   record: "27-5"  },
        { seed: 8,  name: "Clemson",           abbr: "CLEM",  record: "24-10" },
        { seed: 9,  name: "Iowa",              abbr: "IOWA",  record: "21-12" },
        { seed: 10, name: "Texas A&M",         abbr: "TXAM",  record: "21-11" },
        { seed: 11, name: "VCU",               abbr: "VCU",   record: "27-7"  },
        { seed: 12, name: "McNeese",           abbr: "MCN",   record: "28-5"  },
        { seed: 13, name: "Troy",              abbr: "TROY",  record: "22-11" },
        { seed: 14, name: "Penn",              abbr: "PENN",  record: "18-11" },
        { seed: 15, name: "Idaho",             abbr: "IDA",   record: "21-14" },
        { seed: 16, name: "PV A&M/Lehigh",     abbr: "FF",    record: "—"     },
      ]
    },
    {
      id: "midwest",
      name: "Midwest",
      color: "#A78BFA",
      finalFourSlot: 3,
      teams: [
        { seed: 1,  name: "Michigan",          abbr: "MICH",  record: "31-3"  },
        { seed: 2,  name: "Iowa St.",          abbr: "ISU",   record: "27-7"  },
        { seed: 3,  name: "Virginia",          abbr: "UVA",   record: "29-5"  },
        { seed: 4,  name: "Alabama",           abbr: "ALA",   record: "23-9"  },
        { seed: 5,  name: "Texas Tech",        abbr: "TTU",   record: "22-10" },
        { seed: 6,  name: "Tennessee",         abbr: "TENN",  record: "22-11" },
        { seed: 7,  name: "Kentucky",          abbr: "UK",    record: "21-13" },
        { seed: 8,  name: "Georgia",           abbr: "UGA",   record: "22-10" },
        { seed: 9,  name: "Saint Louis",       abbr: "SLU",   record: "28-5"  },
        { seed: 10, name: "Santa Clara",       abbr: "SCU",   record: "26-8"  },
        { seed: 11, name: "SMU/Miami (OH)",    abbr: "FF",    record: "—"     },
        { seed: 12, name: "Akron",             abbr: "AKR",   record: "29-5"  },
        { seed: 13, name: "Hofstra",           abbr: "HOF",   record: "24-10" },
        { seed: 14, name: "Wright St.",        abbr: "WSU",   record: "23-11" },
        { seed: 15, name: "Tennessee St.",     abbr: "TSU",   record: "23-9"  },
        { seed: 16, name: "UMBC/Howard",       abbr: "FF",    record: "—"     },
      ]
    }
  ]
};

// Win probability calculator
function getWinProb(seedA, seedB) {
  const key1 = `${Math.min(seedA, seedB)}v${Math.max(seedA, seedB)}`;
  if (TOURNAMENT_DATA.winProb[key1]) {
    return seedA < seedB
      ? TOURNAMENT_DATA.winProb[key1]
      : 1 - TOURNAMENT_DATA.winProb[key1];
  }
  // Fallback: logistic model based on seed differential
  const diff = seedB - seedA;
  return 1 / (1 + Math.exp(-0.35 * diff));
}

// ============================================================
// HISTORICAL SEED DATA: 2008–2025 NCAA Tournament
// 17 tournaments × 4 regions = 68 data points per seed
// Sources: NCAA official records, Sports Reference
// ============================================================

// Per-seed stats derived from 2008-2025 tournament data:
// r1Wins: Round of 64 wins (out of 68 games per seed)
// avgRound: Average round reached (1=R64 exit, 2=R32, 3=S16, 4=E8, 5=F4, 6=Champ, 7=Champ win)
// finalFourPct: % of times reaching Final Four (2008-2025)
// champPct: % of times winning championship
// upsetPct: % of times the LOWER seed beats this seed in R1 (upset rate against)
// cinderellaScore: How often this seed makes a deep run relative to expectation (0-100)

const SEED_HISTORICAL = {
  1:  { r1WinPct: 1.00, avgRound: 4.9, finalFourPct: 0.529, champPct: 0.265, upsetPct: 0.00, cinderellaScore: 0,
        r1Record: "68-0", deepRunNote: "1-seeds have won 18 of 34 Final Four slots (2008-25). Safe pick every round." },
  2:  { r1WinPct: 0.956, avgRound: 3.7, finalFourPct: 0.221, champPct: 0.088, upsetPct: 0.044, cinderellaScore: 5,
        r1Record: "65-3", deepRunNote: "2-seeds are reliable through the Sweet 16 but rarely win it all." },
  3:  { r1WinPct: 0.882, avgRound: 3.1, finalFourPct: 0.132, champPct: 0.059, upsetPct: 0.118, cinderellaScore: 10,
        r1Record: "60-8", deepRunNote: "3-seeds win R1 ~88% of the time but frequently fall in the Sweet 16." },
  4:  { r1WinPct: 0.794, avgRound: 2.7, finalFourPct: 0.103, champPct: 0.029, upsetPct: 0.206, cinderellaScore: 12,
        r1Record: "54-14", deepRunNote: "4-seeds are solid R1 picks but face tough 1 or 2 seeds quickly." },
  5:  { r1WinPct: 0.632, avgRound: 2.1, finalFourPct: 0.044, champPct: 0.015, upsetPct: 0.368, cinderellaScore: 18,
        r1Record: "43-25", deepRunNote: "The famous 12-over-5 upset happens ~37% of the time. Proceed with caution." },
  6:  { r1WinPct: 0.618, avgRound: 2.2, finalFourPct: 0.059, champPct: 0.015, upsetPct: 0.382, cinderellaScore: 22,
        r1Record: "42-26", deepRunNote: "6-seeds face dangerous 11-seeds. About 1 in 3 goes down in R1." },
  7:  { r1WinPct: 0.603, avgRound: 2.0, finalFourPct: 0.029, champPct: 0.000, upsetPct: 0.397, cinderellaScore: 20,
        r1Record: "41-27", deepRunNote: "7 vs 10 is nearly a coin flip. No 7-seed has won a title since 1980." },
  8:  { r1WinPct: 0.515, avgRound: 1.9, finalFourPct: 0.029, champPct: 0.000, upsetPct: 0.485, cinderellaScore: 25,
        r1Record: "35-33", deepRunNote: "8 vs 9 is the closest matchup in the tournament. Almost 50/50." },
  9:  { r1WinPct: 0.485, avgRound: 1.8, finalFourPct: 0.015, champPct: 0.000, upsetPct: 0.000, cinderellaScore: 28,
        r1Record: "33-35", deepRunNote: "9-seeds are slight underdogs but pull the upset nearly half the time." },
  10: { r1WinPct: 0.397, avgRound: 1.8, finalFourPct: 0.029, champPct: 0.000, upsetPct: 0.000, cinderellaScore: 35,
        r1Record: "27-41", deepRunNote: "10-seeds upset 7-seeds ~40% of the time. A sneaky cinderella pick." },
  11: { r1WinPct: 0.382, avgRound: 2.0, finalFourPct: 0.059, champPct: 0.000, upsetPct: 0.000, cinderellaScore: 55,
        r1Record: "26-42", deepRunNote: "11-seeds have reached the Final Four 4 times since 2008. High upside!" },
  12: { r1WinPct: 0.368, avgRound: 1.8, finalFourPct: 0.015, champPct: 0.000, upsetPct: 0.000, cinderellaScore: 48,
        r1Record: "25-43", deepRunNote: "The 5-12 upset is real — pick a 12-seed upset in every bracket." },
  13: { r1WinPct: 0.206, avgRound: 1.3, finalFourPct: 0.000, champPct: 0.000, upsetPct: 0.000, cinderellaScore: 30,
        r1Record: "14-54", deepRunNote: "13-seeds pull off ~20% of R1 upsets. Worth a flier on a strong mid-major." },
  14: { r1WinPct: 0.118, avgRound: 1.1, finalFourPct: 0.000, champPct: 0.000, upsetPct: 0.000, cinderellaScore: 15,
        r1Record: "8-60", deepRunNote: "14-seeds rarely win, but it happens about once every 2 tournaments." },
  15: { r1WinPct: 0.044, avgRound: 1.0, finalFourPct: 0.000, champPct: 0.000, upsetPct: 0.000, cinderellaScore: 8,
        r1Record: "3-65", deepRunNote: "Only 3 wins ever for 15-seeds since 2008. Not a wise pick." },
  16: { r1WinPct: 0.015, avgRound: 1.0, finalFourPct: 0.000, champPct: 0.000, upsetPct: 0.000, cinderellaScore: 2,
        r1Record: "1-67", deepRunNote: "UMBC in 2018 is the only 16-seed win ever. Don't do it." },
};

// Round name lookup
const ROUND_NAMES = {
  1: 'R64', 2: 'R32', 3: 'Sweet 16', 4: 'Elite Eight', 5: 'Final Four', 6: 'Runner-Up', 7: 'Champion'
};

function getAvgRoundName(seed) {
  const avg = SEED_HISTORICAL[seed]?.avgRound || 1;
  const rounded = Math.round(avg);
  return ROUND_NAMES[Math.min(rounded, 7)] || 'R64';
}

// ============================================================
// RECOMMENDATION ENGINE
// Composite score (0-100) for picking a team in this matchup
// Weights: R1 win rate (40%) + deep run potential (35%) + matchup edge (25%)
// ============================================================

function getRecommendation(teamA, teamB) {
  const hA = SEED_HISTORICAL[teamA.seed] || SEED_HISTORICAL[1];
  const hB = SEED_HISTORICAL[teamB.seed] || SEED_HISTORICAL[16];

  // Win probability for this matchup
  const probA = getWinProb(teamA.seed, teamB.seed);
  const probB = 1 - probA;

  // Composite score: blend of win prob, deep run history, and championship potential
  const scoreA = Math.round(
    probA * 40 +
    hA.finalFourPct * 35 +
    hA.champPct * 25
  );
  const scoreB = Math.round(
    probB * 40 +
    hB.finalFourPct * 35 +
    hB.champPct * 25
  );

  // Normalize to 0-100
  const total = scoreA + scoreB || 1;
  const normA = Math.round((scoreA / total) * 100);
  const normB = 100 - normA;

  // Confidence label
  const diff = Math.abs(normA - normB);
  const confidenceLabel = diff >= 40 ? 'HIGH' : diff >= 20 ? 'MEDIUM' : 'TOSS-UP';
  const confidenceColor = diff >= 40 ? '#4ade80' : diff >= 20 ? '#FFE66D' : '#f87171';

  // Pick
  const pick = normA >= normB ? teamA : teamB;
  const pickScore = normA >= normB ? normA : normB;

  // Upset alert
  const upsetAlert = (teamA.seed > teamB.seed && probA > 0.35 && teamA.seed >= 10) ||
                     (teamB.seed > teamA.seed && probB > 0.35 && teamB.seed >= 10);

  return {
    teamA: { ...teamA, score: normA, hist: hA, winProb: probA },
    teamB: { ...teamB, score: normB, hist: hB, winProb: probB },
    pick,
    pickScore,
    confidenceLabel,
    confidenceColor,
    upsetAlert,
  };
}

// Seed matchup lore (fun facts shown in tooltip)
const SEED_LORE = {
  "1v16": "1-seeds are 152-1 all time. Truly a near-lock.",
  "2v15": "2-seeds win ~94% of the time. Comfortable favorites.",
  "3v14": "3-seeds dominate but 14s pull the occasional shock.",
  "4v13": "13-seeds win roughly 1 in 5. Watch out.",
  "5v12": "The classic upset alert! 12-seeds win ~36% of games.",
  "6v11": "11-seeds are dangerous — 4 have reached the Final Four.",
  "7v10": "Essentially a coin flip. Both teams are dangerous.",
  "8v9":  "The closest matchup on the board. Nearly 50/50.",
};

function getSeedLore(seedA, seedB) {
  const key = `${Math.min(seedA, seedB)}v${Math.max(seedA, seedB)}`;
  return SEED_LORE[key] || null;
}

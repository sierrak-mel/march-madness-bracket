// ============================================================
// 2025 NCAA Tournament — Complete 64-Team Bracket Data
// Source: ESPN / NCAA official bracket
// Win probabilities derived from historical seed matchup data (1985–2024)
// ============================================================

const TOURNAMENT_DATA = {
  year: 2025,
  champion: "Florida", // actual 2025 champion

  // Historical win rate by seed matchup (seed1 vs seed2)
  // Based on 1985-2024 tournament results
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
        { seed: 1,  name: "Duke",           abbr: "DUKE",  record: "35-3"  },
        { seed: 2,  name: "Alabama",         abbr: "ALA",   record: "26-8"  },
        { seed: 3,  name: "Wisconsin",       abbr: "WIS",   record: "27-8"  },
        { seed: 4,  name: "Arizona",         abbr: "ARIZ",  record: "27-8"  },
        { seed: 5,  name: "Oregon",          abbr: "ORE",   record: "25-9"  },
        { seed: 6,  name: "BYU",             abbr: "BYU",   record: "24-10" },
        { seed: 7,  name: "St. John's",      abbr: "SJU",   record: "28-6"  },
        { seed: 8,  name: "Mississippi St.", abbr: "MSST",  record: "22-12" },
        { seed: 9,  name: "Baylor",          abbr: "BAY",   record: "22-13" },
        { seed: 10, name: "Vanderbilt",      abbr: "VAN",   record: "22-12" },
        { seed: 11, name: "VCU",             abbr: "VCU",   record: "25-9"  },
        { seed: 12, name: "Liberty",         abbr: "LIB",   record: "31-5"  },
        { seed: 13, name: "Akron",           abbr: "AKR",   record: "28-6"  },
        { seed: 14, name: "Montana",         abbr: "MONT",  record: "27-8"  },
        { seed: 15, name: "Robert Morris",   abbr: "RMU",   record: "26-9"  },
        { seed: 16, name: "Am. University",  abbr: "AU",    record: "24-12" },
      ]
    },
    {
      id: "west",
      name: "West",
      color: "#4ECDC4",
      finalFourSlot: 1,
      teams: [
        { seed: 1,  name: "Florida",         abbr: "FLA",   record: "32-4"  },
        { seed: 2,  name: "St. Mary's",      abbr: "SMC",   record: "27-5"  },
        { seed: 3,  name: "Kentucky",        abbr: "UK",    record: "26-8"  },
        { seed: 4,  name: "Maryland",        abbr: "UMD",   record: "27-7"  },
        { seed: 5,  name: "Memphis",         abbr: "MEM",   record: "24-9"  },
        { seed: 6,  name: "Clemson",         abbr: "CLEM",  record: "23-11" },
        { seed: 7,  name: "UCLA",            abbr: "UCLA",  record: "22-12" },
        { seed: 8,  name: "Gonzaga",         abbr: "GONZ",  record: "26-8"  },
        { seed: 9,  name: "Georgia",         abbr: "UGA",   record: "21-13" },
        { seed: 10, name: "Utah St.",        abbr: "USU",   record: "29-6"  },
        { seed: 11, name: "Drake",           abbr: "DRA",   record: "31-4"  },
        { seed: 12, name: "UC San Diego",    abbr: "UCSD",  record: "31-5"  },
        { seed: 13, name: "High Point",      abbr: "HPU",   record: "30-4"  },
        { seed: 14, name: "Lipscomb",        abbr: "LIP",   record: "27-8"  },
        { seed: 15, name: "Wofford",         abbr: "WOF",   record: "24-10" },
        { seed: 16, name: "SIU Edwards.",    abbr: "SIUE",  record: "23-12" },
      ]
    },
    {
      id: "south",
      name: "South",
      color: "#FFE66D",
      finalFourSlot: 2,
      teams: [
        { seed: 1,  name: "Auburn",          abbr: "AUB",   record: "30-4"  },
        { seed: 2,  name: "Michigan St.",    abbr: "MSU",   record: "27-8"  },
        { seed: 3,  name: "Iowa St.",        abbr: "ISU",   record: "27-7"  },
        { seed: 4,  name: "Texas A&M",       abbr: "TXAM",  record: "24-9"  },
        { seed: 5,  name: "Michigan",        abbr: "MICH",  record: "24-10" },
        { seed: 6,  name: "Ole Miss",        abbr: "MISS",  record: "22-11" },
        { seed: 7,  name: "Marquette",       abbr: "MU",    record: "24-10" },
        { seed: 8,  name: "Louisville",      abbr: "LOU",   record: "25-9"  },
        { seed: 9,  name: "Creighton",       abbr: "CRE",   record: "24-11" },
        { seed: 10, name: "New Mexico",      abbr: "UNM",   record: "29-5"  },
        { seed: 11, name: "N.C. State",      abbr: "NCST",  record: "21-14" },
        { seed: 12, name: "McNeese",         abbr: "MCN",   record: "28-5"  },
        { seed: 13, name: "Yale",            abbr: "YALE",  record: "25-7"  },
        { seed: 14, name: "Troy",            abbr: "TROY",  record: "26-9"  },
        { seed: 15, name: "Bryant",          abbr: "BRY",   record: "23-11" },
        { seed: 16, name: "AMER/Mount St.M", abbr: "A/M",   record: "—"     },
      ]
    },
    {
      id: "midwest",
      name: "Midwest",
      color: "#A78BFA",
      finalFourSlot: 3,
      teams: [
        { seed: 1,  name: "Houston",         abbr: "HOU",   record: "30-4"  },
        { seed: 2,  name: "Tennessee",       abbr: "TENN",  record: "27-7"  },
        { seed: 3,  name: "Kansas",          abbr: "KAN",   record: "24-10" },
        { seed: 4,  name: "Purdue",          abbr: "PUR",   record: "24-10" },
        { seed: 5,  name: "Clemson",         abbr: "CLEM",  record: "23-11" },
        { seed: 5,  name: "Illinois",        abbr: "ILL",   record: "22-13" },
        { seed: 6,  name: "Missouri",        abbr: "MIZ",   record: "23-11" },
        { seed: 7,  name: "Texas Tech",      abbr: "TTU",   record: "23-11" },
        { seed: 8,  name: "UConn",           abbr: "UCONN", record: "24-11" },
        { seed: 9,  name: "Oklahoma",        abbr: "OU",    record: "21-13" },
        { seed: 10, name: "Arkansas",        abbr: "ARK",   record: "22-12" },
        { seed: 11, name: "San Diego St.",   abbr: "SDSU",  record: "20-14" },
        { seed: 12, name: "Colorado St.",    abbr: "CSU",   record: "27-8"  },
        { seed: 13, name: "Omaha",           abbr: "OMA",   record: "25-9"  },
        { seed: 14, name: "N. Kentucky",     abbr: "NKU",   record: "24-11" },
        { seed: 15, name: "SIUE",            abbr: "SIUE",  record: "23-12" },
        { seed: 16, name: "SIU Edwards.",    abbr: "SIE",   record: "21-14" },
      ]
    }
  ]
};

// Normalized Midwest region (clean 16 teams)
TOURNAMENT_DATA.regions[3] = {
  id: "midwest",
  name: "Midwest",
  color: "#A78BFA",
  finalFourSlot: 3,
  teams: [
    { seed: 1,  name: "Houston",         abbr: "HOU",   record: "30-4"  },
    { seed: 2,  name: "Tennessee",       abbr: "TENN",  record: "27-7"  },
    { seed: 3,  name: "Kansas",          abbr: "KAN",   record: "24-10" },
    { seed: 4,  name: "Purdue",          abbr: "PUR",   record: "24-10" },
    { seed: 5,  name: "Illinois",        abbr: "ILL",   record: "22-13" },
    { seed: 6,  name: "Missouri",        abbr: "MIZ",   record: "23-11" },
    { seed: 7,  name: "Texas Tech",      abbr: "TTU",   record: "23-11" },
    { seed: 8,  name: "UConn",           abbr: "UCONN", record: "24-11" },
    { seed: 9,  name: "Oklahoma",        abbr: "OU",    record: "21-13" },
    { seed: 10, name: "Arkansas",        abbr: "ARK",   record: "22-12" },
    { seed: 11, name: "San Diego St.",   abbr: "SDSU",  record: "20-14" },
    { seed: 12, name: "Colorado St.",    abbr: "CSU",   record: "27-8"  },
    { seed: 13, name: "Omaha",           abbr: "OMA",   record: "25-9"  },
    { seed: 14, name: "N. Kentucky",     abbr: "NKU",   record: "24-11" },
    { seed: 15, name: "Winthrop",        abbr: "WIN",   record: "24-10" },
    { seed: 16, name: "SIUE",            abbr: "SIUE",  record: "23-12" },
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

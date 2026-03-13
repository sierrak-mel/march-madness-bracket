// ============================================================
// March Madness Bracket Engine
// ============================================================

// Bracket matchup order for 16-team region (standard NCAA bracket)
// Each round: array of [topTeamIndex, bottomTeamIndex] in seeded bracket
const ROUND1_MATCHUPS = [
  [0, 15], // 1 vs 16
  [7, 8],  // 8 vs 9
  [4, 11], // 5 vs 12
  [3, 12], // 4 vs 13
  [5, 10], // 6 vs 11
  [2, 13], // 3 vs 14
  [6, 9],  // 7 vs 10
  [1, 14], // 2 vs 15
];

// State
let state = {
  picks: {}, // key: `${regionId}-r${round}-m${matchup}` => teamName
  finalFour: [null, null, null, null],
  championship: [null, null],
  champion: null,
};

// ============================================================
// Bracket Logic
// ============================================================

function getTeamBySeed(regionTeams, seed) {
  return regionTeams.find(t => t.seed === seed);
}

function getMatchupKey(regionId, round, matchupIdx) {
  return `${regionId}-r${round}-m${matchupIdx}`;
}

function getPick(regionId, round, matchupIdx) {
  return state.picks[getMatchupKey(regionId, round, matchupIdx)] || null;
}

function setPick(regionId, round, matchupIdx, teamName) {
  state.picks[getMatchupKey(regionId, round, matchupIdx)] = teamName;
  // Cascade: invalidate downstream picks if team was already picked differently
  cascadeInvalidate(regionId, round, matchupIdx, teamName);
  saveState();
  renderAll();
  updateStats();
}

function cascadeInvalidate(regionId, round, matchupIdx, newWinner) {
  // Find next round matchup
  const nextMatchupIdx = Math.floor(matchupIdx / 2);
  const nextRound = round + 1;

  if (nextRound > 4) return; // No more rounds in region

  const nextKey = getMatchupKey(regionId, nextRound, nextMatchupIdx);
  const existingPick = state.picks[nextKey];

  // Get who the two feeders are for the next matchup
  const feeder1Key = getMatchupKey(regionId, round, nextMatchupIdx * 2);
  const feeder2Key = getMatchupKey(regionId, round, nextMatchupIdx * 2 + 1);
  const feeder1 = state.picks[feeder1Key];
  const feeder2 = state.picks[feeder2Key];

  // If existing pick in next round is neither of the feeders, clear it
  if (existingPick && existingPick !== feeder1 && existingPick !== feeder2) {
    delete state.picks[nextKey];
    cascadeInvalidate(regionId, nextRound, nextMatchupIdx, null);
  }
}

function getRegionWinner(regionId) {
  return getPick(regionId, 4, 0);
}

// ============================================================
// Rendering
// ============================================================

function renderAll() {
  const container = document.getElementById('bracket-container');
  container.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'bracket-wrapper';

  // Left side: East, West
  const leftSide = document.createElement('div');
  leftSide.className = 'bracket-side bracket-left';

  // Right side: South, Midwest
  const rightSide = document.createElement('div');
  rightSide.className = 'bracket-side bracket-right';

  // Final Four + Championship center
  const center = document.createElement('div');
  center.className = 'bracket-center';

  // Render each region
  renderRegion(TOURNAMENT_DATA.regions[0], leftSide, 'left');   // East
  renderRegion(TOURNAMENT_DATA.regions[1], leftSide, 'left');   // West
  renderRegion(TOURNAMENT_DATA.regions[2], rightSide, 'right'); // South
  renderRegion(TOURNAMENT_DATA.regions[3], rightSide, 'right'); // Midwest

  // Final Four
  renderFinalFour(center);

  wrapper.appendChild(leftSide);
  wrapper.appendChild(center);
  wrapper.appendChild(rightSide);
  container.appendChild(wrapper);
}

function renderRegion(region, parent, side) {
  const regionEl = document.createElement('div');
  regionEl.className = `region region-${side}`;
  regionEl.dataset.regionId = region.id;

  const regionHeader = document.createElement('div');
  regionHeader.className = 'region-header';
  regionHeader.innerHTML = `
    <span class="region-name" style="color:${region.color}">${region.name}</span>
    <span class="region-label">Regional</span>
  `;
  regionEl.appendChild(regionHeader);

  const rounds = document.createElement('div');
  rounds.className = 'rounds-container';

  const numRounds = 4; // Round of 64, 32, 16, 8 (Elite Eight)
  for (let r = 1; r <= numRounds; r++) {
    const roundEl = document.createElement('div');
    roundEl.className = `round round-${r}`;
    roundEl.dataset.round = r;

    const numMatchups = Math.pow(2, numRounds - r);
    for (let m = 0; m < numMatchups; m++) {
      renderMatchup(region, r, m, roundEl, side);
    }

    rounds.appendChild(roundEl);
  }

  regionEl.appendChild(rounds);
  parent.appendChild(regionEl);
}

function renderMatchup(region, round, matchupIdx, parent, side) {
  const matchupEl = document.createElement('div');
  matchupEl.className = 'matchup';

  let teamA, teamB;

  if (round === 1) {
    const [idxA, idxB] = ROUND1_MATCHUPS[matchupIdx];
    teamA = region.teams[idxA];
    teamB = region.teams[idxB];
  } else {
    // Get winners from previous round
    const prevMatchA = matchupIdx * 2;
    const prevMatchB = matchupIdx * 2 + 1;
    const nameA = getPick(region.id, round - 1, prevMatchA);
    const nameB = getPick(region.id, round - 1, prevMatchB);

    teamA = nameA ? region.teams.find(t => t.name === nameA) || { name: nameA, seed: '?', abbr: '?' } : null;
    teamB = nameB ? region.teams.find(t => t.name === nameB) || { name: nameB, seed: '?', abbr: '?' } : null;
  }

  const currentPick = getPick(region.id, round, matchupIdx);
  const probA = (teamA && teamB) ? getWinProb(teamA.seed, teamB.seed) : 0.5;
  const probB = 1 - probA;

  matchupEl.innerHTML = buildTeamSlot(teamA, currentPick, probA, region.color, true) +
    '<div class="matchup-vs">VS</div>' +
    buildTeamSlot(teamB, currentPick, probB, region.color, false);

  // Click handlers
  const slots = matchupEl.querySelectorAll('.team-slot.clickable');
  slots.forEach(slot => {
    const teamName = slot.dataset.team;
    slot.addEventListener('click', () => {
      if (!teamName || teamName === '?') return;
      setPick(region.id, round, matchupIdx, teamName);
      showToast(`${teamName} advances!`);
    });

    slot.addEventListener('mouseenter', (e) => {
      if (teamA && teamB) {
        showTooltip(e, teamA, teamB, probA, probB, region);
      }
    });
    slot.addEventListener('mouseleave', hideTooltip);
  });

  parent.appendChild(matchupEl);
}

function buildTeamSlot(team, currentPick, prob, regionColor, isTop) {
  if (!team) {
    return `<div class="team-slot empty"><span class="team-tbd">TBD</span></div>`;
  }

  const isWinner = currentPick === team.name;
  const isLoser = currentPick && currentPick !== team.name;
  const upsetRisk = team.seed >= 5;
  const probPct = Math.round(prob * 100);

  const classes = ['team-slot', 'clickable',
    isWinner ? 'winner' : '',
    isLoser ? 'loser' : '',
  ].filter(Boolean).join(' ');

  return `
    <div class="${classes}" data-team="${team.name}" data-seed="${team.seed}">
      <span class="team-seed" style="${isWinner ? `background:${regionColor};color:#000` : ''}">${team.seed}</span>
      <span class="team-name">${team.name}</span>
      <span class="team-prob ${probPct >= 70 ? 'prob-high' : probPct <= 35 ? 'prob-low' : ''}">${probPct}%</span>
      ${isWinner ? '<span class="winner-check">✓</span>' : ''}
    </div>
  `;
}

function renderFinalFour(center) {
  // Collect region winners
  const eastWinner = getRegionWinner('east');
  const westWinner = getRegionWinner('west');
  const southWinner = getRegionWinner('south');
  const midwestWinner = getRegionWinner('midwest');

  // Final Four matchups: East vs West, South vs Midwest
  center.innerHTML = `
    <div class="final-four">
      <div class="ff-header">
        <div class="ff-title">FINAL FOUR</div>
        <div class="ff-subtitle">Indianapolis • April 5</div>
      </div>

      <div class="ff-matchup-container">
        <div class="ff-bracket">
          ${buildFFSlot(eastWinner, 'East', 0)}
          <div class="ff-connector"></div>
          ${buildFFSlot(westWinner, 'West', 1)}
        </div>

        <div class="championship-box">
          <div class="champ-label">NATIONAL<br/>CHAMPIONSHIP</div>
          <div class="champ-date">April 7, Indianapolis</div>
          ${buildChampionshipArea()}
        </div>

        <div class="ff-bracket ff-bracket-right">
          ${buildFFSlot(southWinner, 'South', 2)}
          <div class="ff-connector"></div>
          ${buildFFSlot(midwestWinner, 'Midwest', 3)}
        </div>
      </div>
    </div>
  `;

  // Final Four click handlers
  setupFFHandlers(center, eastWinner, westWinner, southWinner, midwestWinner);
}

function buildFFSlot(teamName, regionName, idx) {
  const isFF1Pick = state.finalFour[0] && (state.finalFour[0] === teamName);
  const isFF2Pick = state.finalFour[1] && (state.finalFour[1] === teamName);
  const isChampPick = state.champion === teamName;

  const classes = ['ff-slot', teamName ? 'clickable-ff' : 'empty-ff',
    isChampPick ? 'champ-pick' : ''
  ].filter(Boolean).join(' ');

  return `
    <div class="${classes}" data-team="${teamName || ''}" data-region="${regionName}" data-idx="${idx}">
      <span class="ff-region-tag">${regionName}</span>
      <span class="ff-team-name">${teamName || '?'}</span>
    </div>
  `;
}

function buildChampionshipArea() {
  // Determine the championship matchup
  const finalist1 = state.championship[0] || null;
  const finalist2 = state.championship[1] || null;

  if (!finalist1 && !finalist2) {
    if (!state.champion) {
      return `<div class="champ-tbd">Fill in your bracket to<br/>crown a champion!</div>`;
    }
  }

  let html = '';

  if (finalist1 || finalist2) {
    html += `
      <div class="champ-matchup">
        ${buildChampSlot(finalist1, 0)}
        <span class="champ-vs">VS</span>
        ${buildChampSlot(finalist2, 1)}
      </div>
    `;
  }

  if (state.champion) {
    html += `
      <div class="champion-reveal">
        <div class="trophy">🏆</div>
        <div class="champ-team">${state.champion}</div>
        <div class="champ-sub">Your Champion</div>
      </div>
    `;
  }

  return html;
}

function buildChampSlot(teamName, idx) {
  const isChamp = state.champion === teamName;
  return `
    <div class="champ-slot ${teamName ? 'clickable-champ' : 'empty-champ'} ${isChamp ? 'is-champ' : ''}"
         data-team="${teamName || ''}" data-champ-idx="${idx}">
      ${teamName || '?'}
    </div>
  `;
}

function setupFFHandlers(center, eastW, westW, southW, midwestW) {
  const regionWinners = [eastW, westW, southW, midwestW];

  // FF Slot 1: East vs West winner
  const ffSlots = center.querySelectorAll('.clickable-ff');
  ffSlots.forEach(slot => {
    const teamName = slot.dataset.team;
    const idx = parseInt(slot.dataset.idx);

    slot.addEventListener('click', () => {
      if (!teamName) return;
      // Determine which championship game slot (left vs right)
      if (idx <= 1) {
        state.championship[0] = teamName;
        if (state.champion && state.champion !== teamName && state.champion !== state.championship[1]) {
          state.champion = null;
        }
      } else {
        state.championship[1] = teamName;
        if (state.champion && state.champion !== teamName && state.champion !== state.championship[0]) {
          state.champion = null;
        }
      }
      saveState();
      renderAll();
      updateStats();
      showToast(`${teamName} to the Championship!`);
    });
  });

  // Championship slots
  const champSlots = center.querySelectorAll('.clickable-champ');
  champSlots.forEach(slot => {
    const teamName = slot.dataset.team;
    slot.addEventListener('click', () => {
      if (!teamName) return;
      state.champion = teamName;
      saveState();
      renderAll();
      updateStats();
      showToast(`🏆 ${teamName} wins it all!`);
    });
  });
}

// ============================================================
// Stats
// ============================================================

function updateStats() {
  const totalPicks = Object.keys(state.picks).length +
    state.finalFour.filter(Boolean).length +
    state.championship.filter(Boolean).length +
    (state.champion ? 1 : 0);

  const totalGames = 63;
  const picksEl = document.getElementById('stat-picks');
  const remainingEl = document.getElementById('stat-remaining');
  const upsetEl = document.getElementById('stat-upsets');
  const champEl = document.getElementById('stat-champion');

  if (picksEl) picksEl.textContent = Math.min(totalPicks, totalGames);
  if (remainingEl) remainingEl.textContent = Math.max(totalGames - totalPicks, 0);

  // Count upsets
  let upsets = 0;
  TOURNAMENT_DATA.regions.forEach(region => {
    if (!region || !region.teams) return;
    ROUND1_MATCHUPS.forEach(([idxA, idxB], mIdx) => {
      const pick = getPick(region.id, 1, mIdx);
      if (!pick) return;
      const teamA = region.teams[idxA];
      const teamB = region.teams[idxB];
      if (!teamA || !teamB) return;
      const higherSeed = teamA.seed < teamB.seed ? teamA : teamB;
      if (pick !== higherSeed.name) upsets++;
    });
  });
  if (upsetEl) upsetEl.textContent = upsets;
  if (champEl) champEl.textContent = state.champion || '—';
}

// ============================================================
// Tooltip
// ============================================================

function showTooltip(e, teamA, teamB, probA, probB, region) {
  const tooltip = document.getElementById('tooltip');
  const rec = getRecommendation(teamA, teamB);

  // Star rating (1-5) based on score
  function stars(score) {
    const filled = Math.round(score / 20);
    return '★'.repeat(filled) + '☆'.repeat(5 - filled);
  }

  function statBar(val, max, color) {
    const pct = Math.round((val / max) * 100);
    return `<div class="stat-bar-wrap"><div class="stat-bar-fill" style="width:${pct}%;background:${color}"></div></div>`;
  }

  tooltip.innerHTML = `
    <div class="tooltip-inner">

      <div class="tooltip-rec-header">
        <span class="rec-label">📊 PICK RECOMMENDATION</span>
        <span class="rec-confidence" style="color:${rec.confidenceColor}">
          ${rec.confidenceLabel} CONFIDENCE
        </span>
      </div>

      <div class="tooltip-pick-banner" style="border-color:${rec.confidenceColor}">
        <span class="pick-arrow">▶</span>
        <span class="pick-team">${rec.pick.name}</span>
        <span class="pick-seed">#${rec.pick.seed}</span>
        <span class="pick-score" style="color:${rec.confidenceColor}">${rec.pickScore}/100</span>
      </div>

      ${rec.upsetAlert ? `
        <div class="upset-alert">
          ⚠️ UPSET ALERT — History favors a surprise here
        </div>` : ''}

      <div class="tooltip-matchup-title">
        ${teamA.name} <span style="color:var(--text-muted)">vs</span> ${teamB.name}
      </div>

      <div class="tooltip-teams-grid">

        <div class="tooltip-team-col ${rec.pick.name === teamA.name ? 'rec-team' : ''}">
          <div class="ttc-header">
            <span class="ttc-seed">#${teamA.seed}</span>
            <span class="ttc-name">${teamA.name}</span>
            ${rec.pick.name === teamA.name ? `<span class="ttc-rec-badge" style="color:${rec.confidenceColor}">✓ PICK</span>` : ''}
          </div>
          <div class="ttc-score-row">
            <span class="ttc-score-num">${rec.teamA.score}</span>
            <span class="ttc-score-lbl">/100</span>
            <span class="ttc-stars">${stars(rec.teamA.score)}</span>
          </div>
          <div class="ttc-stats">
            <div class="ttc-stat">
              <span class="ttcs-lbl">Win prob</span>
              <span class="ttcs-val">${Math.round(probA * 100)}%</span>
              ${statBar(probA, 1, region.color)}
            </div>
            <div class="ttc-stat">
              <span class="ttcs-lbl">R1 rate '08-25</span>
              <span class="ttcs-val">${rec.teamA.hist.r1Record}</span>
              ${statBar(rec.teamA.hist.r1WinPct, 1, region.color)}
            </div>
            <div class="ttc-stat">
              <span class="ttcs-lbl">Final Four %</span>
              <span class="ttcs-val">${Math.round(rec.teamA.hist.finalFourPct * 100)}%</span>
              ${statBar(rec.teamA.hist.finalFourPct, 0.6, region.color)}
            </div>
            <div class="ttc-stat">
              <span class="ttcs-lbl">Avg exit</span>
              <span class="ttcs-val">${getAvgRoundName(teamA.seed)}</span>
            </div>
            <div class="ttc-stat">
              <span class="ttcs-lbl">Cinderella 🎯</span>
              <span class="ttcs-val cinderella">${rec.teamA.hist.cinderellaScore}/100</span>
              ${statBar(rec.teamA.hist.cinderellaScore, 100, '#a78bfa')}
            </div>
          </div>
        </div>

        <div class="tooltip-divider"></div>

        <div class="tooltip-team-col ${rec.pick.name === teamB.name ? 'rec-team' : ''}">
          <div class="ttc-header">
            <span class="ttc-seed">#${teamB.seed}</span>
            <span class="ttc-name">${teamB.name}</span>
            ${rec.pick.name === teamB.name ? `<span class="ttc-rec-badge" style="color:${rec.confidenceColor}">✓ PICK</span>` : ''}
          </div>
          <div class="ttc-score-row">
            <span class="ttc-score-num">${rec.teamB.score}</span>
            <span class="ttc-score-lbl">/100</span>
            <span class="ttc-stars">${stars(rec.teamB.score)}</span>
          </div>
          <div class="ttc-stats">
            <div class="ttc-stat">
              <span class="ttcs-lbl">Win prob</span>
              <span class="ttcs-val">${Math.round(probB * 100)}%</span>
              ${statBar(probB, 1, '#4ECDC4')}
            </div>
            <div class="ttc-stat">
              <span class="ttcs-lbl">R1 rate '08-25</span>
              <span class="ttcs-val">${rec.teamB.hist.r1Record}</span>
              ${statBar(rec.teamB.hist.r1WinPct, 1, '#4ECDC4')}
            </div>
            <div class="ttc-stat">
              <span class="ttcs-lbl">Final Four %</span>
              <span class="ttcs-val">${Math.round(rec.teamB.hist.finalFourPct * 100)}%</span>
              ${statBar(rec.teamB.hist.finalFourPct, 0.6, '#4ECDC4')}
            </div>
            <div class="ttc-stat">
              <span class="ttcs-lbl">Avg exit</span>
              <span class="ttcs-val">${getAvgRoundName(teamB.seed)}</span>
            </div>
            <div class="ttc-stat">
              <span class="ttcs-lbl">Cinderella 🎯</span>
              <span class="ttcs-val cinderella">${rec.teamB.hist.cinderellaScore}/100</span>
              ${statBar(rec.teamB.hist.cinderellaScore, 100, '#a78bfa')}
            </div>
          </div>
        </div>

      </div>

      <div class="tooltip-footnote">
        ${rec.pick.name === teamA.name ? rec.teamA.hist.deepRunNote : rec.teamB.hist.deepRunNote}
      </div>

    </div>
  `;

  tooltip.style.display = 'block';
  positionTooltip(e, tooltip);
}

function positionTooltip(e, tooltip) {
  const w = tooltip.offsetWidth || 480;
  const h = tooltip.offsetHeight || 320;
  let x = e.clientX + 18;
  let y = e.clientY - 20;
  if (x + w > window.innerWidth - 12) x = e.clientX - w - 12;
  if (y + h > window.innerHeight - 12) y = window.innerHeight - h - 12;
  tooltip.style.left = `${Math.max(8, x)}px`;
  tooltip.style.top = `${Math.max(8, y)}px`;
}

function hideTooltip() {
  document.getElementById('tooltip').style.display = 'none';
}

// ============================================================
// Toast
// ============================================================

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

// ============================================================
// Persistence
// ============================================================

function saveState() {
  try {
    localStorage.setItem('mm2025-state', JSON.stringify(state));
  } catch(e) {}
}

function loadState() {
  try {
    const saved = localStorage.getItem('mm2025-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      state = { ...state, ...parsed };
    }
  } catch(e) {}
}

// ============================================================
// Auto-Fill
// ============================================================

function autoFillBySeed() {
  TOURNAMENT_DATA.regions.forEach(region => {
    if (!region || !region.teams) return;
    // Round 1
    ROUND1_MATCHUPS.forEach(([idxA, idxB], mIdx) => {
      const teamA = region.teams[idxA];
      const teamB = region.teams[idxB];
      if (!teamA || !teamB) return;
      const winner = teamA.seed < teamB.seed ? teamA : teamB;
      state.picks[getMatchupKey(region.id, 1, mIdx)] = winner.name;
    });

    // Rounds 2–4
    for (let r = 2; r <= 4; r++) {
      const numMatchups = Math.pow(2, 4 - r);
      for (let m = 0; m < numMatchups; m++) {
        const nameA = getPick(region.id, r - 1, m * 2);
        const nameB = getPick(region.id, r - 1, m * 2 + 1);
        if (!nameA || !nameB) continue;
        const teamA = region.teams.find(t => t.name === nameA);
        const teamB = region.teams.find(t => t.name === nameB);
        if (!teamA || !teamB) continue;
        const winner = teamA.seed < teamB.seed ? teamA : teamB;
        state.picks[getMatchupKey(region.id, r, m)] = winner.name;
      }
    }
  });

  // Final Four
  state.championship[0] = getRegionWinner('east');
  state.championship[1] = getRegionWinner('south');

  // Championship — pick lowest seed
  const finalist1Teams = TOURNAMENT_DATA.regions[0].teams.find(t => t.name === state.championship[0]);
  const finalist2Teams = TOURNAMENT_DATA.regions[2].teams.find(t => t.name === state.championship[1]);
  if (finalist1Teams && finalist2Teams) {
    state.champion = finalist1Teams.seed < finalist2Teams.seed
      ? finalist1Teams.name : finalist2Teams.name;
  } else {
    state.champion = state.championship[0] || state.championship[1];
  }

  saveState();
  renderAll();
  updateStats();
  showToast('⚡ Bracket filled by seed! Best of luck!');
}

function resetBracket() {
  state = { picks: {}, finalFour: [null, null, null, null], championship: [null, null], champion: null };
  saveState();
  renderAll();
  updateStats();
  showToast('Bracket reset. Start fresh!');
}

// ============================================================
// Share
// ============================================================

function shareBracket() {
  const encoded = btoa(JSON.stringify(state));
  const url = `${window.location.href.split('?')[0]}?b=${encoded}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => showToast('🔗 Link copied to clipboard!'));
  } else {
    prompt('Copy your bracket link:', url);
  }
}

function loadFromURL() {
  const params = new URLSearchParams(window.location.search);
  const b = params.get('b');
  if (b) {
    try {
      state = { ...state, ...JSON.parse(atob(b)) };
    } catch(e) {}
  }
}

// ============================================================
// Init
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  loadFromURL();
  loadState();
  renderAll();
  updateStats();

  document.getElementById('btn-reset').addEventListener('click', resetBracket);
  document.getElementById('btn-autofill').addEventListener('click', autoFillBySeed);
  document.getElementById('btn-share').addEventListener('click', shareBracket);

  // Update tooltip position on mousemove
  document.addEventListener('mousemove', (e) => {
    const tooltip = document.getElementById('tooltip');
    if (tooltip.style.display !== 'none') {
      positionTooltip(e, tooltip);
    }
  });
});

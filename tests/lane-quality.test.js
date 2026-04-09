/**
 * Lane Quality Tests
 *
 * Focused tests for the lane prompt hardening pass.
 * These validate prompt structure, content integrity, and
 * cross-lane differentiation — NOT model output quality
 * (that requires the full benchmark).
 *
 * Test categories:
 *   1. Hedge suppression: shared rules ban known hedge phrases
 *   2. Repair completeness: all 5 beats present in contract
 *   3. High-risk directness: safety-first ordering enforced
 *   4. Emotional vs normal differentiation: distinct voice anchors
 *   5. Anti-pattern coverage: each lane has anti-examples
 *   6. Prompt assembly: full prompts compose correctly
 *
 * Run: node tests/lane-quality.test.js
 */

const {
  getLanePrompt,
  getLaneContract,
  getSharedRules,
  getAntiPatterns,
  LANE_NAMES,
} = require('../prompts');

let passed = 0;
let failed = 0;
const failures = [];

function assert(condition, testName) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${testName}`);
  } else {
    failed++;
    failures.push(testName);
    console.log(`  ✗ ${testName}`);
  }
}

// ─── 1. SHARED RULES: HEDGE SUPPRESSION ─────────────────────────

console.log('\n── Hedge Suppression ──');

const sharedRules = getSharedRules();

const BANNED_HEDGES = [
  'i guess',
  'kind of',
  'sort of',
  'i\'m not sure',
  'if that makes sense',
  'or something',
  'or whatever',
];

// Verify all banned hedges are listed in shared rules
for (const hedge of BANNED_HEDGES) {
  assert(
    sharedRules.toLowerCase().includes(hedge),
    `Shared rules ban "${hedge}"`
  );
}

// Verify warmth ≠ intimacy principle
assert(
  sharedRules.includes('warmth ≠ intimacy') || sharedRules.includes('warmth != intimacy'),
  'Shared rules include warmth ≠ intimacy principle'
);

// Verify anti-drift rules exist
assert(
  sharedRules.toLowerCase().includes('anti-drift'),
  'Shared rules include anti-drift section'
);

// Verify confidence rules exist
assert(
  sharedRules.toLowerCase().includes('confidence'),
  'Shared rules include confidence section'
);

// ─── 2. REPAIR LANE: MANDATORY BEAT STRUCTURE ───────────────────

console.log('\n── Repair Completeness ──');

const repairContract = getLaneContract('repair');

const REPAIR_BEATS = [
  { label: 'Beat 1 — Acknowledge rupture', pattern: /beat 1/i },
  { label: 'Beat 2 — Name impact', pattern: /beat 2/i },
  { label: 'Beat 3 — Take responsibility', pattern: /beat 3/i },
  { label: 'Beat 4 — Emotional bridge', pattern: /beat 4/i },
  { label: 'Beat 5 — Concrete reconnection', pattern: /beat 5/i },
];

for (const beat of REPAIR_BEATS) {
  assert(
    beat.pattern.test(repairContract),
    `Repair contract contains ${beat.label}`
  );
}

// Verify completion check exists
assert(
  repairContract.toLowerCase().includes('completion check'),
  'Repair contract includes completion self-check'
);

// Verify anti-hedging in repair
assert(
  repairContract.toLowerCase().includes('hedg'),
  'Repair contract warns against hedged accountability'
);

// Verify vague acknowledgment banned
assert(
  repairContract.toLowerCase().includes('vague'),
  'Repair contract bans vague acknowledgment'
);

// ─── 3. HIGH-RISK: DIRECTNESS & SAFETY-FIRST ───────────────────

console.log('\n── High-Risk Directness ──');

const highRiskContract = getLaneContract('high_risk');

// Safety-first ordering
assert(
  highRiskContract.includes('Safety clarity first'),
  'High-risk enforces safety-clarity-first ordering'
);

assert(
  highRiskContract.includes('Relational warmth second'),
  'High-risk explicitly deprioritizes warmth below safety'
);

// Specific resources required
assert(
  highRiskContract.includes('988'),
  'High-risk references specific crisis hotline (988)'
);

assert(
  highRiskContract.includes('741741'),
  'High-risk references Crisis Text Line (741741)'
);

// Casual tone banned
assert(
  highRiskContract.toLowerCase().includes('casual tone'),
  'High-risk bans casual tone'
);

// Seriousness check
assert(
  highRiskContract.toLowerCase().includes('seriousness check'),
  'High-risk includes seriousness self-check'
);

// Companion flavor reduction
assert(
  highRiskContract.toLowerCase().includes('companion flavor reduced'),
  'High-risk reduces companion flavor'
);

// ─── 4. EMOTIONAL VS NORMAL DIFFERENTIATION ─────────────────────

console.log('\n── Emotional vs Normal Differentiation ──');

const normalContract = getLaneContract('normal');
const emotionalContract = getLaneContract('emotional');

// Emotional must be explicitly distinct from normal
assert(
  emotionalContract.toLowerCase().includes('distinct from normal'),
  'Emotional contract explicitly requires distinction from normal'
);

// Emotional must have slower pacing
assert(
  emotionalContract.toLowerCase().includes('slower'),
  'Emotional contract mandates slower pacing'
);

// Normal must be forward-moving
assert(
  normalContract.toLowerCase().includes('forward-moving'),
  'Normal contract mandates forward-moving energy'
);

// Different voice anchors
assert(
  normalContract.includes('Grounded companion presence'),
  'Normal has grounded companion voice anchor'
);

assert(
  emotionalContract.includes('Gentle. Present. Emotionally attuned'),
  'Emotional has gentle/attuned voice anchor'
);

// Emotional has differentiation table or criteria
assert(
  emotionalContract.toLowerCase().includes('differentiation'),
  'Emotional contract includes explicit differentiation criteria'
);

// Emotional requires naming emotion first
assert(
  emotionalContract.toLowerCase().includes('name') &&
  emotionalContract.toLowerCase().includes('emotion'),
  'Emotional contract requires naming emotion before content'
);

// Normal bans therapy tone
assert(
  normalContract.toLowerCase().includes('therapy tone'),
  'Normal contract bans therapy tone'
);

// ─── 5. ANTI-PATTERN COVERAGE ───────────────────────────────────

console.log('\n── Anti-Pattern Coverage ──');

for (const lane of LANE_NAMES) {
  const patterns = getAntiPatterns(lane);
  assert(
    patterns.length > 0,
    `Anti-patterns exist for ${lane} lane`
  );

  // Each lane should have at least 2 anti-patterns
  const antiPatternCount = (patterns.match(/ANTI-PATTERN \d/g) || []).length;
  assert(
    antiPatternCount >= 2,
    `${lane} lane has ≥2 anti-pattern examples (found ${antiPatternCount})`
  );

  // Each anti-pattern should have WHY IT'S WRONG
  const explanationCount = (patterns.match(/WHY IT'S WRONG/g) || []).length;
  assert(
    explanationCount >= 2,
    `${lane} lane anti-patterns include explanations (found ${explanationCount})`
  );

  // Each anti-pattern should have CORRECT APPROACH
  const correctCount = (patterns.match(/CORRECT APPROACH/g) || []).length;
  assert(
    correctCount >= 1,
    `${lane} lane anti-patterns include correct approach (found ${correctCount})`
  );
}

// ─── 6. PROMPT ASSEMBLY ─────────────────────────────────────────

console.log('\n── Prompt Assembly ──');

for (const lane of LANE_NAMES) {
  const fullPrompt = getLanePrompt(lane);

  // Full prompt should contain shared rules
  assert(
    fullPrompt.includes('LANGUAGE DISCIPLINE'),
    `${lane} full prompt includes shared rules`
  );

  // Full prompt should contain lane contract
  assert(
    fullPrompt.includes(`LANE: ${lane.replace('_', '-').toUpperCase()}`),
    `${lane} full prompt includes lane contract`
  );

  // Full prompt should contain anti-patterns
  assert(
    fullPrompt.includes('ANTI-PATTERN'),
    `${lane} full prompt includes anti-patterns`
  );

  // Full prompt should be non-trivial length
  assert(
    fullPrompt.length > 1000,
    `${lane} full prompt has substantial content (${fullPrompt.length} chars)`
  );
}

// Invalid lane should throw
let threwOnInvalid = false;
try {
  getLanePrompt('nonexistent');
} catch (e) {
  threwOnInvalid = true;
}
assert(threwOnInvalid, 'getLanePrompt throws on invalid lane name');

// ─── 7. CROSS-LANE CONSISTENCY ──────────────────────────────────

console.log('\n── Cross-Lane Consistency ──');

// All lanes should have MUST BE and MUST NOT sections
for (const lane of LANE_NAMES) {
  const contract = getLaneContract(lane);
  assert(
    contract.includes('YOU MUST BE') || contract.includes('MUST BE'),
    `${lane} contract has MUST BE section`
  );
  assert(
    contract.includes('YOU MUST NOT') || contract.includes('MUST NOT'),
    `${lane} contract has MUST NOT section`
  );
  assert(
    contract.toLowerCase().includes('voice anchor'),
    `${lane} contract has voice anchor`
  );
}

// ─── RESULTS ─────────────────────────────────────────────────────

console.log('\n══════════════════════════════════');
console.log(`  PASSED: ${passed}`);
console.log(`  FAILED: ${failed}`);
console.log(`  TOTAL:  ${passed + failed}`);
console.log('══════════════════════════════════');

if (failures.length > 0) {
  console.log('\nFailed tests:');
  for (const f of failures) {
    console.log(`  - ${f}`);
  }
}

process.exit(failed > 0 ? 1 : 0);

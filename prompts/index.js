/**
 * Prompt Assembly Index
 *
 * Composes full lane prompts by combining:
 *   1. Shared rules (anti-hedge, anti-drift, confidence)
 *   2. Lane-specific behavioral contract
 *   3. Lane-specific anti-pattern examples
 *
 * Usage:
 *   const { getLanePrompt, LANE_NAMES } = require('./prompts');
 *   const prompt = getLanePrompt('repair');
 */

const { SHARED_RULES } = require('./shared-rules');
const { NORMAL_LANE } = require('./lanes/normal');
const { EMOTIONAL_LANE } = require('./lanes/emotional');
const { REPAIR_LANE } = require('./lanes/repair');
const { HIGH_RISK_LANE } = require('./lanes/high-risk');
const { ANTI_PATTERNS } = require('./anti-patterns');

const LANE_NAMES = ['normal', 'emotional', 'repair', 'high_risk'];

const LANE_PROMPTS = {
  normal: NORMAL_LANE,
  emotional: EMOTIONAL_LANE,
  repair: REPAIR_LANE,
  high_risk: HIGH_RISK_LANE,
};

/**
 * Assemble the full system prompt for a given lane.
 *
 * @param {string} lane - One of: normal, emotional, repair, high_risk
 * @returns {string} The complete system prompt for this lane
 */
function getLanePrompt(lane) {
  if (!LANE_NAMES.includes(lane)) {
    throw new Error(`Unknown lane: "${lane}". Valid lanes: ${LANE_NAMES.join(', ')}`);
  }

  const sections = [
    SHARED_RULES,
    LANE_PROMPTS[lane],
    ANTI_PATTERNS[lane] || '',
  ];

  return sections.filter(Boolean).join('\n\n---\n\n');
}

/**
 * Get just the shared rules (useful for testing).
 */
function getSharedRules() {
  return SHARED_RULES;
}

/**
 * Get just the lane contract (without shared rules or anti-patterns).
 */
function getLaneContract(lane) {
  if (!LANE_NAMES.includes(lane)) {
    throw new Error(`Unknown lane: "${lane}". Valid lanes: ${LANE_NAMES.join(', ')}`);
  }
  return LANE_PROMPTS[lane];
}

/**
 * Get anti-patterns for a specific lane.
 */
function getAntiPatterns(lane) {
  if (!LANE_NAMES.includes(lane)) {
    throw new Error(`Unknown lane: "${lane}". Valid lanes: ${LANE_NAMES.join(', ')}`);
  }
  return ANTI_PATTERNS[lane] || '';
}

module.exports = {
  getLanePrompt,
  getLaneContract,
  getSharedRules,
  getAntiPatterns,
  LANE_NAMES,
  SHARED_RULES,
  LANE_PROMPTS,
  ANTI_PATTERNS,
};

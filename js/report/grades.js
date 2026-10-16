// Finnish school grades: a whole number 4–10 with an optional modifier.
export const BASES = [4, 5, 6, 7, 8, 9, 10];
export const MODIFIERS = [
  { key: "-", label: "−", delta: -0.25 },
  { key: "½", label: "½", delta: 0.5 },
  { key: "+", label: "+", delta: 0.25 },
];

const WORDS = { 4: "hylätty", 5: "välttävä", 6: "kohtalainen", 7: "tyydyttävä", 8: "hyvä", 9: "kiitettävä", 10: "erinomainen" };

// Arts and crafts subjects are left out of the lukuaineiden keskiarvo that upper secondary admission uses.
const ARTS_AND_CRAFTS = new Set(["musiikki", "kuvaamataito", "puutyot"]);

/** Whether a modifier exists for a base grade: there is no 4−, 10+ or 10½. */
export function modifierAllowed(base, modifier) {
  if (modifier === "-") return base > 4;
  return base < 10;
}

/** A grade as a number, e.g. { base: 8, modifier: "½" } → 8.5. */
export function gradeValue({ base, modifier }) {
  return base + (MODIFIERS.find((m) => m.key === modifier)?.delta ?? 0);
}

/** A grade as written on a report, e.g. "8½", "9-", "7+". */
export function gradeLabel({ base, modifier }) {
  return `${base}${modifier ?? ""}`;
}

export function gradeWord({ base }) {
  return WORDS[base];
}

/** The average of the academic subjects (no arts and crafts, no conduct), or null before any is graded. */
export function academicAverage(subjects, grades) {
  const values = subjects.filter((s) => !ARTS_AND_CRAFTS.has(s.key) && grades[s.key]).map((s) => gradeValue(grades[s.key]));
  if (values.length === 0) return null;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

/** The most selective school whose cut-off the average reaches, or null when it reaches none. */
export function bestSchool(schools, average) {
  // Compare the average as it is shown, to two decimals.
  const shown = Math.round(average * 100) / 100;
  return [...schools].sort((a, b) => b.limit - a.limit).find((s) => shown >= s.limit) ?? null;
}

/** Finnish decimal formatting, e.g. 7.666 → "7,67". */
export const formatAverage = (n) => n.toFixed(2).replace(".", ",");

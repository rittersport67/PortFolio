/**
 * @file src/utils/period.js
 * Period and duration helpers for the Experience timeline, computed from the
 * `start` / `end` month strings (YYYY-MM) of `content.js`. Labels follow the active
 * i18n language, so call these at render time (not at module load) to pick up a
 * language switch.
 * @module period
 */
import i18n from '../i18n';

/**
 * @param {number} month - 1-based.
 * @returns {string} Short month name in the active language, e.g. `'Aug'`, `'août'`.
 */
const monthName = (month) =>
  new Intl.DateTimeFormat(i18n.resolvedLanguage, { month: 'short' }).format(
    new Date(2000, month - 1, 1)
  );

/**
 * @param {string} value - Month as `YYYY-MM`.
 * @returns {{ year: number, month: number }} `month` is 1-based.
 */
const parseMonth = (value) => {
  const [year, month] = value.split('-').map(Number);
  return { year, month };
};

/**
 * @returns {string} The current month as `YYYY-MM`.
 */
const currentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

/**
 * Number of months covered, both ends included (Aug 2021 → Aug 2021 is 1 month).
 * @param {string} start - `YYYY-MM`.
 * @param {string|null} end - `YYYY-MM`, or null for an ongoing entry (counted up to now).
 * @returns {number}
 */
export const monthsBetween = (start, end) => {
  const from = parseMonth(start);
  const to = parseMonth(end || currentMonth());
  return (to.year - from.year) * 12 + (to.month - from.month) + 1;
};

/**
 * @param {number} months
 * @returns {string} e.g. `'1 yr 11 mo'`, `'3 yr'`, `'3 mo'` (`'1 an 11 mois'` in French).
 */
export const formatDuration = (months) => {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [
    years && i18n.t('ui:period.years', { count: years }),
    rest && i18n.t('ui:period.months', { count: rest })
  ]
    .filter(Boolean)
    .join(' ');
};

/**
 * Human-readable period: years only for a degree, month + year for a job.
 * @param {string} start - `YYYY-MM`.
 * @param {string|null} end - `YYYY-MM`, or null for an ongoing entry.
 * @param {boolean} [yearsOnly=false]
 * @returns {string} e.g. `'Aug 2023 – Jun 2025'`, `'Mar – Aug 2026'` (same year),
 *   `'Jul 2025 – Now'`, `'2018 – 2021'` (`'juil. 2025 – Aujourd'hui'` in French).
 */
export const formatPeriod = (start, end, yearsOnly = false) => {
  const from = parseMonth(start);
  const to = end && parseMonth(end);
  const now = i18n.t('ui:period.now');

  if (yearsOnly) return `${from.year} – ${to ? to.year : now}`;

  const label = ({ year, month }) => `${monthName(month)} ${year}`;
  if (end === start) return label(from);
  if (!to) return `${label(from)} – ${now}`;
  if (to.year === from.year) return `${monthName(from.month)} – ${label(to)}`;
  return `${label(from)} – ${label(to)}`;
};

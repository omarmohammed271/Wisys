/**
 * HR KPI calculations
 * Exports one function per KPI plus helpful input types and helpers.
 * Each function returns a number. Percent values are returned as percentages (0-100).
 *
 * Keep inputs aggregated for the chosen period (week / month / quarter / year).
 */

// ---------- Types ----------
export type Period = string // e.g. '2025-08' or 'Q2 2025'

export interface AttendanceInputs {
  presentDays: number
  totalWorkDays: number
}

export interface TurnoverInputs {
  separations: number
  beginningEmployees: number
  endingEmployees: number
}

export interface TimeToHireInputs {
  totalDaysFromRequisitionToAcceptance: number
  hires: number
}

export interface TimeToFillInputs {
  totalDaysFromPostingToAcceptance: number
  hires: number
}

export interface OfferInputs {
  offersMade: number
  offersAccepted: number
}

export interface TenureInputs {
  totalTenureDays: number
  employeesCount: number
}

export interface CostPerHireInputs {
  totalRecruitingCosts: number
  hires: number
}

export interface EngagementInputs {
  sumSurveyScores: number
  respondents: number
  maxScorePerRespondent: number
}

export interface MeetingsInputs {
  productive: number
  partiallyUseful: number
  unnecessary: number
  canceled: number
}

// ---------- Helpers ----------
export const safeDivide = (num: number, den: number, fallback = 0) =>
  den === 0 ? fallback : num / den

export const averageEmployees = (beginningEmployees: number, endingEmployees: number) =>
  (beginningEmployees + endingEmployees) / 2

// ---------- KPI Functions ----------

/**
 * Attendance Rate (%) = (presentDays / totalWorkDays) * 100
 */
export const attendanceRate = (input: AttendanceInputs): number => {
  return safeDivide(input.presentDays, input.totalWorkDays) * 100
}

/**
 * Employee Turnover Rate (%) = (separations / averageEmployees) * 100
 */
export const employeeTurnoverRate = (input: TurnoverInputs): number => {
  const avg = averageEmployees(input.beginningEmployees, input.endingEmployees)
  return safeDivide(input.separations, avg) * 100
}

/**
 * Time to Hire (days) = totalDaysFromRequisitionToAcceptance / hires
 */
export const timeToHire = (input: TimeToHireInputs): number => {
  return safeDivide(input.totalDaysFromRequisitionToAcceptance, input.hires)
}

/**
 * Time to Fill (days) = totalDaysFromPostingToAcceptance / hires
 */
export const timeToFill = (input: TimeToFillInputs): number => {
  return safeDivide(input.totalDaysFromPostingToAcceptance, input.hires)
}

/**
 * Offer Acceptance Rate (%) = (offersAccepted / offersMade) * 100
 */
export const offerAcceptanceRate = (input: OfferInputs): number => {
  return safeDivide(input.offersAccepted, input.offersMade) * 100
}

/**
 * Average Tenure (years) = (totalTenureDays / employeesCount) / 365
 */
export const averageTenureYears = (input: TenureInputs): number => {
  const avgDays = safeDivide(input.totalTenureDays, input.employeesCount)
  return avgDays / 365
}

/**
 * Cost per Hire ($) = totalRecruitingCosts / hires
 */
export const costPerHire = (input: CostPerHireInputs): number => {
  return safeDivide(input.totalRecruitingCosts, input.hires)
}

/**
 * Employee Engagement Score (%) = (averageScore / maxScorePerRespondent) * 100
 */
export const employeeEngagementScore = (input: EngagementInputs): number => {
  const avgScore = safeDivide(input.sumSurveyScores, input.respondents)
  return safeDivide(avgScore, input.maxScorePerRespondent) * 100
}

/**
 * Meetings Survivability Rate (%) = (productive / totalMeetings) * 100
 */
export const meetingsSurvivabilityRate = (input: MeetingsInputs): number => {
  const totalMeetings =
    input.productive + input.partiallyUseful + input.unnecessary + input.canceled
  return safeDivide(input.productive, totalMeetings) * 100
}

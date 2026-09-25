export const RISK_FILTER_OPTIONS = [
  { value: 'all', label: '全部等级' },
  { value: 'high', label: '高风险' },
  { value: 'medium', label: '中风险' },
  { value: 'low', label: '低风险' },
]

const RISK_BASE_SCORE = {
  high: 100,
  medium: 60,
  low: 30,
}

const WAIT_DAY_WEIGHT = 1.5
const COMPLETENESS_WEIGHT = 20

export function normalizeCompleteness(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0
}

export function taskRiskScore(task, factors) {
  const base = factors.includeRiskLevel
    ? RISK_BASE_SCORE[task.risk] ?? RISK_BASE_SCORE.low
    : 0
  const waitScore = factors.includeWaitDays
    ? (task.waitDays ?? 0) * WAIT_DAY_WEIGHT
    : 0
  const completenessScore = factors.includeCompleteness
    ? (1 - normalizeCompleteness(task.completeness)) * COMPLETENESS_WEIGHT
    : 0

  return Math.round((base + waitScore + completenessScore) * 10) / 10
}

export function compareTasksByRisk(factors) {
  return (a, b) => {
    const scoreDiff = taskRiskScore(b, factors) - taskRiskScore(a, factors)
    if (scoreDiff !== 0) return scoreDiff

    if (factors.includeWaitDays) {
      const waitDiff = (b.waitDays ?? 0) - (a.waitDays ?? 0)
      if (waitDiff !== 0) return waitDiff
    }

    if (factors.includeCompleteness) {
      const completenessDiff =
        normalizeCompleteness(a.completeness) -
        normalizeCompleteness(b.completeness)
      if (completenessDiff !== 0) return completenessDiff
    }

    const aKey = String(a.id ?? a.title)
    const bKey = String(b.id ?? b.title)
    return aKey.localeCompare(bKey, 'zh-Hans-CN')
  }
}

export function sortTasksByRisk(tasks, factors) {
  return [...tasks].sort(compareTasksByRisk(factors))
}

export function summarizeRiskLevels(tasks) {
  return tasks.reduce(
    (summary, task) => {
      summary.total += 1
      if (task.risk === 'high') summary.high += 1
      else if (task.risk === 'medium') summary.medium += 1
      else summary.low += 1
      return summary
    },
    { total: 0, high: 0, medium: 0, low: 0 },
  )
}

export function formatCompleteness(value) {
  return typeof value === 'number' && Number.isFinite(value)
    ? `${Math.round(value * 100)}%`
    : '待普查'
}

export function describeRiskOrdering(factors) {
  const parts = []
  if (factors.includeRiskLevel) {
    parts.push('风险等级（高 100 / 中 60 / 低 30 基础分）')
  }
  if (factors.includeWaitDays) {
    parts.push('等待时长（每等待 1 天 +1.5 分）')
  }
  if (factors.includeCompleteness) {
    parts.push('文献完整度（完整度每缺 1% +0.2 分）')
  }

  const tieSteps = []
  if (parts.length > 0) {
    tieSteps.push('综合风险分高者排在前面')
    if (factors.includeWaitDays) {
      tieSteps.push('同分时等待更久者优先')
    }
    if (factors.includeCompleteness) {
      tieSteps.push('再相同则完整度更低者优先，缺失完整度一律按 0% 参与排序')
    }
    tieSteps.push('仍相同按任务编号升序，保证每次顺序稳定')
  } else {
    tieSteps.push('未启用任何排序因子，按任务编号升序，保证每次顺序稳定')
  }

  const formula = parts.length > 0
    ? `排序因子：${parts.join(' + ')}`
    : '排序因子：无'

  return `${formula}。${tieSteps.join('；')}。`
}

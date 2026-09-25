import { computed, reactive, watch } from 'vue'

import { restorationTasks } from '../data/restorationData'

// 维度按固定顺序参与组合打分，取消后再勾选仍回到该顺序，保证风险顺序可预期。
export const RISK_FACTORS = ['risk', 'waitDays', 'completeness']

const RISK_RANK = { high: 2, medium: 1, low: 0 }
const RISK_SCORE = { high: 1, medium: 0.5, low: 0 }
const STORAGE_KEY = 'restoration-task-risk-criteria'
const FALLBACK_COMPLETENESS = 0.5

function defaultCriteria() {
  return {
    factors: [...RISK_FACTORS],
    riskFilter: 'all',
    keyword: '',
  }
}

function loadCriteria() {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return defaultCriteria()
    }

    const saved = JSON.parse(raw)
    return {
      factors: Array.isArray(saved.factors)
        ? RISK_FACTORS.filter((factor) => saved.factors.includes(factor))
        : defaultCriteria().factors,
      riskFilter: ['all', 'high', 'medium', 'low'].includes(saved.riskFilter)
        ? saved.riskFilter
        : 'all',
      keyword: typeof saved.keyword === 'string' ? saved.keyword : '',
    }
  } catch {
    return defaultCriteria()
  }
}

// 模块级单例：修复总览与任务清单共享同一份查看条件、顺序与统计。
const criteria = reactive(loadCriteria())

watch(
  criteria,
  (value) => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    } catch {
      // 会话存储不可用时仅在本次浏览内记忆，不影响排序功能。
    }
  },
  { deep: true },
)

const maxWaitDays = computed(() =>
  Math.max(...restorationTasks.map((task) => task.waitDays), 1),
)

// 完整度缺档按 50% 基准计入：既不抬高也不压低风险，缺档任务之间再由编号决胜。
function completenessValue(task) {
  return task.completeness ?? FALLBACK_COMPLETENESS
}

function factorScore(task, factor) {
  if (factor === 'risk') {
    return RISK_SCORE[task.risk] ?? 0
  }
  if (factor === 'waitDays') {
    return task.waitDays / maxWaitDays.value
  }
  return 1 - completenessValue(task)
}

function compositeScore(task) {
  if (criteria.factors.length === 0) {
    return 0
  }

  const total = criteria.factors.reduce(
    (sum, factor) => sum + factorScore(task, factor),
    0,
  )
  return total / criteria.factors.length
}

const filteredTasks = computed(() => {
  const keyword = criteria.keyword.trim().toLowerCase()

  return restorationTasks.filter((task) => {
    if (criteria.riskFilter !== 'all' && task.risk !== criteria.riskFilter) {
      return false
    }

    if (!keyword) {
      return true
    }

    return [task.title, task.stage, task.owner, task.note]
      .join(' ')
      .toLowerCase()
      .includes(keyword)
  })
})

// 稳定决胜链：综合分相同时，依次按风险等级 → 等待时长 → 完整度（低者优先，
// 缺档按 50%）→ 任务编号升序。末位编号决胜保证任何同分组合顺序都确定、可复现。
function compareByRisk(a, b) {
  return (
    RISK_RANK[b.risk] - RISK_RANK[a.risk] ||
    b.waitDays - a.waitDays ||
    completenessValue(a) - completenessValue(b) ||
    a.id.localeCompare(b.id)
  )
}

const rankedTasks = computed(() =>
  filteredTasks.value
    .map((task) => ({
      ...task,
      riskScore: compositeScore(task),
    }))
    .sort(
      (a, b) =>
        b.riskScore - a.riskScore || compareByRisk(a, b),
    ),
)

const riskStats = computed(() => {
  const stats = { total: rankedTasks.value.length, high: 0, medium: 0, low: 0 }
  rankedTasks.value.forEach((task) => {
    stats[task.risk] += 1
  })
  return stats
})

const missingCompletenessCount = computed(
  () => rankedTasks.value.filter((task) => task.completeness === null).length,
)

function toggleFactor(factor) {
  const index = criteria.factors.indexOf(factor)
  if (index >= 0) {
    criteria.factors.splice(index, 1)
  } else {
    // 按固定维度顺序插回，而不是追加到末尾。
    criteria.factors = [...criteria.factors, factor].sort(
      (a, b) => RISK_FACTORS.indexOf(a) - RISK_FACTORS.indexOf(b),
    )
  }
}

function resetCriteria() {
  Object.assign(criteria, defaultCriteria())
}

export function useTaskRiskBoard() {
  return {
    criteria,
    rankedTasks,
    riskStats,
    missingCompletenessCount,
    toggleFactor,
    resetCriteria,
  }
}

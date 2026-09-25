import { computed, reactive, watch } from 'vue'

import { restorationTasks } from '../data/restorationData'
import {
  describeRiskOrdering,
  sortTasksByRisk,
  summarizeRiskLevels,
} from '../utils/taskRiskOrdering'

const STORAGE_KEY = 'conservation-desk.task-risk-board'

const DEFAULT_STATE = {
  riskLevel: 'all',
  includeRiskLevel: true,
  includeWaitDays: true,
  includeCompleteness: true,
  keyword: '',
}

const RISK_LEVELS = ['all', 'high', 'medium', 'low']

function loadState() {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_STATE }

    const saved = JSON.parse(raw)
    return {
      riskLevel: RISK_LEVELS.includes(saved.riskLevel)
        ? saved.riskLevel
        : DEFAULT_STATE.riskLevel,
      includeRiskLevel:
        typeof saved.includeRiskLevel === 'boolean'
          ? saved.includeRiskLevel
          : DEFAULT_STATE.includeRiskLevel,
      includeWaitDays:
        typeof saved.includeWaitDays === 'boolean'
          ? saved.includeWaitDays
          : DEFAULT_STATE.includeWaitDays,
      includeCompleteness:
        typeof saved.includeCompleteness === 'boolean'
          ? saved.includeCompleteness
          : DEFAULT_STATE.includeCompleteness,
      keyword:
        typeof saved.keyword === 'string'
          ? saved.keyword
          : DEFAULT_STATE.keyword,
    }
  } catch {
    return { ...DEFAULT_STATE }
  }
}

// 模块级单例：修复总览与任务清单共用同一份查看条件和排序结果，
// 路由切换不会重新初始化；同时写入 sessionStorage 记住本次会话。
const state = reactive(loadState())

watch(state, (value) => {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  } catch {
    // 隐私模式等场景下写入失败时忽略，内存中的查看条件仍然生效
  }
})

export function useTaskRiskBoard() {
  const factors = computed(() => ({
    includeRiskLevel: state.includeRiskLevel,
    includeWaitDays: state.includeWaitDays,
    includeCompleteness: state.includeCompleteness,
  }))

  const sortedTasks = computed(() =>
    sortTasksByRisk(restorationTasks, factors.value),
  )

  const visibleTasks = computed(() => {
    const keyword = state.keyword.trim().toLowerCase()

    return sortedTasks.value.filter((task) => {
      if (state.riskLevel !== 'all' && task.risk !== state.riskLevel) {
        return false
      }
      if (!keyword) return true

      return [task.title, task.stage, task.owner, task.note]
        .join(' ')
        .toLowerCase()
        .includes(keyword)
    })
  })

  const fullStats = computed(() => summarizeRiskLevels(sortedTasks.value))
  const visibleStats = computed(() => summarizeRiskLevels(visibleTasks.value))
  const orderingDescription = computed(() =>
    describeRiskOrdering(factors.value),
  )

  const hasActiveFilters = computed(
    () =>
      state.riskLevel !== DEFAULT_STATE.riskLevel ||
      state.keyword.trim() !== '' ||
      state.includeRiskLevel !== DEFAULT_STATE.includeRiskLevel ||
      state.includeWaitDays !== DEFAULT_STATE.includeWaitDays ||
      state.includeCompleteness !== DEFAULT_STATE.includeCompleteness,
  )

  function resetView() {
    Object.assign(state, DEFAULT_STATE)
  }

  return {
    state,
    factors,
    sortedTasks,
    visibleTasks,
    fullStats,
    visibleStats,
    orderingDescription,
    hasActiveFilters,
    resetView,
  }
}

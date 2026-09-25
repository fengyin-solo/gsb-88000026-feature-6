import { computed } from 'vue'

import {
  restorationBatches,
  restorationEnvironment,
  restorationTasks,
} from '../data/restorationData'
import { useTaskRiskBoard } from './useTaskRiskBoard'

export function useRestorationOverview() {
  const { riskStats } = useTaskRiskBoard()

  const batchCount = computed(() => restorationBatches.length)
  // 与任务清单、风险顺序共用同一份统计：筛选条件变化时两处同时更新。
  const highRiskCount = computed(() => riskStats.value.high)
  const environmentCount = computed(() => restorationEnvironment.length)
  const ownerCount = computed(() => new Set(restorationTasks.map((item) => item.owner)).size)

  return {
    batchCount,
    highRiskCount,
    environmentCount,
    ownerCount,
  }
}

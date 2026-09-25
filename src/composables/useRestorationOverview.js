import { computed } from 'vue'

import {
  restorationBatches,
  restorationEnvironment,
  restorationTasks,
} from '../data/restorationData'
import { summarizeRiskLevels } from '../utils/taskRiskOrdering'

export function useRestorationOverview() {
  const batchCount = computed(() => restorationBatches.length)
  const highRiskCount = computed(
    () => summarizeRiskLevels(restorationTasks).high,
  )
  const environmentCount = computed(() => restorationEnvironment.length)
  const ownerCount = computed(
    () => new Set(restorationTasks.map((item) => item.owner)).size,
  )

  return {
    batchCount,
    highRiskCount,
    environmentCount,
    ownerCount,
  }
}

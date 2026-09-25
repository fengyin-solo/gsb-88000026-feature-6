<script setup>
import PanelSection from '../components/common/PanelSection.vue'
import TaskTable from '../components/restoration/TaskTable.vue'
import RiskControls from '../components/restoration/RiskControls.vue'
import RiskStatsBar from '../components/restoration/RiskStatsBar.vue'
import RiskSortNote from '../components/restoration/RiskSortNote.vue'
import { useTaskRiskBoard } from '../composables/useTaskRiskBoard'

// 表格直接绑定 computed：筛选为空时 rows 即为空数组，不会残留上一次的旧结果。
const { rankedTasks, riskStats, missingCompletenessCount } =
  useTaskRiskBoard()
</script>

<template>
  <div class="view-stack">
    <PanelSection title="任务清单" badge="按风险排序">
      <RiskControls />

      <div class="board-meta">
        <RiskStatsBar :stats="riskStats" />
      </div>

      <RiskSortNote :missing-count="missingCompletenessCount" />

      <TaskTable :rows="rankedTasks" />
    </PanelSection>
  </div>
</template>

<style scoped>
.view-stack {
  display: grid;
}

.board-meta {
  margin-bottom: 14px;
}
</style>

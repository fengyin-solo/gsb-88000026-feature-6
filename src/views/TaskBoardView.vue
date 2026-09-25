<script setup>
import { computed } from 'vue'

import PanelSection from '../components/common/PanelSection.vue'
import RiskOrderSummary from '../components/restoration/RiskOrderSummary.vue'
import TaskTable from '../components/restoration/TaskTable.vue'
import { useTaskRiskBoard } from '../composables/useTaskRiskBoard'
import { RISK_FILTER_OPTIONS } from '../utils/taskRiskOrdering'

const {
  state,
  factors,
  visibleTasks,
  visibleStats,
  orderingDescription,
  hasActiveFilters,
  resetView,
} = useTaskRiskBoard()

const viewBadge = computed(() => {
  const labels = []
  if (state.includeRiskLevel) labels.push('风险等级')
  if (state.includeWaitDays) labels.push('等待时长')
  if (state.includeCompleteness) labels.push('文献完整度')
  return labels.length > 0 ? `组合排序：${labels.join(' + ')}` : '仅按编号排序'
})
</script>

<template>
  <div class="view-stack">
    <PanelSection title="任务清单" :badge="viewBadge">
      <div class="task-toolbar">
        <div class="chip-group" role="group" aria-label="风险等级筛选">
          <button
            v-for="option in RISK_FILTER_OPTIONS"
            :key="option.value"
            type="button"
            :class="['chip', { 'chip--active': state.riskLevel === option.value }]"
            @click="state.riskLevel = option.value"
          >
            {{ option.label }}
          </button>
        </div>

        <div class="toggle-group">
          <label class="toggle">
            <input v-model="state.includeRiskLevel" type="checkbox" />
            计入风险等级
          </label>
          <label class="toggle">
            <input v-model="state.includeWaitDays" type="checkbox" />
            计入等待时长
          </label>
          <label class="toggle">
            <input v-model="state.includeCompleteness" type="checkbox" />
            计入文献完整度
          </label>
        </div>

        <input
          v-model="state.keyword"
          class="keyword-input"
          type="search"
          placeholder="搜索对象 / 阶段 / 负责人"
        />

        <button
          v-if="hasActiveFilters"
          type="button"
          class="reset-btn"
          @click="resetView"
        >
          重置查看条件
        </button>
      </div>

      <RiskOrderSummary
        :description="orderingDescription"
        :stats="visibleStats"
      />

      <TaskTable :rows="visibleTasks" :factors="factors" />
    </PanelSection>
  </div>
</template>

<style scoped>
.view-stack {
  display: grid;
}

.task-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 14px;
  margin-bottom: 16px;
}

.chip-group,
.toggle-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  padding: 7px 13px;
  border-radius: 999px;
  border: 1px solid rgba(109, 80, 40, 0.25);
  background: rgba(255, 255, 255, 0.8);
  color: #6a5439;
  font-size: 0.82rem;
  cursor: pointer;
}

.chip--active {
  background: #7e6038;
  border-color: #7e6038;
  color: #fdf6ea;
}

.toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  color: #6a5439;
}

.keyword-input {
  flex: 1 1 180px;
  min-width: 160px;
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid rgba(109, 80, 40, 0.25);
  background: rgba(255, 255, 255, 0.85);
  color: #5c4a33;
  font-size: 0.86rem;
}

.reset-btn {
  padding: 8px 14px;
  border-radius: 12px;
  border: 1px dashed rgba(109, 80, 40, 0.45);
  background: transparent;
  color: #7e6038;
  font-size: 0.82rem;
  cursor: pointer;
}
</style>

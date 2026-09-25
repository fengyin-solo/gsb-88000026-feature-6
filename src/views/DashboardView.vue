<script setup>
import { RouterLink } from 'vue-router'

import PanelSection from '../components/common/PanelSection.vue'
import StatCard from '../components/common/StatCard.vue'
import BatchGrid from '../components/restoration/BatchGrid.vue'
import EnvironmentCards from '../components/restoration/EnvironmentCards.vue'
import HeroBanner from '../components/restoration/HeroBanner.vue'
import RiskOrderSummary from '../components/restoration/RiskOrderSummary.vue'
import TaskTable from '../components/restoration/TaskTable.vue'
import {
  restorationBatches,
  restorationEnvironment,
  restorationHero,
  restorationSteps,
} from '../data/restorationData'
import { useRestorationOverview } from '../composables/useRestorationOverview'
import { useTaskRiskBoard } from '../composables/useTaskRiskBoard'

const { batchCount, environmentCount, ownerCount } =
  useRestorationOverview()
const {
  state,
  factors,
  visibleTasks,
  visibleStats,
  orderingDescription,
  hasActiveFilters,
} = useTaskRiskBoard()

const statCards = [
  { label: '在册批次', value: batchCount.value },
  { label: '高风险任务', value: visibleStats.value.high },
  { label: '环境指标', value: environmentCount.value },
  { label: '参与修复师', value: ownerCount.value },
]
</script>

<template>
  <div class="view-stack">
    <HeroBanner :hero="restorationHero" />

    <section class="stats-grid">
      <StatCard
        v-for="card in statCards"
        :key="card.label"
        :label="card.label"
        :value="card.value"
      />
    </section>

    <section class="two-column">
      <PanelSection title="重点批次" badge="优先处理">
        <BatchGrid :items="restorationBatches" />
      </PanelSection>

      <PanelSection title="当日工序" badge="修复流程">
        <ol class="step-list">
          <li v-for="step in restorationSteps" :key="step">{{ step }}</li>
        </ol>
      </PanelSection>
    </section>

    <PanelSection title="任务风险顺序" badge="与任务清单同源">
      <RiskOrderSummary
        :description="orderingDescription"
        :stats="visibleStats"
      />
      <TaskTable :rows="visibleTasks" :factors="factors" />
      <footer class="risk-foot">
        <span v-if="hasActiveFilters">
          已沿用任务清单的查看条件（风险等级：{{ state.riskLevel === 'all' ? '全部' : state.riskLevel }}，共 {{ visibleStats.total }} 条）。
        </span>
        <span v-else>当前展示全量任务；筛选与排序因子在任务清单页调整后，此处同步生效。</span>
        <RouterLink class="more-link" to="/tasks">进入任务清单调整查看条件 →</RouterLink>
      </footer>
    </PanelSection>

    <PanelSection title="环境参数" badge="修复室 2">
      <EnvironmentCards :items="restorationEnvironment" />
    </PanelSection>
  </div>
</template>

<style scoped>
.view-stack {
  display: grid;
  gap: 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.two-column {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 24px;
}

.step-list {
  margin: 0;
  padding-left: 20px;
  color: #5c4a33;
}

.step-list li + li {
  margin-top: 12px;
}

.risk-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 16px;
  margin-top: 14px;
  font-size: 0.8rem;
  color: #8a7556;
}

.more-link {
  color: #7e6038;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
}

.more-link:hover {
  text-decoration: underline;
}

@media (max-width: 980px) {
  .stats-grid,
  .two-column {
    grid-template-columns: 1fr;
  }
}
</style>

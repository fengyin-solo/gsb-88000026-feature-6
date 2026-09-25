<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import PanelSection from '../components/common/PanelSection.vue'
import StatCard from '../components/common/StatCard.vue'
import BatchGrid from '../components/restoration/BatchGrid.vue'
import EnvironmentCards from '../components/restoration/EnvironmentCards.vue'
import HeroBanner from '../components/restoration/HeroBanner.vue'
import RiskStatsBar from '../components/restoration/RiskStatsBar.vue'
import TaskTable from '../components/restoration/TaskTable.vue'
import {
  restorationBatches,
  restorationEnvironment,
  restorationHero,
  restorationSteps,
} from '../data/restorationData'
import { useRestorationOverview } from '../composables/useRestorationOverview'
import { useTaskRiskBoard } from '../composables/useTaskRiskBoard'
import { riskCriteriaText } from '../utils/restorationFormatters'

const { batchCount, environmentCount, highRiskCount, ownerCount } =
  useRestorationOverview()
const { rankedTasks, riskStats, criteria } = useTaskRiskBoard()

const statCards = computed(() => [
  { label: '在册批次', value: batchCount.value },
  { label: '高风险任务', value: highRiskCount.value },
  { label: '环境指标', value: environmentCount.value },
  { label: '参与修复师', value: ownerCount.value },
])
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

    <PanelSection title="任务风险顺序" badge="与任务清单实时一致">
      <div class="risk-overview-head">
        <RiskStatsBar :stats="riskStats" />
        <RouterLink class="risk-link" to="/tasks">
          查看 / 调整排序与筛选条件 →
        </RouterLink>
      </div>
      <p class="criteria-line">当前查看条件：{{ riskCriteriaText(criteria) }}</p>
      <!-- 同一份 rankedTasks：顺序、综合分与统计均与任务清单完全相同 -->
      <TaskTable :rows="rankedTasks" />
    </PanelSection>

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

.risk-overview-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.risk-link {
  font-size: 0.86rem;
  color: #5d4322;
  text-decoration: none;
  border-bottom: 1px solid rgba(93, 67, 34, 0.4);
}

.criteria-line {
  margin: 0 0 14px;
  font-size: 0.86rem;
  color: #6a5439;
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

@media (max-width: 980px) {
  .stats-grid,
  .two-column {
    grid-template-columns: 1fr;
  }
}
</style>

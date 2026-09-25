<script setup>
import { riskMeta } from '../../utils/restorationFormatters'
import {
  formatCompleteness,
  taskRiskScore,
} from '../../utils/taskRiskOrdering'

const props = defineProps({
  rows: {
    type: Array,
    required: true,
  },
  factors: {
    type: Object,
    required: true,
  },
})

function formatWaitDays(value) {
  return typeof value === 'number' && Number.isFinite(value)
    ? `${value} 天`
    : '—'
}
</script>

<template>
  <div class="task-table">
    <div class="task-row task-head">
      <span>风险序</span>
      <span>对象</span>
      <span>阶段</span>
      <span>风险</span>
      <span>风险分</span>
      <span>等待</span>
      <span>完整度</span>
      <span>负责人</span>
      <span>说明</span>
    </div>
    <div
      v-for="(row, index) in rows"
      :key="row.id ?? `${row.title}-${row.owner}`"
      class="task-row"
    >
      <span class="rank">#{{ index + 1 }}</span>
      <span>{{ row.title }}</span>
      <span>{{ row.stage }}</span>
      <span :class="['risk-tag', `risk-tag--${riskMeta(row.risk).tone}`]">
        {{ riskMeta(row.risk).label }}
      </span>
      <span>{{ taskRiskScore(row, props.factors) }}</span>
      <span>{{ formatWaitDays(row.waitDays) }}</span>
      <span :class="{ 'is-missing': row.completeness == null }">
        {{ formatCompleteness(row.completeness) }}
      </span>
      <span>{{ row.owner }}</span>
      <span>{{ row.note }}</span>
    </div>
    <div v-if="rows.length === 0" class="task-empty">
      当前查看条件下没有匹配的任务，请调整风险等级筛选或搜索关键词。
    </div>
  </div>
</template>

<style scoped>
.task-table {
  overflow: hidden;
  border: 1px solid rgba(79, 57, 32, 0.1);
  border-radius: 18px;
}

.task-row {
  display: grid;
  grid-template-columns:
    0.45fr 1.05fr 0.65fr 0.5fr 0.5fr 0.5fr
    0.6fr 0.55fr 1.2fr;
  gap: 12px;
  align-items: center;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.72);
}

.task-row + .task-row {
  border-top: 1px solid rgba(79, 57, 32, 0.08);
}

.task-head {
  background: #efe1c6;
  color: #775936;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.76rem;
}

.rank {
  color: #8a7556;
  font-variant-numeric: tabular-nums;
}

.is-missing {
  color: #913d2f;
  font-style: italic;
}

.risk-tag {
  display: inline-flex;
  justify-content: center;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
}

.risk-tag--high {
  background: #efd0c9;
  color: #913d2f;
}

.risk-tag--medium {
  background: #f6e5b9;
  color: #8b6314;
}

.risk-tag--low {
  background: #d9ead9;
  color: #366338;
}

.task-empty {
  padding: 28px 16px;
  text-align: center;
  color: #8a7556;
  background: rgba(255, 255, 255, 0.72);
}

@media (max-width: 900px) {
  .task-table {
    overflow-x: auto;
  }

  .task-row {
    min-width: 980px;
  }
}
</style>

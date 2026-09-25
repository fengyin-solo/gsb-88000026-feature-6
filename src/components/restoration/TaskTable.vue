<script setup>
import {
  completenessText,
  riskMeta,
} from '../../utils/restorationFormatters'

defineProps({
  rows: {
    type: Array,
    required: true,
  },
})

function scoreText(score) {
  return score.toFixed(2)
}
</script>

<template>
  <div class="task-table">
    <div class="task-row task-head">
      <span>编号</span>
      <span>对象</span>
      <span>阶段</span>
      <span>风险</span>
      <span>负责人</span>
      <span>等待时长</span>
      <span>文献完整度</span>
      <span>综合分</span>
      <span>说明</span>
    </div>
    <div
      v-for="row in rows"
      :key="row.id"
      class="task-row"
    >
      <span class="cell-muted">{{ row.id }}</span>
      <span>{{ row.title }}</span>
      <span>{{ row.stage }}</span>
      <span :class="['risk-tag', `risk-tag--${riskMeta(row.risk).tone}`]">
        {{ riskMeta(row.risk).label }}
      </span>
      <span>{{ row.owner }}</span>
      <span>{{ row.waitDays }} 天</span>
      <span :class="{ 'cell-muted': completenessText(row.completeness) === null }">
        {{ completenessText(row.completeness) ?? '待评估' }}
      </span>
      <span class="cell-score">{{ scoreText(row.riskScore ?? 0) }}</span>
      <span>{{ row.note }}</span>
    </div>
    <div v-if="rows.length === 0" class="task-empty">
      当前查看条件下没有匹配的任务，请调整风险等级或关键词，或重置查看条件。
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
  grid-template-columns: 0.5fr 1.1fr 0.7fr 0.5fr 0.6fr 0.6fr 0.7fr 0.5fr 1.4fr;
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

.cell-muted {
  color: #9a8668;
}

.cell-score {
  font-variant-numeric: tabular-nums;
  color: #5d4322;
}

.task-empty {
  padding: 28px 16px;
  text-align: center;
  color: #82684b;
  background: rgba(255, 255, 255, 0.72);
}

@media (max-width: 1100px) {
  .task-table {
    overflow-x: auto;
  }

  .task-row {
    min-width: 1080px;
  }
}
</style>

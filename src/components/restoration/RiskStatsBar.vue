<script setup>
import { riskMeta } from '../../utils/restorationFormatters'

defineProps({
  stats: {
    type: Object,
    required: true,
  },
})

const buckets = [
  { key: 'high', label: '高风险' },
  { key: 'medium', label: '中风险' },
  { key: 'low', label: '低风险' },
]
</script>

<template>
  <div class="risk-stats">
    <div class="stat-pill stat-pill--total">
      <strong>{{ stats.total }}</strong>
      <span>当前任务</span>
    </div>
    <div
      v-for="bucket in buckets"
      :key="bucket.key"
      :class="['stat-pill', `stat-pill--${riskMeta(bucket.key).tone}`]"
    >
      <strong>{{ stats[bucket.key] }}</strong>
      <span>{{ bucket.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.risk-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.stat-pill {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  padding: 9px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(79, 57, 32, 0.12);
}

.stat-pill strong {
  font-size: 1.15rem;
}

.stat-pill span {
  font-size: 0.8rem;
  color: #6a5439;
}

.stat-pill--high strong {
  color: #913d2f;
}

.stat-pill--medium strong {
  color: #8b6314;
}

.stat-pill--low strong {
  color: #366338;
}
</style>

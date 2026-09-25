<script setup>
defineProps({
  description: {
    type: String,
    required: true,
  },
  stats: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="risk-summary">
    <p class="risk-summary__rule">{{ description }}</p>
    <ul class="risk-summary__stats">
      <li>
        <strong>{{ stats.total }}</strong>
        <span>任务总数</span>
      </li>
      <li class="is-high">
        <strong>{{ stats.high }}</strong>
        <span>高风险</span>
      </li>
      <li class="is-medium">
        <strong>{{ stats.medium }}</strong>
        <span>中风险</span>
      </li>
      <li class="is-low">
        <strong>{{ stats.low }}</strong>
        <span>低风险</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.risk-summary {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 20px;
  margin-bottom: 16px;
  padding: 12px 16px;
  border-radius: 14px;
  background: #f7efe1;
  border: 1px solid rgba(109, 80, 40, 0.1);
}

.risk-summary__rule {
  margin: 0;
  flex: 1 1 420px;
  font-size: 0.84rem;
  line-height: 1.6;
  color: #6a5439;
}

.risk-summary__stats {
  display: flex;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.risk-summary__stats li {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 58px;
  padding: 6px 10px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.7);
}

.risk-summary__stats strong {
  font-size: 1.05rem;
  color: #5c4a33;
}

.risk-summary__stats span {
  font-size: 0.72rem;
  color: #8a7556;
}

.risk-summary__stats .is-high strong {
  color: #913d2f;
}

.risk-summary__stats .is-medium strong {
  color: #8b6314;
}

.risk-summary__stats .is-low strong {
  color: #366338;
}
</style>

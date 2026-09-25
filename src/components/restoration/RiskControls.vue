<script setup>
import { riskMeta } from '../../utils/restorationFormatters'
import {
  RISK_FACTORS,
  useTaskRiskBoard,
} from '../../composables/useTaskRiskBoard'

const { criteria, toggleFactor, resetCriteria } = useTaskRiskBoard()

const factorOptions = [
  { value: 'risk', label: '风险等级' },
  { value: 'waitDays', label: '等待时长' },
  { value: 'completeness', label: '文献完整度' },
]

const riskOptions = [
  { value: 'all', label: '全部' },
  { value: 'high', label: riskMeta('high').label },
  { value: 'medium', label: riskMeta('medium').label },
  { value: 'low', label: riskMeta('low').label },
]
</script>

<template>
  <div class="risk-controls">
    <fieldset class="control-group">
      <legend>风险组合维度（等权合并）</legend>
      <div class="chip-row">
        <button
          v-for="option in factorOptions"
          :key="option.value"
          type="button"
          :class="['chip', { 'chip--active': criteria.factors.includes(option.value) }]"
          @click="toggleFactor(option.value)"
        >
          {{ option.label }}
        </button>
        <span class="factor-order">
          生效顺序：{{
            RISK_FACTORS.filter((item) => criteria.factors.includes(item))
              .map((item) => factorOptions.find((option) => option.value === item)?.label)
              .join(' → ') || '未选维度'
          }}
        </span>
      </div>
    </fieldset>

    <fieldset class="control-group">
      <legend>风险等级</legend>
      <div class="chip-row">
        <button
          v-for="option in riskOptions"
          :key="option.value"
          type="button"
          :class="['chip', `chip--${option.value}`, {
            'chip--active': criteria.riskFilter === option.value,
          }]"
          @click="criteria.riskFilter = option.value"
        >
          {{ option.label }}
        </button>
      </div>
    </fieldset>

    <div class="control-group control-group--search">
      <label for="task-keyword">关键词</label>
      <input
        id="task-keyword"
        v-model="criteria.keyword"
        type="search"
        placeholder="按对象、阶段、负责人或说明筛选"
      />
    </div>

    <button type="button" class="reset-btn" @click="resetCriteria">
      重置查看条件
    </button>
  </div>
</template>

<style scoped>
.risk-controls {
  display: grid;
  gap: 14px;
  margin-bottom: 18px;
  padding: 16px 18px;
  border: 1px solid rgba(79, 57, 32, 0.12);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.6);
}

.control-group {
  margin: 0;
  padding: 0;
  border: 0;
}

legend,
.control-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #7e6038;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.chip {
  padding: 7px 14px;
  border: 1px solid rgba(79, 57, 32, 0.22);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.8);
  color: #6a5439;
  font: inherit;
  font-size: 0.86rem;
  cursor: pointer;
}

.chip--active {
  border-color: #5d4322;
  background: #5d4322;
  color: #fff8eb;
}

.chip--active.chip--high {
  background: #913d2f;
  border-color: #913d2f;
}

.chip--active.chip--medium {
  background: #8b6314;
  border-color: #8b6314;
}

.chip--active.chip--low {
  background: #366338;
  border-color: #366338;
}

.factor-order {
  font-size: 0.8rem;
  color: #82684b;
}

.control-group--search input {
  width: min(360px, 100%);
  padding: 9px 12px;
  border: 1px solid rgba(79, 57, 32, 0.22);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.85);
  color: #2d2418;
  font: inherit;
}

.reset-btn {
  justify-self: start;
  padding: 8px 16px;
  border: 1px dashed rgba(79, 57, 32, 0.4);
  border-radius: 999px;
  background: transparent;
  color: #7e6038;
  font: inherit;
  font-size: 0.84rem;
  cursor: pointer;
}

.reset-btn:hover {
  background: rgba(93, 67, 34, 0.08);
}
</style>

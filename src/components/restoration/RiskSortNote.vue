<script setup>
defineProps({
  missingCount: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <details class="sort-note">
    <summary>风险顺序是如何确定的？（完整度缺档与同分规则）</summary>
    <ol>
      <li>
        已勾选维度等权合并为 0-1 综合分：风险等级（高 1 / 中 0.5 / 低 0）、
        等待时长（等待天数 ÷ 当前最长等待天数）、文献完整度（1 - 完整度）。
      </li>
      <li>综合分越高越靠前；一个维度都未勾选时，所有任务综合分相同，直接走下面的决胜链。</li>
      <li>
        综合分相同时按固定决胜链排序：① 风险等级高者优先 → ② 等待更久者优先 →
        ③ 完整度更低者优先 → ④ 仍相同则按任务编号升序。编号决胜保证任何同分组合顺序都稳定、可复现。
      </li>
      <li>
        文献完整度缺档（尚未建档评估）时按 50% 基准计入，既不抬高也不压低风险；
        缺档任务之间由后续决胜项直至任务编号决定先后。当前结果中有
        {{ missingCount }} 项完整度缺档，表中以「待评估」标注。
      </li>
      <li>筛选条件（维度、风险等级、关键词）会在本次会话内记住，从修复总览进入任务清单时保持一致。</li>
    </ol>
  </details>
</template>

<style scoped>
.sort-note {
  margin: 0 0 18px;
  padding: 12px 16px;
  border-radius: 14px;
  background: rgba(239, 226, 202, 0.5);
  color: #5c4a33;
  font-size: 0.86rem;
}

summary {
  cursor: pointer;
  color: #7e6038;
}

ol {
  margin: 10px 0 2px;
  padding-left: 20px;
}

li + li {
  margin-top: 8px;
}
</style>

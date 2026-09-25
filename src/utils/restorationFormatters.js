export function riskMeta(risk) {
  const map = {
    high: {
      label: '高',
      tone: 'high',
    },
    medium: {
      label: '中',
      tone: 'medium',
    },
    low: {
      label: '低',
      tone: 'low',
    },
  }

  return map[risk] ?? map.low
}

// 完整度以百分比展示；尚未评估（null/undefined）时返回 null，由界面统一占位。
export function completenessText(completeness) {
  if (completeness === null || completeness === undefined) {
    return null
  }

  return `${Math.round(completeness * 100)}%`
}

// 把当前查看条件整理成一句话，总览页与任务清单共用，避免两处表述不一致。
export function riskCriteriaText(criteria) {
  const factorLabels = {
    risk: '风险等级',
    waitDays: '等待时长',
    completeness: '文献完整度',
  }
  const enabled = criteria.factors.filter((item) => item !== null)

  const factorsText = enabled.length
    ? enabled.map((item) => factorLabels[item]).join(' + ')
    : '未选维度（按决胜规则排序）'

  const riskText =
    criteria.riskFilter === 'all' ? '全部风险' : `${riskMeta(criteria.riskFilter).label}风险`
  const keywordText = criteria.keyword.trim() ? `，关键词「${criteria.keyword.trim()}」` : ''

  return `${factorsText}｜${riskText}${keywordText}`
}

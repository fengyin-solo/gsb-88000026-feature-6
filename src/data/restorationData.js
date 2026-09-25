export const restorationNavigation = [
  { label: '修复总览', to: '/' },
  { label: '批次档案', to: '/batches' },
  { label: '任务清单', to: '/tasks' },
]

export const restorationHero = {
  title: '古籍虫蛀修复批次板',
  description:
    '聚焦修复批次、控湿参数和文献归档风险，适合作为修复工作室内部业务系统的前端原型。',
  backlogLabel: '待处理批次',
  backlogValue: '12 册',
  note: '高湿季节前优先清理虫道扩散页。',
}

export const restorationBatches = [
  {
    code: 'A-03',
    title: '明抄本县志残卷',
    pages: '17-29',
    risk: 'high',
    status: '补纸前',
    note: '虫道集中在装订线外沿。',
  },
  {
    code: 'B-11',
    title: '碑帖拓片册页',
    pages: '5-14',
    risk: 'medium',
    status: '控湿中',
    note: '需先降湿 48 小时，再进入纤维加固。',
  },
  {
    code: 'C-02',
    title: '戏曲抄本散页',
    pages: '1-9',
    risk: 'low',
    status: '归档前',
    note: '边角缺损明显，建议先做透明托裱。',
  },
]

export const restorationEnvironment = [
  {
    label: '相对湿度',
    value: '52%',
    note: '控制线 50% - 55%',
  },
  {
    label: '纸浆补配',
    value: '2 批',
    note: '桑皮纤维待过滤',
  },
  {
    label: '紫外检查',
    value: '4 页',
    note: '夜间统一复核霉斑残留',
  },
]

export const restorationSteps = [
  '拍照建档并标注虫蛀起止页。',
  '低压吸附除尘，保留边角碎纤维。',
  '喷雾回软后局部补纸，不做整页过度清洗。',
  '平整定型 8 小时后转入无酸盒暂存。',
]

// waitDays：任务等待时长（天）；completeness：文献完整度（0-1，null 表示尚未建档评估）
// id 为稳定编号，同分任务始终按编号决胜，保证风险顺序可复现。
export const restorationTasks = [
  {
    id: 'T-01',
    title: '明抄本县志残卷',
    stage: '补纸前',
    risk: 'high',
    owner: '韩澈',
    note: '虫道贯穿标题栏，需先固色。',
    waitDays: 14,
    completeness: 0.42,
  },
  {
    id: 'T-02',
    title: '碑帖拓片册页',
    stage: '控湿中',
    risk: 'medium',
    owner: '陆宁',
    note: '边缘卷曲，可延后压平。',
    waitDays: 7,
    completeness: 0.68,
  },
  {
    id: 'T-03',
    title: '戏曲抄本散页',
    stage: '归档前',
    risk: 'low',
    owner: '周恬',
    note: '等待封套尺寸确认。',
    waitDays: 3,
    completeness: 0.86,
  },
  {
    id: 'T-04',
    title: '地方志舆图散页',
    stage: '除尘中',
    risk: 'high',
    owner: '韩澈',
    note: '霉斑与虫道重叠，整页脆弱。',
    waitDays: 21,
    completeness: 0.31,
  },
  {
    id: 'T-05',
    title: '族谱刻本残册',
    stage: '补纸前',
    risk: 'high',
    owner: '沈砚',
    note: '书口断裂，需先做纤维加固。',
    waitDays: 14,
    completeness: 0.42,
  },
  {
    id: 'T-06',
    title: '佛经残叶拓本',
    stage: '待建档',
    risk: 'medium',
    owner: '陆宁',
    note: '刚入库，完整度尚未评估。',
    waitDays: 5,
    completeness: null,
  },
  {
    id: 'T-07',
    title: '契约文书散页',
    stage: '控湿中',
    risk: 'medium',
    owner: '沈砚',
    note: '等待时长与完整度与 T-06 相当，用于核对同分决胜。',
    waitDays: 5,
    completeness: null,
  },
  {
    id: 'T-08',
    title: '套版年画册页',
    stage: '托裱中',
    risk: 'low',
    owner: '周恬',
    note: '色彩稳固，仅边角轻微磨损。',
    waitDays: 9,
    completeness: 0.9,
  },
  {
    id: 'T-09',
    title: '药书抄本残卷',
    stage: '归档前',
    risk: 'high',
    owner: '韩澈',
    note: '等待最久，缺页情况仍待核对。',
    waitDays: 26,
    completeness: null,
  },
]

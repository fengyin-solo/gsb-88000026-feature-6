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

export const restorationTasks = [
  {
    id: 'T-101',
    title: '明抄本县志残卷',
    stage: '补纸前',
    risk: 'high',
    owner: '韩澈',
    waitDays: 6,
    completeness: 0.42,
    note: '虫道贯穿标题栏，需先固色。',
  },
  {
    id: 'T-102',
    title: '碑帖拓片册页',
    stage: '控湿中',
    risk: 'medium',
    owner: '陆宁',
    waitDays: 12,
    completeness: 0.68,
    note: '边缘卷曲，可延后压平。',
  },
  {
    id: 'T-103',
    title: '戏曲抄本散页',
    stage: '归档前',
    risk: 'low',
    owner: '周恬',
    waitDays: 3,
    completeness: 0.9,
    note: '等待封套尺寸确认。',
  },
  {
    id: 'T-104',
    title: '宋刻经折装残叶',
    stage: '纤维加固',
    risk: 'high',
    owner: '陆宁',
    waitDays: 9,
    completeness: 0.35,
    note: '折口断裂，先定位缺失叶序。',
  },
  {
    id: 'T-105',
    title: '家谱木活字印本',
    stage: '拍照建档',
    risk: 'medium',
    owner: '韩澈',
    waitDays: 12,
    completeness: 0.68,
    note: '封面虫蛀，内页保存尚可。',
  },
  {
    id: 'T-106',
    title: '晚清舆图折页',
    stage: '除酸处理',
    risk: 'medium',
    owner: '岑蔚',
    waitDays: 12,
    completeness: 0.68,
    note: '折缝脆化，需整体托裱。',
  },
  {
    id: 'T-107',
    title: '医方抄本卷三',
    stage: '托裱前',
    risk: 'low',
    owner: '周恬',
    waitDays: 20,
    completeness: null,
    note: '完整度尚未普查，暂按 0% 参与排序。',
  },
]

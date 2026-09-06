/*
 * 数字教材兼容层：旧资源曾在此注入“先预测—再揭示”的对话模块。
 * 本书采用正文中的“对象—公式—参数—结果—边界”结构，因此移除空挂载位，
 * 保留原计算与可视化代码，不增加对话式提示。
 */
document.querySelectorAll('[data-learning-cycle-mount]').forEach((node) => node.remove());

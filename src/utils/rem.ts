// rem 适配方案
const baseSize = 32
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 750 宽的缩放比例
  const scale = document.documentElement.clientWidth / 850
  // 设置页面根节点字体大小（最小为 12px，最大为 32px）
  const fontSize = Math.min(Math.max(baseSize * scale, 12), 32)
  document.documentElement.style.fontSize = `${fontSize}px`
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = () => {
  setRem()
} 
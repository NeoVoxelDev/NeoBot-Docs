/**
 * 页面滑动惯性和阻尼效果
 * 实现平滑滚动、滚动阻尼和惯性效果
 */

/// <reference path="../types/global.d.ts" />

class SmoothScroll {
  private isScrolling: boolean = false
  private scrollVelocity: number = 0
  private lastScrollTime: number = 0
  private lastScrollY: number = 0
  private animationId: number | null = null
  private targetScrollY: number = 0
  private currentScrollY: number = 0
  private damping: number = 0.85 // 轻微阻尼系数
  private springStrength: number = 0.08 // 轻微弹簧强度
  private bounceStrength: number = 0.005 // 回弹强度
  private maxOverscroll: number = 20 // 最大过度滚动距离
  private scrollContainer: HTMLElement | null = null

  constructor() {
    this.init()
  }

  /**
   * 初始化平滑滚动
   */
  private init(): void {
    // 获取当前滚动位置
    this.currentScrollY = window.pageYOffset
    this.targetScrollY = this.currentScrollY
    this.lastScrollY = this.currentScrollY

    // 获取滚动容器
    this.scrollContainer = document.documentElement || document.body

    // 绑定事件
    this.bindEvents()

    // 添加样式
    this.addStyles()

    // 开始动画循环
    this.animate()
  }

  /**
   * 添加平滑滚动样式
   */
  private addStyles(): void {
    const style = document.createElement('style')
    style.id = 'smooth-scroll-styles'
    style.textContent = `
      /* 平滑滚动效果 */
      html {
        scroll-behavior: auto;
      }
      
      /* 自定义滚动条样式 */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
      }
      
      ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.5);
      }
    `
    document.head.appendChild(style)
  }

  /**
   * 绑定事件监听器
   */
  private bindEvents(): void {
    // 监听滚轮事件
    this.wheelHandler = this.handleWheel.bind(this)
    window.addEventListener('wheel', this.wheelHandler, { passive: false })

    // 监听键盘事件
    this.keydownHandler = this.handleKeyDown.bind(this)
    window.addEventListener('keydown', this.keydownHandler)

    // 监听窗口大小变化
    this.resizeHandler = this.handleResize.bind(this)
    window.addEventListener('resize', this.resizeHandler)
  }

  private wheelHandler: (e: WheelEvent) => void = () => { }
  private keydownHandler: (e: KeyboardEvent) => void = () => { }
  private resizeHandler: () => void = () => { }

  /**
   * 处理滚轮事件
   */
  private handleWheel(e: WheelEvent): void {
    // 在移动设备上使用默认行为
    if (window.innerWidth <= 768) return

    e.preventDefault()

    // 计算滚动增量，限制滚动速度
    const delta = e.deltaY
    const multiplier = e.deltaMode === WheelEvent.DOM_DELTA_LINE ? 20 : 1
    const scrollDelta = Math.min(Math.max(delta * multiplier, -100), 100) // 限制单次滚动距离

    // 更新目标滚动位置
    this.targetScrollY += scrollDelta

    // 获取实际滚动范围
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight

    // 允许一定程度的过度滚动，但限制最大过度滚动距离
    if (this.targetScrollY < -this.maxOverscroll) {
      this.targetScrollY = -this.maxOverscroll
    } else if (this.targetScrollY > maxScroll + this.maxOverscroll) {
      this.targetScrollY = maxScroll + this.maxOverscroll
    }

    // 计算滚动速度
    const now = Date.now()
    const timeDelta = Math.max(1, now - this.lastScrollTime)

    this.scrollVelocity = scrollDelta / timeDelta * 1 // 进一步降低速度影响

    this.lastScrollTime = now
    this.lastScrollY = this.targetScrollY
    this.isScrolling = true
  }

  /**
   * 处理键盘事件
   */
  private handleKeyDown(e: KeyboardEvent): void {
    let scrollAmount = 0

    switch (e.key) {
      case 'ArrowUp':
        scrollAmount = -50
        break
      case 'ArrowDown':
        scrollAmount = 50
        break
      case 'PageUp':
        scrollAmount = -window.innerHeight * 0.8
        break
      case 'PageDown':
        scrollAmount = window.innerHeight * 0.8
        break
      case 'Home':
        this.targetScrollY = 0
        this.isScrolling = true
        return
      case 'End':
        this.targetScrollY = document.documentElement.scrollHeight - window.innerHeight
        this.isScrolling = true
        return
      default:
        return
    }

    e.preventDefault()
    this.targetScrollY += scrollAmount

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    this.targetScrollY = Math.max(0, Math.min(maxScroll, this.targetScrollY))
    this.isScrolling = true
  }

  /**
   * 处理窗口大小变化
   */
  private handleResize(): void {
    // 重新计算滚动范围
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    this.targetScrollY = Math.max(0, Math.min(maxScroll, this.targetScrollY))
    this.currentScrollY = this.targetScrollY
  }

  /**
   * 动画循环
   */
  private animate(): void {
    // 获取实际滚动范围
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight

    // 如果不在滚动中，应用惯性
    if (!this.isScrolling && Math.abs(this.scrollVelocity) > 0.01) {
      this.targetScrollY += this.scrollVelocity * 16 // 假设60fps，每帧约16ms
      this.scrollVelocity *= this.damping
    }

    // 计算过度滚动（用于回弹效果）
    let actualScrollY = this.targetScrollY
    let overscrollResistance = 1

    if (this.targetScrollY < 0) {
      // 顶部过度滚动，应用阻力
      const overscroll = Math.abs(this.targetScrollY)
      overscrollResistance = 1 - Math.min(overscroll / this.maxOverscroll, 0.8)
      actualScrollY = this.targetScrollY * overscrollResistance

      // 应用温和的回弹力，只在过度滚动时生效
      if (overscroll > 10) {
        this.scrollVelocity += (0 - this.targetScrollY) * this.bounceStrength * 0.3
      }
    } else if (this.targetScrollY > maxScroll) {
      // 底部过度滚动，应用阻力
      const overscroll = this.targetScrollY - maxScroll
      overscrollResistance = 1 - Math.min(overscroll / this.maxOverscroll, 0.8)
      actualScrollY = maxScroll + (this.targetScrollY - maxScroll) * overscrollResistance

      // 应用温和的回弹力，只在过度滚动时生效
      if (overscroll > 10) {
        this.scrollVelocity += (maxScroll - this.targetScrollY) * this.bounceStrength * 0.3
      }
    }

    // 平滑过渡到目标位置
    const diff = actualScrollY - this.currentScrollY
    this.currentScrollY += diff * this.springStrength

    // 应用滚动位置
    window.scrollTo(0, this.currentScrollY)

    // 重置滚动状态
    if (this.isScrolling) {
      setTimeout(() => {
        this.isScrolling = false
      }, 150) // 增加延迟，确保连续滚动时状态正确
    }

    // 继续动画循环
    this.animationId = requestAnimationFrame(() => this.animate())
  }

  /**
   * 滚动到指定位置
   */
  public scrollTo(y: number, duration: number = 800): void {
    // 确保滚动位置在有效范围内
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const targetY = Math.max(0, Math.min(maxScroll, y))

    const startY = this.currentScrollY
    const distance = targetY - startY
    const startTime = Date.now()

    // 立即设置目标位置
    this.targetScrollY = targetY
    this.isScrolling = true

    // 使用动画循环平滑滚动
    const scrollAnimation = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // 使用缓动函数
      const easeInOutCubic = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2

      this.currentScrollY = startY + distance * easeInOutCubic

      // 应用滚动位置
      window.scrollTo(0, this.currentScrollY)

      if (progress < 1) {
        requestAnimationFrame(scrollAnimation)
      } else {
        this.isScrolling = false
      }
    }

    scrollAnimation()
  }

  /**
   * 滚动到指定元素
   */
  public scrollToElement(element: HTMLElement, offset: number = 0, duration: number = 800): void {
    const elementTop = element.getBoundingClientRect().top + window.pageYOffset
    this.scrollTo(elementTop - offset, duration)
  }

  /**
   * 公开当前滚动位置，供其他组件使用
   */
  public get currentScrollPosition(): number {
    return this.currentScrollY
  }

  /**
   * 销毁平滑滚动
   */
  public destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }

    // 移除事件监听器
    window.removeEventListener('wheel', this.wheelHandler)
    window.removeEventListener('keydown', this.keydownHandler)
    window.removeEventListener('resize', this.resizeHandler)

    // 移除样式
    const styleElement = document.getElementById('smooth-scroll-styles')
    if (styleElement) {
      styleElement.remove()
    }
  }
}

// 导出类
export default SmoothScroll

// 自动初始化
if (typeof window !== 'undefined') {
  // 只在桌面设备上初始化
  document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 768) {
      const smoothScroll = new SmoothScroll()

      // 将实例暴露到全局，方便其他脚本使用
      window.smoothScroll = smoothScroll
    }
  })
}
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
  private damping: number = 0.85
  private springStrength: number = 0.25
  private bounceStrength: number = 0.2
  private maxOverscroll: number = 20
  private lastFrameTime: number = 0
  private velocitySmoothing: number = 0.7
  private minVelocity: number = 0.05
  private lerpFactor: number = 0.25
  private bounceDamping: number = 0.75
  private isDesktop: boolean = true
  private hasTouch: boolean = false
  private switchTimeout: number | null = null

  constructor() {
    this.init()
  }

  /**
   * 初始化平滑滚动
   */
  private init(): void {
    this.currentScrollY = window.pageYOffset
    this.targetScrollY = this.currentScrollY
    this.lastScrollY = this.currentScrollY
    this.lastFrameTime = performance.now()

    this.setupResponsive()
    this.bindEvents()
    this.addStyles()
    this.animate()

    // 处理页面加载时的初始锚点
    this.handleInitialHash()
  }

  /**
   * 设置响应式检查
   */
  private setupResponsive(): void {
    // 默认启用桌面模式，根据实际使用方式动态调整
    this.isDesktop = true
    this.hasTouch = 'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0

    // 监听触摸事件，切换到移动端模式
    window.addEventListener('touchstart', () => {
      if (!this.isDesktop) return

      // 清除之前的定时器
      if (this.switchTimeout) {
        clearTimeout(this.switchTimeout)
        this.switchTimeout = null
      }

      // 延迟切换，避免误触
      this.switchTimeout = window.setTimeout(() => {
        this.isDesktop = false
        this.handleDeviceChange()
      }, 100)
    }, { passive: true })

    // 监听鼠标事件，切换回桌面端模式
    window.addEventListener('mousemove', () => {
      if (this.isDesktop) return

      // 清除之前的定时器
      if (this.switchTimeout) {
        clearTimeout(this.switchTimeout)
        this.switchTimeout = null
      }

      // 延迟切换，避免误触
      this.switchTimeout = window.setTimeout(() => {
        this.isDesktop = true
        this.handleDeviceChange()
      }, 100)
    }, { passive: true })
  }

  /**
   * 处理设备类型变化
   */
  private handleDeviceChange(): void {
    if (!this.isDesktop) {
      // 切换到移动端模式，停止平滑滚动动画
      this.targetScrollY = window.pageYOffset
      this.currentScrollY = this.targetScrollY
      this.scrollVelocity = 0
      this.isScrolling = false

      // 停止动画循环
      if (this.animationId) {
        cancelAnimationFrame(this.animationId)
        this.animationId = null
      }

      // 移除桌面端事件监听器，避免干扰触摸滚动
      window.removeEventListener('wheel', this.wheelHandler)
      window.removeEventListener('keydown', this.keydownHandler)
    } else {
      // 切换回桌面端模式，重新启动动画循环
      this.currentScrollY = window.pageYOffset
      this.targetScrollY = this.currentScrollY
      this.lastFrameTime = performance.now()

      // 重新添加桌面端事件监听器
      window.addEventListener('wheel', this.wheelHandler, { passive: false })
      window.addEventListener('keydown', this.keydownHandler)

      // 重新启动动画循环
      if (!this.animationId) {
        this.animate()
      }
    }
  }

  /**
   * 添加平滑滚动样式
   */
  private addStyles(): void {
    const style = document.createElement('style')
    style.id = 'smooth-scroll-styles'
    style.textContent = `
      /* 平滑滚动效果 - 仅桌面端 */
      @media (min-width: 769px) {
        html {
          scroll-behavior: auto;
        }
      }
      
      /* 自定义滚动条样式 - 仅桌面端 */
      @media (min-width: 769px) {
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
      }
    `
    document.head.appendChild(style)
  }

  /**
   * 绑定事件监听器
   */
  private bindEvents(): void {
    // 监听窗口大小变化
    this.resizeHandler = this.handleResize.bind(this)
    window.addEventListener('resize', this.resizeHandler)

    // 监听锚点链接点击事件
    this.clickHandler = this.handleClick.bind(this)
    document.addEventListener('click', this.clickHandler)

    // 监听 hash 变化事件
    this.hashChangeHandler = this.handleHashChange.bind(this)
    window.addEventListener('hashchange', this.hashChangeHandler)

    // 监听触摸事件 - 手机端
    this.touchStartHandler = this.handleTouchStart.bind(this)
    this.touchMoveHandler = this.handleTouchMove.bind(this)
    this.touchEndHandler = this.handleTouchEnd.bind(this)
    window.addEventListener('touchstart', this.touchStartHandler, { passive: true })
    window.addEventListener('touchmove', this.touchMoveHandler, { passive: true })
    window.addEventListener('touchend', this.touchEndHandler, { passive: true })

    // 绑定桌面端事件处理器，但不立即添加监听器
    this.wheelHandler = this.handleWheel.bind(this)
    this.keydownHandler = this.handleKeyDown.bind(this)

    // 根据初始模式添加相应的事件监听器
    if (this.isDesktop) {
      window.addEventListener('wheel', this.wheelHandler, { passive: false })
      window.addEventListener('keydown', this.keydownHandler)
    }
  }

  private wheelHandler: (e: WheelEvent) => void = () => { }
  private keydownHandler: (e: KeyboardEvent) => void = () => { }
  private resizeHandler: () => void = () => { }
  private clickHandler: (e: MouseEvent) => void = () => { }
  private hashChangeHandler: () => void = () => { }
  private touchStartHandler: (e: TouchEvent) => void = () => { }
  private touchMoveHandler: (e: TouchEvent) => void = () => { }
  private touchEndHandler: (e: TouchEvent) => void = () => { }
  private touchStartY: number = 0
  private touchStartTime: number = 0

  /**
   * 处理滚轮事件
   */
  private handleWheel(e: WheelEvent): void {
    if (!this.isDesktop) return

    e.preventDefault()

    const delta = e.deltaY
    const multiplier = e.deltaMode === WheelEvent.DOM_DELTA_LINE ? 30 : 1.5
    const scrollDelta = Math.min(Math.max(delta * multiplier, -150), 150)

    this.targetScrollY += scrollDelta

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight

    if (this.targetScrollY < -this.maxOverscroll) {
      this.targetScrollY = -this.maxOverscroll
    } else if (this.targetScrollY > maxScroll + this.maxOverscroll) {
      this.targetScrollY = maxScroll + this.maxOverscroll
    }

    const now = performance.now()
    const timeDelta = Math.max(1, now - this.lastScrollTime)

    const newVelocity = scrollDelta / timeDelta * 16
    this.scrollVelocity = this.scrollVelocity * this.velocitySmoothing + newVelocity * (1 - this.velocitySmoothing)

    this.lastScrollTime = now
    this.lastScrollY = this.targetScrollY
    this.isScrolling = true
  }

  /**
   * 处理触摸事件 - 手机端滚动
   */
  private handleTouchStart(e: TouchEvent): void {
    if (this.isDesktop) return

    this.touchStartY = e.touches[0].clientY
    this.touchStartTime = performance.now()
  }

  private handleTouchMove(e: TouchEvent): void {
    if (this.isDesktop) return

    // 让浏览器处理原生滚动
  }

  private handleTouchEnd(e: TouchEvent): void {
    if (this.isDesktop) return

    // 让浏览器处理原生滚动
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
   * 处理点击事件 - 处理锚点链接
   */
  private handleClick(e: MouseEvent): void {
    const target = e.target as HTMLElement
    const link = target.closest('a') as HTMLAnchorElement

    if (!link) return

    const href = link.getAttribute('href')

    // 检查是否是锚点链接
    if (href && href.startsWith('#')) {
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        e.preventDefault()

        // 计算偏移量，考虑可能的导航栏高度
        const offset = 80
        this.scrollToElement(targetElement, offset, 1000)

        // 更新 URL hash 但不触发滚动
        history.pushState(null, '', href)
      }
    }
  }

  /**
   * 处理 hash 变化事件
   */
  private handleHashChange(): void {
    const hash = window.location.hash
    if (hash) {
      const targetId = hash.substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        const offset = 80
        this.scrollToElement(targetElement, offset, 1000)
      }
    }
  }

  /**
   * 动画循环
   */
  private animate(): void {
    const now = performance.now()
    const deltaTime = Math.min((now - this.lastFrameTime) / 16.67, 2)
    this.lastFrameTime = now

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight

    if (!this.isScrolling && Math.abs(this.scrollVelocity) > this.minVelocity) {
      this.targetScrollY += this.scrollVelocity * deltaTime
      this.scrollVelocity *= Math.pow(this.damping, deltaTime)
    }

    if (this.targetScrollY < -this.maxOverscroll) {
      this.targetScrollY = -this.maxOverscroll
    } else if (this.targetScrollY > maxScroll + this.maxOverscroll) {
      this.targetScrollY = maxScroll + this.maxOverscroll
    }

    let actualScrollY = this.targetScrollY

    if (this.targetScrollY < 0) {
      const overscroll = Math.abs(this.targetScrollY)
      const clampedOverscroll = Math.min(overscroll, this.maxOverscroll)
      const normalizedOverscroll = clampedOverscroll / this.maxOverscroll
      const resistance = 1 - normalizedOverscroll * 0.9
      actualScrollY = -clampedOverscroll * resistance

      if (overscroll > 5) {
        const bounceForce = (0 - this.targetScrollY) * this.bounceStrength * normalizedOverscroll
        this.scrollVelocity += bounceForce * deltaTime
        this.scrollVelocity *= Math.pow(this.bounceDamping, deltaTime)
      }
    } else if (this.targetScrollY > maxScroll) {
      const overscroll = this.targetScrollY - maxScroll
      const clampedOverscroll = Math.min(overscroll, this.maxOverscroll)
      const normalizedOverscroll = clampedOverscroll / this.maxOverscroll
      const resistance = 1 - normalizedOverscroll * 0.9
      actualScrollY = maxScroll + clampedOverscroll * resistance

      if (overscroll > 5) {
        const bounceForce = (maxScroll - this.targetScrollY) * this.bounceStrength * normalizedOverscroll
        this.scrollVelocity += bounceForce * deltaTime
        this.scrollVelocity *= Math.pow(this.bounceDamping, deltaTime)
      }
    }

    const diff = actualScrollY - this.currentScrollY
    const lerpFactor = 1 - Math.pow(1 - this.lerpFactor, deltaTime)
    this.currentScrollY += diff * lerpFactor

    window.scrollTo(0, this.currentScrollY)

    if (this.isScrolling) {
      setTimeout(() => {
        this.isScrolling = false
      }, 100)
    }

    this.animationId = requestAnimationFrame(() => this.animate())
  }

  /**
   * 滚动到指定位置
   */
  public scrollTo(y: number, duration: number = 800): void {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const targetY = Math.max(0, Math.min(maxScroll, y))

    const startY = this.currentScrollY
    const distance = targetY - startY
    const startTime = performance.now()

    this.targetScrollY = targetY
    this.isScrolling = true

    const scrollAnimation = () => {
      const now = performance.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      this.currentScrollY = startY + distance * easeOutQuart

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
    // 清除切换定时器
    if (this.switchTimeout) {
      clearTimeout(this.switchTimeout)
      this.switchTimeout = null
    }

    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }

    // 移除事件监听器
    window.removeEventListener('wheel', this.wheelHandler)
    window.removeEventListener('keydown', this.keydownHandler)
    window.removeEventListener('resize', this.resizeHandler)
    document.removeEventListener('click', this.clickHandler)
    window.removeEventListener('hashchange', this.hashChangeHandler)
    window.removeEventListener('touchstart', this.touchStartHandler)
    window.removeEventListener('touchmove', this.touchMoveHandler)
    window.removeEventListener('touchend', this.touchEndHandler)

    // 移除样式
    const styleElement = document.getElementById('smooth-scroll-styles')
    if (styleElement) {
      styleElement.remove()
    }
  }

  /**
   * 处理页面加载时的初始锚点
   */
  private handleInitialHash(): void {
    const hash = window.location.hash
    if (hash) {
      const targetId = hash.substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        // 等待页面完全加载后再滚动
        setTimeout(() => {
          const offset = 80
          this.scrollToElement(targetElement, offset, 1000)
        }, 300)
      }
    }
  }
}

// 导出类
export default SmoothScroll

// 将类挂载到全局 window 对象
if (typeof window !== 'undefined') {
  ; (window as any).SmoothScroll = SmoothScroll
}
/**
 * 自定义鼠标效果
 * 实现一个跟随鼠标移动的自定义光标，带有平滑过渡和交互效果
 */

class CustomCursor {
  private cursor: HTMLElement | null = null
  private isMouseOverInteractive: boolean = false
  private isMouseOverText: boolean = false
  private checkMousePosition: (target: HTMLElement) => void = () => { }
  private mouseX: number = 0
  private mouseY: number = 0
  private cursorX: number = 0
  private cursorY: number = 0
  private outerX: number = 0
  private outerY: number = 0
  private animationId: number | null = null
  private lerpFactor: number = 0.35
  private outerLerpFactor: number = 0.25

  constructor() {
    this.init()
  }

  /**
   * 初始化自定义鼠标
   */
  private init(): void {
    this.mouseX = window.innerWidth / 2
    this.mouseY = window.innerHeight / 2
    this.cursorX = this.mouseX
    this.cursorY = this.mouseY
    this.outerX = this.mouseX
    this.outerY = this.mouseY

    this.createCursor()
    this.bindEvents()
    this.animate()
  }

  /**
   * 创建自定义鼠标DOM元素
   */
  private createCursor(): void {
    this.cursor = document.createElement('div')
    this.cursor.className = 'custom-cursor'
    this.cursor.innerHTML = `
      <div class="custom-cursor-outer"></div>
      <div class="custom-cursor-inner"></div>
    `
    document.body.appendChild(this.cursor)

    this.addStyles()
  }

  /**
   * 添加自定义鼠标样式
   */
  private addStyles(): void {
    const style = document.createElement('style')
    style.textContent = `
      * {
        cursor: none !important;
      }
      
      input[type="text"], input[type="password"], input[type="email"], 
      input[type="search"], input[type="url"], textarea, [contenteditable="true"] {
        cursor: none !important;
      }
      
      .custom-cursor {
        position: fixed;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
      }
      
      .custom-cursor-outer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 1.5px solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transition: width 0.3s ease-out, height 0.3s ease-out, border-color 0.3s ease-out;
        will-change: transform;
      }
      
      .custom-cursor-inner {
        position: absolute;
        top: 0;
        left: 0;
        width: 8px;
        height: 8px;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        transition: width 0.3s ease-out, height 0.3s ease-out, background-color 0.3s ease-out;
        will-change: transform;
      }
      
      .custom-cursor.hover .custom-cursor-outer {
        width: 28px;
        height: 28px;
        border-color: rgba(255, 255, 255, 0.7);
      }
      
      .custom-cursor.hover .custom-cursor-inner {
        width: 6px;
        height: 6px;
        background-color: rgba(255, 255, 255, 0.85);
      }
      
      .custom-cursor.click .custom-cursor-outer {
        width: 16px;
        height: 16px;
        border-color: rgba(255, 255, 255, 0.85);
      }
      
      .custom-cursor.click .custom-cursor-inner {
        width: 10px;
        height: 10px;
        background-color: rgba(255, 255, 255, 0.85);
      }
      
      .custom-cursor.text .custom-cursor-outer {
        opacity: 0;
      }
      
      .custom-cursor.text .custom-cursor-inner {
        width: 2px;
        height: 22px;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 1px;
      }
      
      @media (max-width: 768px) {
        .custom-cursor {
          display: none;
        }
        
        * {
          cursor: auto !important;
        }
      }
    `
    document.head.appendChild(style)
  }

  /**
   * 绑定事件监听器
   */
  private bindEvents(): void {
    // 鼠标移动事件
    document.addEventListener('mousemove', (e: MouseEvent) => {
      this.mouseX = e.clientX
      this.mouseY = e.clientY

      // 检查是否有文本被选中
      const selection = window.getSelection()
      const isTextSelected = selection && selection.toString().length > 0

      // 如果有文本被选中，显示文本光标
      if (isTextSelected) {
        this.cursor?.classList.add('text')
        this.cursor?.classList.remove('hover')
      } else {
        // 如果没有文本被选中，检查鼠标位置
        this.checkMousePosition(e.target as HTMLElement)
      }
    })

    // 鼠标进入交互元素
    const interactiveElements = 'a, button, input, textarea, select, [role="button"], .vp-button, .copy-button, .code-line'
    const textElements = 'input[type="text"], input[type="password"], input[type="email"], input[type="search"], input[type="url"], textarea, [contenteditable="true"]'

    // 检查鼠标位置的函数
    const checkMousePosition = (target: HTMLElement) => {
      // 检查是否在文本输入元素上
      if (target.matches(textElements) || target.closest(textElements)) {
        this.isMouseOverText = true
        this.isMouseOverInteractive = false
        this.cursor?.classList.add('text')
        this.cursor?.classList.remove('hover')
      }
      // 检查是否在其他交互元素上
      else if (target.matches(interactiveElements) || target.closest(interactiveElements)) {
        this.isMouseOverInteractive = true
        this.isMouseOverText = false
        this.cursor?.classList.add('hover')
        this.cursor?.classList.remove('text')
      }
      // 不在任何特殊元素上
      else {
        this.isMouseOverInteractive = false
        this.isMouseOverText = false
        this.cursor?.classList.remove('hover', 'text')
      }
    }

    // 将函数赋值给实例属性，以便在其他地方使用
    this.checkMousePosition = checkMousePosition

    document.addEventListener('mouseover', (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // 检查是否有文本被选中
      const selection = window.getSelection()
      const isTextSelected = selection && selection.toString().length > 0

      // 如果有文本被选中，显示文本光标
      if (isTextSelected) {
        this.cursor?.classList.add('text')
        this.cursor?.classList.remove('hover')
      } else {
        checkMousePosition(target)
      }
    })

    document.addEventListener('mouseout', (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (target.matches(textElements) || target.closest(textElements)) {
        this.isMouseOverText = false
        this.cursor?.classList.remove('text')
      }
      else if (target.matches(interactiveElements) || target.closest(interactiveElements)) {
        this.isMouseOverInteractive = false
        this.cursor?.classList.remove('hover')
      }
    })

    // 鼠标按下和释放事件
    document.addEventListener('mousedown', () => {
      this.cursor?.classList.add('click')
    })

    document.addEventListener('mouseup', () => {
      this.cursor?.classList.remove('click')

      // 检查是否有文本被选中
      const selection = window.getSelection()
      const isTextSelected = selection && selection.toString().length > 0

      // 如果有文本被选中，显示文本光标
      if (isTextSelected) {
        this.cursor?.classList.add('text')
        this.cursor?.classList.remove('hover')
      }
    })

    // 监听选择变化事件
    document.addEventListener('selectionchange', () => {
      const selection = window.getSelection()
      const isTextSelected = selection && selection.toString().length > 0

      // 如果有文本被选中，显示文本光标
      if (isTextSelected) {
        this.cursor?.classList.add('text')
        this.cursor?.classList.remove('hover')
      } else {
        // 如果没有文本被选中，检查当前鼠标位置
        this.checkMousePosition?.(document.elementFromPoint(this.mouseX, this.mouseY) as HTMLElement)
      }
    })

    // 鼠标离开窗口
    document.addEventListener('mouseleave', () => {
      if (this.cursor) {
        this.cursor.style.opacity = '0'
      }
    })

    document.addEventListener('mouseenter', () => {
      if (this.cursor) {
        this.cursor.style.opacity = '1'
      }
    })
  }

  /**
   * 动画循环
   */
  private animate(): void {
    const dx = this.mouseX - this.cursorX
    const dy = this.mouseY - this.cursorY
    const distance = Math.sqrt(dx * dx + dy * dy)

    const dynamicLerpFactor = distance > 50 ? this.lerpFactor * 1.5 : this.lerpFactor

    this.cursorX += dx * dynamicLerpFactor
    this.cursorY += dy * dynamicLerpFactor

    const outerDx = this.mouseX - this.outerX
    const outerDy = this.mouseY - this.outerY
    this.outerX += outerDx * this.outerLerpFactor
    this.outerY += outerDy * this.outerLerpFactor

    if (this.cursor) {
      const outer = this.cursor.querySelector('.custom-cursor-outer') as HTMLElement
      const inner = this.cursor.querySelector('.custom-cursor-inner') as HTMLElement

      if (outer) {
        outer.style.transform = `translate3d(${this.outerX}px, ${this.outerY}px, 0) translate(-50%, -50%)`
      }
      if (inner) {
        inner.style.transform = `translate3d(${this.cursorX}px, ${this.cursorY}px, 0) translate(-50%, -50%)`
      }
    }

    this.animationId = requestAnimationFrame(() => this.animate())
  }

  /**
   * 销毁自定义鼠标
   */
  public destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }

    if (this.cursor) {
      this.cursor.remove()
      this.cursor = null
    }

    // 移除样式并恢复默认鼠标
    const styles = document.querySelectorAll('style')
    styles.forEach(style => {
      if (style.textContent?.includes('custom-cursor')) {
        style.remove()
      }
    })

    // 恢复默认鼠标样式
    const cursorStyle = document.createElement('style')
    cursorStyle.id = 'restore-cursor-style'
    cursorStyle.textContent = `
      * {
        cursor: auto !important;
      }
    `
    document.head.appendChild(cursorStyle)
  }
}

// 导出类
export default CustomCursor

// 将类挂载到全局 window 对象
if (typeof window !== 'undefined') {
  ; (window as any).CustomCursor = CustomCursor
}
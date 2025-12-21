/**
 * 自定义鼠标效果
 * 实现一个跟随鼠标移动的自定义光标，带有平滑过渡和交互效果
 */

class CustomCursor {
  private cursor: HTMLElement | null = null
  private cursorInner: HTMLElement | null = null
  private isMouseOverInteractive: boolean = false
  private isMouseOverText: boolean = false
  private checkMousePosition: (target: HTMLElement) => void = () => { }
  private mouseX: number = 0
  private mouseY: number = 0
  private cursorX: number = 0
  private cursorY: number = 0
  private animationId: number | null = null

  constructor() {
    this.init()
  }

  /**
   * 初始化自定义鼠标
   */
  private init(): void {
    // 创建自定义鼠标元素
    this.createCursor()
    // 绑定事件
    this.bindEvents()
    // 开始动画循环
    this.animate()
  }

  /**
   * 创建自定义鼠标DOM元素
   */
  private createCursor(): void {
    // 外圈
    this.cursor = document.createElement('div')
    this.cursor.className = 'custom-cursor'
    this.cursor.innerHTML = `
      <div class="custom-cursor-outer"></div>
      <div class="custom-cursor-inner"></div>
    `
    document.body.appendChild(this.cursor)

    // 获取内圈元素
    this.cursorInner = this.cursor.querySelector('.custom-cursor-inner') as HTMLElement

    // 添加样式
    this.addStyles()
  }

  /**
   * 添加自定义鼠标样式
   */
  private addStyles(): void {
    const style = document.createElement('style')
    style.textContent = `
      /* 隐藏默认鼠标 */
      * {
        cursor: none !important;
      }
      
      /* 文本输入元素隐藏默认光标 */
      input[type="text"], input[type="password"], input[type="email"], 
      input[type="search"], input[type="url"], textarea, [contenteditable="true"] {
        cursor: none !important;
      }
      
      /* 自定义鼠标样式 */
      .custom-cursor {
        position: fixed;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.05s ease-out;
      }
      
      .custom-cursor-outer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 1.5px solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.05s ease-out;
      }
      
      .custom-cursor-inner {
        position: absolute;
        top: 0;
        left: 0;
        width: 8px;
        height: 8px;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.02s ease-out;
      }
      
      /* 悬停在交互元素上的效果 */
      .custom-cursor.hover .custom-cursor-outer {
        width: 25px;
        height: 25px;
        border-color: rgba(255, 255, 255, 0.8);
      }
      
      .custom-cursor.hover .custom-cursor-inner {
        width: 4px;
        height: 4px;
        background-color: rgba(255, 255, 255, 0.9);
      }
      
      /* 点击效果 */
      .custom-cursor.click .custom-cursor-outer {
        width: 15px;
        height: 15px;
        border-color: rgba(255, 255, 255, 0.9);
      }
      
      .custom-cursor.click .custom-cursor-inner {
        width: 12px;
        height: 12px;
        background-color: rgba(255, 255, 255, 0.9);
      }
      
      /* 文本选择和输入时的效果 */
      .custom-cursor.text .custom-cursor-outer {
        width: 2px;
        height: 20px;
        border: none;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 1px;
      }
      
      .custom-cursor.text .custom-cursor-inner {
        width: 2px;
        height: 20px;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 1px;
      }
      
      /* 在移动设备上隐藏自定义鼠标 */
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
    // 极弱阻尼的平滑过渡效果
    this.cursorX += (this.mouseX - this.cursorX) * 0.95
    this.cursorY += (this.mouseY - this.cursorY) * 0.95

    if (this.cursor) {
      this.cursor.style.transform = `translate3d(${this.cursorX}px, ${this.cursorY}px, 0)`
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

    // 移除样式
    const styles = document.querySelectorAll('style')
    styles.forEach(style => {
      if (style.textContent?.includes('custom-cursor')) {
        style.remove()
      }
    })
  }
}

// 导出类
export default CustomCursor

// 自动初始化
if (typeof window !== 'undefined') {
  // 只在非移动设备上初始化
  if (!('ontouchstart' in window)) {
    document.addEventListener('DOMContentLoaded', () => {
      new CustomCursor()
    })
  }
}
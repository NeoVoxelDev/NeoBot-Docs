declare class CustomCursor {
  destroy(): void;
}

declare class SmoothScroll {
  destroy(): void;
}

declare class CustomRightClickMenu {
  constructor(options?: { theme?: Record<string, string>; externalStyles?: string[] });
  registerSchema(schema: any): void;
  mount(): void;
  destroy(): void;
}

// 全局类型声明
declare global {
  interface Window {
    smoothScroll?: {
      currentScrollPosition: number;
      scrollTo(y: number, duration?: number): void;
      scrollToElement(element: HTMLElement, offset?: number, duration?: number): void;
      destroy(): void;
    };
    CustomCursor?: typeof CustomCursor;
    SmoothScroll?: typeof SmoothScroll;
    CustomRightClickMenu?: typeof CustomRightClickMenu;
    backToTopInterval?: number | null;
  }
}

export { };
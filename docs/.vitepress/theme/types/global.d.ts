// 全局类型声明
declare global {
  interface Window {
    smoothScroll?: {
      currentScrollPosition: number;
      scrollTo(y: number, duration?: number): void;
      scrollToElement(element: HTMLElement, offset?: number, duration?: number): void;
      destroy(): void;
    };
    backToTopInterval?: number | null;
  }
}

export {};
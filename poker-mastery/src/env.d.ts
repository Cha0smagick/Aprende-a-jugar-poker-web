// Global type declarations for Poker Mastery

interface Window {
  showToast: (message: string, type?: 'info' | 'warning' | 'error' | 'success') => void;
  renderMathInElement: (element: HTMLElement, options: any) => void;
  selectQuizOption: (btn: HTMLElement, qIdx: number, optIdx: number) => void;
}

interface HTMLElementTagNameMap {
  'playing-card': any;
  'card-hand': any;
  'card-board': any;
  'texture-badge': any;
  'preflop-trainer': any;
  'flop-texture-trainer': any;
  'equity-calculator': any;
}

// Allow any dataset property
interface HTMLElement {
  dataset: {
    [key: string]: string | undefined;
    interactive?: string;
    config?: string;
  };
}

// Module declarations for Astro components
declare module '*.astro' {
  const component: any;
  export default component;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<any, any, any>;
  export default component;
}

// CSS modules
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Image imports
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}
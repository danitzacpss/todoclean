// Global type declarations for external analytics libraries

declare global {
  interface Window {
    __TODO_CLEAN_DEBUG__?: {
      version: string;
      buildDate: string;
      environment: string;
    };
  }

  // Google Analytics gtag
  function gtag(command: 'config', targetId: string, config?: any): void;
  function gtag(command: 'event', eventName: string, eventParameters?: any): void;
  function gtag(command: string, ...args: any[]): void;

  // Facebook Pixel fbq
  function fbq(command: 'init', pixelId: string): void;
  function fbq(command: 'track', eventName: string, eventParameters?: any): void;
  function fbq(command: string, ...args: any[]): void;
}

export {};
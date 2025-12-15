import '@testing-library/jest-dom';
import { vi } from "vitest";

(window as any).bootstrap = {
  Modal: class {

    constructor(element: any) {}
    
    show() { return vi.fn(); }
    hide() { return vi.fn(); }
    dispose() { return vi.fn(); }
    
    static getInstance() {
      return {
        show: vi.fn(),
        hide: vi.fn(),
      };
    }
  },
};
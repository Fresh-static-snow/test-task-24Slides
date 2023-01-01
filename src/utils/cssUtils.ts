import { useRef } from 'react';

export const useRenderHighlight = <T extends HTMLElement>(className: string) => {
  const ref = useRef<T | null>(null);

  if (ref.current) {
    ref.current.classList.add(className);
    setTimeout(() => {
      if (ref.current) {
        ref.current.classList.remove(className);
      }
    }, 200);
  }

  return ref;
};

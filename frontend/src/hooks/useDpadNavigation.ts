import { useEffect, useRef, useCallback } from "react";

type FocusableElement = HTMLElement;
interface UseDpadNavigationOptions {
  selector?: string;
  onSelect?: (el: FocusableElement, index: number) => void;
  onBack?: () => void;
  wrap?: boolean;
  columns?: number;
}

/**
 * Fire TV D-pad navigation hook.
 * Handles Arrow keys, Enter (select), Backspace/Escape (back).
 * Works for lists (columns=1) and grids (columns=N).
 */
export function useDpadNavigation(options: UseDpadNavigationOptions = {}) {
  const { selector = "[data-focusable]", onSelect, onBack, wrap = true, columns = 1 } = options;
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef<number>(0);

  const getFocusableElements = useCallback((): FocusableElement[] => {
    if (!containerRef.current) return [];
    return Array.from(containerRef.current.querySelectorAll(selector)) as FocusableElement[];
  }, [selector]);

  const focusAt = useCallback((index: number) => {
    const elements = getFocusableElements();
    if (elements.length === 0) return;
    const clamped = Math.max(0, Math.min(index, elements.length - 1));
    currentIndexRef.current = clamped;
    const el = elements[clamped];
    if (el) { el.focus(); el.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
  }, [getFocusableElements]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const elements = getFocusableElements();
    if (elements.length === 0) return;
    const total = elements.length;
    const focused = document.activeElement as FocusableElement;
    const focusedIndex = elements.indexOf(focused);
    let index = focusedIndex >= 0 ? focusedIndex : currentIndexRef.current;

    switch (e.key) {
      case "ArrowRight": e.preventDefault(); focusAt(index + 1 < total ? index + 1 : (wrap ? 0 : index)); break;
      case "ArrowLeft":  e.preventDefault(); focusAt(index - 1 >= 0 ? index - 1 : (wrap ? total - 1 : index)); break;
      case "ArrowDown":  e.preventDefault(); { const next = index + columns; focusAt(next < total ? next : index); break; }
      case "ArrowUp":    e.preventDefault(); { const prev = index - columns; focusAt(prev >= 0 ? prev : index); break; }
      case "Enter": case " ": e.preventDefault(); { const el = elements[index]; if (el) onSelect?.(el, index); break; }
      case "Backspace": case "Escape": e.preventDefault(); onBack?.(); break;
    }
  }, [getFocusableElements, focusAt, columns, wrap, onSelect, onBack]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const timer = setTimeout(() => focusAt(0), 150);
    return () => clearTimeout(timer);
  }, [focusAt]);

  return containerRef;
}

import React, { useState, useRef, useEffect, useCallback } from 'react';

const EvasiveButton: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [hasMoved, setHasMoved] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<number | null>(null);

  const getBounds = useCallback(() => {
    const parent = buttonRef.current?.closest('.kawaii-glass') as HTMLElement;
    if (!parent) return null;

    const pWidth = parent.clientWidth;
    const pHeight = parent.clientHeight;
    const btnWidth = buttonRef.current?.offsetWidth || 180;
    const btnHeight = buttonRef.current?.offsetHeight || 65;

    // Safe boundaries: keeping the button within the card and below the header text
    return {
      minX: 20,
      minY: 150, // Avoid overlapping the title area
      maxX: pWidth - btnWidth - 20,
      maxY: pHeight - btnHeight - 20
    };
  }, []);

  const teleport = useCallback(() => {
    const bounds = getBounds();
    if (!bounds) return;

    const { minX, minY, maxX, maxY } = bounds;
    const nextX = Math.random() * (maxX - minX) + minX;
    const nextY = Math.random() * (maxY - minY) + minY;

    setPosition({ x: nextX, y: nextY });
    setHasMoved(true);
  }, [getBounds]);

  const handleTrigger = (e: React.SyntheticEvent) => {
    // We explicitly ignore hover-like events if they happen to sneak in
    if (e.type === 'mouseenter' || e.type === 'pointerenter') return;

    // Prevent default and stop propagation to ensure only this trigger runs
    if (e.cancelable) e.preventDefault();
    e.stopPropagation();

    // Ignore triggers if we are already in the "hidden" phase of the cycle
    if (!isVisible) return;

    // 1. INSTANT VANISH
    setIsVisible(false);

    // Clear any existing timers to prevent race conditions
    if (timerRef.current) window.clearTimeout(timerRef.current);

    // 2. MOVE (while invisible)
    teleport();

    // 3. WAIT (400ms as requested)
    timerRef.current = window.setTimeout(() => {
      // 4. REAPPEAR
      setIsVisible(true);
    }, 400);
  };

  useEffect(() => {
    const handleResize = () => {
      // Reset to center on resize to prevent getting lost outside of new bounds
      setPosition(null);
      setHasMoved(false);
      setIsVisible(true);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const style: React.CSSProperties = {
    // Start relative (centered in parent via flex), then switch to absolute for teleporting
    position: hasMoved ? 'absolute' : 'relative',
    left: position ? `${position.x}px` : 'auto',
    top: position ? `${position.y}px` : 'auto',
    zIndex: 50,
    opacity: isVisible ? 1 : 0,
    
    // TRANSITION LOGIC:
    // When hiding (isVisible false): 0s for instant vanish.
    // When showing (isVisible true): 0.3s smooth reappearance.
    transition: isVisible 
      ? 'opacity 0.3s ease-in, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
      : 'opacity 0s, transform 0s',
    
    // SCALE EFFECT:
    // Shrink instantly when vanishing, pop back when appearing
    transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0.1) rotate(-10deg)',
    
    // ACCESSIBILITY & UX:
    // Disable interactions when invisible so it can't be "accidentally" hit twice
    pointerEvents: isVisible ? 'auto' : 'none',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    touchAction: 'none',
    cursor: 'not-allowed'
  };

  return (
    <button
      ref={buttonRef}
      // Triggers only on deliberate touch or click interactions
      onPointerDown={handleTrigger}
      onTouchStart={handleTrigger}
      onMouseDown={handleTrigger}
      // Hover event removed to prevent movement on simple hover
      style={style}
      className={`bratz-button px-8 py-4 sm:px-12 sm:py-6 bg-white text-black border-4 border-black font-chunky rounded-full text-xl sm:text-3xl flex items-center justify-center gap-3 whitespace-nowrap select-none shadow-xl hover:bg-gray-100 ${isVisible ? 'shake-pulse' : ''}`}
    >
      La al9lawi
      <span className="text-2xl sm:text-4xl">🍆</span>
    </button>
  );
};

export default EvasiveButton;
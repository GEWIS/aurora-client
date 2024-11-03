import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';

interface Props extends PropsWithChildren {
  visible: boolean;
  timeout?: number;
  items?: number;
  scrollEmptySpace?: boolean;
  delay?: number;
}

export default function VerticalScroll({
  children,
  visible,
  timeout,
  items,
  scrollEmptySpace
}: Props) {
  // ReturnType used instead of number as one of the dependencies uses @types/node as dependency
  const [timeoutRef, setTimeoutRef] = useState<ReturnType<typeof setTimeout> | undefined>();
  const [iteration, setIteration] = useState(0);

  const containerRef = useRef<HTMLDivElement>();
  const childRef = useRef<HTMLDivElement>();

  const animate = () => {
    const containerHeight = containerRef.current.clientHeight;
    const childHeight = childRef.current.clientHeight;
    const absoluteHeightDifference = childHeight - containerHeight;
    const relativeHeightDifference = absoluteHeightDifference / containerHeight;

    if (absoluteHeightDifference <= 0) return;

    const keyframes: Keyframe[] = [
      {
        transform: 'translateY(0)'
      },
      {
        transform: `translateY(-${absoluteHeightDifference}px)`
      }
    ];
    const supposedDuration = relativeHeightDifference * 12000;
    const duration = timeout ? Math.max(supposedDuration, timeout) : supposedDuration;
    const delay = 4000;

    const options: KeyframeAnimationOptions = {
      duration,
      delay
    };

    childRef.current.animate(keyframes, options);

    return duration + delay;
  };

  // Start an animation with a timeout to increase the iteration counter
  const loopAnimate = () => {
    if (timeoutRef) clearTimeout(timeoutRef);
    const duration = animate();
    setTimeoutRef(setTimeout(() => setIteration((v) => v + 1), duration));
  };

  useEffect(() => {
    if (!containerRef.current || !childRef.current || !visible) return;

    loopAnimate();

    return () => {
      if (timeoutRef) clearTimeout(timeoutRef);
    };
  }, [containerRef, childRef, visible, items, iteration]);

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden">
      <div ref={childRef} className="w-full h-fit">
        {children}
        {scrollEmptySpace &&
          containerRef.current?.clientHeight < childRef.current?.clientHeight && (
            <div style={{ height: containerRef.current.clientHeight / 3 }} />
          )}
      </div>
    </div>
  );
}

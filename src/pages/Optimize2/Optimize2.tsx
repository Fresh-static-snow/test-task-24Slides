import { memo, useCallback, useEffect, useState } from 'react';
import { CenteredBox } from '~/components';

const ExpensiveComponent = memo((): JSX.Element => {
  const now = performance.now();
  while (performance.now() - now < 100) {}
  return <div>Now not that expensive..</div>;
});

export const Optimize2 = (): JSX.Element => {
  const [scrollTop, setScrollTop] = useState<number>(0);

  const handleScroll = useCallback(() => {
    setScrollTop(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.addEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-[1000vh] bg-gradient-to-tr from-gray-100 to-gray-200 bg-repeat bg-[length:100%_8px]">
      <CenteredBox className="gap-4 fixed top-0 left-1/2 -translate-x-1/2">
        <div className="text-3xl">See the code</div>
        <div>{scrollTop} px</div>
        <ExpensiveComponent />
      </CenteredBox>
    </div>
  );
};

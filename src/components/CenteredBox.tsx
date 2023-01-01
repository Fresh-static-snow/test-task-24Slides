import clsx from 'clsx';
import { PropsWithChildren, forwardRef } from 'react';

export const CenteredBox = forwardRef<
  HTMLDivElement,
  PropsWithChildren<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  > & { adjustHeight?: boolean }
>((props, ref) => (
  <div
    ref={ref}
    {...props}
    className={clsx(
      `flex flex-col items-center justify-center ${
        !props.adjustHeight && 'min-h-[calc(100vh-48px)]'
      } pb-32 text-slate-700`,
      props && props.className,
    )}
  >
    {props.children}
  </div>
));

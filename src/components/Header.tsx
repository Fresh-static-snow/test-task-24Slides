import { Link, LinkProps, useMatchRoute } from '@tanstack/react-location';
import clsx from 'clsx';
import { FC } from 'react';

const NavItem: FC<LinkProps> = (props) => {
  const matchRoute = useMatchRoute();
  const active = Boolean(matchRoute({ to: props.to }));
  return (
    <li className="px-4">
      <Link
        {...props}
        className={clsx(
          'relative flex items-center h-12 px-1',
          'text-slate-200 hover:text-white hover:drop-shadow shadow-white transition-all',
          'after:h-0.5 after:w-full after:bg-white after:absolute after:bottom-px after:left-0',
          'after:shadow after:shadow-white after:transition-all after:origin-center',
          active ? 'after:scale-100' : 'after:scale-0',
        )}
      />
    </li>
  );
};

export const Header = (): JSX.Element => (
  <header className="sticky top-0 w-full">
    <nav className="bg-gray-600 shadow-lg">
      <ul className="flex items-center">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/refactor-1">Refactor1</NavItem>
        <NavItem to="/refactor-2">Refactor2</NavItem>
        <NavItem to="/optimize-1">Optimize1</NavItem>
        <NavItem to="/optimize-2">Optimize2</NavItem>
        <NavItem to="/ranges">Ranges</NavItem>
        <NavItem to="/redactor">Editor</NavItem>
      </ul>
    </nav>
  </header>
);

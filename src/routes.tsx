import { Route } from '@tanstack/react-location';
import { Optimize1, Optimize2, Ranges, Editor, Refactor1, Refactor2 } from '~/pages';
import { Welcome } from './components/Welcome';

export const routes: Route[] = [
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: 'refactor-1',
    element: <Refactor1 />,
  },
  {
    path: 'refactor-2',
    element: <Refactor2 />,
  },
  {
    path: 'optimize-1',
    element: <Optimize1 />,
  },
  {
    path: 'optimize-2',
    element: <Optimize2 />,
  },
  {
    path: 'ranges',
    element: <Ranges />,
  },
  {
    path: 'redactor',
    element: <Editor />,
  },
];

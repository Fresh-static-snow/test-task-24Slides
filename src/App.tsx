import { Outlet, ReactLocation, Router } from '@tanstack/react-location';
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { Header } from './components/Header';
import { routes } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      useErrorBoundary: false,
      retry: 2,
    },
  },
  queryCache: new QueryCache({}),
});

const reactLocation = new ReactLocation();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router location={reactLocation} routes={routes}>
        <Header />
        <Outlet />
      </Router>
    </QueryClientProvider>
  );
};

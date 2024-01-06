import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import 'mantine-react-table/styles.css';
import './app.css';
import { MantineProvider } from '@mantine/core';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';
import { AppRouter } from './Router';
import { theme } from './theme';
import { RootErrorResponse } from './models/responseModels';
import ErrorBoundary from './boundary/ErrorBoundary';
// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      throwOnError(error) {
        if (error instanceof RootErrorResponse && error.statusCode >= 500) {
          return true;
        }
        return false;
      },
    },
    queries: {
      throwOnError(error) {
        if (error instanceof RootErrorResponse && error.statusCode >= 500) {
          return true;
        }
        return false;
      },
    },
  },
  queryCache: new QueryCache({
    onError(error, query) {
      if (query.meta && query.meta.errorMessage && query.meta.errorMessage instanceof String) {
        toast.error(query.meta.errorMessage, { position: 'top-right', autoClose: 1000 });
      } else if (error instanceof RootErrorResponse) {
          if (error.statusCode >= 400 && error.statusCode < 500) {
            toast.error(error.userMsg, { position: 'top-right', autoClose: 1000 });
          } else {
            // Go to something went wrong page
          }
        } else {
          // Go to something went wrong page
        }
    },
  }),
  mutationCache: new MutationCache({
    onError(error) {
      if (error instanceof RootErrorResponse) {
        toast.error(error.userMsg, { position: 'top-right', autoClose: 1000 });
      } else {
        toast.error(error.message, { position: 'top-right', autoClose: 1000 });
      }
    },
  }),
});
export default function App() {
  return (
    <ErrorBoundary>
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <AppRouter />
      </QueryClientProvider>
    </MantineProvider>
    </ErrorBoundary>
  );
}

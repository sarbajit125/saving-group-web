import '@mantine/core/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import './app.css';
import { MantineProvider } from '@mantine/core';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';
import { AppRouter } from './Router';
import { theme } from './theme';
import { RootErrorResponse } from './models/responseModels';
import ErrorBoundary from './boundary/ErrorBoundary';
// Create a client
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError(error, query) {
      if (query.meta && query.meta.errorMessage && query.meta.errorMessage instanceof String) {
        toast.error(query.meta.errorMessage, { position: 'bottom-center', autoClose: 1000 });
      } else if (error instanceof RootErrorResponse) {
          if (error.statusCode >= 400 && error.statusCode < 500) {
            toast.error(error.userMsg, { position: 'bottom-center', autoClose: 1000 });
          } else {
            // Go to something went wrong page
          }
        } else {
          // Go to something went wrong page
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

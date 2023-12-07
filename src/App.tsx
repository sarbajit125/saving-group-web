import '@mantine/core/styles.css';
import './app.css';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import { AppRouter } from './Router';
import { theme } from './theme';
import { authStore } from './store/authStore';

// Create a client
const queryClient = new QueryClient();
export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Provider store={authStore}>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
      </Provider>
    </MantineProvider>
  );
}

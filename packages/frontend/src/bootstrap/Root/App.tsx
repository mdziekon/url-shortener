import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppLayout } from '../../common/components/AppLayout/AppLayout.component';
import { ShortenerForm } from '../../modules/Shortener/screens/ShortenerForm/ShortenerForm.component';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <ShortenerForm />
      </AppLayout>
    </QueryClientProvider>
  );
}

export default App;

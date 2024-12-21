import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import GridBackground from './components/ui/grid-background.tsx';
import './index.css';

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URI, // The URL of the GraphQL server
  cache: new InMemoryCache(), // Apollo Client uses this method to cache query results after fetching them
  credentials: 'include', // It allows sending cookies with each requests to the server
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GridBackground >
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </GridBackground>
    </BrowserRouter>
  </StrictMode>,
)

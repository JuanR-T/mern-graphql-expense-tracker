import { ApolloProvider } from '@apollo/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import GridBackground from './components/ui/grid-background';
import { client } from './graphql/client/client.init';
import './index.css';

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

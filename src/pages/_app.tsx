import React from 'react';
import type { AppProps } from 'next/app';
import MainLayout from '@app/layouts/MainLayout';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/shahruz/loot',
  cache: new InMemoryCache()
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ApolloProvider>
  );
}

export default App;

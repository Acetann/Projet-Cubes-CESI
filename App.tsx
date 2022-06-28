import React from 'react';

import { Provider as StoreProvider } from 'react-redux'

import { store } from './src/redux/'
import { RouteNavigator } from './navigation/RouteNavigator';

export default function App() {
  return (
    <StoreProvider store= {store}>
      <RouteNavigator />
    </StoreProvider>
    
  );
}

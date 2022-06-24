import React from 'react';

import { Provider } from 'react-redux'

import { store } from './src/redux/'
import { RouteNavigator } from './navigation/RouteNavigator';

export default function App() {
  return (
    <Provider store= {store}>
      <RouteNavigator />
    </Provider>
    
  );
}

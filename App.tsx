import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { RouteNavigator } from './navigation/RouteNavigator';

export default function App() {
  return (
      <NavigationContainer>
        <RouteNavigator />
      </NavigationContainer>
  );
}

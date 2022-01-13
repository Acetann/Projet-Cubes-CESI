import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Text, View, Image } from 'react-native';
import { Header } from './components';
import { titleStyle } from './styles/styles';

export default function App() {
  return (
    <View style={titleStyle.container}>
      <Header color='red' />
      <Text style={titleStyle.title}>Première vue de l'application</Text>
      <Image
       style={{width:300, height:300 }}
       source={{
        uri: "https://cdn.futura-sciences.com/buildsv6/images/wide1920/1/2/8/128d271d8d_50159499_animaux-rayure-canonique.jpg"
      }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

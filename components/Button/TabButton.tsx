import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { Colors } from '../../config/colors/colors';
import { RouteParams } from '../../navigation/RouteNavigator';

export const TabButton = (currentTab: string, setCurrentTab: Function, title: string) => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

    let iconName;

    switch (title) {
      case "Accueil":
        iconName = 'home'
        break;
      case "Profil":
        iconName = 'person'
        break;
      case "Mes Publications":
        iconName = 'book'
        break;
      case "Paramètres":
        iconName = 'settings'
        break;
      case "Mes amis":
        iconName = 'people'
        break;
      case "Utilisateurs":
        iconName = 'people'
        break;
      case "Publications":
        iconName = 'book'
        break;
      case "Commentaires":
        iconName = 'chat'
        break;
      default: 
      iconName = 'logout'
        break;
    }
    switch (currentTab) {
      case "Profil":
        navigation.navigate('Profile')
        break;
      case "Mes Publications":
        navigation.navigate('MyPublication')
        break;
      case "Paramètres":
        navigation.navigate('Paramètres')
        break;
      case "Mes amis":
        navigation.navigate('MyFriend')
        break;
      case "Utilisateurs":
        navigation.navigate('Utilisateurs')
        break;
      case "Publications":
        navigation.navigate('Publication')
        break;
      case "Commentaires":
        navigation.navigate('Comments')
        break;
      default: 
        break;
    }
    
    return (
      <TouchableOpacity onPress={() => {
        if (title == "Déconnexion") {
          navigation.navigate('LandingScreen')
        } else {
          setCurrentTab(title)
        }
      }}>
        <View style={{
          flexDirection: "row",
          alignItems: 'center',
          paddingVertical: 8,
          backgroundColor: currentTab == title ? 'white' : 'transparent',
          paddingLeft: 13,
          paddingRight: 35,
          borderRadius: 8,
        }}>
          <Icon name={String(iconName)} color={currentTab == title ? Colors.blue : "white"} />
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            paddingLeft: 15,
            color: currentTab == title ? Colors.blue : "white"
          }}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
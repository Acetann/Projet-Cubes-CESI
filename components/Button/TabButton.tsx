import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { RouteParams } from '../../navigation/RouteNavigator';

export const TabButton = (currentTab: string, setCurrentTab: Function, title: string) => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

    let iconName;
                  
    if(title === "Accueil"){
       iconName = 'home';
      } else if (title === "Paramètres") {
      iconName = 'settings';
      } else if (title === "Connexion") {
        iconName = 'login';
      } else if (title === "Inscription") 
      { iconName = 'create';
    } else { iconName = 'logout' }

    if(currentTab === "Inscription"){
      navigation.navigate('Create')
    }else if (currentTab === "Connexion"){
      navigation.navigate('Login')
    }else if (currentTab === "Paramètres"){
      navigation.navigate('Paramètres')
    }
    console.log(currentTab)
    return (
      <TouchableOpacity onPress={() => {
        if (title == "Déconnexion") {
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
          <Icon name={String(iconName)} color={currentTab == title ? "#5359D1" : "white"} />
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            paddingLeft: 15,
            color: currentTab == title ? "#5359D1" : "white"
          }}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
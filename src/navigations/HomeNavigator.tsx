import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ABONNE, ABONNEMENT, AMIS, EDIT_PROFILE, MESSAGE, SETTINGS } from '../constants/routesName';

import TabBarNavigation from './TabBarNavigator';
import { Settings } from '../tabs/Settings/Settings';
import { MyFriend } from '../screens/Social/Amis';
import { Abonne } from '../screens/Social/Abonne';
import { Abonnement } from '../screens/Social/Abonnement';
import { Message } from '../components/Social/Message';
import { Edit_profil } from '../screens/Profil/EditProfil';


export const HomeNavigator = () => {
    const HomeStack = createStackNavigator();
   
    return(
        <HomeStack.Navigator initialRouteName="Tabs">
            <HomeStack.Screen options={{headerShown: false}} name="Tabs" component={TabBarNavigation} />
            <HomeStack.Screen name={SETTINGS} component={Settings}></HomeStack.Screen>
            <HomeStack.Screen name={AMIS} component={MyFriend} ></HomeStack.Screen>
            <HomeStack.Screen name={ABONNE} component={Abonne} ></HomeStack.Screen>
            <HomeStack.Screen name={ABONNEMENT} component={Abonnement} ></HomeStack.Screen>
            <HomeStack.Screen name={MESSAGE} component={Message} ></HomeStack.Screen>
            <HomeStack.Screen name={EDIT_PROFILE} options={{ headerShown: false }} component={Edit_profil} ></HomeStack.Screen>
        </HomeStack.Navigator>
    )
}
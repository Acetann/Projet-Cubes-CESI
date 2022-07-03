import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ABONNE, ABONNEMENT, ADDABONNE, ADDABONNEMENT, ADDAMIS, AMIS, EDIT_PROFILE, MESSAGE, SETTINGS } from '../constants/routesName';
import TabBarNavigation from './TabBarNavigator';
import { Settings } from '../tabs/Settings/Settings';
import { Amis } from '../screens/Social/Amis';
import { Abonne } from '../screens/Social/Abonne';
import { Abonnement } from '../screens/Social/Abonnement';
import { Message } from '../components/Social/Message';
import { Edit_profil } from '../screens/Profil/EditProfil';
import { AddAmis } from '../screens/Social/Ajouter/AddAmis';
import { AddAbonne } from '../screens/Social/Ajouter/AddAbonne';
import { AddAbonnement } from '../screens/Social/Ajouter/AddAbonnement';


export const HomeNavigator = () => {
    const HomeStack = createStackNavigator();
   
    return(
        <HomeStack.Navigator initialRouteName="Tabs">
            <HomeStack.Screen options={{headerShown: false}} name="Tabs" component={TabBarNavigation} />
            <HomeStack.Screen name={SETTINGS} component={Settings}></HomeStack.Screen>
            <HomeStack.Screen options={{headerTitle: 'Mes amis'}} name={AMIS} component={Amis} ></HomeStack.Screen>
            <HomeStack.Screen options={{headerTitle: 'Ajouter un ami'}} name={ADDAMIS} component={AddAmis} ></HomeStack.Screen>
            <HomeStack.Screen options={{headerTitle: 'Mes abonnés'}} name={ABONNE} component={Abonne} ></HomeStack.Screen>
            <HomeStack.Screen options={{headerTitle: 'Ajouter un abonné'}} name={ADDABONNE} component={AddAbonne} ></HomeStack.Screen>
            <HomeStack.Screen options={{headerTitle: 'Mes abonnements'}} name={ABONNEMENT} component={Abonnement} ></HomeStack.Screen>
            <HomeStack.Screen options={{headerTitle: 'Ajouter un abonnement'}} name={ADDABONNEMENT} component={AddAbonnement} ></HomeStack.Screen>
            <HomeStack.Screen name={MESSAGE} component={Message} ></HomeStack.Screen>
            <HomeStack.Screen name={EDIT_PROFILE} options={{ headerShown: false }} component={Edit_profil} ></HomeStack.Screen>
        </HomeStack.Navigator>
    )
}
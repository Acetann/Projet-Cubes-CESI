import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CONTACT_DETAIL, CONTACT_LIST, CREATE_CONTACT, SETTINGS } from '../constants/routesName';

import TabBarNavigation from './TabBarNavigator';
import { Settings } from '../tabs/Settings/Settings';


export const HomeNavigator = () => {
    const HomeStack = createStackNavigator();
   
    return(
        <HomeStack.Navigator initialRouteName="Tabs">
            <HomeStack.Screen options={{headerShown: false}} name="Tabs" component={TabBarNavigation} />
{/*             <HomeStack.Screen name={CONTACT_DETAIL} component={ContactDetails}></HomeStack.Screen>
            <HomeStack.Screen name={CREATE_CONTACT} component={CreateContact}></HomeStack.Screen> */}
            <HomeStack.Screen name={SETTINGS} component={Settings}></HomeStack.Screen>
        </HomeStack.Navigator>
    )
}
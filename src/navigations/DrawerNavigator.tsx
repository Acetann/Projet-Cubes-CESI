import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeNavigator } from './HomeNavigator';
import { HOME_NAVIGATOR } from '../constants/routesName';
import { SideMenu } from './SideMenu';



const getDrawerContent= () => {
    return <SideMenu />
}

export const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator drawerContent={({}) =>getDrawerContent()}>
            <Drawer.Screen name={HOME_NAVIGATOR} component={HomeNavigator}></Drawer.Screen>
        </Drawer.Navigator>
    )
}


import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeNavigator } from './HomeNavigator';
import { HOME_NAVIGATOR } from '../constants/routesName';
import { SideMenu } from './SideMenu';
import { GlobalContext } from '../context/globalContext';


const getDrawerContent= ({}) => {
    return <SideMenu />
}

export const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();
    const {authDispatch} = useContext(GlobalContext)

    return (
        <Drawer.Navigator drawerContent={({}) =>getDrawerContent(authDispatch)}>
            <Drawer.Screen name={HOME_NAVIGATOR} component={HomeNavigator}></Drawer.Screen>
        </Drawer.Navigator>
    )
}


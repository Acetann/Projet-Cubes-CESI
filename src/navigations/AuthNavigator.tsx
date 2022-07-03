import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LOGIN, REGISTER } from '../constants/routesName';
import { Register } from '../screens/Register';
import { Login } from '../screens/Login';

export type RouteParams = {
    Amis: undefined
    Abonne: undefined
    Abonnement: undefined
    Login: undefined
    Register: undefined
}

const AuthStack = createStackNavigator<RouteParams>();

export const AuthNavigator = () => {

    return (
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
            <AuthStack.Screen name={LOGIN} component={Login}></AuthStack.Screen>
            <AuthStack.Screen name={REGISTER} component={Register} ></AuthStack.Screen>
        </AuthStack.Navigator>
    )
}
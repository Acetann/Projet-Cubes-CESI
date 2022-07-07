import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LOGIN, REGISTER } from '../constants/routesName';
import { Register } from '../screens/Register';
import { Login } from '../screens/Login';

export type RouteParams = {
    Abonne: undefined
    AddAbonne: undefined
    Abonnement: undefined
    AddAbonnement: undefined
    Message: undefined
    Edit_profil: {
        image: string,
        pseudo: string,
        description: string,
        mail: string
    }
    Profil: undefined
    Login: undefined
    Register: undefined
    MyPublication: undefined
    AddPublication: undefined
    EditPublication : {
        image: string;
        id: string;
        titre: string;
        texte: string;
    }
    AddCommentaire: {
        id: string
    }
    Tabs: undefined
    Channel: undefined
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
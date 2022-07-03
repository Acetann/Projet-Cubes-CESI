import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from './AuthNavigator';
import { DrawerNavigator } from './DrawerNavigator';
import { GlobalContext } from '../context/globalContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from '@ant-design/react-native';

export const AppNavContainer = () => {
    const { authState: {isLoggedIn}} = useContext(GlobalContext);
    const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn)
    const [authLoaded, setAuthLoaded] = useState(false)

        const getUser= async() => {
        try {
            //recupère l'user connecté
            const utilisateur = await AsyncStorage.getItem('currentUser')

            //si un utilisateur est trouvé, setIsAuthenticated true
            if(utilisateur){
                setAuthLoaded(true)
                setIsAuthenticated(true)
            //si pas d'utilisateur, setIsauthenticated reste false
            }else{
                setAuthLoaded(true)
                setIsAuthenticated(false)

            }
        } catch(error) {}
    };

    useEffect(() => {
        getUser();
    }, [isLoggedIn]);


    return (
        <>
        {authLoaded ? (
            <NavigationContainer>
                    { isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />}
            </NavigationContainer>
            ) : (
            <ActivityIndicator />
            )}
            </>
        );
    };
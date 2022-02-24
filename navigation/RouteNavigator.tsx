import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Count, Create, Header, Home } from "../components";
import { NavigationContainer } from "@react-navigation/native";
import TabBarNavigation from "./TabBarNavigation";
import { Login } from "../components/Login/Login";
import { Settings } from "../components/Settings/Settings";

export type RouteParams = {
    Home: undefined
    Header: undefined
    Count: undefined
    Create: undefined
    Details: undefined
    Login: undefined
    Paramètres: undefined
}

const Stack = createNativeStackNavigator<RouteParams>();

export const RouteNavigator = () => {
    return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home}  />
        <Stack.Screen name="Details" component={Header} />
        <Stack.Screen name="Count" component={Count} />
        <Stack.Screen name="Create" component={Create} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Paramètres" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
    )
}
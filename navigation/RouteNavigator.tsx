import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Header } from "../components";
import { Home } from "../components/Home/Home";

export type RouteParams = {
    Home: undefined
    Header: undefined
}

const Stack = createNativeStackNavigator<RouteParams>();

export const RouteNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen 
                    name="Home" 
                    component={Home}/>
                <Stack.Screen 
                    name="Header"
                    component={Header} options={{
                    animation:"slide_from_right"
                }}/>
            </Stack.Group>
        </Stack.Navigator>
    )
}
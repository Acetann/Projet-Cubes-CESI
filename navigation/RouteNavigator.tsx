import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Count, Header, Home } from "../components";

export type RouteParams = {
    Home: undefined
    Header: undefined
    Count: undefined
}

const Stack = createNativeStackNavigator<RouteParams>();

export const RouteNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Group>
                
                <Stack.Screen 
                    name="Header"
                    component={Header} 
                    options={{
                    animation:"slide_from_right"
                }}/>
                
            </Stack.Group>
        </Stack.Navigator>
    )
}
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Count, Create, Header, Home } from "../components";
import { NavigationContainer } from "@react-navigation/native";
import { Login } from "../components/Login/Login";
import { Settings } from "../components/Settings/Settings";
import { LandingScreen } from "./LandingScreen";
import { Profile } from "../components/Profile/Profile";
import { MyPublication } from "../components/Publications/MyPublication";
import { MyFriend } from "../components/Friends/MyFriend";
import { Users } from "../components/Users/Utilisateurs";
import { Publication } from "../components/Publications/Publication";
import { Comments } from "../components/Comments/Comments";
import { MailProfile } from "../components/Profile/MailProfile";
import { PrenomProfile } from "../components/Profile/PrenomProfile";

export type RouteParams = {
    Home: undefined
    Header: undefined
    Count: undefined
    Create: undefined
    Details: undefined
    Login: undefined
    Paramètres: undefined
    LandingScreen: undefined
    Profile: undefined
    MyPublication: undefined
    MyFriend: undefined
    Users: undefined
    Publication: undefined
    Comments: undefined
    Mail: {mail: string}
    Prenom: {prenom: string}
    Nom: {nom: string}
    Pseudo: {pseudo: string}
}

const Stack = createNativeStackNavigator<RouteParams>();

export const RouteNavigator = () => {
    return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="Details" component={Header} />
        <Stack.Screen name="Count" component={Count} />
        <Stack.Screen name="Create" component={Create} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="MyPublication" component={MyPublication} />
        <Stack.Screen name="MyFriend" component={MyFriend} />
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="Publication" component={Publication} />
        <Stack.Screen name="Comments" component={Comments} />
        <Stack.Screen name="Paramètres" component={Settings} />
        <Stack.Screen name="Mail" component={MailProfile} />
        <Stack.Screen name="Prenom" component={PrenomProfile} />
        <Stack.Screen name="Nom" component={MailProfile} />
        <Stack.Screen name="Pseudo" component={MailProfile} />
      </Stack.Navigator>
    </NavigationContainer>
    )
}
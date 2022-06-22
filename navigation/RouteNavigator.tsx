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
import { Utilisateurs } from "../components/Users/Utilisateurs";
import { Publication } from "../components/Publications/Publication";
import { Comments } from "../components/Comments/Comments";
import { MailProfile } from "../components/Profile/MailProfile";
import { PrenomProfile } from "../components/Profile/PrenomProfile";
import TabBarNavigation from "./TabBarNavigation";
import { NomProfile } from "../components/Profile/NomProfile";
import { PseudoProfile } from "../components/Profile/PseudoProfile";
import Abonne from "../components/Social/components/Abonne";
import Abonnement from "../components/Social/components/Abonnement";
import { AllPublication } from "../components/Publications/AllPublications";

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
    Amis: undefined
    Utilisateurs: undefined
    Publication: undefined
    AllPublication: undefined
    Comments: undefined
    Mail: {mail: string}
    Prenom: {prenom: string}
    Nom: {nom: string}
    Pseudo: {pseudo: string}
    Tabs: undefined
    Abonne: undefined
    Abonnement: undefined
    Geolocalisation: undefined
}

const Stack = createNativeStackNavigator<RouteParams>();

export const RouteNavigator = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LandingScreen">
          <Stack.Screen options={{headerShown: false}} name="LandingScreen" component={LandingScreen} />
          <Stack.Screen options={{headerShown: false}} name="Tabs" component={TabBarNavigation} />
          <Stack.Screen name="Details" component={Header} />
          <Stack.Screen name="Count" component={Count} />
          <Stack.Screen name="Create" component={Create} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen options={{headerTitle: 'Mes Publications'}} name="MyPublication" component={MyPublication} />
          <Stack.Screen options={{headerTitle: 'Publications'}} name="AllPublication" component={AllPublication} />
          <Stack.Screen options={{headerTitle: 'BOnjour'}} name="Amis" component={MyFriend} />
          <Stack.Screen name="Utilisateurs" component={Utilisateurs} />
          <Stack.Screen name="Publication" component={Publication} />
          <Stack.Screen name="Comments" component={Comments} />
          <Stack.Screen name="Paramètres" component={Settings} />
          <Stack.Screen name="Mail" component={MailProfile} />
          <Stack.Screen name="Prenom" component={PrenomProfile} />
          <Stack.Screen name="Nom" component={NomProfile} />
          <Stack.Screen name="Pseudo" component={PseudoProfile} />
          <Stack.Screen name="Abonne" component={Abonne} />
          <Stack.Screen name="Abonnement" component={Abonnement} />
          <Stack.Screen name="Geolocalisation" component={Abonnement} />
        </Stack.Navigator>
    </NavigationContainer>
    )
}
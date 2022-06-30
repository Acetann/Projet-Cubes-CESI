import { Button } from "@ant-design/react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { RouteParams } from "../../src/screens/navigation/RouteNavigator";

interface SocialProps{}

export const Social: React.FunctionComponent<SocialProps> = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

    return (
        <View style={{justifyContent:'space-between', margin: 16}}>
            <Button
                children={'Voir la liste de mes amis'}
                onPress={() => navigation.navigate('Amis')}
            />
            <Button
                children={'Voir la liste de mes abonnés'}
                onPress={() => navigation.navigate('Abonne')}
            />
            <Button
                children={'Voir la liste de mes abonnements'}
                onPress={() => navigation.navigate('LandingScreen')}
            />
        </View>
    )
}
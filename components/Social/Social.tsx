import { Button } from "@ant-design/react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Colors } from "../../config/colors/colors";
import { RouteParams } from "../../navigation/RouteNavigator";
import ListUserContent from "./components/ListUserContent";

interface SocialProps{}

export const Social: React.FunctionComponent<SocialProps> = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

    return (
        <View style={{flex:1, backgroundColor:Colors.primary}}>
            <ListUserContent isSocial />
            <Button
                style={{marginHorizontal: responsiveWidth(5),borderRadius: 16}}
                children={'Voir la liste de mes amis'}
                onPress={() => navigation.navigate('Amis')}
            />
            <ListUserContent isSocial />
            <Button
                style={{ marginHorizontal: responsiveWidth(5),borderRadius: 16}}
                children={'Voir la liste de mes abonnés'}
                onPress={() => navigation.navigate('Abonne')}
            />
            <ListUserContent isSocial />
            <Button
                style={{marginHorizontal: responsiveWidth(5),borderRadius: 16}}
                children={'Voir la liste de mes abonnements'}
                onPress={() => navigation.navigate('Abonnement')}
            />
        </View>
    )
}
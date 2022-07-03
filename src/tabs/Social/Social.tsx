import { Button } from "@ant-design/react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import ListUserContent from "../../components/Social/ListUserContent";
import { ABONNE, ABONNEMENT, AMIS } from "../../constants/routesName";
import { RouteParams } from "../../navigations/AuthNavigator";

interface SocialProps{}

export const Social: React.FunctionComponent<SocialProps> = () => {
    
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

    return (
        <View>
            <ListUserContent />
            <Button
                style={{marginHorizontal: responsiveWidth(5),borderRadius: 16}}
                children={'Voir la liste de mes amis'}
                onPress={() => navigation.navigate(AMIS)}
            />
            <ListUserContent />
            <Button
                style={{ marginHorizontal: responsiveWidth(5),borderRadius: 16}}
                children={'Voir la liste de mes abonnés'}
                onPress={() => navigation.navigate(ABONNE)}
            />
            <ListUserContent />
            <Button
                style={{marginHorizontal: responsiveWidth(5),borderRadius: 16}}
                children={'Voir la liste de mes abonnements'}
                onPress={() => navigation.navigate(ABONNEMENT)}
            />
        </View>
    )
}
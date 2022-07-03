import { Button } from "@ant-design/react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import ListUserContent from "../../components/Social/ListUserContent";
import { ABONNE, ABONNEMENT, AMIS } from "../../constants/routesName";
import { RouteParams } from "../../navigations/AuthNavigator";

interface SocialProps{}

export const Social: React.FunctionComponent<SocialProps> = () => {
    
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

    return (
        <ScrollView>
            <Text style={{fontSize:18, marginHorizontal:responsiveWidth(5), marginTop: responsiveWidth(5)}}>{'Mes amis'}</Text>
            <ListUserContent />
            <Button
                style={{marginHorizontal: responsiveWidth(5),borderRadius: 16}}
                children={'Voir tous mes amis'}
                onPress={() => navigation.navigate(AMIS)}
            />
            <Text style={{fontSize:18,marginHorizontal:responsiveWidth(5), marginTop: responsiveWidth(5)}}>{'Mes abonnés'}</Text>
            <ListUserContent />
            <Button
                style={{ marginHorizontal: responsiveWidth(5),borderRadius: 16}}
                children={'Voir tous mes abonnés'}
                onPress={() => navigation.navigate(ABONNE)}
            />
            <Text style={{fontSize:18,marginHorizontal:responsiveWidth(5), marginTop: responsiveWidth(5)}}>{'Mes abonnements'}</Text>
            <ListUserContent />
            <Button
                style={{marginHorizontal: responsiveWidth(5),borderRadius: 16}}
                children={'Voir tous mes abonnements'}
                onPress={() => navigation.navigate(ABONNEMENT)}
            />
            <View style={{marginBottom: responsiveWidth(5)}} />
        </ScrollView>
    )
}
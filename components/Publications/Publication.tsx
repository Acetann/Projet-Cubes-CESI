import { Button } from "@ant-design/react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { RouteParams } from "../../navigation/RouteNavigator";
import { AllPublicationContent } from "./components/AllPublicationContent";

interface PublicationProps{}

export const Publication: React.FunctionComponent<PublicationProps> = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
    return (
        <View style={{}}>
            <AllPublicationContent isPublicationHome />
            <Button
                style={{marginHorizontal: responsiveWidth(5),borderRadius: 16}}
                children={'Voir la liste de toutes les publications'}
                onPress={() => navigation.navigate('AllPublication')}
            />
            <AllPublicationContent isPublicationHome />
            <Button
                style={{marginHorizontal: responsiveWidth(5),borderRadius: 16}}
                children={'Voir la liste de mes publications'}
                onPress={() => navigation.navigate('MyPublication')}
            />
        </View>
    )
}
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";

import SwiperSocial from "../../components/Social/Swiper/SwiperSocial";
import { RouteParams } from "../../navigations/AuthNavigator";

interface SocialProps{}

export const Social: React.FunctionComponent<SocialProps> = () => {
    
    return (
        <SwiperSocial />
    )
}
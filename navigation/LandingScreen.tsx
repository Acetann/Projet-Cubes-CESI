import React from "react"
import Swiper from "../components/Swiper/Swiper";
import LandingHeader from "../components/Header/LandingHeader";

interface LandingScreenProps {}

export const LandingScreen: React.FunctionComponent<LandingScreenProps> = () => {
    return (
    <>
        <LandingHeader/>
        <Swiper />
    </>
    )
}
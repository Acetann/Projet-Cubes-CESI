import React from "react"
import { View } from "react-native"
import { responsiveWidth } from "react-native-responsive-dimensions";
import { mainStyle } from "../../styles/styles"
import { Input } from "../Create/Input"


interface PseudoProps {
    pseudo: string;
}

export const PseudoProfile: React.FunctionComponent<PseudoProps> = ({pseudo}) => {
    return (
          <View style={{margin:responsiveWidth(5)}}>
              <View style={mainStyle.containerCreate}>
                <View style={mainStyle.sectionStyle}>
                  <Input
                    value={pseudo}
                  />
                </View>
              </View>
          </View>
    )
}
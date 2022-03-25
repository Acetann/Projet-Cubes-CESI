import React from "react"
import { View } from "react-native"
import { responsiveWidth } from "react-native-responsive-dimensions";
import { mainStyle } from "../../styles/styles"
import { Input } from "../Create/Input"


interface PrenomProps {
    prenom: string;
}

export const PrenomProfile: React.FunctionComponent<PrenomProps> = ({prenom}) => {
    return (
          <View style={{margin:responsiveWidth(5)}}>
              <View style={mainStyle.containerCreate}>
                <View style={mainStyle.sectionStyle}>
                  <Input
                    value={prenom}
                  />
                </View>
              </View>
          </View>
    )
}
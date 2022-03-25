import React from "react"
import { View } from "react-native"
import { responsiveWidth } from "react-native-responsive-dimensions";
import { mainStyle } from "../../styles/styles"
import { Input } from "../Create/Input"


interface NomProps {
    nom: string;
}

export const NomProfile: React.FunctionComponent<NomProps> = ({nom}) => {
    return (
          <View style={{margin:responsiveWidth(5)}}>
              <View style={mainStyle.containerCreate}>
                <View style={mainStyle.sectionStyle}>
                  <Input
                    value={nom}
                  />
                </View>
              </View>
          </View>
    )
}
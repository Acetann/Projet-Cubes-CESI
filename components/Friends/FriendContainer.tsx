import React from "react";
import {Image, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { lightColors } from "../../config/colors/colors";

interface FriendContainerProps{
    name: string,
    pseudo: string,
    source?: string,
}

export const FriendContainer: React.FunctionComponent<FriendContainerProps> = ({name, pseudo,source}) => {

    return (
        <View style={{padding: responsiveWidth(3)}}>
            <View style={{flexDirection:'row', alignItems:'center', paddingVertical: responsiveWidth(5), paddingHorizontal: responsiveWidth(3), backgroundColor:lightColors.blue}}>
                <View style={{flex:1,flexDirection:'row', alignItems:'center'}}>
                    {source && <View style={{marginRight: responsiveWidth(3)}}>
                        <Image
                            style={{width:50, height:50}}
                            source={{uri: source}}
                        />
                    </View>}
                    <View>
                        <Text>
                            {name}
                        </Text>
                        <Text>
                            {pseudo}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={{backgroundColor:lightColors.red, borderRadius:16}}>
                    <Icon name="close" color={lightColors.white} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
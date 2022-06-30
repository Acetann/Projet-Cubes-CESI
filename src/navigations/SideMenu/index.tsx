import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeNavigator } from '../HomeNavigator';
import { HOME_NAVIGATOR, LOGIN, SETTINGS } from '../../constants/routesName';
import { SafeAreaView, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Container } from '../../components/common/Container';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteParams } from '../AuthNavigator';
import { useNavigation } from '@react-navigation/native';

export const SideMenu = ({}) => {

    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
    const menuItems=[
        {
            icon: <Text>1</Text>, name:"Settings", onPress:() => {
                navigation.navigate(SETTINGS)
            }
        },
        {
            icon: <Text>2</Text>, name: "Logout", onPress: () => {
                /* navigation.navigate(LOGIN); */
            }
        },
    ]
    return (
        <SafeAreaView>
            <Container>
                <Image
                    height={70}
                    width={70}
                    source={require('../../assets/images/logo.png')}
                    style={styles.logoImage}
                />
                <View style={styles.separation}>
                    {menuItems.map(({name, icon, onPress}) => (
                    <TouchableOpacity onPress={onPress} key={name} style={styles.item}>
                        {icon}
                        <Text style={styles.itemText}>{name}</Text>
                    </TouchableOpacity>
                    ))}
                </View>
            </Container>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    logoImage: {
        height: 150,
        width: 150,
        alignSelf: 'center',
        marginTop: 50,
        borderRadius: 20
    },
    separation:{
        marginTop: 20
    },
    item:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemText: {
        fontSize: 17,
        paddingVertical : 7,
        paddingLeft: 20
    }
})
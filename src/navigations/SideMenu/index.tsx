import React, { useContext } from 'react';
import { SETTINGS } from '../../constants/routesName';
import { SafeAreaView, Image, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Container } from '../../components/common/Container';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteParams } from '../AuthNavigator';
import { useNavigation } from '@react-navigation/native';
import logout from '../../context/actions/auth/logout';
import a from '@ant-design/react-native/lib/modal/operation';
import { GlobalContext } from '../../context/globalContext';

export const SideMenu = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

    const { authDispatch } = useContext(GlobalContext)

    const getDeconnected = () => {
        Alert.alert('Déconnexion!', 'Es-tu sûr de vouloir te déconnecter ?', [
            {
                text: 'Annuler',
                onPress: () => {}
            },
            {
                text: 'Oui',
                onPress: () => {
                    logout()(authDispatch)
                }
            },
        ]);
    }
    
    const menuItems=[
        {
            icon: <Text>1</Text>, 
            name:"Settings", 
            onPress:() => {
                navigation.navigate(SETTINGS)
            }
        },
        {
            icon: <Text>2</Text>, 
            name: "Logout", 
            onPress: getDeconnected
        } 
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
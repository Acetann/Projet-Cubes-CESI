import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Container } from '../common/Container'
import { Input } from '../common/Input'
import { CustomButton } from '../common/Button'
import color from '../../assets/theme/color'
import { REGISTER } from '../../constants/routesName'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteParams } from '../../navigations/AuthNavigator'
import { Message } from '../common/Message'

interface LoginProps {
    onSubmit: Function
    onChange: Function
    form: {}
    errors: {
        mail: string
        mot_de_passe: string
    }
    error: {
        mail: string
        mot_de_passe: string
        error: string
    }
    loading: any
}

export const LoginComponent: React.FC<LoginProps> = ({
    onSubmit,
    onChange,
    form,
    errors,
    error,
    loading
}) => {

    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
    const [isSecureEntry, setIsSecureEntry] = useState(true);


    return (
            <Container>
                <Image
                    height={70} 
                    width={70}
                    source={require('../../assets/images/logo.png')}
                    style={styles.logoImage}
                    />
                    <View>
                        <Text style={styles.title}>Bienvenue sur Socially</Text>
                        <Text style={styles.subTitle}>Connectez vous ici</Text>

                       {/*  {error && !error.error && (
                            <Message
                                onDismiss={() => {}}
                                danger
                                message="invalid credentials"
                            />
                        )}

                        {<Message danger onDismiss message={error?.error} />} */}
                            
                        <View style={styles.form}>
                            <Input
                                placeholder="Mail"
                                onChangeText={(value: string) => {
                                    onChange({ name: 'mail', value })
                                }}  
                   
                            />
                            <Input
                                placeholder="Mot de passe"
                                icon={<Text>SHOW</Text>}
                                iconPosition='right'
                                isSecure={isSecureEntry}
                                onChangeText={(value: string) => {
                                    onChange({ name: 'mot_de_passe', value })
                                }}  
                        
                            />
                            <CustomButton 
                            onPress={onSubmit} 
                            loading={loading}
                            secondary 
                            title="Se connecter" 
                            />

                            <View style={styles.createSection}>
                                <Text>Pas encore de compte ?</Text>
                                <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(REGISTER)
                                }}>
                                    <Text style={styles.linkBtn}>Créer un compte</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                </View>
            </Container>
        )
    }

    const styles = StyleSheet.create({
        logoImage: {
            height: 200,
            width: 200,
            alignSelf: 'center',
            marginTop: 50,
            borderRadius: 20
        },

        title: {
            fontSize: 21,
            textAlign: 'center',
            paddingTop: 20,
            fontWeight: '500',
        },

        subTitle: {
            fontSize: 17,
            textAlign: 'center',
            paddingVertical: 20,
            fontWeight: '500',
        },

        form: {
            paddingTop: 20,
        },

        createSection: {
            flexDirection: 'row',
        },
        linkBtn: {
            paddingLeft: 17,
            color: color.primary,
            fontSize: 16,
        },

        infoText: {
            fontSize: 17,
        },
    });
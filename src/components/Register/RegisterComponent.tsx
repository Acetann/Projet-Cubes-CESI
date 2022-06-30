import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Container } from '../common/Container'
import { Input } from '../common/Input'
import { CustomButton } from '../common/Button'
import color from '../../assets/theme/color'
import { LOGIN } from '../../constants/routesName'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteParams } from '../../navigations/AuthNavigator'
import { Message } from '../common/Message'

interface RegisterProps{
    onSubmit: Function
    onChange: Function
    form: {}
    errors: {
        nom : string
        prenom: string
        pseudo: string
        mail: string
        mot_de_passe: string
        confirmMdp: string;
    }
    error:{
        nom: string
        prenom: string
        pseudo: string
        mail: string
        mot_de_passe: string
        confirmMdp: string;
        error: string
    }
    loading:{}
}

export const RegisterComponent: React.FC<RegisterProps> = ({
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

                <View style={styles.createSection}>
                    <View style={{ width: "50%" }}>
                        {error?.error && (
                            <Message retry danger retryFn={onSubmit} message={error?.error}/>
                        )}
                        <Input
                            placeholder="Nom"
                            error={errors.nom || error?.nom?.[0]}
                            onChangeText={(value: string) => {
                                onChange({name: 'nom', value})
                            }}  
                        />
                        <Input
                            placeholder="Prenom"
                            error={errors.prenom || error?.prenom?.[0]}
                            onChangeText={(value: string) => {
                                onChange({ name: 'prenom', value })
                            }}
                        />
                    </View>
                </View>

                <View>
                    <Input
                        placeholder="Pseudo"
                        error={errors.pseudo || error?.pseudo?.[0]}
                        onChangeText={(value: string) => {
                            onChange({ name: 'pseudo', value })
                        }}
                    />

                    <View>
                    <Input
                        placeholder="Mail"
                        error={errors.mail || error?.mail?.[0]}
                        onChangeText={(value: string) => {
                            onChange({ name: 'mail', value })
                        }}
                    />

                    <View style={styles.form}>
                    <Input
                        placeholder="Mot de passe"
                        error={errors.mail || error?.mot_de_passe?.[0]}
                        icon={<Text>SHOW</Text>}
                        iconPosition='right'
                        isSecure={isSecureEntry}
                        onChangeText={(value: string) => {
                            onChange({ name: 'mot_de_passe', value })
                        }}
                    />
                    <Input
                        placeholder="Confirmer le mot de passe"
                        error={errors.mail || error?.confirmMdp?.[0]}
                        icon={<Text>SHOW</Text>}
                        iconPosition='right'
                        isSecure={isSecureEntry}
                        onChangeText={(value: string) => {
                            onChange({ name: 'confirmMdp', value })
                        }}
                    />
                    <CustomButton
                    onPress={onSubmit} 
                    disabled={loading}
                    loading={loading}
                    primary 
                    title="S'enregistrer" />

                    <View style={styles.createSection}>
                        <Text>Déja un compte ?</Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(LOGIN);
                            }}>
                            <Text style={styles.linkBtn}>Se connecter</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
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
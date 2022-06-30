import { useNavigation } from "@react-navigation/native"
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React, { useCallback, useContext, useState } from "react"
import { Container } from "../../components/common/Container"
import { RegisterComponent } from "../../components/Register/RegisterComponent"
import { LOGIN } from "../../constants/routesName"
import register, { clearAuthState } from "../../context/actions/auth/register"
import { GlobalContext } from "../../context/globalContext"
import { RouteParams } from "../../navigations/AuthNavigator"

export const Register = () => {

    const [form, setForm] = useState({
        nom:'',
        prenom: '',
        pseudo: '',
        mail: '',
        mot_de_passe: '',
        confirmMdp: ''
    });

    const [errors, setErrors] = useState({
        nom: '',
        prenom: '',
        pseudo: '',
        mail: '',
        mot_de_passe: '',
        confirmMdp: ''
    });

    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

    const { authDispatch, authState:{error, loading, data}} = 
    useContext(GlobalContext)
        useFocusEffect(
            useCallback(() => {
                return () => {
                    if (data || error) {
                        clearAuthState()(authDispatch);
                    }
                }
            }, [data, error]),
        );

    //handle state du formulaire
    const onChange = ({name, value}) => {
        setForm({...form, [name]: value})

        // Enleve affichage des erreurs
        if (value !== '') {
            if (name == 'mot_de_passe') {
                //minimum mot de passe
                if (value.length < 6) {
                    setErrors((prev) => {
                        return { ...prev, [name]: 'Le mot de passe doit contenir au minimum 6 caractères' };
                    });
                } else {
                    setErrors((prev) => {
                        return { ...prev, [name]: null };
                    });
                }
            } else {
                setErrors((prev) => {
                    return { ...prev, [name]: null };
                });
            }
        }else{
            //display required field 
            setErrors((prev) => {
                return {...prev, [name]: 'Ce champ est obligatoire'}
            })
        }
    }

    const onSubmit = () => {
        //Affichage des erreurs si submit sans value
        //nom
        if(!form.nom){
            setErrors((prev) => {
                return {...prev, nom: 'Veuillez renseigner un nom'}
            });
        }
        //prenom
        if (!form.prenom) {
            setErrors((prev) => {
                return { ...prev, prenom: 'Veuillez renseigner un prenom' }
            });
        }
        //pseudo
        if (!form.pseudo) {
            setErrors((prev) => {
                return { ...prev, pseudo: 'Veuillez renseigner un pseudo' }
            });
        }
        //mail
        if (!form.mail) {
            setErrors((prev) => {
                return { ...prev, mail: 'Veuillez renseigner un email' }
            });
        }
        //mot_de_pass
        if (!form.mot_de_passe) {
            setErrors((prev) => {
                return { ...prev, mot_de_passe: 'Veuillez renseigner un mot de passe' }
            });
        }
        //confirMdp
        if (!form.confirmMdp) {
            setErrors((prev) => {
                return { ...prev, confirmMdp: 'Veuillez confirmer votre mot de passe' }
            });
        }

        if (
            Object.values(form).length === 6 &&
            Object.values(form).every((item) => item.trim().length > 0) &&
            Object.values(errors).every((item) => !item)
        ) {
            //requete et redirection
           register(form)(authDispatch);
           navigation.navigate(LOGIN)
        }
    };
    
    return (
        <Container>
            <RegisterComponent
            onSubmit={onSubmit}
            onChange={onChange}
            form={form}
            errors={errors}
            error={error}
            loading={loading}
            />
        </Container>   
    )
}

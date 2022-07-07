import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react"
import { LoginComponent } from "../../components/Login/LoginComponent";
import login from "../../context/actions/auth/login";
import { GlobalContext } from "../../context/globalContext";
import { RouteParams } from "../../navigations/AuthNavigator";

//Fonction utilisée pour la connexion
export const Login = () => {

    //Fonction qui donne accès à l'objet navigation et permet de récuperer les props de RouteParams
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

    //On définit une variable d'état
    // qui par défaut aura une valeur mail et mot de passe <string> vide
    const [form, setForm] = useState({
        mail: '',
        mot_de_passe: '',
    });

    //On définit une variable d'état
    // qui par défaut aura une valeur mail et mot de passe <string> vide
    //pour afficher les erreurs de chaque champ indépendemment
    const [errors, setErrors] = useState({
        mail: '',
        mot_de_passe: '',
    });

    //Le contexte permet de recuperer dans tout l'app le currentUser loggé 
    //système de session
    const { authDispatch, authState: { error, loading } } = useContext(GlobalContext)
   

    //Fonction qui appelle la fonction login
    //si il y a un mail et un mot de passe de renseigné
    const onSubmit = () => {
        if (form.mail && form.mot_de_passe){
            login(form)(authDispatch);
        }
    };

    //Fonction qui modifie et enregistre les valeurs entrées par le user dans les input
    const onChange = ({name, value}) => {
        setForm({...form, [name]: value});
    }

    return <LoginComponent 
        onSubmit={onSubmit}
        onChange={onChange}
        form={form}
        errors={errors}
        error={error}
        loading={loading} />;

};


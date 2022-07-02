import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react"
import { LoginComponent } from "../../components/Login/LoginComponent";
import login from "../../context/actions/auth/login";
import { GlobalContext } from "../../context/globalContext";
import { RouteParams } from "../../navigations/AuthNavigator";

export const Login = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

    const [form, setForm] = useState({
        mail: '',
        mot_de_passe: '',
    });

    const [errors, setErrors] = useState({
        mail: '',
        mot_de_passe: '',
    });

    

    const { authDispatch, authState: { error, loading } } = useContext(GlobalContext)
   
    const onSubmit = () => {
        if (form.mail && form.mot_de_passe){
            login(form)(authDispatch);
        }
    };

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


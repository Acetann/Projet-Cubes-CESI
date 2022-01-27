import React from 'react';
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {ScrollView, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '../Button/Button';
import { Input } from "../Create/Input";
import { text } from "../../words/words";
import { mainStyle } from '../../styles/styles';


interface LoginProps {}

type FormValue = {
    email: string;
    password: string;
}

export const Login: React.FunctionComponent<LoginProps> = () => {
  
    const validationSchema = Yup.object
        ({
          email: Yup.string().email(text.email.validate).required(text.email.required),
          password: Yup.string().min(8, text.password.validate).required(text.password.required),
        }).required();

    const {
      control, handleSubmit, clearErrors, formState: {errors},
    } = useForm<FormValue>({resolver: yupResolver(validationSchema)})

    const signup = () => {
      clearErrors();
      console.log("Create account here...");
    };

    return (
      <ScrollView style={mainStyle.container}>
          <Controller control={control} name="email" render={({field: {onChange, value}, fieldState: {error}}) => 
            (
              <Input
                label="Email"
                value={value}
                placeholder="Email"
                onChangeText={onChange}
                error={Boolean(error)}
                errorDetails={error?.message}
              />
            )}
          /> 
          <Controller control={control} name="password" render={({field: {onChange, value}, fieldState: {error}}) => 
            (
              <Input
                label="Mot de passe"
                placeholder="Mot de passe"
                value={value}
                password
                onChangeText={onChange}
                error={Boolean(error)}
                errorDetails={error?.message}
              />
            )}
          />
            {errors && Object.keys(errors).length > 0 && 
              <Text style={{color:"red", marginLeft: 16, marginVertical:8}}>
                Veuillez remplir tous les champs obligatoires
              </Text>
            }
          <Button onPress={handleSubmit(signup)}>Se connecter</Button>
      </ScrollView>
    )
}
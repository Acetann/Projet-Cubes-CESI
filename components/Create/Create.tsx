import React from 'react';
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {ScrollView, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '../Button/Button';
import { Input } from "./Input";
import { text } from "../../words/words";
import { mainStyle } from '../../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteParams } from '../../navigation/RouteNavigator';


interface CreateProps {}

type FormValue = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const Create: React.FunctionComponent<CreateProps> = () => {
  
    const validationSchema = Yup.object
        ({
          email: Yup.string().email(text.email.validate).required(text.email.required),
          firstName: Yup.string().required(text.firstName),
          lastName: Yup.string().required(text.lastName),
          password: Yup.string().min(8, text.password.validate).required(text.password.required),
          confirmPassword: Yup.string().required(text.password.confirm).oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas"),
        }).required();

    const {
      control, handleSubmit, clearErrors, formState: {errors},
    } = useForm<FormValue>({resolver: yupResolver(validationSchema)})

    const navigation = useNavigation();
    const signup = () => {
      clearErrors();
      navigation.navigate("Login" as never)
    };

    return (
      <ScrollView style={mainStyle.container}>
          <View style={{flexDirection:"row"}}>
            <View style={{width:"50%"}}>
              <Controller control={control} name="lastName" render={({field: {onChange, value}, fieldState: {error}}) => 
                (
                  <Input
                    label="Nom"
                    placeholder="Nom"
                    value={value}
                    onChangeText={onChange}
                    error={Boolean(error)}
                    errorDetails={error?.message}
                  />
                )}
              /> 
            </View>
            <View style={{width:"50%"}}>
              <Controller control={control} name="firstName" render={({field: {onChange, value}, fieldState: {error}}) => 
                (
                  <Input
                    label="Prénom"
                    placeholder="Prénom"
                    value={value}
                    onChangeText={onChange}
                    error={Boolean(error)}
                    errorDetails={error?.message}
                  />
                )}
              />
            </View>
          </View>
          <Controller control={control} name="email" render={({field: {onChange, value}, fieldState: {error}}) => 
            (
              <Input
                label="Email"
                placeholder="Email"
                value={value}
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
          <Controller control={control} name="confirmPassword" render={({field: {onChange, value}, fieldState: {error}}) => 
            (
              <Input
                label="Confirmer le mot de passe"
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
          <Button onPress={handleSubmit(signup)}>Créer mon compte</Button>
      </ScrollView>
    )
}
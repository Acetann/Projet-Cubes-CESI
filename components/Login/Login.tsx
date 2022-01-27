import React from 'react';
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {ScrollView, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '../Button/Button';
import { Input } from "../Create/Input";
import { text } from "../../words/words";
import { mainStyle } from '../../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteParams } from '../../navigation/RouteNavigator';


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

    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
    const connection = () => {
      clearErrors();
      navigation.navigate("Home")
    };

    return (
      <View style={mainStyle.container}>
          <Controller control={control} name="email" render={({field: {onChange, value}, fieldState: {error}}) => 
            (
              <Input
                label={text.email.email}
                placeholder={text.email.email}
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
                label={text.password.password}
                placeholder={text.password.password}
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
                {text.error.allError}
              </Text>
            }
          <Button onPress={handleSubmit(connection)} children={text.login.signUp}/>
      </View>
    )
}
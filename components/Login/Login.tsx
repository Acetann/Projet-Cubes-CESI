import React, { useState } from 'react';
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '../Button/Button';
import { Input } from "../Create/Input";
import { text } from "../../words/words";
import { mainStyle } from '../../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteParams } from '../../navigation/RouteNavigator';
import { Icon } from 'react-native-elements';


interface LoginProps {}

type FormValue = {
    email: string;
    password: string;
}

export const Login: React.FunctionComponent<LoginProps> = () => {
  
    const [visiblePassword, setVisiblePassword] = useState(Boolean(true))
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
              <View style={{marginHorizontal:16, marginVertical:8}}>
                  <View style={{flexDirection:"row"}}>
                    <Text style={{color: "red",marginBottom:8, marginRight:4}}>*</Text>
                    <Text style={{color: "black",marginBottom:8}}>{text.email.email}</Text>
                  </View>
                  <View style={mainStyle.containerCreate}>
                    <View style={mainStyle.sectionStyle}>
                      <Input
                        value={value}
                        onChangeText={onChange}
                        error={Boolean(error)}
                        errorDetails={error?.message}
                      />
                    </View>
                  </View>
              </View>
            )}
          /> 
          <Controller control={control} name="password" render={({field: {onChange, value}, fieldState: {error}}) => 
            (
              <View style={{marginHorizontal:16, marginVertical:8}}>
                <View style={{flexDirection:"row"}}>
                  <Text style={{color: "red",marginBottom:8, marginRight:4}}>*</Text>
                  <Text style={{color: "black",marginBottom:8}}>{text.password.password}</Text>
                </View>
                <View style={mainStyle.containerCreate}>
                  <View style={mainStyle.sectionStyle}>
                    <Input
                      value={value}
                      password={visiblePassword}
                      onChangeText={onChange}
                      error={Boolean(error)}
                      errorDetails={error?.message}
                    />
                    <TouchableOpacity activeOpacity={0.5} onPress={() => {
                      !visiblePassword && setVisiblePassword(true),
                      visiblePassword && setVisiblePassword(false)
                    }}>
                      <Icon name={visiblePassword ? "visibility" : "visibility-off"} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
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
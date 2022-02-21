import React from 'react';
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Image, ScrollView, Text, View} from 'react-native';
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
          firstName: Yup.string().required(text.firstName.validate),
          lastName: Yup.string().required(text.lastName.validate),
          password: Yup.string().min(8, text.password.validate).required(text.password.required),
          confirmPassword: Yup.string().required(text.password.confirm).oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas"),
        }).required();

    const {
      control, handleSubmit, clearErrors, formState: {errors},
    } = useForm<FormValue>({resolver: yupResolver(validationSchema)})

    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
    const signup = () => {
      clearErrors();
      navigation.navigate("Login")
    };

    return (
      <ScrollView style={mainStyle.container}>
          <View style={{flexDirection:"row"}}>
            <View style={{width:"50%"}}>
              <Controller control={control} name="lastName" render={({field: {onChange, value}, fieldState: {error}}) => 
                (
                  <View style={{marginHorizontal:16, marginVertical:8}}>
                    <View style={{flexDirection:"row"}}>
                      <Text style={{color: "red",marginBottom:8, marginRight:4}}>*</Text>
                      <Text style={{color: "black",marginBottom:8}}>{text.lastName.lastName}</Text>
                    </View>
                    <View style={mainStyle.containerCreate}>
                      <View style={mainStyle.sectionStyle}>
                        <Input
                          placeholder={text.lastName.lastName}
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
            </View>
            <View style={{width:"50%"}}>
              <Controller control={control} name="firstName" render={({field: {onChange, value}, fieldState: {error}}) => 
                (
                  <View style={{marginHorizontal:16, marginVertical:8}}>
                    <View style={{flexDirection:"row"}}>
                      <Text style={{color: "red",marginBottom:8, marginRight:4}}>*</Text>
                      <Text style={{color: "black",marginBottom:8}}>{text.firstName.firstName}</Text>
                    </View>
                    <View style={mainStyle.containerCreate}>
                      <View style={mainStyle.sectionStyle}>
                        <Input
                          placeholder={text.firstName.firstName}
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
            </View>
          </View>
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
                        placeholder={text.email.email}
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
                      placeholder={text.password.password}
                      value={value}
                      password
                      onChangeText={onChange}
                      error={Boolean(error)}
                      errorDetails={error?.message}
                    />
                    <Image
                        source={{
                          uri:
                            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/input_username.png',
                        }}
                        style={mainStyle.imageStyle}
                      />
                  </View>
                </View>
              </View>
            )}
          />
          <Controller control={control} name="confirmPassword" render={({field: {onChange, value}, fieldState: {error}}) => 
            (
              <View style={{marginHorizontal:16, marginVertical:8}}>
                <View style={{flexDirection:"row"}}>
                  <Text style={{color: "red",marginBottom:8, marginRight:4}}>*</Text>
                  <Text style={{color: "black",marginBottom:8}}>{text.password.confirmPassword}</Text>
                </View>
                <View style={mainStyle.containerCreate}>
                  <View style={mainStyle.sectionStyle}>
                    <Input
                      placeholder={text.password.password}
                      value={value}
                      password
                      onChangeText={onChange}
                      error={Boolean(error)}
                      errorDetails={error?.message}
                    />
                    <Image
                        source={{
                          uri:
                            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/input_username.png',
                        }}
                        style={mainStyle.imageStyle}
                      />
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
          <Button onPress={handleSubmit(signup)} children={text.create.create} />
      </ScrollView>
    )
}

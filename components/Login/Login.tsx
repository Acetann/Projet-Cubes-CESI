import React, { useState } from 'react';
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Text, TouchableOpacity, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';

import { Input } from "../Create/Input";
import { text } from "../../words/words";
import { mainStyle } from '../../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteParams } from '../../navigation/RouteNavigator';
import { Icon } from 'react-native-elements';
import { buttonStyle } from '../Button/ButtonStyle';
import { Button } from '@ant-design/react-native';
import { Cesi, Maison, Alex} from '../../api';
import { responsiveWidth } from 'react-native-responsive-dimensions';


interface LoginProps {}

type FormValue = {
    mail: string;
    mot_de_passe: string;
}

export const Login: React.FunctionComponent<LoginProps> = () => {
  
  
    const [visiblePassword, setVisiblePassword] = useState(Boolean(true))
    const validationSchema = Yup.object
        ({
          mail: Yup.string().email(text.email.validate).required(text.email.required),
          mot_de_passe: Yup.string().min(8, text.password.validate).required(text.password.required),
        }).required();

    const {
      control, handleSubmit, clearErrors, formState: {errors},
    } = useForm<FormValue>({resolver: yupResolver(validationSchema)})

    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
    const [mail, setMail] = useState('')
    const [mot_de_passe, setMot_de_passe] = useState('')

    const onConnect = async (mail: string, mot_de_passe: string) => {
      if (mail === '' || mot_de_passe === '') {
        alert("All fields are required");
        return;
      }
      await fetch(`http://${Cesi}:3000/api/connexion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mail: mail,
          mot_de_passe : mot_de_passe
        })
      })
        .then(async res => {
          try {
            if (res.status === 200) {
              navigation.navigate("Tabs")
            }
          } catch (err) {
            console.log(err,'erreur');
          };
        })
        .catch(err => {
          console.log(err);
        });
    };

    const connection = () => {
      onConnect(mail, mot_de_passe);
    };
    return (
      <View style={mainStyle.container}>
          <Controller control={control} name="mail" render={({fieldState: {error}}) => 
            (
              <View style={{marginHorizontal:16, marginVertical:8}}>
                  <View style={{flexDirection:"row"}}>
                    <Text style={{color: "red",marginBottom:8, marginRight:4}}>*</Text>
                    <Text style={{color: "black",marginBottom:8}}>{text.email.email}</Text>
                  </View>
                  <View style={mainStyle.containerCreate}>
                    <View style={mainStyle.sectionStyle}>
                      <Input
                        value={mail}
                        onChangeText={text => setMail(text)}
                        error={Boolean(error)}
                      />
                    </View>
                  </View>
              </View>
              )}
            />
          <Controller control={control} name="mot_de_passe" render={({fieldState: {error}}) => 
            (
              <View style={{marginHorizontal:16, marginVertical:8}}>
                <View style={{flexDirection:"row"}}>
                  <Text style={{color: "red",marginBottom:8, marginRight:4}}>*</Text>
                  <Text style={{color: "black",marginBottom:8}}>{text.password.password}</Text>
                </View>
                <View style={mainStyle.containerCreate}>
                  <View style={mainStyle.sectionStyle}>
                    <Input
                      value={mot_de_passe}
                      password={visiblePassword}
                      onChangeText={text => setMot_de_passe(text)}
                      error={Boolean(error)}
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
            <View style={[mainStyle.center,{padding: responsiveWidth(5)}]}>
              <Button type="primary" onPress={() => connection()} style={buttonStyle.Container}>{text.login.signUp}</Button>
            </View>
      </View>
    )
}
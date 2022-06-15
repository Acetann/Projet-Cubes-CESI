import React, { useState } from 'react';
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { ScrollView, Text, TouchableOpacity, View} from 'react-native';
import { Controller, useForm } from 'react-hook-form';

import { Input } from "./Input";
import { text } from "../../words/words";
import { mainStyle } from '../../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteParams } from '../../navigation/RouteNavigator';
import { Icon } from 'react-native-elements';
import { buttonStyle } from '../Button/ButtonStyle';
import { Button } from '@ant-design/react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { Cesi, Maison, Alex } from '../../api';

interface CreateProps {}

type FormValue = {
    prenom: string;
    nom: string;
    mail: string;
    mot_de_passe: string;
    pseudo: string;
    confirmMdp: string;
}

export const Create: React.FunctionComponent<CreateProps> = () => {
  
  

    const [visiblePassword, setVisiblePassword] = useState(Boolean(true))
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(Boolean(true))

    const validationSchema = Yup.object
        ({
          mail: Yup.string().email(text.email.validate).required(text.email.required),
          prenom: Yup.string().required(text.firstName.validate),
          lastName: Yup.string().required(text.lastName.validate),
          pseudo: Yup.string().required(text.pseudo.validate),
          password: Yup.string().min(8, text.password.validate).required(text.password.required),
          confirmPassword: Yup.string().required(text.password.confirm).oneOf([Yup.ref("password")], "Mot de passe différent"),
        }).required();

    const { control, handleSubmit, clearErrors, formState: {errors}} = useForm<FormValue>({resolver: yupResolver(validationSchema)})

    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [mail, setMail] = useState('')
  const [mot_de_passe, setMot_de_passe] = useState('')
  const [pseudo, setPseudo] = useState('')
  const [confirmMdp, setConfirmMdp] = useState('')

  const signUp = async (nom: string, prenom: string, mail: string, mot_de_passe: string) => {

  /*   if (nom === '' || prenom === '' || pseudo === '' || mail === '' || mot_de_passe === '' || mdpConfirm === '') {
      alert("Un ou plusieurs champs sont vides");
      return;
    } */
    
      await fetch(`http://${Cesi}:3000/api/utilisateur`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nom: nom,
        prenom: prenom,
        mail: mail,
        mot_de_passe: mot_de_passe,
      })
    })
    .then((response) => response.text())
    .then((responseData) => {
     console.log(responseData)
    })
  };

  const register = () => {
    signUp(nom, prenom, mail, mot_de_passe);
  };

    return (
      <ScrollView style={mainStyle.container}>
          <View style={{flexDirection:"row"}}>
            <View style={{width:"50%"}}>
            <Controller control={control} name="nom" render={({ fieldState: {error} }) => 
                (
                  <View style={{marginHorizontal:16, marginVertical:8}}>
                    <View style={{flexDirection:"row"}}>
                      <Text style={{color: "red",marginBottom:8, marginRight:4}}>*</Text>
                      <Text style={{color: "black",marginBottom:8}}>{text.lastName.lastName}</Text>
                    </View>
                    <View style={mainStyle.containerCreate}>
                      <View style={mainStyle.sectionStyle}>
                        <Input
                          value={nom}
                          onChangeText={text => setNom(text)}
                          error={Boolean(error)}
                        />
                      </View>
                    </View>
                  </View>
                )}
              /> 
            </View>
            <View style={{width:"50%"}}>
              <Controller control={control} name="prenom" render={({ fieldState: {error} }) => 
                (
                  <View style={{marginHorizontal:16, marginVertical:8}}>
                    <View style={{flexDirection:"row"}}>
                      <Text style={{color: "red",marginBottom:8, marginRight:4}}>*</Text>
                      <Text style={{color: "black",marginBottom:8}}>{text.firstName.firstName}</Text>
                    </View>
                    <View style={mainStyle.containerCreate}>
                      <View style={mainStyle.sectionStyle}>
                        <Input
                          value={prenom}
                          onChangeText={text => setPrenom(text)}
                          error={Boolean(error)}
                        />
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
       <Controller control={control} name="pseudo" render={({ fieldState: { error } }) =>
        (
          <View style={{ marginHorizontal: 16, marginVertical: 8 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "red", marginBottom: 8, marginRight: 4 }}>*</Text>
              <Text style={{ color: "black", marginBottom: 8 }}>{text.pseudo.pseudo}</Text>
            </View>
            <View style={mainStyle.containerCreate}>
              <View style={mainStyle.sectionStyle}>
                <Input
                  value={pseudo}
                  onChangeText={text => setPseudo(text)}
                  error={Boolean(error)}
                />
              </View>
            </View>
          </View>
        )}
        />
          <Controller control={control} name="mail" render={({ fieldState: {error} }) => 
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
          <Controller control={control} name="mot_de_passe" render={({ fieldState: {error} }) => 
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
          <Controller control={control} name="confirmMdp" render={({ fieldState: {error}}) => 
            (
              <View style={{marginHorizontal:16, marginVertical:8}}>
                <View style={{flexDirection:"row"}}>
                  <Text style={{color: "red",marginBottom:8, marginRight:4}}>*</Text>
                  <Text style={{color: "black",marginBottom:8}}>{text.password.confirmPassword}</Text>
                </View>
                <View style={mainStyle.containerCreate}>
                  <View style={mainStyle.sectionStyle}>
                    <Input
                      value={confirmMdp}
                      password={visibleConfirmPassword}
                      onChangeText={text => setConfirmMdp(text)}
                      error={Boolean(error)}
                      errorDetails={error?.message}
                    />
                    <TouchableOpacity activeOpacity={0.5} onPress={() => {
                      !visibleConfirmPassword && setVisibleConfirmPassword(true),
                      visibleConfirmPassword && setVisibleConfirmPassword(false)
                    }}>
                      <Icon name={visibleConfirmPassword ? "visibility" : "visibility-off"} />
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
              <Button type="primary" onPress={register} style={buttonStyle.Container}>{text.create.create}</Button>
          </View>
      </ScrollView>
    )
}

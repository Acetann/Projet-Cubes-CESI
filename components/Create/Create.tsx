import React from 'react';
import {ScrollView, Text } from 'react-native';
import { Button } from '../Button/Button';
import { Input } from "./Input";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { text } from "../../words/words";
import { Controller, useForm } from 'react-hook-form';

interface CreateProps {}

type FormValue = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const Create: React.FunctionComponent<CreateProps> = () => {
    const signup = () => {
        console.log("Create account here...");
      };
      

      const validationSchema = Yup.object({
          email: Yup.string().email(text.email.validate).required(text.email.required),
          firstName: Yup.string().required(text.firstName),
          lastName: Yup.string().required(text.lastName),
          password: Yup.string().min(8, text.password.validate).required(text.password.required),
        }).required();

        const {control, handleSubmit, formState: {errors}} = useForm<FormValue>({
            resolver: yupResolver(validationSchema)
        })
      return (
        <ScrollView >
        <Text >
          Création de compte
        </Text>
        <Controller control={control} name="firstName" render={({field: {onChange, value}}) => (<Input
          label="Prénom"
          value={value}
          placeholder="Marie"
          onChangeText={onChange}
        />)}/>
        <Controller control={control} name="lastName" render={({field: {onChange, value}}) => (<Input
          label="Nom"
          value={value}
          placeholder="Marie"
          onChangeText={onChange}
        />)}/> 
        <Controller control={control} name="email" render={({field: {onChange, value}}) => (<Input
          label="Email"
          value={value}
          placeholder="Marie"
          onChangeText={onChange}
        />)}/> 
        <Controller control={control} name="password" render={({field: {onChange, value}}) => (<Input
          label="Password"
          value={value}
          placeholder="Marie"
          onChangeText={onChange}
        />)}/>
        <Button onPress={handleSubmit(signup)}>Créer mon compte</Button>
      </ScrollView>
    )
}
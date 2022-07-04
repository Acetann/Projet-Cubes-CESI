import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { AddPublicationComponent } from '../../../components/Publications/AddPublication';
import { axiosInstance } from '../../../helpers/axios.interceptor';
import { RouteParams } from '../../../navigations/AuthNavigator';


export const AddPublication = () => {
 
    return (
        <AddPublicationComponent/>
    )
}
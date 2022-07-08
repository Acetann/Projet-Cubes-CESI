import React, { Fragment, useEffect, useState } from "react";
import { ScrollView, Text, View, Image, StyleSheet, RefreshControl, ActivityIndicator } from "react-native";
import color from "../../assets/theme/color";
import { CustomButton } from "../../components/common/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteParams } from "../../navigations/AuthNavigator";
import { EDIT_PROFILE } from "../../constants/routesName";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Colors } from "../../../config/colors/colors";
import { axiosInstance } from "../../helpers/axios.interceptor";

interface ProfilProps{
    modalVisible : any,
    setModalVisible: any
}

export const Profil: React.FC<ProfilProps> = () => {
const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
const [refreshing, setRefreshing] = useState(true);
const [myprofil, setMyProfil] = useState("")

    const getMyProfil = async () => {
        axiosInstance.get('/utilisateur/monprofil')
            .then((res) => {
                setMyProfil(res.data)
                setRefreshing(false);
                /* return res.data */
                
            })
            .catch((err) => {
                console.log(err)
            });
    }

    useEffect(() => {
        getMyProfil();
        
    }, []);
    return (
        <>
            {refreshing && <ActivityIndicator />}
            <ScrollView 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={getMyProfil} />
                }
                style={{ 
                    backgroundColor: Colors.white,
                    paddingHorizontal: responsiveWidth(3),
                }}>
                <View style={{marginVertical: responsiveWidth(5)}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
                        <Image
                            style={{
                                height: 80,
                                width: 80,
                                backgroundColor: color.grey,
                                borderRadius: 80,
                            }}
                            source={{ uri: myprofil?.image }}
                        />
                        <View style={{alignItems:'center'}}>
                            <Text style={{ fontWeight: '400', fontSize: 18, color: color.success }}>{myprofil?.ressources?.length > 0 ? myprofil?.ressources?.length : 0}</Text>
                            <Text style={{ fontSize: 18, color: color.grey}}>{'Post(s)'}</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Text style={{ fontWeight: '400', fontSize: 18, color: color.success }}>{myprofil?.nbdabonne}</Text>
                            <Text style={{ fontSize: 18, color: color.grey }}>{'Abonné(s)'}</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Text style={{ fontWeight: '400', fontSize: 18, color: color.success }}>{myprofil?.nbdabonnement}</Text>
                            <Text style={{ fontSize: 18, color: color.grey }}>{'Abonnement(s)'}</Text>
                        </View>
                    </View>
                </View>
                <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold' }}>
                    {myprofil?.pseudo}
                </Text>
                <Text style={{ fontSize: 16, color: 'black', marginTop: 5, marginBottom: 20 }}>
                    {myprofil?.description}
                </Text>
                <CustomButton
                    onPress={() => {
                        navigation.navigate(EDIT_PROFILE, { image: myprofil?.image, pseudo: myprofil?.pseudo, description: myprofil?.description, mail: myprofil?.mail})
                    }}
                    title="Modifier mon profil"
                    primary
                    style={{color}}
                />
                <Text style={{fontSize:18, color: 'black',  marginTop: 10, fontWeight: 'bold', marginBottom: 20}}>{'Galerie'}</Text>
                <View style={{borderWidth: 1}}/>
                <ScrollView style={{ marginTop: responsiveWidth(5)}}>
                    <View style={{flex:1,flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around'}}>
                        {myprofil?.ressources?.map((item,index: number) => {
                                return (
                                    <Fragment key={index}>
                                        <Image source={{uri: item.image}} style={styles.headerImage}/>
                                    </Fragment>
                                )
                        })} 
                    </View>
                </ScrollView>
                <View style={{marginBottom: responsiveWidth(5)}} />
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    headerImage:{
        width: 120,
        height: 120
    },
})
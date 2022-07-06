import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Image, StyleSheet, RefreshControl, ActivityIndicator } from "react-native";
import color from "../../assets/theme/color";
import { CustomButton } from "../../components/common/Button";
import { FlatList } from "react-native-gesture-handler";
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

const data = [
    {
        postImg: 'https://cdn.pixabay.com/photo/2022/05/18/17/09/hills-7205745_960_720.jpg'
    },
    {
        postImg: 'https://media.istockphoto.com/photos/solar-panels-fields-on-the-green-hills-picture-id1170098138?b=1&k=20&m=1170098138&s=170667a&w=0&h=RTURvFjZovBtNqborDPqmSR0PxatbZuusKJeUsKS3TM='
    },
    {
        postImg: 'https://media.istockphoto.com/photos/empty-quarter-desert-dunes-rub-al-khali-landscape-picture-id1221129797?b=1&k=20&m=1221129797&s=170667a&w=0&h=Ax8cvgGe9ynXDCtOywQuaR-Lg-4CEPSB_L_looJGt8E='
    },
]
    const getMyProfil = async () => {
        axiosInstance.get('/utilisateur/monprofil')
            .then((res) => {
                setMyProfil(res.data)
                setRefreshing(false);
                /* return res.data */
                console.log(res.data)
                
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
                <View style={{borderWidth: StyleSheet.hairlineWidth, borderColor: 'black'}}></View>
                <FlatList
                    ListHeaderComponent={<></>}
                    data={myprofil?.ressources}
                    numColumns={3}
                    horizontal={false}
                    keyExtractor={(item, index) => {
                        return index.toString()
                    }}
                    renderItem = {({item}) => {
                        return(
                            <View style={{flex:1,marginTop: responsiveWidth(5),justifyContent:'space-between', alignItems:'center'}}>
                                <Image source={{uri: item.image}} style={styles.headerImage}/>
                            </View>
                        )
                    }}
                />
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
    container: {
        flex: 1,
        padding: 10
    }
})
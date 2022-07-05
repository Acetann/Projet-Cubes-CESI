import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Image, StyleSheet, ActivityIndicator, RefreshControl } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import color from "../../assets/theme/color";
import { CustomButton } from "../../components/common/Button";
import { FlatList } from "react-native-gesture-handler";
import { axiosInstance, axiosWithoutToken } from "../../helpers/axios.interceptor";
import base64 from 'react-native-base64'
import { AppModal } from "../../components/common/appModal";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteParams } from "../../navigations/AuthNavigator";
import { EDIT_PROFILE } from "../../constants/routesName";
interface ProfilProps{
    modalVisible : any,
    setModalVisible: any
}

export const Profil: React.FC<ProfilProps> = () => {
const [ currentUserDecoded, setCurrentUserDecoded] = useState()
const [modalVisible, setModalVisible] = useState(false)
const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
const [refreshing, setRefreshing] = useState(true);

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
    const getCurrentUser = async () => {
        try {
            const data = await AsyncStorage.getItem('currentUser')
/*             const data1 = await AsyncStorage.getItem('currentToken')
            console.log(data1) */
            const currentUserDecoded = JSON.parse(data!)
            console.log(currentUserDecoded)
            if (currentUserDecoded !== null){
                setCurrentUserDecoded(currentUserDecoded)
                setRefreshing(false);
                console.log(currentUserDecoded)
            } 
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        getCurrentUser();
        
    }, []);

    return (
        <>
          {refreshing && <ActivityIndicator />}
        <ScrollView 
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getCurrentUser} />
        }
        style={{ backgroundColor: color.white, height: '100%' }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                    marginLeft: 10,
                }}>
                <Image
                style={{
                    height: 60,
                    width: 60,
                    backgroundColor: color.grey,
                    borderRadius: 50,
                }}
                    source={{ uri: data[0].postImg }}
                />
                <View>
                    <Text style={{ fontWeight: '400', fontSize: 20, color: color.success, paddingHorizontal: 15, marginLeft: 10 }}>{currentUserDecoded?.ressources.length}</Text>
                    <Text style={{ fontSize: 20, color: color.grey, paddingHorizontal: 15 }}>Posts</Text>
                </View>
                <View>
                    <Text style={{ fontWeight: '400', fontSize: 20, color: color.success, paddingHorizontal: 10, marginLeft: 10 }}>{currentUserDecoded?.nbdabonne}</Text>
                    <Text style={{ fontSize: 20, color: color.grey, paddingHorizontal: 10 }}>Abonnés</Text>
                </View>
                <View>
                    <Text style={{ fontWeight: '400', fontSize: 20, color: color.success, paddingHorizontal: 10, marginLeft: 10 }}>{currentUserDecoded?.nbdabonnement}</Text>
                    <Text style={{ fontSize: 20, color: color.grey, paddingHorizontal: 10 }}>Abonnements</Text>
                </View>
            </View>
            <Text style={{ fontSize: 18, color: 'black', paddingHorizontal: 15, marginTop: 10, fontWeight: 'bold', marginBottom: 20 }}>
                {currentUserDecoded?.pseudo}
            </Text>
            <CustomButton
                onPress={() => {
                    navigation.navigate(EDIT_PROFILE)
                }}
                title="Modifier mon profil"
                primary
                style={{color}}
            />
            <Text style={{fontSize:18, color: 'black', paddingHorizontal: 15, marginTop: 10, fontWeight: 'bold', marginBottom: 20}}>Gallerie</Text>
            <View style={{borderWidth: StyleSheet.hairlineWidth, borderColor: 'black'}}></View>
            <FlatList
            ListHeaderComponent={<></>}
            data={data}
            numColumns={3}
            horizontal={false}
            keyExtractor={(item, index) => {
                return index.toString()
            }}
            renderItem = {({item}) => {
                return(
                    <View style={styles.container}>
                        <Image source={{uri: item.postImg}}
                        style={styles.headerImage}/>
                    </View>
                )
            }}
            />
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
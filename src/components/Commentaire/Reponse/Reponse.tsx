import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import moment from "moment";
import React, { Fragment } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Colors, lightColors } from "../../../../config/colors/colors";
import { ADD_REPONSE } from "../../../constants/routesName";
import { RouteParams } from "../../../navigations/AuthNavigator";
import { CustomButton } from "../../common/Button";


// définition des méthodes /propriétés de ModalCommentaire
interface ListReponseProps {}

export const Reponse: React.FunctionComponent<ListReponseProps> = () => {

    //Fonction qui donne accès à la navigation et permet de récuperer les props de RouteParams
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
    const route = useRoute<RouteProp<RouteParams>>();
    return (
            <View style={{ flex: 1, marginHorizontal: responsiveWidth(5), paddingVertical: responsiveWidth(2) }}>
                <TouchableOpacity
                    onPress={() => {navigation.navigate(ADD_REPONSE, { id: route.params?.id})}}>  
                    <CustomButton secondary title={"Ajouter une réponse"} />
                </TouchableOpacity>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flexDirection: 'column'}}>
                    {route.params?.reponse?.map((item, index) => {   
                        return (
                            <Fragment key={index}>
                                <View style={{flexDirection: 'row', alignItems:'center', marginVertical: responsiveWidth(5)}}>
                                    <Image
                                        style={{height: 30,width: 30,borderRadius: 30, marginRight: responsiveWidth(2)}}
                                        source={{ uri: item?.utilisateur?.image }}
                                    />
                                    <View style={{flexDirection: 'column'}}>
                                        <Text style={{ fontSize: 12, color: 'black' }}>{item?.utilisateur?.pseudo}</Text>
                                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                                            <Text style={{ fontSize: 10, color: lightColors.mainBlue }}>{"Publié le : "}</Text>
                                            <Text style={{ fontSize: 10, color: lightColors.mainBlue }}>{`${moment(item?.date_creation).format('DD/MM/YYYY,HH:mm').replace(':', 'h')}`}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{backgroundColor:Colors.lightGrey, borderRadius:8}}>
                                    <Text style={{ fontSize: 12, color: 'black',margin: responsiveWidth(2)}}>{item?.description}</Text>
                                </View>
                            </Fragment>
                        )
                    })}
                    <View style={{marginBottom: responsiveWidth(4)}} />
                </ScrollView>
            </View>
    );
};

export default Reponse;
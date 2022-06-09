import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { image } from '../../assets';
import { mainStyle } from '../../styles/styles';
import { TabButton } from '../Button/TabButton';
import { Icon } from 'react-native-elements';
interface HomeProps {}

export const Home: React.FunctionComponent<HomeProps> = () => {

  const [currentTab, setCurrentTab] = useState("Accueil");
  const [showMenu, setShowMenu] = useState(false);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  let iconName;
                
  if(showMenu){
     iconName = 'close';
    } else {
    iconName = 'menu';
    }

    useEffect(() => {
      setCurrentTab
    })
    
    return (
    <SafeAreaView style={mainStyle.containerTabButton} >
      <View style={{padding: 8, marginTop: 16, marginLeft:8}}>
        <Image source={{uri: image.imageHome}} style={{
          width: 60,
          height: 60,
          borderRadius: 10,
          marginVertical: 8
        }}/>
        <View style={{ flexGrow: 1 }}>
          {TabButton(currentTab, setCurrentTab, "Accueil")}
          {TabButton(currentTab, setCurrentTab, "Mes Publications")}
          {TabButton(currentTab, setCurrentTab, "Mes amis")}
          {TabButton(currentTab, setCurrentTab, "Utilisateurs")}
          {TabButton(currentTab, setCurrentTab, "Publications")}
          {TabButton(currentTab, setCurrentTab, "Commentaires")}
          {TabButton(currentTab, setCurrentTab, "Paramètres")}
        </View>
        <View>
          {TabButton(currentTab, setCurrentTab, "Déconnexion")}
        </View>
      </View>
      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: showMenu ? 15 : 0,
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>
        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
        {currentTab === "Accueil" ? (
        <TouchableOpacity onPress={() =>  {
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true
            }).start()
            Animated.timing(offsetValue, {
              toValue: showMenu ? 0 : 230,
              duration: 300,
              useNativeDriver: true
            }).start()
            Animated.timing(closeButtonOffset, {
              toValue: !showMenu ? -30 : 0,
              duration: 300,
              useNativeDriver: true
            }).start()
            setShowMenu(!showMenu);
          }} style={{flexDirection:'row' ,alignItems:'center'}}>
            <Icon name={String(iconName)} color={"black"} size={30} style={{width: 30,
              height: 30, marginTop: showMenu ? 16 : 0}} /> 
              <View style={{flex:1,marginTop: showMenu ? 16 : 0,marginLeft: 16,justifyContent:'center' ,alignItems:'center'}}>
            <Text style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'black',
              }}>{"Accueil"}</Text>
              </View> 
          </TouchableOpacity>
          ) : (
          <View style={{flexDirection:'row' ,alignItems:'center'}}>
            <View style={{flex:1,marginTop: showMenu ? 16 : 0,marginLeft: 16,justifyContent:'center' ,alignItems:'center'}}>
            <Text style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'black',
              }}>{"Accueil"}</Text>
              </View> 
          </View>
          )}
          <Image source={{uri: image.imageHome}} style={{
            width: '100%',
            height: 300,
            borderRadius: 15,
            marginTop: 25
          }}/>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
    )
}
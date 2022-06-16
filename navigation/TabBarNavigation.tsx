import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { Home } from "../components";
import { Icon } from 'react-native-elements';
import { Profile } from "../components/Profile/Profile";
import { Publication } from "../components/Publications/Publication";
import { MyFriend } from "../components/Friends/MyFriend";
import { Settings } from "../components/Settings/Settings";

const Tab = createBottomTabNavigator();
const home = "Accueil";
const profile = "Profil";
const publication = "Publication";
const ami = "Ami";
const menu = "Paramètres";

export default function TabBarNavigation(){
    return (
        <Tab.Navigator 
        screenOptions={({ route}) => ({
            tabBarIcon: ({color, size}) =>{
                let iconName;
                let rn = route.name;
                
                if(rn === home){
                    iconName = 'home';
                } else if (rn === profile) {
                    iconName = 'person';
                }else if (rn === publication ) {
                    iconName = 'book'
                } else if( rn === ami) {
                    iconName = 'people'
                }else {
                    iconName = 'settings'
                }
                return <Icon name={String(iconName)} size={size} color={color}/>
            },
        })}>
            <Tab.Screen  name="Accueil" component={Home} />
            <Tab.Screen  name="Profil" component={Profile} />
            <Tab.Screen  name="Publication" component={Publication} />
            <Tab.Screen  name="Ami" component={MyFriend} />
            <Tab.Screen  name="Paramètres" component={Settings} />
          </Tab.Navigator>
    )
}
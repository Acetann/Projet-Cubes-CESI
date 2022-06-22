import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { Home } from "../components";
import { Icon } from 'react-native-elements';
import { Profile } from "../components/Profile/Profile";
import { Publication } from "../components/Publications/Publication";
import { Settings } from "../components/Settings/Settings";
import { Social } from "../components/Social/Social";
import { Colors } from "../config/colors/colors";

const Tab = createBottomTabNavigator();
const home = "Accueil";
const profile = "Profil";
const publication = "Publication";
const ami = "Social";
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
            tabBarActiveTintColor: Colors.blue,
        })}>
            <Tab.Screen  options={{ headerTintColor: Colors.blue}} name="Accueil" component={Home} />
            <Tab.Screen  options={{ headerTintColor: Colors.blue}} name="Profil" component={Profile} />
            <Tab.Screen  options={{ headerTintColor: Colors.blue}} name="Publication" component={Publication} />
            <Tab.Screen  options={{ headerTintColor: Colors.blue}} name="Social" component={Social} />
            <Tab.Screen  options={{ headerTintColor: Colors.blue}} name="Paramètres" component={Settings} />
          </Tab.Navigator>
    )
}
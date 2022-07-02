import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { Icon } from 'react-native-elements';
import { Colors } from "../../config/colors/colors";
import { Home } from '../tabs/Home/Home';
import { Profil } from "../tabs/Profil/Profil";
import { Publication } from "../tabs/Publication/Publication";
import { Settings } from "../tabs/Settings/Settings";
import { Social } from "../tabs/Social/Social";

const Tab = createBottomTabNavigator();
const home = "Accueil";
const contact = "CONTACT_LIST";

const profil = "Profil";
const publication = "Publication";
const ami = "Social";

export default function TabBarNavigation(){
    return (
        <Tab.Navigator 
        screenOptions={({ route}) => ({
            tabBarIcon: ({color, size}) =>{
                let iconName;
                let rn = route.name;
                
                if(rn === home){
                    iconName = 'home';
                } else if (rn === profil) {
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
            <Tab.Screen  options={{ headerTintColor: Colors.blue}} name="Profil" component={Profil} />
            <Tab.Screen  options={{ headerTintColor: Colors.blue}} name="Publication" component={Publication} />
            <Tab.Screen  options={{ headerTintColor: Colors.blue}} name="Social" component={Social} />
            <Tab.Screen  options={{ headerTintColor: Colors.blue}} name="Paramètres" component={Settings} />
          </Tab.Navigator>
    )
}
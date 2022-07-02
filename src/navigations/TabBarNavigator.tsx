import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { Icon } from 'react-native-elements';
import { Colors } from "../../config/colors/colors";
import { Contacts } from "../screens/Contacts";
import { Settings } from "../screens/Settings";

const Tab = createBottomTabNavigator();
const home = "CONTACT_LIST";
const profile = "Profil";
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
            <Tab.Screen  options={{ headerTintColor: Colors.blue}} name="CONTACT_LIST" component={Contacts} />
            {/* <Tab.Screen  options={{ headerTintColor: Colors.blue}} name="Profil" component={Profile} />
            <Tab.Screen  options={{ headerTintColor: Colors.blue}} name="Publication" component={Publication} />
            <Tab.Screen  options={{ headerTintColor: Colors.blue}} name="Social" component={Social} /> */}
            <Tab.Screen  options={{ headerTintColor: Colors.blue}} name="SETTINGS" component={Settings} />
          </Tab.Navigator>
    )
}
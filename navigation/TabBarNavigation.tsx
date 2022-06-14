import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { Home } from "../components";
import { Icon } from 'react-native-elements';
import { Profile } from "../components/Profile/Profile";
import { Publication } from "../components/Publications/Publication";
import { MyFriend } from "../components/Friends/MyFriend";

const Tab = createBottomTabNavigator();
const home = "Home";
const profile = "Profile";
const publication = "Publication";

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
                } else {
                    iconName = 'people'
                }
                return <Icon name={String(iconName)} size={size} color={color}/>
            },
        })}>
            <Tab.Screen   name="Home" component={Home} />
            <Tab.Screen   name="Profile" component={Profile} />
            <Tab.Screen   name="Publication" component={Publication} />
            <Tab.Screen   name="Friends" component={MyFriend} />
          </Tab.Navigator>
    )
}
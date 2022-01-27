import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { Count,  Home } from "../components";
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();
const home = "Home";
const count = "Count";


export default function TabBarNavigation(){
    return (
        <Tab.Navigator 
        screenOptions={({ route}) => ({
            tabBarIcon: ({color, size}) =>{
                let iconName;
                let rn = route.name;
                
                if(rn === home){
                    iconName = 'home';
                } else if (rn === count) {
                    iconName = 'person';
                }
                return <Icon name={String(iconName)} size={size} color={color}/>
            },
        })}>
            <Tab.Screen   name="Home" component={Home} />
            <Tab.Screen   name="Count" component={Count} />
          </Tab.Navigator>
    )
}
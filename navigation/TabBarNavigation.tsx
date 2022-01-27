import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { Count, Create, Header, Home } from "../components";
import { Icon } from 'react-native-elements';


const Tab = createBottomTabNavigator();
const home = "Home";
const header = "Header";
const count = "Count";
const create = "Create"


export default function TabBarNavigation(){
    return (
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={home}
            screenOptions={({route}) => ({
                tabBarIcon: ({color, size}) =>{
                    let iconName;
                    let rn = route.name;
                    
                    if(rn === home){
                        iconName = 'home';
                    } else if (rn === header) {
                        iconName = 'person';
                    }else if (rn === count) {
                        iconName = 'shop';
                    }else if(rn === create){
                        iconName = 'create'
                    }
                    return <Icon name={String(iconName)} size={size} color={color}/>
                },
            })}>
                <Tab.Screen name={home} component={Home} />
                <Tab.Screen name={count} component={Count} />
                <Tab.Screen name={create} component={Create} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
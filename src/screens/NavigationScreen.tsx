import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import DetailScreen from "./DetailScreen";


const Stack = createStackNavigator();

const NavigationScreen = () =>{

    return(
        <Stack.Navigator
        screenOptions={{
            headerStyle: {
              backgroundColor: '#6200ee', 
            },
            headerTintColor: '#fff', 
            headerTitleStyle: {
              fontWeight: '700', 
            },
          }}>
            <Stack.Screen name="Home" component={HomeScreen}  options={{ title: 'Home' }}/>
            <Stack.Screen name="Details" component={DetailScreen}  options={{ title: 'Detalle' }}/>
        </Stack.Navigator>
    )
}

export default NavigationScreen;

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import InitialScreen from '../screens/InitialScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

const Stack = createNativeStackNavigator()

const AuthNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Initial">
            <Stack.Screen name='Initial' component={InitialScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default AuthNavigation
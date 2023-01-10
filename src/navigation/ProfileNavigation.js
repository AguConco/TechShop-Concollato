import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '../screens/ProfileScreen'
import PhotoProfileScreen from '../screens/PhotoProfileScreen'
import MyPurchasesScreen from '../screens/MyPurchasesScreen'

const Stack = createNativeStackNavigator()

const ProfileNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="ProfileScreen">
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PhotoProfile" component={PhotoProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MyPurchases" component={MyPurchasesScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default ProfileNavigation

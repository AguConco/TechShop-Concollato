import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CartScreen from '../screens/CartScreen'
import CheckoutScreen from '../screens/CheckoutScreen'

const Stack = createNativeStackNavigator()

const CartNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="ShoppingCart">
            <Stack.Screen name="ShoppingCart" component={CartScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default CartNavigation

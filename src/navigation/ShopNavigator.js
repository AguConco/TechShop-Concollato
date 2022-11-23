import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CategoriesScreen from "../screens/CategoriesScreen"
import ProductListScreen from "../screens/ProductListScreen"
import DetailScreen from "../screens/DetailScreen"

const Stack = createNativeStackNavigator()

const ShopNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Categories">
                <Stack.Screen name="Categories" component={CategoriesScreen} />
                <Stack.Screen name="Products" component={ProductListScreen} />
                <Stack.Screen name="Detail" component={DetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ShopNavigator
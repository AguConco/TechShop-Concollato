import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CategoriesScreen from "../screens/CategoriesScreen"
import ProductListScreen from "../screens/ProductListScreen"
import DetailScreen from "../screens/DetailScreen"
import colors from '../constants/colors'

const Stack = createNativeStackNavigator()

const ShopNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Category">
            <Stack.Screen name="Category" component={CategoriesScreen} options={{
                title: 'Categorías',
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTintColor: colors.white,
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }} />
            <Stack.Screen name="Products" component={ProductListScreen} options={({ route }) => ({
                title: route.params,
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTintColor: colors.white,
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
            })} />
            <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default ShopNavigator
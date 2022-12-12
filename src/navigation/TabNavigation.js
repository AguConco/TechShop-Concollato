import ShopNavigator from './ShopNavigator'
import CartNavigation from './CartNavigation'
import ProfileNavigation from './ProfileNavigation'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faThLarge, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import colors from '../constants/colors'
import fonts from '../constants/fonts'

const tab = createBottomTabNavigator()

const IconTab = ({ icon, name, focused }) => {

    return (
        <View style={styles.containerIcon}>
            <FontAwesomeIcon icon={icon} size={fonts.h3} color={focused ? colors.primary : colors.darkGray} />
            {focused && <Text style={styles.iconText}>{name}</Text>}
        </View>
    )
}

const TabNavigation = () => {

    return (
        <NavigationContainer>
            <tab.Navigator initialRouteName='Categories' screenOptions={{ tabBarStyle: { height: 60, paddingTop: 10 }, headerShown: false, title: '' }}>
                <tab.Screen name='Categories' component={ShopNavigator} options={{
                    tabBarIcon: ({ focused }) => <IconTab icon={faThLarge} name={'Categorías'} focused={focused} />
                }} />
                <tab.Screen name='Cart' component={CartNavigation} options={{
                    tabBarIcon: ({ focused }) => <IconTab icon={faCartShopping} name={'Carrito'} focused={focused} />
                }} />
                <tab.Screen name='Profile' component={ProfileNavigation} options={{
                    tabBarIcon: ({ focused }) => <IconTab icon={faUser} name={'Perfil'} focused={focused} />
                }} />
            </tab.Navigator>
        </NavigationContainer>
    )
}

export default TabNavigation

const styles = StyleSheet.create({
    containerIcon: {
        alignItems: 'center',
        padding: 10,
    },
    iconText: {
        fontFamily: 'PoppinsMd',
        color: colors.primary,
        fontWeight: '600',
        fontSize: 12
    }
})
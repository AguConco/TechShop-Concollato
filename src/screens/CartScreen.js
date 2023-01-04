import { useEffect, useState } from "react"
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import ProductCart from "../components/ProductCart"
import colors from "../constants/colors"
import fonts from "../constants/fonts"
import { useIsFocused } from '@react-navigation/native'
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, connect, useSelector } from "react-redux"
import { getCart } from "../store/actions/cart.action"

const CartScreen = ({ navigation }) => {
    const isFocused = useIsFocused()

    const dispatch = useDispatch()
    const [cartProducts, setCartProducts] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const cart = useSelector(state => state.cart)
    const user = useSelector(state => state.user.user)

    useEffect(() => {
        dispatch(getCart(user.uid))
        setCartProducts(cart.cart)
        setTotalPrice(cart.totalPrice)
    }, [isFocused, cart.totalPrice])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            {cartProducts.length === 0 ?
                <View style={styles.cartEmpty}>
                    <Text style={styles.cartEmptyTitle}>¡Tu carrito esta vacío!</Text>
                    <Text style={styles.cartEmptyText}>¿Qué estas esperando para agregar lo que más te gusta?</Text>
                </View> :
                <View style={styles.containerCart}>
                    <FlatList
                        data={cartProducts}
                        renderItem={e => <ProductCart item={e.item} navigation={navigation} totalPrice={totalPrice} />}
                        keyExtractor={e => e.id}
                        style={{ marginVertical: 10 }}
                    />
                    <View style={styles.detailCart}>
                        <Text style={styles.totalPrice}>Total: $ {totalPrice}</Text>
                        <TouchableOpacity><Text style={styles.buy}>Comprar</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Categories')}><Text style={styles.continue}>Seguir Comprando</Text></TouchableOpacity>
                    </View>
                </View>}
        </SafeAreaView>
    )
}

export default connect()(CartScreen)

const styles = StyleSheet.create({
    cartEmpty: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        padding: 20
    },
    cartEmptyTitle: {
        color: colors.letter,
        fontSize: fonts.h2,
        textAlign: 'center'
    },
    cartEmptyText: {
        color: colors.darkGray,
        fontSize: fonts.h4,
        textAlign: 'center',
        paddingHorizontal: 20,
        paddingTop: 10
    },
    containerCart: {
        backgroundColor: colors.white,
        flex: 1,
        paddingTop: 10
    },
    detailCart: {
        borderTopColor: colors.lightGray,
        borderTopWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -10,
        },
        elevation: 20,
    },
    totalPrice: {
        textAlign: 'center',
        fontFamily: 'PoppinsMd',
        fontSize: fonts.h4,
        color: colors.letter
    },
    buy: {
        fontFamily: 'PoppinsMd',
        fontSize: fonts.h5,
        textAlign: 'center',
        borderRadius: 5,
        padding: 10,
        color: colors.white,
        backgroundColor: colors.primary,
        marginVertical: 10
    },
    continue: {
        fontFamily: 'PoppinsMd',
        fontSize: fonts.h5,
        textAlign: 'center',
        borderRadius: 5,
        padding: 10,
        color: colors.primary,
        backgroundColor: colors.secondary
    }

})
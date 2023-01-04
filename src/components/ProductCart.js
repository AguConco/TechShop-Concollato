import { useEffect, useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import colors from "../constants/colors"
import fonts from "../constants/fonts"
import { useDispatch, connect, useSelector } from "react-redux"
import { selectedProduct } from "../store/actions/product.action"
import { removeProduct } from "../store/actions/cart.action"

const ProductCart = ({ item, navigation, totalPrice }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
        item.quantity >= item.available_quantity ? setQuantity(item.available_quantity) : setQuantity(item.quantity)
    }, [totalPrice])

    return (
        <View style={styles.productCart}>
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <View>
                    <Image style={styles.image} resizeMode='contain' source={{ uri: item.pictures[0] }} />
                </View>
                <View style={styles.infoProduct}>
                    <TouchableOpacity onPress={() => {
                        dispatch(selectedProduct(item.id))
                        navigation.navigate('Detail')
                    }}>
                        <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">{item.name}</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>Cantidad: {quantity}</Text>
                    <Text style={styles.price}>$ {item.price * quantity}</Text>
                </View>
            </View>
            <View style={styles.options}>
                <TouchableOpacity onPress={() => { dispatch(removeProduct(item, user.uid)) }}><Text style={styles.removeProductCart}> Eliminar del carrito</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default connect()(ProductCart)

const styles = StyleSheet.create({
    productCart: {
        borderRadius: 5,
        borderColor: colors.lightGray,
        borderWidth: 1,
        marginVertical: 5,
        marginHorizontal: 20
    },
    image: {
        height: 100,
        width: 100,
    },
    infoProduct: {
        width: '67%',
        marginLeft: 10,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        height: 100,
    },
    name: {
        color: colors.letter,
        fontFamily: 'PoppinsMd',
        fontSize: fonts.h6,
        marginBottom: 10,
        minHeight: 60
    },
    quantity: {
        color: colors.letter,
        fontFamily: 'PoppinsMd',
        width: '49%'
    },
    price: {
        color: colors.letter,
        fontFamily: 'PoppinsMd',
        fontSize: fonts.h4,
        width: '49%',
        textAlign: 'right'
    },
    options: {
        borderTopColor: colors.lightGray,
        borderTopWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 5,
        flexDirection: 'row'
    },
    removeProductCart: {
        color: colors.blue,
        fontFamily: 'PoppinsMd',
    }
})
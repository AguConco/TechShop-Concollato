import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import colors from "../constants/colors"
import fonts from "../constants/fonts"
import { SafeAreaView } from "react-native-safe-area-context"
import { useSelector } from "react-redux"
import { useDispatch, connect } from "react-redux"
import { useEffect, useState } from "react"
import { resetIdOrder } from "../store/actions/order.action"
import { getCart } from "../store/actions/cart.action"

const OrderCompletedScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const order = useSelector(state => state.order)
    const [orderId, setOrderId] = useState('')

    useEffect(() => {
        // ver si el carrito esta vacio no ver el detalle del pediodo e ir directamente a ShoppingCart
        setOrderId(order.orderId)
        dispatch(resetIdOrder())
        dispatch(getCart())

    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            {console.log(order.orderId, '-', orderId)}
            <Text>{orderId}</Text>
        </SafeAreaView>
    )
}

export default connect()(OrderCompletedScreen)

const styles = StyleSheet.create({

})
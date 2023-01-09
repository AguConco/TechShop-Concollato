
import { useIsFocused } from "@react-navigation/native"
import { useEffect, useState } from "react"
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
    TextInput,
    FlatList,
    Image,
    Dimensions,
    ScrollView,
} from "react-native"
import Checkbox from 'expo-checkbox'
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, useSelector, connect } from "react-redux"
import colors from "../constants/colors"
import fonts from "../constants/fonts"
import { generateOrder } from "../store/actions/order.action"
import { getCart } from "../store/actions/cart.action"

const CheckoutScreen = ({ navigation }) => {
    const isFocused = useIsFocused()

    const dispatch = useDispatch()
    const [cartProducts, setCartProducts] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [commentary, setCommentary] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [height, setHeight] = useState('')
    const [delivery, setDelivery] = useState({ value: null, price: 0 })
    const [error, setError] = useState('')

    const cart = useSelector(state => state.cart)
    const order = useSelector(state => state.order)
    const user = useSelector(state => state.user.user)

    const infoOrder = {
        user,
        totalPrice,
        cartProducts,
        commentary,
        delivery: { ...delivery, address, height },
        phone
    }

    const validatePurchase = () => {
        if (delivery.value !== null) {
            if (delivery.value === 'option_1') {
                if (address !== '' && height !== '' && phone !== '' && error === '') {
                    dispatch(generateOrder(infoOrder))
                } else {
                    !error && setError('*Completa todos los campos')
                }
            } else {
                if (phone !== '' && error === '') {
                    dispatch(generateOrder(infoOrder))
                } else {
                    !error && setError('*Completa todos los campos')
                }
            }
        } else {
            setError('*Selecciona donde quieres recibir tu pedido')
        }
    }

    const validatePhone = (e) => {
        setError('')
        setPhone(e.toString())

        if (e.length >= 9) {
            setError('')
        } else {
            setError('*El teléfono debe contener 9 caracteres como mínimo. Agrégale 0 adelante si hace falta')
        }
        e.length === 0 && setError('')
    }

    const validateAddress = (e) => {
        setError('')
        setAddress(e)

        if (/^[a-zA-Z ]+$/.test(e)) {
            setError('')
        } else {
            setError('*El nombre no debe contener números ni símbolos')
        }

        e === '' && setError('')
    }

    useEffect(() => {
        dispatch(getCart(user.uid))
        setCartProducts(cart.cart)
        setTotalPrice(cart.totalPrice + delivery.price)
    }, [isFocused, cart.totalPrice, delivery.price, order.orderId])

    const item = (e) => (
        <View style={styles.item}>
            <Image style={styles.picture} resizeMode={'contain'} source={{ uri: e.item.pictures[0] }} />
            <View>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>{e.item.name}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.quantity}>Cantidad: {e.item.quantity}</Text>
                    <Text style={styles.price}>$ {e.item.price}</Text>
                </View>
            </View>
        </View>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            {order.orderId === '' ?
                <ScrollView style={styles.checkout}>
                    <View style={styles.detailOrder}>
                        <Text style={styles.title}>Detalle de tu compra</Text>
                        <FlatList
                            data={cartProducts}
                            keyExtractor={e => e.id}
                            renderItem={item}
                            style={styles.listItems}
                        />
                    </View>
                    <Text style={styles.total}>Total en productos: $ {totalPrice - delivery.price}</Text>
                    <View style={{ padding: 20 }}>
                        <Text style={styles.titleInfo}>Información para realizar la entrega</Text>
                        <View style={{ marginBottom: 10 }}>
                            <View style={styles.containerCheckbox}>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={delivery.value === 'option_1'}
                                    onValueChange={() => {
                                        setError('')
                                        setDelivery({ value: 'option_1', price: 1590 })
                                    }}
                                    color={colors.blue}
                                />
                                <Text style={{ ...styles.label, width: '65%' }}>Llega a tu domicilio</Text>
                                <Text style={styles.label}>$ 1590</Text>
                            </View>
                            <View style={styles.containerCheckbox}>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={delivery.value === 'option_2'}
                                    onValueChange={() => {
                                        setAddress('')
                                        setHeight('')
                                        setError('')
                                        setDelivery({ value: 'option_2', price: 1399 })
                                    }}
                                    color={colors.blue}
                                />
                                <Text style={styles.label}>Retiro en correo u otros puntos</Text>
                                <Text style={styles.label}>$ 1399</Text>
                            </View>
                        </View>
                        {delivery.value === 'option_1' &&
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    placeholder="Dirección"
                                    onChangeText={validateAddress}
                                    value={address}
                                    style={{ ...styles.input, width: '65%', marginRight: '2.5%' }}
                                />
                                <TextInput
                                    placeholder="Altura"
                                    onChangeText={setHeight}
                                    value={height}
                                    style={{ ...styles.input, width: '32.5%' }}
                                    keyboardType={"number-pad"}
                                />
                            </View>}
                        <Text style={styles.titleInfo}>Información para estar en contacto</Text>
                        <TextInput
                            placeholder="Teléfono"
                            onChangeText={validatePhone}
                            value={phone}
                            style={styles.input}
                            keyboardType={"phone-pad"}
                        />
                        <TextInput
                            placeholder="Comentario de la compra (opcional)"
                            onChangeText={setCommentary}
                            value={commentary}
                            style={styles.input}
                        />
                    </View>
                    {error && <Text style={styles.error}> {error} </Text>}
                    <View style={styles.containerBtn}>
                        <Text style={styles.total}>Total: $ {totalPrice}</Text>
                        <TouchableOpacity onPress={() => validatePurchase()}><Text style={styles.buy}>Realizar compra</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}><Text style={styles.continue}>Volver al carrito</Text></TouchableOpacity>
                    </View>
                </ScrollView>
                :
                <View style={styles.orderCompleted}>
                    <Text style={styles.title}>¡Tu compra fue procesada con éxito!</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}><Text style={styles.buy}>Ver mis compras</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}><Text style={styles.continue}>Volver al carrito</Text></TouchableOpacity>
                </View>
            }
        </SafeAreaView>
    )
}

export default connect()(CheckoutScreen)

const styles = StyleSheet.create({
    checkout: {
        flex: 1,
        backgroundColor: colors.white,
    },
    detailOrder: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1
    },
    title: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
        fontSize: fonts.h3,
        fontFamily: 'PoppinsMd',
        color: colors.letter,
    },
    listItems: {
        width: Dimensions.get('window').width - 40,
        borderWidth: 1,
        borderColor: colors.lightGray,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10
    },
    item: {
        flexDirection: 'row',
        marginVertical: 10
    },
    picture: {
        height: 50,
        width: 50,
        marginRight: 20
    },
    name: {
        fontFamily: 'PoppinsMd',
        color: colors.letter,
        fontSize: fonts.h5,
        marginBottom: 5,
        maxWidth: '87%',
        minWidth: '87%',
    },
    price: {
        fontFamily: 'PoppinsMd',
        color: colors.letter,
        fontSize: fonts.h6,
    },
    quantity: {
        fontFamily: 'PoppinsMd',
        color: colors.letter,
        fontSize: fonts.h6,
        marginRight: 20
    },
    titleInfo: {
        fontFamily: 'PoppinsMd',
        fontSize: fonts.h4,
        color: colors.letter,
        textAlign: 'center',
        marginVertical: 10,

    },
    label: {
        color: colors.letter,
        fontFamily: 'PoppinsMd',
        fontSize: fonts.h6,
    },
    input: {
        fontFamily: 'PoppinsMd',
        fontSize: fonts.h6,
        color: colors.letter,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: colors.lightGray,
        borderRadius: 10,
        marginVertical: 10
    },
    containerCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    checkbox: {
        height: 18,
        width: 18,
        position: 'relative',
        left: 10,
        borderRadius: 10
    },
    containerBtn: {
        borderTopColor: colors.lightGray,
        borderTopWidth: 1,
        padding: 20,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -10,
        },
        elevation: 20,
    },
    total: {
        fontFamily: 'PoppinsMd',
        color: colors.letter,
        fontSize: fonts.h4,
        textAlign: 'center',
        marginBottom: 10,
    },
    buy: {
        fontFamily: 'PoppinsMd',
        fontSize: fonts.h5,
        textAlign: 'center',
        borderRadius: 5,
        padding: 10,
        color: colors.white,
        backgroundColor: colors.primary,
    },
    continue: {
        fontFamily: 'PoppinsMd',
        fontSize: fonts.h5,
        textAlign: 'center',
        borderRadius: 5,
        padding: 10,
        color: colors.primary,
        backgroundColor: colors.secondary,
        marginTop: 10
    },
    error: {
        borderWidth: 2,
        borderColor: '#ff000040',
        backgroundColor: '#ff000015',
        color: colors.red,
        padding: 10,
        borderRadius: 5,
        fontFamily: 'PoppinsMd',
        marginHorizontal: 20,
        marginBottom: 20
    },
    orderCompleted: {
        flex: 1,
        padding: 50,
        justifyContent: 'center',
    },
    orderId: {
        fontFamily: 'PoppinsMd',
        color: colors.letter,
        fontSize: fonts.h5,
        textAlign: 'center',
        marginBottom: 30
    }
})
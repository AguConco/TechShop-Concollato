import { useEffect, useState } from "react"
import { Text, View, StyleSheet, FlatList, Image, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, useSelector } from "react-redux"
import colors from "../constants/colors"
import fonts from "../constants/fonts"
import { getOrder } from "../store/actions/order.action"
import Loading from "../components/Loading"
import { useIsFocused } from "@react-navigation/native"

const MyPurchasesScreen = () => {
    const isFocused = useIsFocused()

    const dispatch = useDispatch()
    const stateOrder = useSelector(state => state.order.orders)
    const user = useSelector(state => state.user.user)

    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState([])

    useEffect(() => {
        if (stateOrder !== null) {
            (order.length !== stateOrder.length || loading || stateOrder.length === 0) && dispatch(getOrder(user.uid))
            setOrder(stateOrder)
            stateOrder.length !== 0 && setLoading(false)
        } else {
            setLoading(false)
        }
    }, [isFocused, stateOrder])

    const imgDetailOrder = (e) => {
        if (e.length < 4) {
            return e.map(e => (<View style={styles.containerPicture}><Image style={styles.picture} resizeMode={'contain'} source={{ uri: e.picture }} /></View>))
        } else if (e.length > 3) {
            return (
                <>
                    {e.slice(0, 3).map(e => (<View style={styles.containerPicture}><Image style={styles.picture} resizeMode={'contain'} source={{ uri: e.picture }} /></View>))}
                    <Text style={styles.text} >+ {e.length - 3}</Text>
                </>
            )
        }
    }

    const renderOrder = (e) => {
        const date = new Date(e.datetime.seconds * 1000 + e.datetime.nanoseconds / 1000000)
        const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        return (
            <View style={styles.order}>
                <Text style={styles.date}>{date.getDate()} de {months[date.getMonth()]} - {date.getFullYear()}  <Text style={{ color: colors.darkGray, fontSize: fonts.h6 }}>{date.toLocaleTimeString()}</Text></Text>
                <View style={styles.detailPictures}>{imgDetailOrder(e.items)}</View>
                <Text style={styles.delivery}>Entrega en: {e.delivery.value === 'option_1' ? e.delivery.address + ' ' + e.delivery.height : 'Correo u otros puntos'}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <ScrollView style={{ paddingHorizontal: 20 }}>
                <Text style={styles.title}>Mis compras</Text>
                {
                    loading ?
                        <View style={{ marginTop: 60 }}>
                            <Loading />
                        </View>
                        :
                        stateOrder !== null ?
                            <FlatList
                                data={stateOrder.sort((a, b) => a.datetime.seconds * 1000 + a.datetime.nanoseconds / 1000000 < b.datetime.seconds * 1000 + b.datetime.nanoseconds / 1000000)}
                                renderItem={e => renderOrder(e.item)}
                                keyExtractor={e => e.orderId}
                                scrollEnabled={false}
                            />
                            :
                            <Text style={{ ...styles.title, fontSize: fonts.h4 }}>¡Todavía no has realizado ninguna compra!</Text>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default MyPurchasesScreen



const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: fonts.h3,
        fontFamily: 'PoppinsMd',
        color: colors.letter,
        paddingHorizontal: 40
    },
    order: {
        borderRadius: 5,
        borderColor: colors.lightGray,
        borderWidth: 1,
        marginBottom: 15,
        paddingVertical: 15
    },
    date: {
        fontFamily: 'PoppinsMd',
        color: colors.letter,
        paddingHorizontal: 15,
        paddingBottom: 10,
        borderBottomColor: colors.lightGray,
        borderBottomWidth: 1,
        fontSize: fonts.h5
    },
    detailPictures: {
        flexDirection: 'row',
        padding: 15,
    },
    containerPicture: {
        borderRadius: 50,
        backgroundColor: '#fff',
        height: 55,
        width: 55,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#00000080',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        elevation: 10,
        marginHorizontal: 3,
        position: 'relative',
    },
    picture: {
        borderRadius: 50,
        height: 40,
        width: 40
    },
    text: {
        position: 'absolute',
        left: 140,
        top: 15,
        backgroundColor: colors.shadow,
        borderRadius: 50,
        height: 55,
        width: 55,
        color: colors.white,
        fontSize: fonts.h5,
        fontFamily: 'PoppinsMd',
        lineHeight: 55,
        textAlign: 'center'
    },
    delivery: {
        fontFamily: 'PoppinsMd',
        color: colors.letter,
        paddingHorizontal: 15,
        fontSize: fonts.h6
    }
})
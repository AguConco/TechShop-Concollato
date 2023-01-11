import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import colors from "../constants/colors"
import fonts from "../constants/fonts"
import { useDispatch, connect, useSelector } from "react-redux"
import { logOut } from "../store/actions/auth.action"
import noPhoto from '../assets/images/no_photo.jpg'
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faRightFromBracket, faShoppingBag } from "@fortawesome/free-solid-svg-icons"
import { useIsFocused } from '@react-navigation/native'
import { resetOrder } from "../store/actions/order.action"

const ProfileScreen = ({ navigation }) => {

    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const [photoSelected, setPhotoSelected] = useState()

    useEffect(() => {
        setPhotoSelected(user.photoURL)
    }, [isFocused])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
            <View style={styles.containerInfoUser}>
                <TouchableOpacity onPress={() => navigation.navigate('PhotoProfile', { photoUser: photoSelected })}>
                    <Image style={styles.photo} resizeMode={"contain"} source={user.photoURL ? { uri: photoSelected } : noPhoto} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.nameUser}>{user.displayName}</Text>
                    <Text style={styles.emailUser}>{user.email}</Text>
                </View>
            </View>
            <View style={styles.optionsUser}>
                <View style={styles.containerBtnOption}>
                    <TouchableOpacity onPress={() => navigation.navigate('MyPurchases')}><Text style={styles.option}><FontAwesomeIcon icon={faShoppingBag} color={colors.letter} />   Mis compras</Text></TouchableOpacity>
                </View>
                <View style={styles.containerBtnLogOut}>
                    <TouchableOpacity onPress={() => {
                        dispatch(resetOrder())
                        dispatch(logOut())
                    }
                    }><Text style={styles.btnLogOut}><FontAwesomeIcon icon={faRightFromBracket} color={colors.darkGray} />   Cerrar sesión</Text></TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default connect()(ProfileScreen)

const styles = StyleSheet.create({
    containerInfoUser: {
        alignItems: 'center',
        paddingVertical: 50,
        flexDirection: 'row',
        flex: 1,
        paddingHorizontal: 30
    },
    photo: {
        borderRadius: 50,
        height: 75,
        width: 75,
        marginBottom: 10,
        borderColor: colors.white,
        borderWidth: 2,
        marginRight: 20
    },
    nameUser: {
        fontSize: fonts.h3,
        color: colors.white,
        textTransform: 'capitalize',
        fontFamily: 'PoppinsMd',
    },
    emailUser: {
        fontSize: fonts.h6,
        color: colors.lightGray,
        fontFamily: 'PoppinsMd',
        position: 'relative',
        top: -10,
    },
    optionsUser: {
        backgroundColor: colors.white,
        height: 100,
        justifyContent: 'space-between',
        flex: 15
    },
    containerBtnOption: {
        padding: 20,

    },
    option: {
        padding: 10,
        fontFamily: 'PoppinsMd',
        fontSize: fonts.h5,
        color: colors.letter,
        marginVertical: 3
    },
    containerBtnLogOut: {
        borderTopColor: colors.lightGray,
        borderTopWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    btnLogOut: {
        padding: 10,
        fontFamily: 'PoppinsMd',
        fontSize: fonts.h5,
        color: colors.darkGray
    }
})
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import colors from "../constants/colors"
import fonts from "../constants/fonts"
import noPhoto from '../assets/images/no_photo.jpg'
import * as ImagePicker from 'expo-image-picker'
import { getAuth, updateProfile } from "firebase/auth"

const PhotoProfileScreen = ({ navigation, route }) => {

    const photoUser = route.params.photoUser

    const verifyPermissions = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert("Permisos insuficientes",
                "Acepta los permisos para poder ingresar a la cámara",
                { text: "OK" }
            )
            return false
        }
        return true
    }

    const handleTakeImage = async () => {
        const isCameraOk = await verifyPermissions()
        if (!isCameraOk) return

        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        })

        updatePhoto(image.assets[0].uri)
    }

    const updatePhoto = (photo) => {
        const auth = getAuth()
        updateProfile(auth.currentUser, {
            photoURL: photo
        }).then(() => {
            navigation.navigate('ProfileScreen')
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.lightGray }}>
            <Image style={styles.photo} source={photoUser ? { uri: photoUser } : noPhoto} />
            <View style={styles.containerBtn}>
                <TouchableOpacity onPress={() => updatePhoto('')}><Text style={styles.btnDelete}>Eliminar Foto</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => handleTakeImage()}><Text style={styles.btnEdit}>Cambiar Foto</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default PhotoProfileScreen

const styles = StyleSheet.create({
    photo: {
        flex: 1,
        margin: 20,
        borderRadius: 20,
        width: '90%',
    },
    containerBtn: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 15,
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'space-around',

    },
    btnEdit: {
        backgroundColor: colors.lightGray,
        borderWidth: 1,
        borderColor: colors.white,
        marginBottom: 20,
        color: colors.letter,
        fontFamily: 'PoppinsMd',
        fontSize: fonts.h5,
        paddingHorizontal: 20,
        paddingVertical: 7,
        textAlign: 'center',
        borderRadius: 10
    },
    btnDelete: {
        backgroundColor: colors.shadow,
        borderWidth: 1,
        borderColor: colors.darkGray,
        marginBottom: 20,
        color: colors.white,
        fontFamily: 'PoppinsMd',
        fontSize: fonts.h5,
        paddingHorizontal: 20,
        paddingVertical: 7,
        textAlign: 'center',
        borderRadius: 10
    }
})
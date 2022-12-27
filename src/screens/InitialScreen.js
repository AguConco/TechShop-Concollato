import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import colors from "../constants/colors"
import fonts from "../constants/fonts"


const InitialScreen = ({ navigation }) => (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <View style={styles.container}>
            <View style={styles.logo}>
                <Text style={styles.tech}>Tech</Text>
                <Text style={styles.shop}>Shop</Text>
            </View>
            <View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Login')
                }} ><Text style={styles.btnLogin}>Iniciar sesión</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Register')
                }} ><Text style={styles.btnRegister}>Registrarse</Text></TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
)

export default InitialScreen

const btn = {
    padding: 7,
    fontFamily: 'PoppinsMd',
    fontSize: fonts.h3,
    textAlign: 'center',
    borderRadius: 10,
    width: 300,
    marginVertical: 5
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 60,

    },
    logo: {
        flexDirection: 'row',
    },
    tech: {
        fontFamily: 'PoppinsMd',
        fontSize: fonts.h1 + 20,
        color: colors.primary
    },
    shop: {
        fontFamily: 'PoppinsMd',
        fontSize: fonts.h1 + 20,
        color: colors.letter
    },
    btnRegister: {
        ...btn,
        color: colors.primary,
        backgroundColor: colors.white,
        borderColor: colors.primary,
        borderWidth: 1
    },
    btnLogin: {
        ...btn,
        color: colors.white,
        backgroundColor: colors.primary
    }
})
import { useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, connect } from "react-redux"
import colors from "../constants/colors"
import fonts from "../constants/fonts"
import { login } from "../store/actions/auth.action"

const LoginScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const validateForm = () => {
        if (email !== '' && password !== '') {
            const dataLogin = { email, password }
            dispatch(login(dataLogin, setError))
        } else {
            setError('*Completa todos los campos')
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <View style={styles.formLogin}>
                <Text style={styles.title}>INICIAR SESIÓN</Text>
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Correo electrónico"
                    keyboardType="email-address"
                    onChangeText={e => {
                        setError('')
                        setEmail(e.trim())
                    }
                    }
                />
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    onChangeText={e => {
                        setError('')
                        setPassword(e.trim())
                    }
                    }
                />
                {error && <Text style={styles.error}>{error}</Text>}
                <TouchableOpacity onPress={() => validateForm()} ><Text style={styles.btnLogin}>Iniciar sesión</Text></TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'PoppinsMd', color: colors.letter }}>¿No estás registrado? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{ fontFamily: 'PoppinsMd', color: colors.blue }}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default connect()(LoginScreen)

const styles = StyleSheet.create({
    formLogin: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 80
    },
    title: {
        textAlign: 'center',
        fontFamily: 'PoppinsMd',
        fontWeight: '600',
        color: colors.letter,
        fontSize: fonts.h1,
        marginBottom: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: colors.lightGray,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        fontSize: fonts.h5,
        fontFamily: 'PoppinsMd',
        color: colors.letter,

    },
    btnLogin: {
        backgroundColor: colors.primary,
        color: colors.white,
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: fonts.h5,
        marginTop: 10,
        fontFamily: 'PoppinsMd',
        marginBottom: 20
    },
    error: {
        borderWidth: 2,
        borderColor: '#ff000040',
        backgroundColor: '#ff000015',
        color: colors.red,
        padding: 10,
        borderRadius: 5,
        fontFamily: 'PoppinsMd',
        marginVertical: 10,
    }
})
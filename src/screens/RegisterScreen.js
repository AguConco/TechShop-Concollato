import { useEffect, useReducer, useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import colors from "../constants/colors"
import fonts from "../constants/fonts"
import { register } from "../store/actions/auth.action"
import { useDispatch, connect } from "react-redux"

const RegisterScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    const validateForm = () => {
        if (email !== '' && password !== '' && name !== '') {
            const dataRegister = {
                email,
                password,
                name
            }
            dispatch(register(dataRegister, setError))
        } else {
            setError('*Completa todos los campos')
        }
    }

    const validateName = (e) => {
        setError('')

        const expressionName = /^[a-zA-Z ]+$/
        if (expressionName.test(e)) {
            setName(e)
            setError('')
        } else {
            setName('')
            setError('*El nombre no debe contener números ni símbolos')
        }

        e === '' && setError('')
    }

    const validateEmail = e => {
        setError('')

        const expressionEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (expressionEmail.test(e)) {
            setEmail(e)
            setError('')
        } else {
            setEmail('')
            setError('*La dirección de correo no tiene el formato requerido')
        }

        e === '' && setError('')
    }

    const validatePassword = e => {
        setError('')
        if (e.length < 6) {
            setError('*La contraseña debe contener 6 o más caracteres')
            setPassword('')
        } else {
            setError('')
            setPassword(e)
        }
        e.length === 0 && setError('')
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <View style={styles.formRegister}>
                <Text style={styles.title}>REGISTRAR</Text>
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Nombre y Apellido"
                    onChangeText={e => validateName(e)}
                />
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Correo electrónico"
                    keyboardType='email-address'
                    onChangeText={e => validateEmail(e)}
                />
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    onChangeText={e => validatePassword(e)}
                />
                {error && <Text style={styles.error}>{error}</Text>}
                <TouchableOpacity onPress={() => validateForm()} ><Text style={styles.btnRegister}>Registrarse</Text></TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'PoppinsMd', color: colors.letter }}>¿Ya estás registrado? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ fontFamily: 'PoppinsMd', color: colors.blue }}>Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default connect()(RegisterScreen)

const styles = StyleSheet.create({
    formRegister: {
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
    btnRegister: {
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
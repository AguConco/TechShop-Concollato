import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";

export const REGISTER_USER = 'REGISTER_USER'
export const LOG_OUT = 'LOG_OUT'
export const LOGIN_USER = 'LOGIN_USER'
export const EXISTENT_USER = 'EXISTENT_USER'

export const register = ({ email, password, name }, setError) => {
    return (dispatch) => {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    dispatch({
                        type: REGISTER_USER,
                        user: auth.currentUser
                    })
                })
            })
            .catch(error => {
                const errorCode = error.code;
                errorCode === 'auth/email-already-in-use' && setError('*Este correo electrónico ya está en uso.')
            })
    }
}

export const login = ({ email, password }, setError) => {
    return (dispatch) => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                dispatch({
                    type: LOGIN_USER,
                    user: auth.currentUser
                })
            })
            .catch(error => {
                const errorCode = error.code
                errorCode === 'auth/wrong-password' && setError('*La contraseña es incorrecta.')
                errorCode === 'auth/too-many-requests' && setError('*El acceso a esta cuenta se ha inhabilitado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarlo inmediatamente restableciendo su contraseña o puede volver a intentarlo más tarde.')
                errorCode === 'auth/user-not-found' && setError('*No se encontró ningún usuario. Prueba con otro correo')
            })
    }
}

export const logOut = () => {
    return (dispatch) => {
        const auth = getAuth()
        signOut(auth)
            .then(() => {
                dispatch({
                    type: LOG_OUT,
                    user: null
                })
            })
    }
}
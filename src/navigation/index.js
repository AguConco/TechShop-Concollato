import { NavigationContainer } from "@react-navigation/native"
import AuthNavigation from "./AuthNavigation"
import { useSelector } from "react-redux"
import TabNavigation from "./TabNavigation"
import { useEffect } from "react"
import { onAuthStateChanged, getAuth } from "firebase/auth"
import { useDispatch } from "react-redux"
import { EXISTENT_USER } from "../store/actions/auth.action"

export default () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const auth = getAuth()
    
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            dispatch({
                type: EXISTENT_USER,
                user: user
            })
        })
    }, [user])

    return (
        <NavigationContainer>
            {user ? <TabNavigation /> : <AuthNavigation />}
        </NavigationContainer>
    )
}
import { REGISTER_USER, LOG_OUT, LOGIN_USER, EXISTENT_USER } from "../actions/auth.action";

const initialState = {
    user: null
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return { user: action.user }
        case LOGIN_USER:
            return { user: action.user }
        case LOG_OUT:
            return { user: null }
        case EXISTENT_USER:
            return { user: action.user }
        default:
            return state;
    }
}


export default AuthReducer
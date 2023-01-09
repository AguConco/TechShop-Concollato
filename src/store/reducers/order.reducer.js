import { CONFIRMED_ORDER, RESET_ID_ORDER } from "../actions/order.action";

const initialState = {
    orderId: ''
}

const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONFIRMED_ORDER:
            return { orderId: action.orderId }
        case RESET_ID_ORDER:
            return { orderId: action.orderId }
        default:
            return state;
    }
}


export default OrderReducer
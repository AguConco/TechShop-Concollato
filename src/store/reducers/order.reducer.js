import { CONFIRMED_ORDER, GET_ORDERS, RESET_ORDER } from "../actions/order.action";

const initialState = {
    orders: [],
}

const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONFIRMED_ORDER:
            return { orders: [] }
        case GET_ORDERS:
            return { orders: action.orders }
        case RESET_ORDER:
            return { orders: [] }
        default:
            return state;
    }
}


export default OrderReducer
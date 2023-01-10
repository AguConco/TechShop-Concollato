import { CONFIRMED_ORDER, GET_ORDERS } from "../actions/order.action";

const initialState = {
    orders: [],
}

const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONFIRMED_ORDER:
            return { orders: [] }
        case GET_ORDERS:
            return { orders: action.orders }
        default:
            return state;
    }
}


export default OrderReducer
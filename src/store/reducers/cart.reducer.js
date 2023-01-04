import { ADD_PRODUCT, REMOVE_PRODUCT, GET_CART } from "../actions/cart.action";

const initialState = {
    cart: [],
    totalPrice: 0,
}

const sumTotal = (cart) => cart.map(e => e.quantity * e.price).reduce((a, b) => a + b, 0)

const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return { cart: state.cart, totalPrice: sumTotal(state.cart) }
        case REMOVE_PRODUCT:
            const cart = state.cart.filter(e => e.id !== action.product.id)
            return { cart: cart, totalPrice: sumTotal(cart) }
        case GET_CART:
            return { cart: action.cart, totalPrice: sumTotal(action.cart) }
        default:
            return state

    }
}

export default CartReducer
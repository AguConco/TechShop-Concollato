import { ADD_PRODUCT, REMOVE_PRODUCT } from "../actions/cart.action";

const initialState = {
    cart: [],
    totalPrice: 0,
}

const sumTotal = (cart) => cart.map(e => e.quantity * e.price).reduce((a, b) => a + b, 0)

const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            const isInCart = (product) => state.cart.some(cartProduct => cartProduct.id === product.id)

            if (isInCart(action.product)) {
                let productCurrent = state.cart.find(e => e.id === action.product.id)

                if ((productCurrent.quantity + action.product.quantity) <= productCurrent.available_quantity) {
                    productCurrent.quantity += action.product.quantity
                } else {
                    productCurrent.quantity = productCurrent.available_quantity
                }

                return { cart: state.cart, totalPrice: sumTotal(state.cart) }
            } else {
                const cart = [...state.cart, action.product]
                return { cart: cart, totalPrice: sumTotal(cart) }
            }
        case REMOVE_PRODUCT:
            const cart = state.cart.filter(e => e.id !== action.product.id)
            return { cart: cart, totalPrice: sumTotal(cart) }
        default:
            return state

    }
}

export default CartReducer
import { SELECTED_PRODUCT, RESET_SELECTED_PRODUCT } from '../actions/product.action'

const initialState = {
    selected: null
}

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECTED_PRODUCT:
            return { selected: action.payload }
        case RESET_SELECTED_PRODUCT:
            return { selected: null }
        default:
            return state
    }
}

export default ProductReducer
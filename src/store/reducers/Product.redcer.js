import products from '../../db/products'
import { SELECTED_PRODUCT } from '../actions/product.action'

const initialState = {
    products: products,
    selected: null
}

const ProductReducer = (state = initialState, action) => {
    if(action.type === SELECTED_PRODUCT) return products.find(e => e.id === action.productId)
    return state
}

export default ProductReducer
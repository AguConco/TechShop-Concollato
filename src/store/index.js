import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import CartReducer from "./reducers/cart.reducer"
import CategoryReducer from "./reducers/category.reducer"
import ProductReducer from "./reducers/Product.redcer"

const RootReducer = combineReducers({
    categories: CategoryReducer,
    product: ProductReducer,
    cart: CartReducer
})

export default createStore(RootReducer, applyMiddleware(thunk))
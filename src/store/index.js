import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import AuthReducer from "./reducers/auth.reducer"
import CartReducer from "./reducers/cart.reducer"
import CategoryReducer from "./reducers/category.reducer"
import OrderReducer from "./reducers/order.reducer"
import ProductReducer from "./reducers/Product.redcer"

const RootReducer = combineReducers({
    categories: CategoryReducer,
    product: ProductReducer,
    cart: CartReducer,
    user: AuthReducer,
    order: OrderReducer
})

export default createStore(RootReducer, applyMiddleware(thunk))
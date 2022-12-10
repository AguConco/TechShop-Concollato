import { createStore, combineReducers} from "redux"
import CategoryReducer from "./reducers/category.reducer"
import ProductReducer from "./reducers/Product.redcer"

const RootReducer = combineReducers({
    categories: CategoryReducer,
    product: ProductReducer
})

export default createStore(RootReducer)
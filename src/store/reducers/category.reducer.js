import products from "../../db/products"
import { SELECTED_CATEGORY } from "../actions/category.action";

const initialState = {
    selected: []
}

const CategoryReducer = (state = initialState, action) => {
    if(action.type === SELECTED_CATEGORY) return products.filter(e => e.categoryId === action.categoryId)
    return state
}


export default CategoryReducer
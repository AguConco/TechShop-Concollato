import { GET_CATEGORY, RESET_SELECTED_CATEGORY } from "../actions/category.action";

const initialState = {
    selected: []
}

const CategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY:
            return { selected: action.payload }
        case RESET_SELECTED_CATEGORY:
            return { selected: [] }
        default:
            return state;
    }
}


export default CategoryReducer
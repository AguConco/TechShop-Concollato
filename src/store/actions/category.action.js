import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'

export const GET_CATEGORY = 'GET_CATEGORY'
export const RESET_SELECTED_CATEGORY = 'RESET_SELECTED_CATEGORY'

export const selectedCategory = (id) => {
    return (dispatch) => {
        const db = getFirestore()
        const itemsCollection = query(collection(db, "items"), where("categoryId", "==", id))
        getDocs(itemsCollection).then(e => {
            dispatch({
                type: GET_CATEGORY,
                payload: e.docs.map(item => ({ ...item.data() }))
            })
        })
    }

}

export const resetSelectedCategory = () => ({
    type: RESET_SELECTED_CATEGORY
})
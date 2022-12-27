import { doc, getDoc, getFirestore } from 'firebase/firestore'

export const SELECTED_PRODUCT = 'SELECTED_PRODUCT'
export const RESET_SELECTED_PRODUCT = 'RESET_SELECTED_PRODUCT'

export const selectedProduct = (id) => {
    return (dispatch) => {
        const db = getFirestore()
        const item = doc(db, "items", id)
        getDoc(item).then(e => {
            dispatch({
                type: SELECTED_PRODUCT,
                payload: e.data()
            })
        }
        )
    }
}

export const resetSelectedProduct = () => ({
    type: RESET_SELECTED_PRODUCT
})
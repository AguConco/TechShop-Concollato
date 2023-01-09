import { addDoc, collection, getFirestore, Timestamp } from "firebase/firestore"
import { confirmedOrder } from "../../db"

export const CONFIRMED_ORDER = 'CONFIRMED_ORDER'
export const RESET_ID_ORDER = 'RESET_ID_ORDER'

export const generateOrder = (infoOrder) => {
    return (dispatch) => {
        const { user, totalPrice, cartProducts, commentary, delivery, phone } = infoOrder

        const order = {
            buyer: { name: user.displayName, email: user.email },
            items: cartProducts.map(e => ({
                name: e.name,
                quantity: e.quantity,
                price: e.price,
                id: e.id,
                picture: e.pictures[0]
            })),
            commentary,
            total: totalPrice,
            datetime: Timestamp.fromDate(new Date()),
            uid: user.uid,
            delivery,
            phone
        }

        const db = getFirestore()
        const orderCollection = collection(db, "orders")
        addDoc(orderCollection, order)
            .then(({ id }) => {
                confirmedOrder(user.uid)
                    .then(() => {
                        dispatch({
                            type: CONFIRMED_ORDER,
                            orderId: id
                        })
                    })
            })
    }
}

export const resetIdOrder = () => ({
    type: RESET_ID_ORDER,
    orderId: ''
})
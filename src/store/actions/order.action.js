import { addDoc, collection, getDocs, getFirestore, query, Timestamp, where } from "firebase/firestore"
import { confirmedOrder } from "../../db"

export const CONFIRMED_ORDER = 'CONFIRMED_ORDER'
export const GET_ORDERS = 'GET_ORDERS'
export const RESET_ORDER = 'RESET_ORDER'

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

export const getOrder = (uid) => {
    return (dispatch) => {
        const db = getFirestore()
        const ordersCollection = query(collection(db, "orders"), where("uid", "==", uid))
        getDocs(ordersCollection).then(e => {
            e.docs.length === 0 ? 
            dispatch({
                type: GET_ORDERS,
                orders: null
            })
            :
            dispatch({
                type: GET_ORDERS,
                orders: e.docs.map(order => ({ ...order.data(), orderId: order._document.key.path.segments[6] }))
            })
        })
    }
}

export const resetOrder = () => ({
    type: RESET_ORDER
})
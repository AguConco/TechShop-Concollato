import { deleteProduct, fetchCart, insertProduct, isInCart, updateProduct } from "../../db"

export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const GET_CART = 'GET_CART'

export const addProduct = (product, uid) => {
    return (dispatch) => {
        isInCart(product.id, uid)
            .then(e => {
                if (e.rows.length != 0) {
                    let productCurrent = JSON.parse(e.rows._array[0].product)
                    if ((productCurrent.quantity + product.quantity) <= productCurrent.available_quantity) {
                        productCurrent.quantity += product.quantity
                    } else {
                        productCurrent.quantity = productCurrent.available_quantity
                    }
                    updateProduct(JSON.stringify(productCurrent), productCurrent.id, uid)
                        .then(() =>
                            dispatch({
                                type: ADD_PRODUCT,
                            })
                        )
                        .catch((err) => {
                            console.log("Data base fail");
                            console.log(err.message);
                        })
                } else {
                    insertProduct(JSON.stringify(product), product.id, uid)
                        .then(() => {
                            dispatch({
                                type: ADD_PRODUCT,
                            })
                        })
                        .catch((err) => {
                            console.log("Data base fail");
                            console.log(err.message);
                        })
                }
            })
    }
}

export const removeProduct = (product, uid) => {
    deleteProduct(product.id, uid)
    return ({
        type: REMOVE_PRODUCT,
        product,
    })
}

export const getCart = (uid) => {
    return (dispatch) => {
        fetchCart(uid)
            .then(e => {
                dispatch({
                    type: GET_CART,
                    cart: e.rows._array.map(p => JSON.parse(p.product))
                })
            })
            .catch((err) => {
                console.log("Data base fail");
                console.log(err.message);
            })
    }
}


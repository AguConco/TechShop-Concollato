export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const CLEAR = 'CLEAR'
export const ALL_PRODUCTS = 'ALL_PRODUCTS'

export const addProduct = (product) => ({
    type: ADD_PRODUCT,
    product
})

export const removeProduct = (product) => ({
    type: REMOVE_PRODUCT,
    product
})

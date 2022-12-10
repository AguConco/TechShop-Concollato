export const SELECTED_PRODUCT = 'SELECTED_PRODUCT'

export const selectedProduct = (id) => ({
    type: SELECTED_PRODUCT,
    productId: id
})
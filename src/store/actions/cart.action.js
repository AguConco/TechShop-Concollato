// todos los localstorange son llamadas a la db
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const CLEAR = 'CLEAR'
export const ALL_PRODUCTS = 'ALL_PRODUCTS'

export const addProduct = (product) => (
    {
        type: ADD_PRODUCT,
        product
    }
)

export const removeProduct = (product) => (
    {
        type: REMOVE_PRODUCT,
        product
    }
)
// const clear = () => {
//     setCart([])
//     // localStorage.removeItem('cart'+userId)
// }
// const updateItem = (id, cantidad) => {
//     let productoActualizar = cart.find(e => e.id === id)
//     productoActualizar.cantidad = cantidad
//     productoActualizar.precioTotal = (productoActualizar.price || productoActualizar.buy_box_winner.price) * cantidad
//     setCart([...cart])
//     // localStorage.setItem('cart'+userId,JSON.stringify([...cart]))

// }
// const getCart = () => {
//     if (user !== null) {
//         setCart([])
//         // localStorage.getItem('cart-'+user.uid) && setCart(JSON.parse(localStorage.getItem('cart-'+user.uid)))
//     }
// }

// const allProducts = () => cart.reduce((acumulado, producto) => acumulado + producto.cantidad, 0)

// useEffect(() => {
//     setCart([])
//     setUserId(user !== null && '-' + user.uid)
//     getCart()
// }, [user])
import { useContext } from "react"
import ProductDetail from "../components/ProductDetail"
import { NavigationContext } from "../context/NavigationContext"

const DetailScreen = () => {

    const { products, selectedProduct } = useContext(NavigationContext)

    return (
        products.map(p => (
            p.id === selectedProduct && <ProductDetail detail={p} />
        ))
    )
}

export default DetailScreen


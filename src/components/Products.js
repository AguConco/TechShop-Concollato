import { useContext } from "react"
import { Image, Text, StyleSheet, TouchableOpacity } from "react-native"
import { NavigationContext } from "../context/NavigationContext"
import fonts from "../constants/fonts"
import colors from "../constants/colors"

const Products = ({navigation}) => {

    const { selectedCategory, products, setSelectedProduct } = useContext(NavigationContext)

    return (
        products.map(p => (
            p.category === selectedCategory &&
            <TouchableOpacity
                onPress={() => {
                    setSelectedProduct(p.id)
                    navigation.navigate('Detail')
                }}
                style={styles.product} key={p.id}>
                <Image style={styles.image} resizeMode="contain" source={{ uri: p.pictures[0] }} />
                <Text numberOfLines={2} ellipsizeMode="tail" style={styles.name}> {p.name}</Text>
                <Text style={styles.price}>${p.price} </Text>
            </TouchableOpacity>
        ))
    )
}

export default Products

const styles = StyleSheet.create({
    product: {
        backgroundColor: "#fff",
        width: '45%',
        height: 220,
        marginHorizontal: '2.5%',
        marginVertical: '2.5%',
        borderRadius: 5,
        borderColor: colors.lightGray,
        borderWidth: 1,
        padding: 10,
        alignItems: 'center',
    },
    image: {
        width: '90%',
        height: '60%',
    },
    name: {
        width: '100%',
        fontSize: fonts.h6,
        textAlign: 'left',
        fontFamily: 'PoppinsMd',
        color: colors.letter,
        marginTop: 10
    },
    price: {
        paddingTop: 5,
        width: '100%',
        fontSize: fonts.h4,
        textAlign: 'left',
        fontWeight: '700',
        fontFamily: 'PoppinsMd',
        color: colors.letter
    }
})
import { Image, Text, StyleSheet, TouchableOpacity } from "react-native"
import fonts from "../constants/fonts"
import colors from "../constants/colors"
import { useDispatch, connect } from "react-redux"
import { selectedProduct } from "../store/actions/product.action"

const Products = ({ navigation, item }) => {
    const dispatch = useDispatch()
    return (
        <TouchableOpacity
            onPress={() => {
                dispatch(selectedProduct(item.id))
                navigation.navigate('Detail', {navigation: navigation})
            }}
            style={styles.product} key={item.id}>
            <Image style={styles.image} resizeMode="contain" source={{ uri: item.pictures[0] }} />
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.name}> {item.name}</Text>
            <Text style={styles.price}>${item.price} </Text>
        </TouchableOpacity>
    )
}


export default connect()(Products)

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
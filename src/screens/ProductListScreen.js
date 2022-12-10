import { StyleSheet, View, Dimensions, FlatList } from "react-native"
import colors from "../constants/colors"
import Products from "../components/Products"
import fonts from "../constants/fonts"
import { useSelector } from "react-redux"

const heightWindow = Dimensions.get('window').height

const ProductListScreen = ({ navigation }) => {
    const selectedCategory = useSelector(state => state.categories)
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={selectedCategory}
                renderItem={e => <Products item={e.item} navigation={navigation} />}
                keyExtractor={e => e.id}
                style={styles.containerProducts}
                numColumns={2}
                horizontal={false}
            />
        </View>
    )
}

export default ProductListScreen

const styles = StyleSheet.create({
    title: {
        fontFamily: 'PoppinsMd',
        textAlign: 'center',
        fontSize: fonts.h4,
        textTransform: 'uppercase',
        fontWeight: '700',
        color: colors.white,
    },
    containerProducts: {
        height: heightWindow,  
        backgroundColor: colors.white,
    },
})
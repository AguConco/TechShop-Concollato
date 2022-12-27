import { StyleSheet, View, Dimensions, FlatList, Text, Image } from "react-native"
import colors from "../constants/colors"
import Products from "../components/Products"
import fonts from "../constants/fonts"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useIsFocused } from '@react-navigation/native'
import { resetSelectedProduct } from "../store/actions/product.action"
import Loading from '../components/Loading'

const heightWindow = Dimensions.get('window').height

const ProductListScreen = ({ navigation }) => {
    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const selectedCategory = useSelector(state => state.categories.selected)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        dispatch(resetSelectedProduct())
        selectedCategory.length != 0 && setLoading(false)
    }, [isFocused, selectedCategory])

    return (
        <View style={{ flex: 1 }}>
            {
                loading ?
                    <Loading />
                    :
                    <FlatList
                        data={selectedCategory}
                        renderItem={e => <Products item={e.item} navigation={navigation} />}
                        keyExtractor={e => e.id}
                        style={styles.containerProducts}
                        numColumns={2}
                        horizontal={false}
                    />
            }
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
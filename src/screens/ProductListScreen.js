import { StyleSheet, View, ScrollView, Dimensions } from "react-native"
import colors from "../constants/colors"
import Products from "../components/Products"
import fonts from "../constants/fonts"

const heightWindow = Dimensions.get('window').height

const ProductListScreen = ({ navigation, route }) => {

    const selectedCategory = route.params
    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.containerProducts}>
                    <Products navigation={navigation} selectedCategory={selectedCategory} />
                </View>
            </ScrollView>
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
        flexDirection: "row",
        flexWrap: 'wrap',
        paddingVertical: 10,
        height: heightWindow,
        backgroundColor: colors.white
    },
})
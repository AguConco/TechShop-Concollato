import { StyleSheet, View, ScrollView, Dimensions } from "react-native"
import colors from "../constants/colors"
import Products from "../components/Products"

const heightWindow = Dimensions.get('window').height

const ProductListScreen = ({ navigation }) => {

    return (
        <ScrollView>
            <View style={styles.ContainerProducts}>
                <Products navigation={navigation} />
            </View>
        </ScrollView>
    )
}

export default ProductListScreen

const styles = StyleSheet.create({
    ContainerProducts: {
        flexDirection: "row",
        flexWrap: 'wrap',
        paddingVertical: 10,
        height: heightWindow,
        backgroundColor: colors.white
    },
})
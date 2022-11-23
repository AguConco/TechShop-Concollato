import { View, Text, FlatList, Image, Dimensions, StyleSheet } from "react-native"
import colors from "../constants/colors"
import fonts from "../constants/fonts"

const widthWindows = Dimensions.get('window').width

const ProductDetail = ({ detail }) => {
    return (
        <View style={styles.product} key={detail.id}>
            <FlatList
                data={detail.pictures}
                renderItem={({ item }) => <Image key={item} style={styles.picture} resizeMode="contain" source={{ uri: item }} />}
                style={styles.containerPictures}
                keyExtractor={e => e}
                horizontal={true}
                snapToInterval={widthWindows}
                snapToAlignment={"center"}
                decelerationRate={0}
                showsHorizontalScrollIndicator={false}
            />
            <View style={styles.infoDetail}>
                <Text style={styles.price}>${detail.price}</Text>
                <Text style={styles.brand}>{detail.brand}</Text>
                <Text style={styles.name}>{detail.name}</Text>
            </View>
        </View>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    product: {
        backgroundColor: colors.white,
    },
    containerPictures: {
        borderBottomColor: colors.lightGray,
        borderBottomWidth: 1,
        paddingVertical: 20
    },
    picture: {
        height: 270,
        width: widthWindows,
    },
    infoDetail: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    price: {
        fontSize: fonts.h1,
        fontWeight: '600',
        fontFamily: 'PoppinsMd',
        color: colors.letter
    },
    brand: {
        textTransform: 'uppercase',
        fontSize: fonts.h6,
        fontWeight: '500',
        backgroundColor: colors.lightGray,
        paddingVertical: 3,
        paddingHorizontal: 7,
        borderRadius: 5,
        color: colors.primary,
        fontFamily: 'PoppinsMd'
    },
    name: {
        fontSize: fonts.h3,
        fontFamily: 'PoppinsMd',
        color: colors.letter,
        width: '100%'
    },
})
import {
    View,
    Text,
    FlatList,
    Image,
    Dimensions,
    StyleSheet,
} from "react-native"
import colors from "../constants/colors"
import fonts from "../constants/fonts"
import Counter from "./Counter";
import MainFeatures from "./MainFeatures";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const widthWindows = Dimensions.get('window').width

const ProductDetail = () => {
    const [loading, setLoading] = useState(true)
    const detail = useSelector(state => state.product.selected)

    useEffect(() => {
        setLoading(true)
        detail && setLoading(false)
    }, [detail])

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            {loading ?
                <Loading />
                :
                <View style={styles.product} key={detail.id}>
                    <FlatList
                        data={detail.pictures}
                        keyExtractor={e => e}
                        renderItem={({ item }) => <Image key={item} style={styles.picture} resizeMode="contain" source={{ uri: item }} />}
                        style={styles.containerPictures}
                        horizontal={true}
                        snapToInterval={widthWindows}
                        snapToAlignment={"center"}
                        decelerationRate={0}
                        showsHorizontalScrollIndicator={false}
                    />
                    <View style={styles.infoDetail}>
                        <Text style={styles.availableQuantity}>Disponibles: {detail.available_quantity}</Text>
                        <Text style={styles.price}>${detail.price}</Text>
                        <Text style={styles.brand}>{detail.brand}</Text>
                        <Text style={styles.name}>{detail.name}</Text>
                        {detail.hasOwnProperty('main_features') && <MainFeatures mainFeatures={detail.main_features} />}
                    </View>
                    <Counter availableQuantity={detail.available_quantity} />
                </View>}
        </View>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    product: {
        backgroundColor: colors.white,
        paddingBottom: 30
    },
    containerPictures: {
        borderBottomColor: colors.lightGray,
        borderBottomWidth: 1,
        paddingVertical: 20,
        height: 310,
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
    availableQuantity: {
        fontFamily: 'PoppinsMd',
        fontSize: fonts.h6,
        padding: 5,
        color: colors.white,
        position: 'absolute',
        backgroundColor: '#000000aa',
        paddingHorizontal: 15,
        borderRadius: 5,
        zIndex: 100,
        left: 20,
        top: -50
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
    }
})
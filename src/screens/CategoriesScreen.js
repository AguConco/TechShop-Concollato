import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native"
import imgComputadora from '../assets/images/5b79cd8fa5ac5f3cee6a0199c191.jpg'
import imgCelulares from '../assets/images/te2779-1_1.jpg'
import imgParlantes from '../assets/images/400_400-440-nka-006.png'
import imgRelojes from '../assets/images/xiaomi-mi-smart-band-6-smart-watch-reloj-inteligente.jpg'
import colors from "../constants/colors"
import fonts from "../constants/fonts"

const CategoriesScreen = ({ navigation }) => {

    const categories = [
        {
            image: imgComputadora,
            name: 'Computadoras'
        },
        {
            image: imgCelulares,
            name: 'Celulares'
        },
        {
            image: imgParlantes,
            name: 'Parlantes'
        },
        {
            image: imgRelojes,
            name: 'Relojes'
        }
    ]

    return (
        <View style={styles.containerCategories}>
            {categories.map(e => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Products', e.name)
                    }}
                    key={e.name}
                    style={styles.containerImage}>
                    <Image style={styles.image} resizeMode='contain' source={e.image}></Image>
                    <Text style={styles.name}>{e.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    containerCategories: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        backgroundColor: colors.white,
        flex: 1
    },
    containerImage: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '45%',
        height: 160,
        borderRadius: 10,
        borderColor: colors.lightGray,
        borderWidth: 1,
        shadowOffset: '',
        padding: 10,
        margin: '2.5%',
        backgroundColor: colors.white,
    },
    image: {
        width: '70%',
        height: '70%'
    },
    name: {
        textAlign: 'center',
        paddingTop: 10,
        fontFamily: 'PoppinsMd',
        textTransform: 'uppercase',
        fontSize: fonts.h6,
        color: colors.letter
    }
})
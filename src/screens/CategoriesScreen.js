import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native"
import imgComputadora from '../assets/images/5b79cd8fa5ac5f3cee6a0199c191.jpg'
import imgCelulares from '../assets/images/te2779-1_1.jpg'
import imgParlantes from '../assets/images/400_400-440-nka-006.png'
import imgRelojes from '../assets/images/xiaomi-mi-smart-band-6-smart-watch-reloj-inteligente.jpg'
import colors from "../constants/colors"
import fonts from "../constants/fonts"
import { useDispatch, connect } from "react-redux"
import { resetSelectedCategory, selectedCategory } from "../store/actions/category.action"
import { useEffect } from "react"
import { useIsFocused } from '@react-navigation/native'

const CategoriesScreen = ({ navigation }) => {
    const isFocused = useIsFocused()
    const dispatch = useDispatch()

    const categories = [
        {
            image: imgComputadora,
            name: 'Computadoras',
            id: 1
        },
        {
            image: imgCelulares,
            name: 'Celulares',
            id: 2
        },
        {
            image: imgParlantes,
            name: 'Parlantes',
            id: 3
        },
        {
            image: imgRelojes,
            name: 'Relojes',
            id: 4
        }
    ]

    useEffect(() => {
        dispatch(resetSelectedCategory())
    }, [isFocused])

    return (
        <View style={styles.containerCategories}>
            {categories.map(e => (
                <TouchableOpacity
                    onPress={() => {
                        dispatch(selectedCategory(e.id))
                        navigation.navigate('Products', e.name)
                    }}
                    key={e.name}
                    style={styles.containerImage}>
                    <Image style={styles.image} resizeMode='contain' source={e.image} />
                    <Text style={styles.name}>{e.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default connect()(CategoriesScreen)

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
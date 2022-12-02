import { View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity } from "react-native"
import colors from "../constants/colors"
import fonts from "../constants/fonts"
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState, useEffect } from "react";


const Counter = ({ availableQuantity }) => {

    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        availableQuantity === 0 ? setQuantity(0) : setQuantity(1)
    }, [availableQuantity])

    const changeQuantity = (e) => {
        if (e) {
            quantity < availableQuantity && setQuantity(quantity + 1)
        } else {
            availableQuantity !== 0 && quantity > 1 && setQuantity(quantity - 1)
        }
    }

    return (
        <View style={styles.containerCounter}>
            <View style={styles.selectedQuantity}>
                <Pressable onPress={() => changeQuantity(false)} style={{ ...styles.btnCounter, ...styles.btnMinus }}>
                    <Text>
                        <FontAwesomeIcon icon={faMinus} size={fonts.h5} color={colors.primary} />
                    </Text>
                </Pressable>
                <TextInput
                    style={styles.inputSelectedQuantity}
                    value={quantity.toString()}
                    editable={false}
                />
                <Pressable onPress={() => changeQuantity(true)} style={{ ...styles.btnCounter, ...styles.btnPlus }}>
                    <Text>
                        <FontAwesomeIcon icon={faPlus} size={fonts.h5} color={colors.primary} />
                    </Text>
                </Pressable>
            </View>
            <TouchableOpacity style={styles.btnAddCart}>
                <Text style={styles.btnAddCartText}>Agregar al carrito</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Counter

const styles = StyleSheet.create({
    containerCounter: {
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 30,
    },
    selectedQuantity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        backgroundColor: colors.lightGray,
        borderRadius: 5,
        marginBottom: 10
    },
    inputSelectedQuantity: {
        backgroundColor: colors.lightGray,
        color: colors.letter,
        textAlign: 'center',
        fontSize: fonts.h5,
        fontFamily: 'PoppinsMd',
    },
    btnCounter: {
        paddingHorizontal: 22,
        paddingVertical: 15,
    },
    btnAddCart: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        width: '100%',
    },
    btnAddCartText: {
        color: colors.white,
        fontFamily: 'PoppinsMd',
        textAlign: 'center',
        fontSize: fonts.h5
    }
})
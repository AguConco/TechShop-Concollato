import { View, Text, FlatList, StyleSheet } from "react-native"
import colors from "../constants/colors"
import fonts from "../constants/fonts"

const MainFeatures = ({ mainFeatures }) => {
    return (
        <View style={styles.containerMainFeatures}>
            <Text style={styles.title}>Características</Text>
            <FlatList
                data={mainFeatures}
                keyExtractor={e => e}
                renderItem={({ item }) => <Text style={styles.itemsList}> ●   {item}</Text>}
            />
        </View>
    )
}

export default MainFeatures

const styles = StyleSheet.create({
    containerMainFeatures: {
        paddingTop: 20
    },
    title: {
        color: colors.letter,
        fontSize: fonts.h4,
        fontFamily: 'PoppinsMd',
        borderLeftColor: colors.primary,
        borderLeftWidth: 2,
        paddingLeft: 15,
        marginBottom: 10,
        fontWeight: '900'
    },
    itemsList: {
        color: colors.letter,
        fontSize: fonts.h6,
        fontFamily: 'PoppinsMd',
        paddingHorizontal: 5
    }
})
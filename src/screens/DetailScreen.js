import ProductDetail from "../components/ProductDetail"
import { ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import colors from "../constants/colors"

const DetailScreen = ({ navigation }) => (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
            <ProductDetail navigation={navigation} />
        </ScrollView>
    </SafeAreaView>
)

export default DetailScreen


import { View, Image } from "react-native"
import LoadingGif from '../assets/images/loading.gif'
import colors from "../constants/colors"


const Loading = () =>
    <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white }}
    >
        <Image style={{ height: 60, width: 150 }} source={LoadingGif} />
    </View>

export default Loading
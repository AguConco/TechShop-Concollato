import { useFonts } from 'expo-font'
import Loading from './src/assets/images/loading.gif'
import { Image, View } from 'react-native'
import TabNavigation from './src/navigation/TabNavigation'
import { Provider } from 'react-redux'
import store from './src/store'

export default function App() {

  const [fontsLoaded] = useFonts({
    PoppinsMd: require('./src/assets/fonts/Poppins-Medium.ttf')
  }
  )

  if (!fontsLoaded) return <View
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Image style={{ height: 60, width: 150 }} source={Loading} />
  </View>

  return (
    <Provider store={store}>
      <TabNavigation />
    </Provider>
  )
}

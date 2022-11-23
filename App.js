import NavigationProvider from './src/context/NavigationContext';
import ShopNavigator from './src/navigation/ShopNavigator';
import { useFonts } from 'expo-font';
import Loading from './src/assets/images/loading.gif'
import { Image, View } from 'react-native';

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
    <NavigationProvider>
      <ShopNavigator />
    </NavigationProvider>
  )
}


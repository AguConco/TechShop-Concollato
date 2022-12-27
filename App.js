import { useFonts } from 'expo-font'
import { Provider } from 'react-redux'
import store from './src/store'
import { initializeApp } from "firebase/app"
import MainNavigator from "./src/navigation"
import Loading from './src/components/Loading'

const firebaseConfig = {
  apiKey: "AIzaSyAu_E4dO-0y0H6paI1IwOEMtbeweN9Pv7U",
  authDomain: "proyecto-coderhouse-a5061.firebaseapp.com",
  projectId: "proyecto-coderhouse-a5061",
  storageBucket: "proyecto-coderhouse-a5061.appspot.com",
  messagingSenderId: "401130081517",
  appId: "1:401130081517:web:b0c7c088da51e234d310e4"
};

initializeApp(firebaseConfig);

export default function App() {

  const [fontsLoaded] = useFonts({ PoppinsMd: require('./src/assets/fonts/Poppins-Medium.ttf') })

  if (!fontsLoaded) return <Loading />

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  )
}
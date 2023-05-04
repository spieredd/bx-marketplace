import '@/styles/globals.css'
import { FirebaseProvider } from '../context/firebaseContext'

export default function App({ Component, pageProps }) {
  return (
    <FirebaseProvider>
      <Component {...pageProps} />
    </FirebaseProvider>
  )
}

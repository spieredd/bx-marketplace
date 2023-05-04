import { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore, getDocs, query, collection, orderBy } from 'firebase/firestore'


const FirebaseContext = createContext()

export const useFirebase = () => useContext(FirebaseContext)

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,

}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export const firestore = getFirestore(app)

export const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
        })
        return () => unsubscribe()
    }, [])

    const signIn = async () => {
        await signInWithPopup(auth, provider)
    }

    const logOut = async () => {
        await signOut(auth)
    }

    const fetchRequests = async () => {
        const requestCollection = collection(firestore, 'requests')
        const requestQuery = query(requestCollection, orderBy('date', 'desc'))
        const requestSnapshot = await getDocs(requestQuery)
        const requests = requestSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        return requests
    }

    const fetchOffers = async () => {
        const requestCollection = collection(firestore, 'offers')
        const requestQuery = query(requestCollection, orderBy('date', 'desc'))
        const requestSnapshot = await getDocs(requestQuery)
        const requests = requestSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        return requests
    }

    return (
        <FirebaseContext.Provider value={{ user, signIn, signOut: logOut, app, firestore, fetchRequests, fetchOffers }}>
            {children}
        </FirebaseContext.Provider>
    )
}

import { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore, getDocs, query, collection, orderBy } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { setDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { getDoc } from 'firebase/firestore';





export const FirebaseContext = createContext()

const getFirestoreInstance = () => getFirestore(app);


export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    if (context === undefined) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }

    return { ...context, firestore };
}
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: "bx-marketplace.appspot.com",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()



export const firestore = getFirestore(app)

const storage = getStorage(app)


export const FirebaseProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDocRef = doc(firestore, 'users', user.uid);
                const userDocSnapshot = await getDoc(userDocRef);
                if (userDocSnapshot.exists()) {
                    setUser({
                        ...userDocSnapshot.data(),
                        phoneNumberProvided: !!userDocSnapshot.data().phoneNumber,
                    });
                } else {
                    router.push('/phone-form');
                }
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);
    

    const signIn = async () => {
        return signInWithPopup(auth, provider);
    };
    
    
    
    

    const logOut = async () => {
        await signOut(auth)
        setUser(null)
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
        <FirebaseContext.Provider value={{ auth,setUser, storage, user, signIn, signOut: logOut, app, getFirestore: getFirestoreInstance, firestore, fetchRequests, fetchOffers }}>
            {children}
        </FirebaseContext.Provider>
    )
}

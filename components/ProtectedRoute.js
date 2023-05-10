import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useFirebase } from '../context/firebaseContext'

const ProtectedRoute = ({ children }) => {
    const { app } = useFirebase()
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!app) return

        const auth = getAuth(app)
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/')
            } else {
                setLoading(false)
            }
        })

        return () => {
            unsubscribe()
        }
    }, [app, router])

    return <>{!loading && children}</>
}

export default ProtectedRoute
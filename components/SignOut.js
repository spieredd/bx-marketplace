import { useFirebase } from '../context/firebaseContext'

const SignOut = () => {
    const { signOut } = useFirebase()

    return (
        <button type="button"
            className="mt-4 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20" onClick={signOut}>
            Sign Out
        </button>
    )
}

export default SignOut

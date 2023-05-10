import { useState, useEffect } from 'react';
import { useFirebase } from '../context/firebaseContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; 
import { useRouter } from 'next/router';
import Link from "next/link"
import ProtectedRoute from '../components/ProtectedRoute'

const PhoneForm = () => {
    const { user, firestore, auth, setUser } = useFirebase();  
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                console.log(currentUser);
                setUser(currentUser);
                setLoading(false);
            } else {
                console.log('No user.');
                setUser(null);
                setLoading(true);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (event) => {
        console.log("hello")
        event.preventDefault();
        if (!phoneNumber) return;

        await setDoc(doc(firestore, 'users', user.uid), {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
            phoneNumber, // Save phone number
        });

        // Redirect to profile page
        var encodedName = encodeURIComponent(user.displayName);
        var profileURL = `/profile/${encodedName}`;
        router.push('/');
    };

    return (
        <ProtectedRoute>

            <>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-10 w-auto"
                            src="https://static.vecteezy.com/system/resources/previews/019/046/339/original/gold-coin-money-symbol-icon-png.png"
                            alt="Your Company"
                        />
                        <Link href="/">
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                                BX-marketplace
                            </h2>
                        </Link>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                    Phone number
                                </label>
                                <div className="mt-2">
                                    <input
                                        required
                                        id="email"
                                        name="email"
                                        type="tel"
                                        autoComplete="email"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="pl-4 block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <p className="text-xs mt-1 text-gray-400">
                                    Your phone number will be important for people to contact you.
                                </p>
                            </div>




                            <button
                                type="submit"
                                disabled={loading}
                                className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Confirm
                            </button>
                        </form>


                    </div>
                </div>
            </>
        </ProtectedRoute>


    );
};

export default PhoneForm;

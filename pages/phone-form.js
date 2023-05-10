import { useState, useEffect } from 'react';
import { useFirebase } from '../context/firebaseContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';  // import onAuthStateChanged
import { useRouter } from 'next/router';

const PhoneForm = () => {
    const { user, firestore, auth, setUser } = useFirebase();  // ensure to get auth from Firebase context
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // User is signed in.
                console.log(currentUser);
                setUser(currentUser);
                setLoading(false);
            } else {
                // User is signed out.
                console.log('No user.');
                setUser(null);
                setLoading(true);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (event) => {
        console.log("hello")
        event.preventDefault();
        if (!phoneNumber) return;

        // Update Firestore
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
        <form onSubmit={handleSubmit}>
            <label>
                Phone Number:
                <input
                    className='text-gray-400'
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </label>
            <button className='cursor-pointer' type="submit" disabled={loading}>Submit</button>
        </form>

    );
};

export default PhoneForm;

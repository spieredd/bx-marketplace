import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useFirebase } from '../../context/firebaseContext'
import { collection, query, where, getDocs } from 'firebase/firestore';
import Link from 'next/link'

export default function Profile() {
  const { firestore } = useFirebase()

  const router = useRouter();
  const encodedName = router.query.name;
  const name = decodeURIComponent(encodedName);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser()
  }, [encodedName]);

  const fetchUser = async () => {
    try {
      const usersRef = collection(firestore, 'users');
      const q = query(usersRef, where("displayName", "==", name));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUserInfo(querySnapshot.docs[0].data());
      } else {
        console.log('No such user!');
      }
    } catch (error) {
      console.log('Error getting user:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userInfo) {
    return <p>No such user!</p>;
  }


  return (
    <>
          <main className="py-10">
              <div className='px-4 sm:px-6 lg:px-8 flex items-center justify-center h-screen flex-col gap-10'>
                <img className='rounded-full' src={userInfo.photoURL} alt="" />
                <div className='text-center'>
                  <h1 className="text-xl font-bold mb-4">{userInfo.displayName}</h1>
                  <p>Email: <a href={`mailto:${userInfo.email}`} target="_blank">{userInfo.email}</a></p>
                  <p>Phone Number: {userInfo.phoneNumber}</p>
                </div>
                <Link href="/">
                  <p className="text-sm text-blue-200 underline">Go back Home</p>
                  </Link>
              </div>
          </main>
    </>
  )
}



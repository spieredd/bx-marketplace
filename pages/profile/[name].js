import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useFirebase } from '../../context/firebaseContext'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Fragment } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]
const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]
const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { firestore } = useFirebase()

  const router = useRouter();
  const encodedName = router.query.name;
  const name = decodeURIComponent(encodedName);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user's data
    fetchUser()
  }, [encodedName]);

  const fetchUser = async () => {
    try {
      // Define query
      const usersRef = collection(firestore, 'users');
      const q = query(usersRef, where("displayName", "==", name));

      // Fetch user data
      const querySnapshot = await getDocs(q);

      // If user found, set the user info
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
                  <h1>{userInfo.displayName}</h1>
                  <p>Email: {userInfo.email}</p>
                  <p>Phone Number: {userInfo.phoneNumber}</p>
                </div>
              </div>
          </main>
    </>
  )
}



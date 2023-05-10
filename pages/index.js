import SignIn from '../components/SignIn'
import SignOut from '../components/SignOut'
import Request from '../components/Request'
import Sell from '../components/Sell'
import { useFirebase } from '../context/firebaseContext'
import PayPalButton from "../components/PayPalButton";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';



import { Fragment, useState, useEffect } from 'react'
import { Dialog, Menu, Transition, Listbox } from '@headlessui/react'
import { EnvelopeIcon } from '@heroicons/react/20/solid'
import {
  Cog6ToothIcon,
  HomeIcon,
  SignalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Bars3Icon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon, current: true },
  { name: 'About', href: '/about', icon: SignalIcon, current: false },
  { name: 'Settings', href: '/phone-form', icon: Cog6ToothIcon, current: false },
]

const activityItems = [
  {
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    projectName: 'ios-app',
    commit: '2d89f0c8',
    branch: 'main',
    date: '1h',
    dateTime: '2023-01-23T11:00',
  }]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
  const [photoIndex, setPhotoIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const openLightbox = (imageUrl) => {
    setCurrentImage(imageUrl);
    setIsOpen(true);
  };

  const [open, setOpen] = useState(false)
  const [opensell, setOpensell] = useState(false)

  const { user } = useFirebase()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [searchTerm, setSearchTerm] = useState("");

  const { fetchRequests } = useFirebase()
  const [requests, setRequests] = useState([])

  const { fetchOffers } = useFirebase()
  const [offers, setOffers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRequests()
      setRequests(data)
    }
    fetchData()
  }, [fetchRequests])
  const [originalOffers, setOriginalOffers] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOffers()
      setOffers(data)
      setOriginalOffers(data);
    }

    fetchData()
  }, [fetchOffers])


  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredData = searchTerm.trim()
      ? originalOffers.filter((item) =>
        item.requestText.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : originalOffers;

    setOffers(filteredData);
  };




  return (
    <div className="h-screen bg-gray-900 h-full">
      <div>
        <Request open={open} setOpen={setOpen} />
        <Sell open={opensell} setOpen={setOpensell} />


        <Transition.Root show={sidebarOpen} as={Fragment}>

          <Dialog as="div" className="relative z-50 xl:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>

                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://static.vecteezy.com/system/resources/previews/019/046/339/original/gold-coin-money-symbol-icon-png.png"
                        alt="BX Marketplace"
                        width="500"
                      />
                      <h1 className='ml-4 font-semibold'>BX-marketplace</h1>

                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <h2 className="text-sm text-gray-400 mb-4 font-bold">Navigation</h2>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                  {item.name}
                                </a>
                              </li>

                            ))}

                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                          {
                            !user &&
                            <SignIn />
                          }
                          {user && (
                            <>
                              <SignOut />
                            </>
                          )}
                        </li>
                        {user &&
                          <li className="-mx-6 mt-auto">
                            <a
                              href={user.profileURL}
                              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                            >
                              <img
                                className="h-8 w-8 rounded-full bg-gray-800"
                                src={user.photoURL}
                                alt=""
                              />
                              <span className="sr-only">Your profile</span>
                              <span aria-hidden="true">
                                <p>{user.displayName}</p>
                              </span>
                            </a>
                          </li>
                        }
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://static.vecteezy.com/system/resources/previews/019/046/339/original/gold-coin-money-symbol-icon-png.png"
                alt="Your Company"
              />
              <h1 className='ml-4 font-semibold '>BX-marketplace</h1>

            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <h2 className="text-sm text-gray-400 mb-4 font-bold">Navigation</h2>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <h2 className="text-gray-400 text-sm mb-2 font-bold">Categories</h2>
                  <ul className="mt-4 text-gray-400 text-sm flex flex-col gap-2">
                    <li>
                      <span className="inline-flex items-center rounded-md bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30">
                        Food
                      </span>
                    </li>
                    <li>

                      <span className="inline-flex items-center rounded-md bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30">
                        Kitchen Tools
                      </span>
                    </li>
                    <li>
                      <span className="inline-flex items-center rounded-md bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30">
                        Class furnitures
                      </span>
                    </li>
                    <li>
                      <span className="inline-flex items-center rounded-md bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30">
                        Other
                      </span>
                    </li>
                  </ul>
                </li>
                <li>
                  <div className="text-sm font-bold leading-6 text-gray-400">Start posting</div>
                  {
                    !user &&
                    <SignIn />
                  }
                  {user && (
                    <>
                      <SignOut />
                    </>
                  )}
                </li>
                {user && <>
                  <a
                    href={user.profileURL}
                    className="block -mx-6 mt-auto flex cursor-pointer  gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white bg-gray-800"
                  >
                    <li className="flex items-center gap-x-4">


                      <img
                        className="h-8 w-8 rounded-full bg-gray-800"
                        src={user.photoURL}
                        alt=""
                      />
                      <span className="sr-only">Your profile</span>
                      <span aria-hidden="true">
                        <p>{user.displayName}</p>
                      </span>
                    </li>

                  </a>
                </>}
              </ul>
            </nav>
          </div>
        </div>

        <div className="xl:pl-72">
          {/* Sticky search header */}
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-white xl:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="flex flex-1">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <input
                    id="search-field"
                    className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm"
                    placeholder="Search in [WTS]..."
                    type="search"
                    name="search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </form>
            </div>
          </div>

          <main className="lg:pr-96">
            <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <h1 className="text-base font-semibold leading-7 text-white">Want To Sell - [WTS]</h1>

              {/* Sort dropdown */}
              <div className="flex gap-5 items-center">

                <Menu as="div" className="relative">

                  <Menu.Button className="flex items-center gap-x-1 text-sm font-medium leading-6 text-white">
                    Sort by
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">

                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-50' : '',
                              'block px-3 py-1 text-sm leading-6 text-gray-900'
                            )}
                          >
                            Date uploaded
                          </a>
                        )}
                      </Menu.Item>

                    </Menu.Items>
                  </Transition>
                </Menu>
                {user && (
                  <>
                    <button onClick={() => setOpensell(true)} type="button" class="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Sell
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="-ml-0.5 h-5 w-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </header>

            <ul role="list" className="divide-y divide-white/5">
              {offers
                .filter((offer) => {
                  if (!searchTerm) return true
                  return offer.requestText
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                })
                .map((offer, index) => {
                  const dateObject = offer.date?.toDate()
                  const dateString = dateObject?.toLocaleDateString('en-US')
                  return (
                    <div key={offer.uid} className='flex items-center justify-between'>
                      <div className="w-full border-gray-200 px-4 py-5 sm:px-6">
                        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                          <div className="ml-4 mt-4 flex items-start justify-start">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-12 w-12 rounded-full"
                                  src={offer.photoURL}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <a href={offer.profileURL} className="cursor-pointer ">
                                  <h3 className="text-base font-semibold leading-6 text-white">{offer.displayName}</h3>
                                </a>
                                <p className="text-sm text-gray-500">
                                  <a href={`mailto:${offer.email}`}>{offer.email}</a>
                                </p>
                              </div>
                            </div>
                            <div className="flex top-0 items-start ml-4 mt-4 flex flex-shrink-0">

                            </div>

                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-gray-200">{offer.requestText}</p>
                        </div>
                        <div className="mt-2 flex items-center h-10 gap-2">
                          <div style={{ backgroundColor: `var(--${offer.category.color})`, color: `var(--${offer.category.color})` }} className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset">
                            Category: {offer.category.name}
                          </div>
                          <div className="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20">
                            Price: {offer.price} €
                          </div>
                          {user &&
                            <div className='mt-1'>
                              <PayPalButton total={offer.price} />
                            </div>
                          }


                        </div>

                      </div>
                      <div className="flex justify-end items-center w-[200px] p-2 rounded">
                        {offer.imageUrl && (
                          <div>
                            <img
                              src={offer.imageUrl}
                              alt="Uploaded"
                              className="w-[300px] h-[150px] object-fill rounded-md"
                              onClick={() => openLightbox(offer.imageUrl)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              {isOpen && (
                <Lightbox
                  mainSrc={currentImage}
                  onCloseRequest={() => setIsOpen(false)}
                />
              )}
            </ul>
          </main>

          <aside className="bg-black/10 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5">
            <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <h2 className="text-base font-semibold leading-7 text-white">Want To Buy - [WTB]</h2>
              {user && (
                <>
                  <button onClick={() => setOpen(true)} type="button" class="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Request
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="-ml-0.5 h-5 w-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                    </svg>
                  </button>

                </>
              )}
            </header>
            <ul role="list" className="divide-y divide-white/5">
              {requests.map((request) => {
                const dateObject = request.date.toDate()
                const dateString = dateObject.toLocaleDateString('en-US')
                return (
                  <li key={request.id} className="px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-x-3">
                      <img src={request.photoURL} alt="" className="h-6 w-6 flex-none rounded-full bg-gray-800" />
                      <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-white">{request.displayName}</h3>
                      <p className="flex-none text-xs text-gray-100">
                        {dateString}
                      </p>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <p className="truncate text-sm text-gray-300">
                        {request.requestText}
                      </p>
                      <a className="rounded bg-red-300 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-400" target="_blank" href={`mailto:${request.email}`}>Contact</a>
                    </div>

                  </li>
                )
              })}
            </ul>
          </aside>
        </div>
      </div>
    </div >
  )
}

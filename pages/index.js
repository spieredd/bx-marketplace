//homepage

import Image from 'next/image'
import { Inter } from 'next/font/google'
import SignIn from '../components/SignIn'
import SignOut from '../components/SignOut'
import Request from '../components/Request'
import Sell from '../components/Sell'
import { useFirebase } from '../context/firebaseContext'

import { Fragment, useState, useEffect } from 'react'
import { Dialog, Menu, Transition, Listbox } from '@headlessui/react'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  HomeIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Bars3Icon, ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon, CheckIcon } from '@heroicons/react/20/solid'

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon, current: true },
  { name: 'About', href: '/about', icon: SignalIcon, current: false },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon, current: false },
]
const teams = [
  { id: 1, name: 'Planetaria', href: '#', initial: 'P', current: false },
  { id: 2, name: 'Protocol', href: '#', initial: 'P', current: false },

]
const statuses = {
  offline: 'text-gray-500 bg-gray-100/10',
  online: 'text-green-400 bg-green-400/10',
  error: 'text-rose-400 bg-rose-400/10',
}
const environments = {
  Preview: 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
  Production: 'text-indigo-400 bg-indigo-400/10 ring-indigo-400/30',
}
const deployments = [
  {
    id: 1,
    href: '#',
    projectName: 'ios-app',
    teamName: 'Planetaria',
    status: 'offline',
    statusText: 'Initiated 1m 32s ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
  },
  // More deployments...
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
  },
  // More items...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const inter = Inter({ subsets: ['latin'] })

export default function Example() {
  const [open, setOpen] = useState(false)
  const [opensell, setOpensell] = useState(false)


  const { user } = useFirebase()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOffers()
      setOffers(data)
    }

    fetchData()
  }, [fetchOffers])


  const filteredData = searchTerm.trim()
    ? activityItems.filter((item) =>
      item.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : activityItems;

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
                        <li className="-mx-6 mt-auto">
                          <a
                            href="#"
                            className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                          >
                            <img
                              className="h-8 w-8 rounded-full bg-gray-800"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                            <span className="sr-only">Your profile</span>
                            <span aria-hidden="true">Adrien Dumont</span>
                          </a>
                        </li>
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
                  <div className="text-xs font-semibold leading-6 text-gray-400">Start posting</div>
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
                  <li className="-mx-6 mt-auto">
                    <a
                      href="#"
                      className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white bg-gray-800"
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
              <form className="flex flex-1" action="#" method="GET">
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
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>

          <main className="lg:pr-96">
            <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <h1 className="text-base font-semibold leading-7 text-white">Want To Sell - [WTS]</h1>

              {/* Sort dropdown */}
              <div className="flex gap-5">

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
                    <button onClick={() => setOpensell(true)} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Sell
                    </button>
                  </>
                )}
              </div>
            </header>

            {/* Deployment list */}
            <ul role="list" className="divide-y divide-white/5">
              {offers
                .filter((offer) => {
                  if (!searchTerm) return true
                  return offer.requestText
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                })
                .map((offer) => {
                  const dateObject = offer.date?.toDate()
                  const dateString = dateObject?.toLocaleDateString('en-US')

                  return (
                    <div className='flex items-center justify-between'>
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
                                <h3 className="text-base font-semibold leading-6 text-white">{offer.displayName}</h3>
                                <p className="text-sm text-gray-500">
                                  <a href="#">{offer.email}</a>
                                </p>
                              </div>
                            </div>
                            <div className="flex top-0 items-start ml-4 mt-4 flex flex-shrink-0">
                              <a
                                href={`mailto:${offer.email}`}
                                type="button"
                                target="_blank"
                                className="relative ml-3 inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-350"
                              >
                                <EnvelopeIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <span>Email</span>
                              </a>
                            </div>

                          </div>


                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-gray-200">{offer.requestText}</p>
                        </div>
                        <div className="mt-2">
                          <span className="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20">
                            Price: {offer.price} €
                          </span>
                          <span style={{ backgroundColor: `var(--${offer.category.color})`, color: `var(--${offer.category.color})` }} className="ml-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset">
                            Category: {offer.category.name}
                          </span>
                        </div>

                      </div>
                      <div className="flex justify-end items-center w-[200px] p-2 rounded">
                        {offer.imageUrl && <img src={offer.imageUrl} alt="Uploaded" className="w-[300px] h-[150px] object-fill	rounded-md" />}
                      </div>
                    </div>
                  )
                })}
              {/* {filteredData.map((item, index) => (
                <li key={index}>
                  {item.projectName} - {item.user.name}
                </li>
              ))}
              {deployments.map((deployment) => (
                <li key={deployment.id} className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8">
                  <div className="min-w-0 flex-auto">
                    <div className="flex items-center gap-x-3">
                      <div className={classNames(statuses[deployment.status], 'flex-none rounded-full p-1')}>
                        <div className="h-2 w-2 rounded-full bg-current" />
                      </div>
                      <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                        <a href={deployment.href} className="flex gap-x-2">
                          <span className="truncate">{deployment.teamName}</span>
                          <span className="text-gray-400">/</span>
                          <span className="whitespace-nowrap">{deployment.projectName}</span>
                          <span className="absolute inset-0" />
                        </a>
                      </h2>
                    </div>
                    <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                      <p className="truncate">{deployment.description}</p>
                      <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
                        <circle cx={1} cy={1} r={1} />
                      </svg>
                      <p className="whitespace-nowrap">{deployment.statusText}</p>
                    </div>
                  </div>
                  <div
                    className={classNames(
                      environments[deployment.environment],
                      'rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset'
                    )}
                  >
                    {deployment.environment}
                  </div>
                  <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                </li>
              ))} */}
            </ul>
          </main>

          {/* Activity feed */}
          <aside className="bg-black/10 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5">
            <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <h2 className="text-base font-semibold leading-7 text-white">Want To Buy - [WTB]</h2>
              {user && (
                <>
                  <button onClick={() => setOpen(true)} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Request
                  </button>
                </>
              )}
              {/* <a href="#" className="text-sm font-semibold leading-6 text-indigo-400">
                View all
              </a> */}
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
    </div>
  )
}

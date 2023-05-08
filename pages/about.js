import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import {
    AcademicCapIcon,
    CheckCircleIcon,
    HandRaisedIcon,
    RocketLaunchIcon,
    SparklesIcon,
    SunIcon,
    UserGroupIcon,
} from '@heroicons/react/20/solid'

const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
]
const stats = [
    { label: 'Business was founded', value: '2021' },
    { label: 'People on the team', value: '2' },
    { label: 'Users on the platform', value: '300+' },
    { label: 'Paid out to creators', value: '$0' },
]
const values = [
    {
        name: 'Be world-class.',
        description: 'Strive to create a world-class platform that connects students and empowers them to learn and grow from each other.',
        icon: RocketLaunchIcon,
    },
    {
        name: 'Take responsibility.',
        description: 'Take responsibility for creating a safe and secure marketplace that protects the interests of both buyers and sellers.',
        icon: HandRaisedIcon,
    },
    {
        name: 'Be supportive.',
        description: 'Provide resources and tools to help users succeed, and encourage positive interactions through user reviews and feedback.',
        icon: UserGroupIcon,
    },
    {
        name: 'Always learning.',
        description: 'Seek out feedback from users and iterate on the platform to improve the user experience and meet the changing needs of the student community.',
        icon: AcademicCapIcon,
    },
    {
        name: 'Share everything you know.',
        description: 'Facilitate conversations and connections between students who can learn from each other, and create a platform where everyone has the opportunity to contribute and benefit.',
        icon: SparklesIcon,
    },
    {
        name: 'Enjoy downtime.',
        description: 'Create a platform that allows students to buy and sell goods and services in a way that fits their schedule and lifestyle.',
        icon: SunIcon,
    },
]
const team = [
    {
        name: 'Flahaut Ariel',
        role: 'Founder & CEO',
        imageUrl:
            'data:image/jpeg;base64,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',
        location: 'Palaiseau, France',
    },
    {
        name: 'Dumont Adrien',
        role: 'CTO',
        imageUrl:
            'https://programmes.polytechnique.edu/sites/default/files/styles/medium_700/public/2023-01/b220403_0.jpg?itok=8QdByNUS',
        location: 'Palaiseau, France',
    },
    {
        name: 'Elalouf Sacha',
        role: 'CBO',
        imageUrl:
            'sacha.png',
        location: 'Palaiseau, France',
    },
    {
        name: 'Bensouda-Korachi Gaia',
        role: 'CMO',
        imageUrl:
            'gaia.png',
        location: 'Palaiseau, France',
    },

    // More people...
]
const benefits = [
    'Competitive salaries',
    'Flexible work hours',
    '30 days of paid vacation',
    'Annual team retreats',
    'Benefits for you and your family',
    'A great work environment',
]
const footerNavigation = {
    solutions: [
        { name: 'Marketing', href: '#' },
        { name: 'Analytics', href: '#' },
        { name: 'Commerce', href: '#' },
        { name: 'Insights', href: '#' },
    ],
    support: [
        { name: 'Pricing', href: '#' },
        { name: 'Documentation', href: '#' },
        { name: 'Guides', href: '#' },
        { name: 'API Status', href: '#' },
    ],
    company: [
        { name: 'About', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Jobs', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Partners', href: '#' },
    ],
    legal: [
        { name: 'Claim', href: '#' },
        { name: 'Privacy', href: '#' },
        { name: 'Terms', href: '#' },
    ],
    social: [
        {
            name: 'Facebook',
            href: '#',
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        {
            name: 'Instagram',
            href: '#',
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        {
            name: 'Twitter',
            href: '#',
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
            ),
        },
        {
            name: 'GitHub',
            href: '#',
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        {
            name: 'YouTube',
            href: '#',
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
    ],
}

export default function Example() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="bg-gray-900">
            {/* Header */}
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="https://static.vecteezy.com/system/resources/previews/019/046/339/original/gold-coin-money-symbol-icon-png.png"
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-white">
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <a href="#" className="text-sm font-semibold leading-6 text-white">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-50" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    className="h-8 w-auto"
                                    src="https://static.vecteezy.com/system/resources/previews/019/046/339/original/gold-coin-money-symbol-icon-png.png"
                                    alt=""
                                />
                            </a>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-400"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/25">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <a
                                        href="#"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                                    >
                                        Log in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>

            <main className="relative isolate">
                <div
                    className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
                        style={{
                            clipPath:
                                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                        }}
                    />
                </div>

                {/* Header section */}
                <div className="px-6 pt-14 lg:px-8">
                    <div className="mx-auto max-w-2xl pt-24 text-center sm:pt-40">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">BX - MarketPlace</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Welcome to BX-MarketPlace: A place where Bachelor can easily Exchange or Buy from each other.
                        </p>
                    </div>
                </div>

                {/* Content section */}
                <div className="mx-auto mt-20 max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <div className="grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 lg:max-w-none lg:grid-cols-2">
                            <div>
                                


                            </div>
                            <div>
                                


                            </div>
                        </div>
                        <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mt-28 lg:grid-cols-4">
                            {stats.map((stat, statIdx) => (
                                <div key={statIdx} className="flex flex-col-reverse gap-y-3 border-l border-white/20 pl-6">
                                    <dt className="text-base leading-7 text-gray-300">{stat.label}</dt>
                                    <dd className="text-3xl font-semibold tracking-tight text-white">{stat.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
                
                {/* Image section */}
                <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
                    <img
                        src="https://cdn.pixabay.com/photo/2018/02/02/00/35/ecommerce-3124413_1280.png"
                        alt=""
                        className="aspect-[9/4] w-full object-cover xl:rounded-3xl"
                    />
                </div>

                {/* Values section */}
                <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our values</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Give an easy for departing students to sell the items they can't bring with them to incoming or existing students. 
                            Help out Bachelors in their daily necessities. 
                        </p>
                    </div>
                    <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
                        {values.map((value) => (
                            <div key={value.name} className="relative pl-9">
                                <dt className="inline font-semibold text-white">
                                    <value.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-500" aria-hidden="true" />
                                    {value.name}
                                </dt>{' '}
                                <dd className="inline">{value.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* Team section */}
                <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our team</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Our team comprises of 4 bachelor students at Ecole Polytechnique.
                            We found a gap in the facilities of the bachelor and chose to fill it.
                        </p>
                    </div>
                    <ul
                        role="list"
                        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
                    >
                        {team.map((person) => (
                            <li key={person.name}>
                                <img className="aspect-[14/13] w-full rounded-2xl object-cover" src={person.imageUrl} alt="" />
                                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">{person.name}</h3>
                                <p className="text-base leading-7 text-gray-300">{person.role}</p>
                                <p className="text-sm leading-6 text-gray-500">{person.location}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CTA section */}
                <div className="relative isolate -z-10 mt-32 sm:mt-40">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
                            <img
                                className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
                                src="https://images.unsplash.com/photo-1519338381761-c7523edc1f46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                                alt=""
                            />
                            <div className="w-full flex-auto">
                                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Join our team</h2>
                                <p className="mt-6 text-lg leading-8 text-gray-300">
                                    If you are interested in joining the team as we expand throughout IP Paris and other campuses check this out.
                                </p>
                                <ul
                                    role="list"
                                    className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-white sm:grid-cols-2"
                                >
                                    {benefits.map((benefit) => (
                                        <li key={benefit} className="flex gap-x-3">
                                            <CheckCircleIcon className="h-7 w-5 flex-none" aria-hidden="true" />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-10 flex">
                                    <a href="#" className="text-sm font-semibold leading-6 text-indigo-400">
                                        See our job postings <span aria-hidden="true">&rarr;</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
                        aria-hidden="true"
                    >
                        <div
                            className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
                            style={{
                                clipPath:
                                    'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                            }}
                        />
                    </div>
                </div>
            </main>

            
        </div>
    )
}

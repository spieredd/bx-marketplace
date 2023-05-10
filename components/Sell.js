import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { collection, addDoc } from 'firebase/firestore'
import { firestore } from '../context/firebaseContext'
import { useFirebase } from '../context/firebaseContext'
import { Timestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import SelectInput from './SelectInput'

// fix

export default function Request(props) {
    const { storage, firestore, fetchRequests, fetchOffers } = useFirebase()

    const [selected, setSelected] = useState('');


    function handleSelectedChange(newValue) {
        setSelected(newValue);
    }

    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    function handleFileInputChange(event) {
        const file = event.target.files[0];
        setSelectedFile(file);
        console.log(file)
    }

    const [imageFile, setImageFile] = useState(null)

    const [requestText, setRequestText] = useState('')
    const [price, setPrice] = useState('')

    const { user } = useFirebase()

    const currentDate = Timestamp.now();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('You must be signed in to submit a request.');
            return;
        }

        if (price === '' || requestText === '' || selected === '') {
            alert('You must enter a description and a price.');
            return;
        }

        props.setOpen(false);

        try {
            let imageUrl = null;
            let currentDate = null;

            if (selectedFile !== null) {
                currentDate = new Date();
                const imagePath = `images/${currentDate}/${imageFile.name}`;
                const imageRef = ref(storage, imagePath);
                await uploadBytes(imageRef, imageFile);
                imageUrl = await getDownloadURL(imageRef);
            }

            const encodedName = encodeURIComponent(user.displayName);
            const profileURL = `/profile/${encodedName}`;

            const offerData = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                requestText,
                imageUrl,
                date: currentDate || Timestamp.now(),
                price: price,
                category: selected,
                profileURL: profileURL,
            };

            await addDoc(collection(firestore, 'offers'), offerData);
            setRequestText('');
            setImageFile(null);
            setSelectedFile(null);
            location.reload();
        } catch (error) {
            console.error('Error submitting request:', error);
        }
    };



    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={props.setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-aut z-50">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                            <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 sm:mt-5">
                                            <Dialog.Title as="h3" className=" text-center text-base font-semibold leading-6 text-gray-900">
                                                Want To Sell - [WTS]
                                            </Dialog.Title>
                                            <div className="mt-2">

                                                <SelectInput required selected={selected} onSelectedChange={handleSelectedChange} />

                                                <div className='mt-2'>
                                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Description
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            required
                                                            className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            placeholder="Selling a new TV"
                                                            value={requestText}
                                                            onChange={(e) => setRequestText(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                            Price
                                        </label>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="text-gray-500 sm:text-sm">€</span>
                                            </div>
                                            <input
                                                required
                                                type="number"
                                                name="price"
                                                id="price"
                                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="0.00"
                                                aria-describedby="price-currency"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                <span className="text-gray-500 sm:text-sm" id="price-currency">
                                                    EUR
                                                </span>
                                            </div>

                                        </div>
                                        {
                                            !selectedFile &&
                                            <label className="mt-6 cursor-pointer relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="mx-auto h-12 w-12 text-gray-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                </svg>

                                                <span className="mt-2 block text-sm font-bold text-gray-400">Upload an image</span>
                                                <input accept="image/*"
                                                    onChange={(e) => {
                                                        setImageFile(e.target.files[0])
                                                        console.log('Selected image file:', e.target.files[0])
                                                        handleFileInputChange(e)
                                                    }} type="file" className="hidden" />
                                            </label>
                                        }
                                        {
                                            selectedFile &&
                                            <label className="rounded-md text-gray-500 text-sm mt-6 py-4 cursor-pointer block pl-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                <p>Selected Image: <span className='font-bold'>{selectedFile.name}</span></p>
                                                <input accept="image/*"
                                                    onChange={(e) => {
                                                        setImageFile(e.target.files[0])
                                                        console.log('Selected image file:', e.target.files[0])
                                                        handleFileInputChange(e)
                                                    }} type="file" className="hidden" />
                                            </label>
                                        }

                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button
                                            type="submit"
                                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                        >
                                            Sell
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                            onClick={() => {
                                                props.setOpen(false)
                                                setSelectedFile(null)
                                            }
                                            }
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
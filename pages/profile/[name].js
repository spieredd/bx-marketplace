import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFirebase } from "../../context/firebaseContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function Profile() {
  const { firestore } = useFirebase();

  const router = useRouter();
  const encodedName = router.query.name;
  const name = decodeURIComponent(encodedName);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userOffers, setUserOffers] = useState([]);

  useEffect(() => {
    if (encodedName) {
      fetchUser();
    }
  }, [encodedName]);

  useEffect(() => {
    if (userInfo) {
      fetchUserOffers();
    }
  }, [userInfo]);

  const fetchUser = async () => {
    try {
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("displayName", "==", name));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUserInfo(querySnapshot.docs[0].data());
      } else {
        console.log("No such user!");
      }
    } catch (error) {
      console.log("Error getting user:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserOffers = async () => {
    if (!userInfo) return; // Guard clause to ensure userInfo is not undefined

    try {
      const offersRef = collection(firestore, "offers");
      const q = query(offersRef, where("email", "==", userInfo.email)); // Use userInfo.email directly

      const querySnapshot = await getDocs(q);

      const offers = querySnapshot.docs.map((doc) => doc.data());
      setUserOffers(offers);
    } catch (error) {
      console.error("Error getting user offers:", error);
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
        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-center h-[60vh] flex-col gap-10">
          <img className="rounded-full" src={userInfo.photoURL} alt="" />
          <div className="text-center">
            <h1 className="text-xl font-bold mb-4">{userInfo.displayName}</h1>
            <p>
              Email:{" "}
              <a
                href={`mailto:${userInfo.email}`}
                target="_blank"
                className="text-blue-200 underline"
              >
                {userInfo.email}
              </a>
            </p>
            <p>
              Phone Number:{" "}
              <a
                href={`tel:${userInfo.phoneNumber}`}
                className="underline text-blue-200 cursor-pointer"
              >
                {userInfo.phoneNumber}
              </a>
            </p>
          </div>
          <Link href="/">
            <p className="text-sm text-blue-200 underline">Go back Home</p>
          </Link>
        </div>
        <section className="px-4 sm:px-6 lg:px-8 flex items-center flex-col">
          <h2 className="text-center mb-4 font-medium">User's Offers</h2>
          {userOffers.map((offer) => (
            <div
              key={offer.id}
              className="border-gray-500 border-[0.5px] flex justify-between gap-8 px-6 py-4 rounded-lg "
            >
              <img className="w-24" src={offer.imageUrl} alt={offer.name} />
              <div className="flex items-end flex-col gap-2">
                <h3 className="text-sm">{offer.requestText}</h3>
                <p className="text-sm border-[0.5px] rounded border-gray-600 px-2">{offer.price}€</p>
              </div>
              {/* Other offer details */}
            </div>
          ))}
        </section>
      </main>
    </>
  );
}

import ProtectedRoute from '../components/ProtectedRoute'

const ProtectedPage = () => {
  return (
    <ProtectedRoute>
      <h1>Protected Page</h1>
      <p>This is a protected page, visible only to authenticated users.</p>
    </ProtectedRoute>
  )
}

export default ProtectedPage


import SignIn from '../components/SignIn'
// import SignOut from '../components/SignOut'
// import { useFirebase } from '../context/firebaseContext'

// const Home = () => {
//     const { user } = useFirebase()

//     return (
//         <div>
            
//             {user && (
//                 <p>hello</p>
//             )}
//         </div>
//     )
// }

// export default Home

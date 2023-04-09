import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HelmetProvider } from 'react-helmet-async'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider, useFirebaseApp, FirestoreProvider } from 'reactfire'
import { Head } from './Components/Shared/Head'
import { router } from './routes/routes'

function App() {
  

  return (
    <AuthProvider sdk={getAuth(useFirebaseApp())}>
      <FirestoreProvider sdk={getFirestore(useFirebaseApp())}>
        <HelmetProvider>
            <Head title="Title" />
            <RouterProvider router={router} />
        </HelmetProvider>
      </FirestoreProvider>
    </AuthProvider>
  )
}

export default App
import "./App.css";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {  Link, Outlet } from "react-router-dom";
import { AuthProvider, useFirebaseApp, FirestoreProvider } from "reactfire";
import { Head } from "./Components/Shared/Head";
import {Flex, Box, useColorModeValue} from "@chakra-ui/react"


import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <AuthProvider sdk={getAuth(useFirebaseApp())}>
      <FirestoreProvider sdk={getFirestore(useFirebaseApp())}>
        
          
            <Head title="Title" />
            <Navbar />
            <Box bg={useColorModeValue("teal.100", "teal.900")} px={4}>
              <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                <Outlet />
              </Flex>
            </Box>

      </FirestoreProvider>
    </AuthProvider>
  );
}

export default App;

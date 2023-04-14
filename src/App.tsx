import "./App.css";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Outlet } from "react-router-dom";
import {
  AuthProvider,
  useFirebaseApp,
  FirestoreProvider,
  StorageProvider,
} from "reactfire";
import { Head } from "./Components/Shared/Head";
import { Flex, Box, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./Components/Navbar/Navbar";
import { getStorage } from "firebase/storage";

function App() {
  return (
    <AuthProvider sdk={getAuth(useFirebaseApp())}>
      <FirestoreProvider sdk={getFirestore(useFirebaseApp())}>
        <StorageProvider sdk={getStorage(useFirebaseApp())}>
          <Head title="Title" />
          <Navbar />
          <Box bg={useColorModeValue("teal.100", "teal.900")} px={4}>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Outlet />
            </Flex>
          </Box>
        </StorageProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
}

export default App;

import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth, useFirestore, useFirestoreDocData, useUser } from "reactfire";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { converter } from "../../util/firebase";

interface IProps {}

const Navbar: React.FunctionComponent<IProps> = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate()
  const { data: user } = useUser();
  const auth = useAuth();
  const provider = new GoogleAuthProvider();
  const firestore = useFirestore();
  const _adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const { status, data: userData } = useFirestoreDocData(
    doc(firestore, "Users", user?.uid ?? "-1")
  );

  async function handleSignOutClick() {
    const result = await signOut(auth);
    navigate("/")
  }

  async function handleSignInClick() {
    const result = await signInWithPopup(auth, provider);
    // Check if the user's document exists in the "Users" collection
    if (!userData) {
      // If the document doesn't exist, create a new one with the user's uid as the document id
      setDoc(
        doc(firestore, "Users", result.user?.uid ?? "-1").withConverter(
          converter<User>()
        ),
        {
          name: result.user?.displayName ?? "Demo",
          email: result.user?.email ?? "test@demo.com",
          admin: result.user?.email === _adminEmail ? true : false,
          avatar: result.user?.photoURL
        }
      ).then(console.log);
    } else {
      console.log(userData);
    }
  }

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>Logo</Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {(user && <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      (user && user.photoURL) ||
                      "https://avatars.dicebear.com/api/male/username.svg"
                    }
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={
                        (user && user.photoURL) ||
                        "https://avatars.dicebear.com/api/male/username.svg"
                      }
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{user && user.displayName}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={handleSignOutClick}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>) || (
                <button onClick={handleSignInClick}>
                    Sign in
                </button>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;

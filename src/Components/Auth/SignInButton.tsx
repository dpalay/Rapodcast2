import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useUser, useFirestoreDocData, useAuth, useFirestore } from "reactfire";
import { doc, setDoc } from "firebase/firestore";
import { converter } from "../../util/firebase";

export const SignInButton = () => {
  /** The email address for the google account that hshould autoamtically be labeled as an admin */
  const _adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

  const provider = new GoogleAuthProvider();
  const firestore = useFirestore();
  const auth = useAuth();
  const { data: user } = useUser();

  /** For adding the user to the Firestore database */
  const { status, data: userData } = useFirestoreDocData(
    doc(firestore, "Users", user?.uid ?? "-1")
  );

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
          admin: user?.email === _adminEmail ? true : false,
        }
      ).then(console.log);
    } else {
      console.log(userData);
    }
  }

  async function handleSignOutClick() {
    const result = await signOut(auth);
  }

  if (!user) {
    return (
      <div aria-label="Sign in with Google" onClick={handleSignInClick}>
        <img src="btn_google_signin_dark_normal_web.png"></img>
      </div>
    );
  } else {
    return (
      <>
        <div>Welcome, {user.displayName}</div>
        <button onClick={handleSignOutClick}>Logout</button>
      </>
    );
  }
};

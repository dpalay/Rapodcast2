import { FirebaseOptions } from "firebase/app";
import {
  PartialWithFieldValue,
  QueryDocumentSnapshot,
} from "firebase/firestore";

//const useEmulator = () => import.meta.env.VITE_USE_FIREBASE_EMULATOR;

/**
 * Configuration settings for firebase. These should be stored in .env.local for dev
 */
export const firebaseApp: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

/**
 *
 * @returns a converter object for use with firestore's doc().withConverter(converter<Type T>())
 */
export const converter = <T>() => ({
  toFirestore: (data: PartialWithFieldValue<T>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

const collectionNames = {
  userCollection: "Users",
  episodeColleection: "Episodes",
};

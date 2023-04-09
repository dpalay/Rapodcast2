/**
 * Top level data model for Firestore. This should be all of your first tier collections.`
 */
interface FirestoreDataModel {
  Users: {
    [userId: string]: User;
  };
}

/**
 * The User collection contains information about each user. 
 */
interface User {
  /** The user's name */
  name: string;
  /** The user's email */
  email: string;
  /** Whether or not the user is marked as an administrator */
  admin: boolean;
}

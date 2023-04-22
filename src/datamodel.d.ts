/**
 * Top level data model for Firestore. This should be all of your first tier collections.`
 */
interface FirestoreDataModel {
  Users: {
    [_id: string]: User;
  };
  Episodes: {
    [_id: string]: Episode;
  };
}

interface Record {
  _id: string;
  _createdDateTime: Date;
  _updatedDateTime: Date;
}

/**
 * The User collection contains information about each user.
 */
interface User extends Record {
  /** The user's name */
  name: string;
  /** The user's email */
  email: string;
  /** Whether or not the user is marked as an administrator */
  admin: boolean;
  /** The user's avatar */
  avatar: string
}

/**
 * An Episode of the podcast
 */
interface Episode extends Record {
/**   @property title The title of the podcast*/
  title: string;
  number: number
  id: number;
  links: SuggestedLink[];
  filePath?: string;
  mp3FilePath?: string
  published: boolean;
  description: string;
  randomTopic?: string;
  randomReview?: {name: string, url: string}
}


/**
 * Links suggested for an Episode
 */
interface SuggestedLink extends Record {
  /** @property url The URL for the topic to be loaded */
  url: string;
  /** @property the id of the user that suggested the link  */
  userId: string;
  /** @property the username of the user that suggested the link */
  username: string;
  /** @property the comments left on the link */
  comments: Comment[];
  /** @property the title of the link */
  title: string
}

interface Comment extends Record {
  /** @property The id of the user that made the comment */
  userId: string;
  text: string;
}

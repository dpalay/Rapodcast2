import { Box, Flex, Stack } from "@chakra-ui/react";
import { collection, doc } from "firebase/firestore";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import {
  useFirebaseApp,
  useFirestore,
  useFirestoreDocData,
  useStorage,
  useStorageDownloadURL,
} from "reactfire";
import { converter, firebaseApp } from "../../util/firebase";
import { ref } from "firebase/storage";
import { useEffect } from "react";


interface IProps {
  lastEpisode: string
}

const Episode: React.FunctionComponent<IProps> = (props) => {
  const SERVICE_NAME = import.meta.env.VITE_SERVICE_NAME;
  const { episodeId } = useParams<"episodeId">();
  const {lastEpisode} = props
  const firestore = useFirestore();
  const episodeToShow = episodeId ?? lastEpisode


  const episodeRef = doc(
    firestore,
    "Episodes",
    episodeToShow
  ).withConverter(converter<Episode>());
  const episodeDoc = useFirestoreDocData(episodeRef);

  const filePath = episodeDoc.data?.filePath;
  const mp3Storage = useStorage();
  console.log(filePath)
  const mp3Ref = filePath && ref(mp3Storage, filePath);
  const mp3Data = mp3Ref && useStorageDownloadURL(mp3Ref);

  console.log(mp3Ref)
  return (
    <>
      <Helmet>
        <title>
          Episode {episodeId || "1"} | {SERVICE_NAME}
        </title>
      </Helmet>
      {episodeDoc.status == "loading" ? (
        <Flex>
          <Box w="100%">Loading...</Box>
        </Flex>
      ) : (
        <Stack direction={["column", "column", "row"]}>
          <Box w={["100%", "100%", "50%"]}>
            <h1>Episode {episodeDoc.data.id}</h1>
            <Box>
              <Flex alignContent={"center"} justifyContent={"center"}>
                <audio controls>
                  <source src={""} type="audio/mpeg" />
                  No Audio
                </audio>
              </Flex>
            </Box>
            <p>This is the description</p>
            <p>This is the random review, which is a link to it</p>
            <p>This is the random topic</p>
          </Box>
          <Box w={["100%", "100%", "50%"]}>
            <h1>Links</h1>
            <p>Link to somewhere</p>
            <p>Link to somewhere</p>
            <p>Link to somewhere</p>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default Episode;

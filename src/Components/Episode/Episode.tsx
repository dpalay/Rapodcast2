import { Box, Flex, Stack } from "@chakra-ui/react";
import { doc } from "firebase/firestore";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { converter } from "../../util/firebase";
import Player from "./Player";
import { useState, useEffect } from "react";

interface IProps {
  lastEpisode: string;
  episodeId: string;
}

const Episode: React.FunctionComponent<IProps> = ({lastEpisode, episodeId}) => {
  const SERVICE_NAME = import.meta.env.VITE_SERVICE_NAME;
  const [filePath, setFilePath] = useState<string | null>(null)
  const firestore = useFirestore();
  const episodeToShow = episodeId ?? lastEpisode;

  const episodeRef = doc(firestore, "Episodes", episodeToShow).withConverter(
    converter<Episode>()
  );
  const episodeDoc = useFirestoreDocData(episodeRef);

  useEffect(() => {
    
    setFilePath(episodeDoc.data?.filePath || episodeDoc.data?.mp3FilePath || "" )
    },[episodeId, episodeDoc.status])



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
            {episodeDoc.status == "success" && (
              <Box>
                <Flex alignContent={"center"} justifyContent={"center"}>
                  {
                    //@ts-ignore
                    episodeDoc.data.mp3FilePath && (
                      <Player filePath={episodeDoc.data.mp3FilePath} />
                    )
                  }
                </Flex>
              </Box>
            )}
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

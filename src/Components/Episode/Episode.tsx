import { Box, Flex, Link, List, ListItem, Stack, Text } from "@chakra-ui/react";
import { setDoc, updateDoc, doc } from "firebase/firestore";
import { Helmet } from "react-helmet-async";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { converter } from "../../util/firebase";
import Player from "./Player";


interface IProps {
  episode: Episode;
}

const Episode: React.FunctionComponent<IProps> = ({ episode }) => {
  const SERVICE_NAME = import.meta.env.VITE_SERVICE_NAME;
  return (
    <>
      <Helmet>
        <title>
          Episode {episode.id || "1"} | {SERVICE_NAME}
        </title>
      </Helmet>

      <Stack direction={["column", "column", "row"]}>
        <Box w={["100%", "100%", "50%"]}>
          <h1>Episode {episode.id}</h1>
            <Box>
              <Flex alignContent={"center"} justifyContent={"center"}>
                {(episode.filePath || episode.mp3FilePath) && <Player filePath={episode.filePath || episode.mp3FilePath || "ERROR"} />}
              </Flex>
            </Box>
          <p>{episode.description}</p>
          {episode.randomReview && <Text>Random Review: <a href={episode.randomReview.url}>{episode.randomReview.name}</a></Text>}
          {episode.randomTopic && <Text>Random Topic: {episode.randomTopic}</Text>}
        </Box>
        <Box w={["100%", "100%", "50%"]}>
          <Text variant={"h1"}>Links!</Text>
          {episode.links.length > 0 && <List>
            {episode.links.map((link, id )=> {
              return (
                <ListItem key={`${episode.id}_link_${id}`}>
                  <Link href={link.url}>{link.title}</Link>
                </ListItem>
              )
            })}
            </List>}
        </Box>
      </Stack>
    </>
  );
};

export default Episode;

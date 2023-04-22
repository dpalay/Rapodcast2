import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { doc } from "firebase/firestore";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { converter } from "../../util/firebase";
import Player from "./Player";
import { useState, useEffect } from "react";

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
                {(episode.filePath || episode.mp3FilePath) && <Player filePath={episode.filePath || episode.mp3FilePath } />}
              </Flex>
            </Box>
          <p>{episode.description}</p>
          {episode.randomReview && <Text>Random Review: <a href={episode.randomReview.url}>{episode.randomReview.name}</a></Text>}
          {episode.randomTopic && <Text>Random Topic: {episode.randomTopic}</Text>}
        </Box>
        <Box w={["100%", "100%", "50%"]}>
          <h1>Links</h1>
          <p>Link to somewhere</p>
          <p>Link to somewhere</p>
          <p>Link to somewhere</p>
        </Box>
      </Stack>
    </>
  );
};

export default Episode;

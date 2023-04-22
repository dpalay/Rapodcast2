import { Box, Divider, Flex } from "@chakra-ui/react";
import EpisodeCard from "../Episode/EpisodeCard";
import Episode from "../Episode/Episode";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { useFirestore, useFirestoreCollection } from "reactfire";
import { converter } from "../../util/firebase";
import { arrayMax } from "../../util/util";

interface IProps {}

const EpisodeList: React.FunctionComponent<IProps> = () => {
  const { episodeId } = useParams<"episodeId">();
  const firestore = useFirestore();

  const episodeCollectionRef = useRef(
    collection(firestore, "Episodes").withConverter(converter<Episode>())
  );

  const episodeQuery = query(
    episodeCollectionRef.current,
    orderBy("oldId", "desc"),
    limit(20)
  );
  const episodeCollection = useFirestoreCollection(episodeQuery, {
    idField: "_id",
  });

  return (
    <Flex alignItems={"center"} justifyContent={"center"} flexWrap={"wrap"}>
      <Box w={"100%"}>
        <Flex alignContent={"center"}>
          <Box w={"100%"}>
            {episodeId && episodeCollection.data && (
              <Episode
                episode={episodeCollection.data.docs
                  .filter(
                    (episode) => episode.data().id.toString() === episodeId
                  )[0]
                  .data()}
              />
            )}
          </Box>
        </Flex>
        <Divider />
      </Box>
      {episodeCollection.status == "success" &&
        episodeCollection.data.docs.map((episode) => (
          <EpisodeCard episode={episode.data()} key={episode.data().id} />
        ))}
    </Flex>
  );
};

export default EpisodeList;

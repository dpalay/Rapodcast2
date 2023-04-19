import { Box, Flex } from "@chakra-ui/react";
import EpisodeCard from "../Episode/EpisodeCard";
import Episode from "../Episode/Episode";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { collection,  limit, orderBy, query } from "firebase/firestore";
import { useFirestore, useFirestoreCollection } from "reactfire";
import { converter } from "../../util/firebase";
import { arrayMax } from "../../util/util";

interface IProps {}

const EpisodeList: React.FunctionComponent<IProps> = (props) => {
  const [lastEpisode, setLastEpisode] = useState(1);
  const firestore = useFirestore();
  const episodeCollectionRef = useRef(
    collection(firestore, "Episodes").withConverter(converter<Episode>())
  );

  const episodeQuery = query(episodeCollectionRef.current, orderBy('oldId', 'desc'), limit(20))
  const episodeCollection = useFirestoreCollection(
    episodeQuery, {idField: '_id'}
  );

  
  const thing = useCallback(() => {
    if (episodeCollection.data && episodeCollection.data.docs.length > 0) {
      setLastEpisode(
        arrayMax(
          episodeCollection.data.docs?.map((doc) => doc.data().id)
        )
      );
    }
  }, [episodeCollectionRef.current])

  useEffect(() => {
    thing()
  }, [thing]);

  return (
    <Flex alignItems={"center"} justifyContent={"center"} flexWrap={"wrap"}>
      <Box w={"100%"}>
        <Flex alignContent={"center"}>
          <Box w={"100%"}>
             <Episode lastEpisode={lastEpisode.toString()}/>
          </Box>
        </Flex>
      </Box>
      {
      episodeCollection.status=="success" && episodeCollection.data.docs.map((episode) => (
        <EpisodeCard episode={episode.data()} key={episode.data().id} />
      ))}
    </Flex>
  );
};

export default EpisodeList;

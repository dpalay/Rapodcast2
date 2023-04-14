import {
  Card,
  CardBody,
  CardHeader,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

interface IProps {
  episode: Episode;
}

const EpisodeCard: React.FunctionComponent<IProps> = (props) => {
  const { episode } = props;
  const { episodeId } = useParams<"episodeId">();
  return (
    <Card
      bg={useColorModeValue("blue.100", "blue.900")}
      border={episode.number === parseInt(episodeId || "0") ? "1px" : ""}
      borderColor={
        episode.number === parseInt(episodeId || "0")
          ? useColorModeValue("orange.500", "orange.800")
          : ""
      }
      m={1}
      w={["100%", "40%", "25%", "20%"]}
      h={["100px", "300px"]}
      overflowY={"scroll"}
    >
      <CardHeader as={RouterLink} to={`/Episode/${episode.id}`}>
        <Text fontSize={"xl"}>{episode.title}</Text>
      </CardHeader>
      <CardBody textAlign={"left"}>
        <Text m={1}>{episode.description}</Text>
        {episode.randomReview && (
          <Link href={episode.randomReview?.url} m={1}>
            Review: {episode.randomReview?.name}
          </Link>
        )}
        {episode.randomTopic && (
          <>
            <br />
            <Text m={1}>Random Topic: {episode.randomTopic}</Text>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default EpisodeCard;

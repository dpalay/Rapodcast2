import { Card, CardHeader } from "@chakra-ui/react";

interface IProps {}

const EpisodeCard: React.FunctionComponent<IProps> = (props) => {

  return (
    <Card>
        <CardHeader>Episode Title</CardHeader>
      <h1>EpisodeCard</h1>
    </Card>
  );
};

export default EpisodeCard;

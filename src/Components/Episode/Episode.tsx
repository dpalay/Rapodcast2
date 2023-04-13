import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

interface IProps {}

const Episode: React.FunctionComponent<IProps> = (props) => {
  const {episodeId} = useParams<"episodeId">();
  const SERVICE_NAME = import.meta.env.VITE_SERVICE_NAME
  
  return (
    <>
      <Helmet>
        <title>Episode {episodeId} | {SERVICE_NAME}</title>
      </Helmet>
      <div>
        <h1>Episode {episodeId}</h1>
        <p>This is the MP3 player bar</p>
        <p>This is the description</p>
        <p>This is the random review, which is a link to it</p>
        <p>This is the random topic</p>
      </div>
    </>
  );
};

export default Episode;

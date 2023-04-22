import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";

interface IProps {
  filePath: string;
}

const Player: React.FunctionComponent<IProps> = (props) => {
  const { filePath } = props;
  const { episodeId } = useParams();
  const audioReactRef = useRef<HTMLAudioElement>(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [error, setError] = useState("");

  const getEpisode = useCallback(async () => {
    const storage = getStorage();
    const audioRef = ref(storage, filePath);
    getDownloadURL(audioRef)
      .then((url) => {
        setAudioUrl(url);
        setError("");
      })
      .then(() => {
        if (audioReactRef.current) {
          audioReactRef.current.pause();
          audioReactRef.current.load();
          audioReactRef.current.play();
        }
      })
      .catch((error) => {
        setError("Could not load file");
        console.error(error);
      });
  }, [filePath, episodeId]);
  useEffect(() => {
    getEpisode();
  }, [filePath]);

  if (error !== "") {
    return <div>No audio file found!</div>;
  }
  return (
    <audio controls ref={audioReactRef}>
      {audioUrl !== "" && <source src={audioUrl} type="audio/mpeg" />}
      Your browser doesn't support audio, but there'd be an audio player here.
    </audio>
  );
};

export default Player;

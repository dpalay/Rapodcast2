import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";

interface IProps {
  filePath: string;
}

const Player: React.FunctionComponent<IProps> = (props) => {
  const { filePath } = props;
  const { episodeId } = useParams();
  const audioRef = useRef<HTMLAudioElement>(null);
  console.log(filePath, episodeId);

  const [audioUrl, setAudioUrl] = useState("");

  const getEpisode = useCallback(() => {
    const storage = getStorage();
    const audioRef = ref(storage, filePath);
    getDownloadURL(audioRef)
      .then((url) => {
        setAudioUrl(url);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [filePath, episodeId]);
  useEffect(() => {
    getEpisode();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [getEpisode]);

  console.log("AudioURL:");
  console.log(audioUrl);
  return (
    <>
      <audio controls ref={audioRef}>
        {audioUrl !== "" && <source src={audioUrl} type="audio/mpeg" />}
        No Audio
      </audio>
    </>
  );
};

export default Player;

import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

function MusicPlayer({ playlist, setPlayIndex, playIndex }) {
  const queue = playlist.map((music) => ({
    name: music.title,
    musicSrc: `http://localhost:5000/uploads/${music.attachment}`,
    cover: `http://localhost:5000/uploads/${music.thumbnail}`,
  }));

  return (
    <div>
      <ReactJkMusicPlayer
        mode="full"
        audioLists={queue}
        defaultPlayIndex={0}
        autoPlay={false}
        showDownload={false}
        showThemeSwitch={false}
        toggleMode={false}
        responsive={true}
        glassBg={true}
        playIndex={playIndex}
        onAudioPlay={(audioInfo) => {
          if (playIndex === audioInfo.playIndex) {
            return;
          }
          setPlayIndex(audioInfo.playIndex);
        }}
      />
      ,
    </div>
  );
}

export default MusicPlayer;

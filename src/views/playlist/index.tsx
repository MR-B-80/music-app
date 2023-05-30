import "./styles.css";
import { FaPause, FaPlay, FaTrash } from "react-icons/fa";
// import AudioSession from "../../services/audio-session";

import { useDuration } from "../../hooks";
import { getTime } from "../../utils";

type PlaylistProps = {
  songs: any[];
  filteredSongs: any[];
  grid?: boolean;
  playState?: any;
  onClick?: Function;
  onDelete?: Function;
};

const Playlist = ({
  songs,
  onClick,
  onDelete,
  grid = false,
  filteredSongs,
  playState = {},
}: PlaylistProps) => {
  const { index, playing } = playState;

  const duration = useDuration(songs);

  const getDuration = (name: string) => {
    return duration[name] ? getTime(duration[name]) : "";
  };

  const isSelected = (name: string) => {
    if (!songs[index]) {
      return false;
    }
    return songs[index].name.toLowerCase() === name.toLowerCase();
  };

  const getIndex = (name: string) => {
    return songs.findIndex((s) => s.name.toLowerCase() === name.toLowerCase());
  };

  // let picture: any[] = [];
  // useLayoutEffect(() => {
  //   songs.map((item) => {
  //     (async () => {
  //       if (item) {
  //         const meta = await AudioSession.getMetadata(item);
  //         return meta;
  //         // console.log(AudioSession.getPicture(meta));
  //       }
  //     })().then((res) => {
  //       // picture = array;
  //       picture.push(AudioSession.getPicture(res));
  //       console.log(AudioSession.getPicture(res));
  //     });
  //   });
  // }, []);
  // function pic(item: any) {
  //   let meta;
  //   (async () => {
  //     if (item) {
  //       meta = AudioSession.getMetadata(item);
  //       // console.log(AudioSession.getPicture(meta));
  //     }
  //     return AudioSession.getPicture(meta);
  //   })();
  // }
  return (
    <div
      className={`playlist ${grid ? "playlist--grid" : ""} ${
        index > -1 ? "playlist--bottom-padded" : ""
      } w-100`.trim()}
    >
      {filteredSongs.map(({ name }: any, i: number) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => onClick && onClick(getIndex(name))}
          // style={{backgroundImage:{}}}
          key={i}
          className={`border border-withe playlist__item ${
            isSelected(name) ? "playlist__item--selected" : ""
          }`}
        >
          {grid && (
            <>
              <div
                title={name}
                style={{ height: "50px", overflow: "hidden" }}
                className="playlist__name"
              >
                {name}
              </div>
              <div
                className="playlist__duration"
                style={{ paddingRight: "35px" }}
              >
                {getDuration(name)}
              </div>
            </>
          )}
          <div
            className="playlist__icon"
            onClick={() => onClick && onClick(getIndex(name))}
          >
            {isSelected(name) && playing ? (
              <FaPause size={18} />
            ) : (
              <FaPlay size={18} />
            )}
          </div>
          {!grid && (
            <>
              <div title={name} className="playlist__name">
                {name}
              </div>
              <div style={{ flexGrow: 1 }}></div>
              <div className="playlist__duration">{getDuration(name)}</div>
            </>
          )}
          <div
            className="playlist__icon playlist__icon--right"
            onClick={() => onDelete && onDelete(getIndex(name))}
          >
            <FaTrash size={18} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Playlist;

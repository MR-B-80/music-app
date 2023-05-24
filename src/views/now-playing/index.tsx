import { useSelector } from "react-redux";
// import { BsMusicNote } from "react-icons/bs";
import { FaPause, FaPlay } from "react-icons/fa";
import AudioSession from "../../services/audio-session";
import { useState, useLayoutEffect } from "react";

import Marquee from "react-fast-marquee";
import { Button, Visualizer } from "../../components";
import "./styles.css";

type NowPlayingProps = {
  song?: any;
  size?: any;
  audio?: any;
  minutes?: number;
  seconds?: number;
  open?: boolean;
  width?: number;
  playing: boolean;
  onPlay?: Function;
  onPause?: Function;
  onClick?: Function;
  onError?: Function;
  percent?: number;
};

const NowPlaying = ({
  song,
  size,
  audio,
  onPlay,
  minutes,
  seconds,
  onPause,
  onClick,
  onError,
  percent,
  playing,
  open = true,
  width = 300,
}: NowPlayingProps) => {
  const settings = useSelector((state: any) => state.settings);
  const [meta, setMeta] = useState<any>(null);
  const picture = AudioSession.getPicture(meta);

  const songTitle = () => {
    let title = "No title";
    if (song && song.name) {
      title = song.name;
    }

    return title.split(".")[0];
  };
  useLayoutEffect(() => {
    (async () => {
      if (song) {
        const meta = await AudioSession.getMetadata(song);

        setMeta(meta);
      }
    })();
  }, [song]);
  return (
    <div className={` nowplaying ${open ? "nowplaying--open" : ""}`.trim()}>
      <div style={{ width }} className="nowplaying__container mb-4 new-style">
        <div
          onClick={() => onClick && onClick()}
          className="nowplaying__title__wrapper"
        >
          <div className="nowplaying__icon">
            <img
              alt={songTitle()}
              src={picture}
              style={{ borderRadius: "50%" }}
              width={50}
            />
          </div>
          <div
            title={songTitle()}
            className="nowplaying__title d-flex justify-content-between w-100"
          >
            <Marquee
              style={{ fontSize: "15px", width: "70%" }}
              className="pt-1"
            >
              {songTitle()}
            </Marquee>
            <span>
              {minutes}:{seconds}
            </span>
          </div>
        </div>
        <div className="nowplaying__button">
          <Button
            onClick={() =>
              playing ? onPause && onPause() : onPlay && onPlay()
            }
          >
            {playing ? <FaPause size={18} /> : <FaPlay size={18} />}
          </Button>
        </div>
        <div></div>
        {/* <div
          style={{ width: `${100 - Number(percent)}%` }}
          className="nowplaying__progress"
        ></div> */}
        {/* <div className="nowplaying__progress__placeholder"></div> */}
        <div className="nowplaying__visualizer">
          {settings.visualizer && (
            <Visualizer
              short={10}
              audio={audio}
              playing={playing}
              width={size.width}
              onError={() => onError && onError()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;

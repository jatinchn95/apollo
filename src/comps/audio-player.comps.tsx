import React, { useContext, useEffect, useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "../assets/scss/audio-player.scss";
import "react-h5-audio-player/lib/styles.css";
import { DurationContext } from "../App";
import { useAtom } from "jotai";
import { decaSecondAtom, secondAtom, speedAtom, timerIdAtom } from "../utils/atoms";
import Util from "../utils/util";

interface IOwnProps {
  musicFile: string;
}

const AudioPlayerComps: React.FunctionComponent<IOwnProps> = ({ musicFile }) => {
  const audioRef = useRef(null);
  const [timerId, setTimerId] = useAtom(timerIdAtom);
  const [second, setSecond] = useAtom(secondAtom);
  const [decaSecond, setDecaSecond] = useAtom(decaSecondAtom);
  const [speed, setSpeed] = useAtom(speedAtom);
  const [startTimer, setStartTimer] = useState(0);

  const time = second + decaSecond / 1000;

  const { duration, setDuration } = useContext(DurationContext);

  useEffect(() => {
    // @ts-ignore
    audioRef.current.audio.current.currentTime = time;
  }, [time]);

  useEffect(() => {
    // @ts-ignore
    let audio = audioRef.current.audio.current;

    audio.preload = "metadata";
    audio.onloadedmetadata = () => {
      setDuration(Math.round(audio.duration));
    };
  }, []);

  useEffect(() => {
    if (decaSecond >= 999) {
      setSecond((second) => second + 1);
      setDecaSecond(0);
    }
    setDecaSecond((decaSecond) => decaSecond + speed);
  }, [startTimer]);

  const onPlay = () => {
    const timerId = window.setInterval(
      () => setStartTimer((startTimer) => startTimer + 1),
      100
    );
    setTimerId(timerId);
  };

  const onPause = () => {
    window.clearInterval(timerId);
    setStartTimer(0);
  };

  const onEnded = () => {
    window.clearInterval(timerId);
    setSecond(0);
    setDecaSecond(0);
  };

  useEffect(() => {
    if (second < 0) {
      setSecond(0);
      setDecaSecond(0);
    }
  }, [second]);

  const onRewind = () => {
    setSecond((second) => second - 10);
  };

  const durationMinute = Math.floor(duration / 60);
  const durationSecond = duration % 60;

  return (
    <div className="audio-player">
      <AudioPlayer
        src={musicFile}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
        ref={audioRef}
      />
      <div className="audio-controls">
        <div
          className="forward"
          onClick={() => setSecond((second) => second + 10)}
        >
          <img src={Util.publicUrl("/images/rotate-right.svg")} className="forward-button" />
          <span className='forward-by'>10</span>
        </div>
        <div className="rewind" onClick={onRewind}>
          <img src={Util.publicUrl("/images/rotate-left.svg")} className="rewind-button" />
          <span className='rewind-by'>10</span>
        </div>
        <div>
          <select
            className="speed"
            onInput={(e: any) =>
              setSpeed(100 * parseFloat(e.currentTarget.value))
            }
          >
            <option value="1">1.00x</option>
            <option value="0.5">0.50x</option>
            <option value="0.75">0.75x</option>
            <option value="1.5">1.50x</option>
            <option value="2.0">2.00x</option>
          </select>
        </div>
        <div className="share">
          <img src={Util.publicUrl("/images/share.png")} />
        </div>
      </div>

      <span className="time-span">
        <span style={{fontWeight:600}}>{Util.getFormatDateTime(0, second)}</span> /{" "}
        <span style={{fontWeight:600, color: "#a8acad"}}>{Util.getFormatDateTime(durationMinute, durationSecond)}</span>
      </span>
    </div>
  );
};

export default AudioPlayerComps;

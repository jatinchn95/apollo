import React, {useContext, useEffect, useState} from "react";
import "../assets/scss/traversing-line.scss";
import {DurationContext} from "../App";
import {useAtom} from "jotai";
import {decaSecondAtom, secondAtom, waveWidthAtom} from "../utils/atoms";

const TraversingLineComp: React.FunctionComponent = () => {
  const { duration } = useContext(DurationContext);
  const [waveWidth] = useAtom(waveWidthAtom)
  const [second, setSecond] = useAtom(secondAtom);
  const [decaSecond, setDecaSecond] = useAtom(decaSecondAtom);
  const [widthPercent, setWidthPercent] = useState(0);
  const time = second + decaSecond / 1000;

  useEffect(() => {
    const percent = (time / duration) * 100;
    setWidthPercent(percent );
  }, [time]);

  const getTime = (e: any) => {
    const waveTime = e.nativeEvent.offsetX / waveWidth;
    const audioTime = waveTime * duration;
    setSecond(Math.floor(audioTime));
    setDecaSecond(Math.round((audioTime - Math.floor(audioTime)) * 10) * 100);
  };

  return (
    <div className="traversing-line" onClick={getTime} style={{maxWidth:`${waveWidth}px`, width: "100%"}}>
      <div
        className="moving-line"
        style={{
          width: `${widthPercent}%`,
        }}
      />
      <hr
          className="horizontal-line"
      />
    </div>
  );
};

export default TraversingLineComp;

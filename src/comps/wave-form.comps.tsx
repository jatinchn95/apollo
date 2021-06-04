import React, {useContext, useEffect, useState} from "react";
import {DurationContext, TranscriptContext} from "../App";
import "../assets/scss/wave-form.scss";
import {useAtom} from "jotai";
import {decaSecondAtom, secondAtom, waveWidthAtom} from "../utils/atoms";

enum EPerson {
  First = "first",
  Second = "second",
}

const WaveFormComps: React.FunctionComponent = () => {
  const { duration } = useContext(DurationContext);
  const transcripts = useContext(TranscriptContext);
  const [waveWidth] = useAtom(waveWidthAtom)
  const [totalWords, setTotalWords] = useState(0);
  const [totalWordsFirstPerson, setTotalWordsFirstPerson] = useState(0);

  const [second] = useAtom(secondAtom);
  const [decaSecond] = useAtom(decaSecondAtom);
  const time = second + decaSecond / 1000;


  let previousMargin = 0;
  const getMargin = (startTime: string, endTime: string) => {
    const margin =
        (parseFloat(startTime) * waveWidth) / duration - previousMargin;
    previousMargin = (parseFloat(endTime) * waveWidth) / duration;
    return margin;
  };

  const getWidth = (startTime: string, endTime: string) => {
    return (
        ((parseFloat(endTime) - parseFloat(startTime)) * waveWidth) / duration
    );
  };

  const getGrayOutWidth = (startTime: string, endTime: string) => {
    const seekBarPosition = (time / duration) * waveWidth;
    let grayOutWidth;
    grayOutWidth =
        time >= parseFloat(startTime)
            ? seekBarPosition - (parseFloat(startTime) * waveWidth) / duration
            : 0;
    if (time > parseFloat(endTime)) {
      grayOutWidth =
          grayOutWidth -
          (seekBarPosition - (parseFloat(endTime) * waveWidth) / duration);
    }
    return grayOutWidth;
  };


  useEffect(() => {
    let total = 0,
      wordsFirstPerson = 0;
    const transcriptLength = transcripts.word_timings.length;
    for (let i = 0; i < transcriptLength; i++) {
      total += transcripts.word_timings[i].length;
    }
    setTotalWords(total);
    for (let j = 0; j < transcriptLength; j++) {
      if (j % 2 == 0) {
        wordsFirstPerson += transcripts.word_timings[j].length;
      }
    }
    setTotalWordsFirstPerson(wordsFirstPerson);
  }, []);

  const firstPercent = Math.round((totalWordsFirstPerson / totalWords) * 100);
  const secondPercent = 100 - firstPercent;

  return (
    <div className="wave-form">
      <div className="transcript-percent">
        <div className="first-percent">{firstPercent} % You</div>
        <div className="second-percent">{secondPercent} % Other</div>
      </div>
      <div className="wave">
        {transcripts.word_timings.map((transcript, index) => {
          const marginLeft = getMargin(
              transcript[0].startTime,
              transcript[transcript.length - 1].endTime
          );
          const width = getWidth(
              transcript[0].startTime,
              transcript[transcript.length - 1].endTime
          );
          const grayOutWidth = getGrayOutWidth(
              transcript[0].startTime,
              transcript[transcript.length - 1].endTime
          );
          return (
              <div
                  key={index}
                  style={{ marginLeft: `${marginLeft}px`, width: `${width}px` }}
              >
                <div className={index % 2 === 0 ? "upper-wave" : "lower-wave"} />
                <div style={{ width: `${grayOutWidth}px` }}>
                  <div
                      className={
                        index % 2 === 0
                            ? "upper-wave-overlay"
                            : "lower-wave-overlay"
                      }
                  />
                </div>
              </div>
          );
        })}
      </div>
    </div>
  );
};


export default WaveFormComps;

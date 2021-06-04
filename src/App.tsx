import React, { useEffect, useState } from "react";
import AudioPlayerComps from "./comps/audio-player.comps";
import WaveFormComps from "./comps/wave-form.comps";
import transcript from "./utils/transcript.json";
import TraversingLineComp from "./comps/traversing-line.comps";
import SearchComps from "./comps/search.comps";
import { useAtom } from "jotai";
import { haveSearchedAtom, waveWidthAtom } from "./utils/atoms";
import TranscriptWordsComps from "./comps/transcript-words.comps";
import SearchedWordsComps from "./comps/searched-words.comps";
import useDimension from "./useDimension";
import "./App.css";

interface ITranscript {
  transcript_text: Array<string>;
  word_timings: Array<any>;
}

export const TranscriptContext = React.createContext<ITranscript>(transcript);
export const DurationContext = React.createContext<any>([]);

function App() {
  const [duration, setDuration] = useState(null);
  const [haveSearched] = useAtom(haveSearchedAtom);
  const [_, setWaveWidth] = useAtom(waveWidthAtom);
  const { width } = useDimension();

  useEffect(() => {
    if (width > 910) {
      setWaveWidth(710)
      return;
    }
    setWaveWidth(width - 200);
  }, [width]);

  return (
    <DurationContext.Provider value={{ duration, setDuration }}>
      <TranscriptContext.Provider value={transcript}>
        <div className="App">
          <AudioPlayerComps musicFile="music/music.wav" />
          <WaveFormComps />
          <TraversingLineComp />
          <SearchComps />
          {haveSearched ? <SearchedWordsComps /> : <TranscriptWordsComps />}
        </div>
      </TranscriptContext.Provider>
    </DurationContext.Provider>
  );
}

export default App;

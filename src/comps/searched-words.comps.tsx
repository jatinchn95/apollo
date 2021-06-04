import React, { useContext } from "react";
import { TranscriptContext } from "../App";
import { useAtom } from "jotai";
import { searchTextAtom } from "../utils/atoms";
import Util from "../utils/util";
import "../assets/scss/searched-transcript.scss";

const SearchedWordsComps: React.FunctionComponent = () => {
  const [searchText] = useAtom(searchTextAtom);

  const transcripts = useContext(TranscriptContext);

  return (
    <div className="searched-words">
      {transcripts.word_timings.map((sentence, index) => (
        <div key={index}>
          {transcripts.transcript_text[index]
            .toLowerCase()
            .includes(searchText.toLowerCase()) && (
            <div
              className="searched"
              style={{
                marginLeft: index % 2 && "20px",
              }}
              key={index}
            >
              <span className={index % 2 ? "second-person" : "first-person"}>
                {Util.getFormatDateTime(
                  0,
                  Math.round(Util.getNumericalTime(sentence[0].startTime))
                )}
              </span>
              <span className="gray-box" />
              <span
                className={`muted-text-span ${index % 2 ? "text-muted" : ""}`}
              >
                {sentence.map((word: any, i: number) => (
                  <span key={i}>
                    <a>
                      {word.word
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ? (
                        <span style={{ backgroundColor: "orange" }}>
                          {word.word}
                        </span>
                      ) : (
                        <span>{word.word}</span>
                      )}{" "}
                    </a>
                  </span>
                ))}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchedWordsComps;

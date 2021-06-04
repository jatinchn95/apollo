import {atom} from "jotai";

const timerIdAtom = atom(0);
const secondAtom = atom(0);
const decaSecondAtom = atom(0);
const searchTextAtom = atom('');
const haveSearchedAtom = atom(false);
const speedAtom = atom(100);
const waveWidthAtom = atom(710)

export {
    timerIdAtom,
    searchTextAtom,
    secondAtom,
    decaSecondAtom,
    haveSearchedAtom,
    speedAtom,
    waveWidthAtom
};

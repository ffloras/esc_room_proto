import React, { createContext, type FC, type ReactNode, useState } from "react";

type puzzleUnlockedProp = {
  [key: string]: boolean;
}

type puzzleStateProp = {
  [key: string]: number[];
}

type divProp = {
  top: number;
  left: number;
  width: number;
  height: number;
}

type bookCutoutsProp = {
  [key: string]: divProp[],
}

// type puzzleNumsProp = {
//   [key: string]: number;
// }

type PuzzleContextProp = {
  puzzleUnlocked: puzzleUnlockedProp;
  setPuzzleUnlocked: React.Dispatch<React.SetStateAction<puzzleUnlockedProp>>;
  puzzleState: puzzleStateProp;
  setPuzzleState: React.Dispatch<React.SetStateAction<puzzleStateProp>>;
  bookCutouts: bookCutoutsProp;
  setBookCutouts: React.Dispatch<React.SetStateAction<bookCutoutsProp>>;
  // puzzleNums: puzzleNumsProp;
  // setPuzzleNums: React.Dispatch<React.SetStateAction<puzzleNumsProp>>;
}

export const PuzzleContext = createContext<PuzzleContextProp>({
  puzzleUnlocked: {},
  setPuzzleUnlocked: () => {},
  puzzleState: {},
  setPuzzleState: () => {},
  bookCutouts: {},
  setBookCutouts: () => {},
  // puzzleNums: {},
  // setPuzzleNums: () => {},
})

type PuzzleProviderProp = {
  children: ReactNode;
}


export const PuzzleProvider: FC<PuzzleProviderProp> = ({children}) => {
  const initialPuzzleStatus = {
    starBox: false,
    ceilingGear: false,
    coPotion: false,
    agPotion: false,
    niPotion: false,
    flower: true,
    paintingBox: false,
    wardrobe: true,
    clockBottom: false,
    windowBoard: false,
    deskDrawerTop: false,
    deskDrawerBottom: false,
    obtainSeeds: false,
    seedsBird: false,
    acornBird: false,
    wardrobeInside: false,
    mushroomBird: false,
    bugBird: false,
    birdComplete: false,
    ironKeyWardrobe: false,
    bugWardrobe: false,
    mushroomWardrobe: false,
    wallPatch: false,
    moonBox: false,
    aegir: true,
    thebe: true,
    atlas: true,
    rhea: true,
    phobos: true,
    oberon: true,
    titania: true,
    triton: true,
    despina: true,
    kore: true,
    safeUnlock: false,
    safeOpen: false,
    mirrorFragment1: false,
    mirrorFragment2: false,
    mirrorFragment3: false,
  }

  const initialPuzzleState: puzzleStateProp = {
    paintingBox: [0, 0, 0, 0, 0],
    moonBox: [0, 0, 0, 0],
    safeUnlock: [0, 0, 0],
    atlas: [435, 170],
    thebe: [485, 71],
    aegir: [510, 120],
    rhea: [580, 114],
    phobos: [410, 305],
    oberon: [630, 100],
    titania: [520, 90],
    triton: [430, 350],
    despina: [380, 225],
    kore: [445, 270],
  }

  // const initialPuzzleNums = {
  //   wardrobeInside: 0,
  // }

  const [puzzleUnlocked, setPuzzleUnlocked] = useState<puzzleUnlockedProp>(initialPuzzleStatus);
  const [puzzleState, setPuzzleState] = useState<puzzleStateProp>(initialPuzzleState);
  const [bookCutouts, setBookCutouts] = useState<bookCutoutsProp>({book0: [], book1: []})
  //const [puzzleNums, setPuzzleNums] = useState<puzzleNumsProp>(initialPuzzleNums);

  return (
    <PuzzleContext.Provider value={{puzzleUnlocked, setPuzzleUnlocked, puzzleState, setPuzzleState, bookCutouts, setBookCutouts}}>
      {children}
    </PuzzleContext.Provider>
  )
}
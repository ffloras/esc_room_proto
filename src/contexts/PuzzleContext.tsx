import React, { createContext, type FC, type ReactNode, useState } from "react";

type puzzleUnlockedProp = {
  [key: string]: boolean;
};

type puzzleStateProp = {
  [key: string]: number[];
};

type divProp = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type bookCutoutsProp = {
  [key: string]: divProp[];
};

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
  totalPuzzlesCompleted: number;
  unlockPuzzle: (puzzleName: string) => void;
};

export const PuzzleContext = createContext<PuzzleContextProp>({
  puzzleUnlocked: {},
  setPuzzleUnlocked: () => {},
  puzzleState: {},
  setPuzzleState: () => {},
  bookCutouts: {},
  setBookCutouts: () => {},
  totalPuzzlesCompleted: 0,
  unlockPuzzle: () => {},
});

type PuzzleProviderProp = {
  children: ReactNode;
};

export const PuzzleProvider: FC<PuzzleProviderProp> = ({ children }) => {
  const initialPuzzleStatus = {
    starBox: false,
    ceilingGear: false,
    coPotion: false,
    agPotion: false,
    niPotion: false,
    flower: false,
    paintingBox: false,
    wardrobe: false,
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
    aegir: false,
    thebe: false,
    atlas: false,
    rhea: false,
    phobos: false,
    oberon: false,
    titania: false,
    triton: false,
    despina: false,
    kore: false,
    safeUnlock: false,
    safeOpen: false,
    sunBoxLeft: false,
    sunBoxRight: false,
    mirrorFragment1: false,
    mirrorFragment2: false,
    mirrorFragment3: false,
    mirrorComplete: false,
    door: false,
  };

  const initialPuzzleState: puzzleStateProp = {
    paintingBox: [0, 0, 0, 0, 0],
    moonBox: [0, 0, 0, 0],
    safeUnlock: [0, 0, 0],
    clockBottom: [-1, -1, -1, -1, -1, -1, -1, -1],
    clockBottomPosition: [0],
    ceilingRotation: [0],
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
  };

  // const initialPuzzleNums = {
  //   wardrobeInside: 0,
  // }

  const [puzzleUnlocked, setPuzzleUnlocked] =
    useState<puzzleUnlockedProp>(initialPuzzleStatus);
  const [puzzleState, setPuzzleState] =
    useState<puzzleStateProp>(initialPuzzleState);
  const [bookCutouts, setBookCutouts] = useState<bookCutoutsProp>({
    book0: [],
    book1: [],
  });
  const [totalPuzzlesCompleted, setTotalPuzzleCompleted] = useState<number>(0);

  const unlockPuzzle = (puzzleName: string) => {
    setPuzzleUnlocked((prev) => ({ ...prev, [puzzleName]: true }));
    setTotalPuzzleCompleted((prev) => prev + 1);
  };

  return (
    <PuzzleContext.Provider
      value={{
        puzzleUnlocked,
        setPuzzleUnlocked,
        puzzleState,
        setPuzzleState,
        bookCutouts,
        setBookCutouts,
        totalPuzzlesCompleted,
        unlockPuzzle,
      }}
    >
      {children}
    </PuzzleContext.Provider>
  );
};

import React, { createContext, type FC, type ReactNode, useState } from "react";

type puzzleUnlockedProp = {
  [key: string]: boolean;
}

type puzzleStateProp = {
  [key: string]: number[];
}

// type puzzleNumsProp = {
//   [key: string]: number;
// }

type PuzzleContextProp = {
  puzzleUnlocked: puzzleUnlockedProp;
  setPuzzleUnlocked: React.Dispatch<React.SetStateAction<puzzleUnlockedProp>>;
  puzzleState: puzzleStateProp;
  setPuzzleState: React.Dispatch<React.SetStateAction<puzzleStateProp>>;
  // puzzleNums: puzzleNumsProp;
  // setPuzzleNums: React.Dispatch<React.SetStateAction<puzzleNumsProp>>;
}

export const PuzzleContext = createContext<PuzzleContextProp>({
  puzzleUnlocked: {},
  setPuzzleUnlocked: () => {},
  puzzleState: {},
  setPuzzleState: () => {},
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
    berryBird: false,
    wardrobeInside: false,
    mushroomBird: false,
    bugBird: false,
    ironKeyWardrobe: false,
    bugWardrobe: false,
    mushroomWardrobe: false,
    mirrorFragment1: false,
    mirrorFragment2: false,
    mirrorFragment3: false,
  }

  const initialPuzzleState: puzzleStateProp = {
    paintingBox: [0, 0, 0, 0, 0],
  }

  // const initialPuzzleNums = {
  //   wardrobeInside: 0,
  // }

  const [puzzleUnlocked, setPuzzleUnlocked] = useState<puzzleUnlockedProp>(initialPuzzleStatus);
  const [puzzleState, setPuzzleState] = useState<puzzleStateProp>(initialPuzzleState);
  //const [puzzleNums, setPuzzleNums] = useState<puzzleNumsProp>(initialPuzzleNums);

  return (
    <PuzzleContext.Provider value={{puzzleUnlocked, setPuzzleUnlocked, puzzleState, setPuzzleState}}>
      {children}
    </PuzzleContext.Provider>
  )
}
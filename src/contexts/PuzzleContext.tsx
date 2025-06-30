import React, { createContext, type FC, type ReactNode, useState } from "react";

type puzzleUnlockedProp = {
  [key: string]: boolean;
}

type PuzzleContextProp = {
  puzzleUnlocked: puzzleUnlockedProp;
  setPuzzleUnlocked: React.Dispatch<React.SetStateAction<puzzleUnlockedProp>>
}

export const PuzzleContext = createContext<PuzzleContextProp>({
  puzzleUnlocked: {},
  setPuzzleUnlocked: () => {},
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
    flower: false,
    paintingBox: false,
    wardrobe: true,
    clockBottom: false,
    mirrorPiece1: false,
  }

  const [puzzleUnlocked, setPuzzleUnlocked] = useState<puzzleUnlockedProp>(initialPuzzleStatus);

  return (
    <PuzzleContext.Provider value={{puzzleUnlocked, setPuzzleUnlocked}}>
      {children}
    </PuzzleContext.Provider>
  )
}
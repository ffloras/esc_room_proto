import React, { createContext, useState, type ReactNode, type FC } from "react";

type SceneContextType = {
  currentStage: number;
  prevStage: number;
  start: () => void;
  changeStage: (direction: string) => void;
  currentScene: string;
  setCurrentScene: React.Dispatch<React.SetStateAction<string>>;
}

export const SceneContext = createContext<SceneContextType>({
  currentStage: 4,
  prevStage: 0,
  start: () => {},
  changeStage: () => {},
  currentScene: "main",
  setCurrentScene: () => {},
})

type SceneProviderType = {
  children: ReactNode
}

const numRooms: number = 4;

export const SceneProvider: FC<SceneProviderType> = ({children}) => {
  const [currentStage, setCurrentStage] = useState<number>(4);
  const [prevStage, setPrevStage] = useState<number>(0);
  const [currentScene, setCurrentScene] = useState<string>("main");

  const start = () => {
    setCurrentStage(0);
  }

  const changeStage = (direction: string) => {
    switch (direction) {
      case "up":
        setPrevStage(currentStage);
        setCurrentStage(5);
        break;
      case "down":
        currentStage == 5 ? setCurrentStage(prevStage) : setCurrentScene("main");
        break;
      case "left":
        setCurrentStage((prev) => (prev + numRooms- 1) % numRooms);
        break;
      case "right":
        setCurrentStage((prev) => (prev + 1) % numRooms);
        break;
      default:
        setCurrentStage(currentStage);
    }
  }

  return (
    <SceneContext.Provider value={{currentStage, prevStage, start, changeStage, currentScene, setCurrentScene}}>
      {children}
    </SceneContext.Provider>
  )
}
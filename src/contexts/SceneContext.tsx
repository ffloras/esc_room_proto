import React, { createContext, useState, type ReactNode, type FC } from "react";

type stageProvider = {
  current: number;
  prev: number;
}

type sceneProvider = {
  current: string;
  prev: string;
}

type SceneContextType = {
  stage: stageProvider;
  start: () => void;
  changeStage: (direction: string) => void;
  scene: sceneProvider;
  setCurrentScene: (scene: string) => void;
  setPrevScene: (scene: string) => void;
}

export const SceneContext = createContext<SceneContextType>({
  stage: {current: 4, prev: 0},
  start: () => {},
  changeStage: () => {},
  scene: {current: "", prev: ""},
  setCurrentScene: () => {},
  setPrevScene: () => {},
})

type SceneProviderType = {
  children: ReactNode
}

const numRooms: number = 4;



export const SceneProvider: FC<SceneProviderType> = ({children}) => {
  const [stage, setStage] = useState<stageProvider>({
    current: 4,
    prev: 0,
  })
  const [scene, setScene] = useState<sceneProvider>({
    current: "main",
    prev: "",
  })

  const ceiling = 5;

  const start = () => {
    setStage((prev) => ({...prev, current: 0}));
  }

  const setCurrentScene = (scene: string) => {
    setScene((prev) => ({...prev, current: scene}))
  }

  const setPrevScene = (scene: string) => {
    setScene((prev) => ({...prev, prev: scene}))
  }

  const changeStage = (direction: string) => {
    switch (direction) {
      case "up":
        setStage((prev) => ({current: ceiling, prev: prev.current}));
        break;
      case "down":
        stage.current == ceiling ? setStage((prev) => ({...prev, current: prev.prev})) : setCurrentScene(scene.prev);
        break;
      case "left":
        setStage((prev) => ({...prev, current: (prev.current + numRooms- 1) % numRooms}));
        break;
      case "right":
        setStage((prev) => ({...prev, current: (prev.current + 1) % numRooms}));
        break;
      default:
        setStage((prev) => prev);
    }
  }

  return (
    <SceneContext.Provider value={{stage, start, changeStage, scene, setCurrentScene, setPrevScene}}>
      {children}
    </SceneContext.Provider>
  )
}
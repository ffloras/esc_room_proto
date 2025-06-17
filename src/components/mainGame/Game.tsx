import SidebarContainer from "../sidebar/SidebarContainer";
import React, { use } from "react";
import { SceneContext } from "../../contexts/SceneContext";
import { Stages } from "../../db/scenesDB"


const Game = () => {
  const {currentStage, currentScene} = use(SceneContext);
  const startingMenu = 4;

  return (
    <div className="game-window">
      <div className="side-display" style={{display: currentStage == startingMenu ? "none" : "block"}}>
        <SidebarContainer/>
      </div>
      <div className="scene-window" style={{width: currentStage == startingMenu ? "800px" : "700px"}}>
        {React.createElement(Stages[currentStage][currentScene])}
      </div>
      
    </div>
  )
}

export default Game
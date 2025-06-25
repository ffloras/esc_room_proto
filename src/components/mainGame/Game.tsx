import SidebarContainer from "../sidebar/SidebarContainer";
import React, { use } from "react";
import { SceneContext } from "../../contexts/SceneContext";
import { Stages } from "../../db/scenesDB"


const Game = () => {
  const {stage, scene} = use(SceneContext);
  const startingMenu = 4;

  return (
    <div className="game-window">
      <div className="side-display" style={{display: stage.current == startingMenu ? "none" : "block"}}>
        <SidebarContainer/>
      </div>
      <div className="scene-window" style={{width: stage.current == startingMenu ? "800px" : "700px"}}>
        {React.createElement(Stages[stage.current][scene.current])}
      </div>
      
    </div>
  )
}

export default Game
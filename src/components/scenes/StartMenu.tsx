import { use } from "react"
import { SceneContext } from "../../contexts/SceneContext"
import "../../css/startMenu.css";

const StartMenu = () => {
  const {start} = use(SceneContext);

  return (
    <div className="center">
      <h1 className="game-title">Escape Room</h1>
      <button className="start-button" onClick={() => start()}>
        Start
      </button>
    </div>
  )
}

export default StartMenu
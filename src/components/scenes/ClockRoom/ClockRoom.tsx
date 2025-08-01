import MainDirectionButton from "../../mainGame/MainDirectionButton"
import ClockRoomImg from "../../../assets/img/scenes/clockRoom.png"
import { TimeContext } from "../../../contexts/TimeContext"
import { use } from "react"
import LoadingScreen from "../../mainGame/LoadingScreen"
import Clock from "../../subscenes/Clock"
import { SceneContext } from "../../../contexts/SceneContext"
import { PuzzleContext } from "../../../contexts/PuzzleContext"
import { ActiveItemContext } from "../../../contexts/ActiveItemContext"
import { ItemsContext } from "../../../contexts/ItemsContext"
import BasicItem from "../../items/BasicItem"


const ClockRoom = () => {
  const {time} = use(TimeContext);
  const {changeScene} = use(SceneContext);
  const {puzzleUnlocked, unlockPuzzle} = use(PuzzleContext);
  const {activeItem, setActiveItem} = use(ActiveItemContext);
  const {removeSidebarItem} = use(ItemsContext);

  const breakWall = () => {
    if (puzzleUnlocked.wallPatch) return; 
    if (activeItem == "hammer") {
      unlockPuzzle("wallPatch");
      setActiveItem("");
      removeSidebarItem("hammer");
    }
  }

  return (
    <div className="scene-container" style={{backgroundImage: `url(${ClockRoomImg})`}}>
      <LoadingScreen/>
      <MainDirectionButton direction="left"/>
      <MainDirectionButton direction="up"/>
      <MainDirectionButton direction="right"/>

      {/* {ClockRoomSubscenes.map((subscene, index) => (
        <BasicSubscene {...subscene} prevScene="main" key={index}/>
      ))} */}

      <Clock/>
      <div className="clock-hour-sm clock-hand-sm" style={{transform: `rotate(${time.hour * 30}deg)`}}></div>
      <div className="clock-minute-sm clock-hand-sm" style={{transform: `rotate(${time.minute * 6}deg)`}}></div>

      <div className="starBox-clickbox" onClick={() => changeScene("starBox", "main")}></div>
      <div className="book0-clickbox" onClick={() => changeScene("book0", "main")}></div>
      <div className="book1-clickbox" onClick={() => changeScene("book1", "main")}></div>
      
      <div className="crossword-clickbox" onClick={() => changeScene("crossword", "main")}></div>
      <div className="moonBox-clickbox" onClick={() => changeScene("moonBox", "main")}></div>
      <div className="safe-clickbox" onClick={() => changeScene("safe", "main")}></div>

      <div className={`wall-patch ${puzzleUnlocked.wallPatch ?' wall-patch-open' : 'wall-patch-closed'}`}
        onClick={breakWall}
      ></div>

      {puzzleUnlocked.wallPatch && <BasicItem name="acorn"/>}
    </div>
  )
}

export default ClockRoom
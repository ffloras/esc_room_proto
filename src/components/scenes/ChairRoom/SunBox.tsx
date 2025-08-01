import LoadingScreen from "../../mainGame/LoadingScreen"
import MainDirectionButton from "../../mainGame/MainDirectionButton"
import sunBoxImg from "../../../assets/img/subscenes/chairRoom/sunboxContainer.png"
import sunBoxLidImg from "../../../assets/img/subscenes/chairRoom/sunboxLids165x150.png"
import sunboxButtonImg from '../../../assets/img/subscenes/chairRoom/sunboxButton.png'
import { use, useEffect, useState } from "react"
import { PuzzleContext } from "../../../contexts/PuzzleContext"
import BasicItem from "../../items/BasicItem"

type sunboxStatesProp = {
  leftOn: number;
  leftOff: number;
  rightOn: number;
  rightOff: number;
}

const SunBox = () => {
  const {puzzleUnlocked, unlockPuzzle} = use(PuzzleContext);
  const [text, setText] = useState<string>("");

  const sunboxStates: sunboxStatesProp = {
    leftOn: 0,
    leftOff: 1,
    rightOn: 2,
    rightOff: 3,
  }

  const checkText = () => {
    if (puzzleUnlocked.sunboxLeft && puzzleUnlocked.sunboxRight) return;
    if (text.toLowerCase() === "sol") {
      unlockPuzzle("sunboxLeft");
    }
    if (text.toLowerCase() === "terra") {
      unlockPuzzle("sunboxRight");
    }
    setText("");
  }

  useEffect(() => {

  }, [puzzleUnlocked])

  return (
    <div className="scene-container">
      <LoadingScreen/>
      <div className="sunbox-container" style={{ backgroundImage: `url(${sunBoxImg})` }}></div>

      <input type="text" className="sunbox-textbox" value={text} onChange={(e) => setText(e.target.value)}/>
      <img src={sunboxButtonImg} alt="sunbox button" className="sunbox-button" onClick={checkText}/>

      <div className="sunbox-lid lid-left"
        style={{
          backgroundImage: `url(${sunBoxLidImg})`,
          backgroundPosition: `-${(puzzleUnlocked.sunboxLeft ? sunboxStates.leftOn : sunboxStates.leftOff) * 165}px 0px`,
          left: puzzleUnlocked.sunboxLeft && puzzleUnlocked.sunboxRight ? '129px' : '179px',
        }}
      ></div>
      <div className="sunbox-lid lid-right"
        style={{
          backgroundImage: `url(${sunBoxLidImg})`,
          backgroundPosition: `-${(puzzleUnlocked.sunboxRight ? sunboxStates.rightOn : sunboxStates.rightOff) * 165}px 0px`,
          left: puzzleUnlocked.sunboxLeft && puzzleUnlocked.sunboxRight ? '391px' : '341px',
        }}
      ></div>
      <BasicItem name="sapphire"/>
      <MainDirectionButton direction="down"/>
    </div>
  )
}

export default SunBox
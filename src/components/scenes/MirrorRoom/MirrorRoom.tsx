import mirrorMainImg from "../../../assets/img/scenes/mainRoom.png";
import BasicItem from "../../items/BasicItem";
import BasicSubscene from "../../subscenes/BasicSubscene";
import MainDirectionButton from "../../mainGame/MainDirectionButton";
import { MirrorRoomSubscenes} from "../../../db/scenesDB";
import "../../../css/mirrorRoom.css";
import LoadingScreen from "../../mainGame/LoadingScreen";
import Desk from "./Desk";
import birdImg from '../../../assets/img/subscenes/mainRoom/birdDesk.png'
import { use } from "react";
import { PuzzleContext } from "../../../contexts/PuzzleContext";


const MirrorRoom = () => {
  const {puzzleUnlocked} = use(PuzzleContext);

  return (
    <div className="scene-container" style={{
      backgroundImage: `url(${mirrorMainImg})`,
      }}
    >
      <LoadingScreen/>
      <BasicItem name="agPotion"/>
      <BasicItem name="coPotion"/>
      <BasicItem name="crowbar"/>

      {MirrorRoomSubscenes.map((subscene, index) => (
        <BasicSubscene {...subscene} prevScene="main" key={index}/>
      ))}

      {puzzleUnlocked.birdComplete && 
        <BasicSubscene name="bird on desk" img={birdImg} next="maze" prevScene="main" className="desk-bird"
      />}
      <Desk/>
      

      <MainDirectionButton direction="left"/>
      <MainDirectionButton direction="up"/>
      <MainDirectionButton direction="right"/>
    </div>
  )
}

export default MirrorRoom
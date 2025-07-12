
import mirrorMainImg from "../../../assets/img/scenes/mainRoom.png";
import BasicItem from "../../items/BasicItem";
import BasicSubscene from "../../subscenes/BasicSubscene";
import MainDirectionButton from "../../mainGame/MainDirectionButton";
import { MirrorRoomSubscenes} from "../../../db/scenesDB";
import "../../../css/mirrorRoom.css";
import LoadingScreen from "../../mainGame/LoadingScreen";
import Desk from "./Desk";


const MirrorRoom = () => {

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

      <Desk/>
      

      <MainDirectionButton direction="left"/>
      <MainDirectionButton direction="up"/>
      <MainDirectionButton direction="right"/>
    </div>
  )
}

export default MirrorRoom
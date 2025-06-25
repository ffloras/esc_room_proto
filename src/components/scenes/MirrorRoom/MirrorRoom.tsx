
import mirrorMainImg from "../../../assets/img/scenes/mainRoom.png";
import BasicItem from "../../items/BasicItem";
import BasicSubscene from "../../subscenes/BasicSubscene";
import MainDirectionButton from "../../mainGame/MainDirectionButton";
import { MirrorRoomSubscenes} from "../../../db/scenesDB";
import "../../../css/mirrorRoom.css";


const MirrorRoom = () => {

  return (
    <div className="scene-container" style={{
      backgroundImage: `url(${mirrorMainImg})`,
      }}
    >
      MirrorRoom
      <BasicItem name="agPotion"/>
      <BasicItem name="coPotion"/>

      {MirrorRoomSubscenes.map((subscene, index) => (
        <BasicSubscene {...subscene} prevScene="main" key={index}/>
      ))}
      

      <MainDirectionButton direction="left"/>
      <MainDirectionButton direction="up"/>
      <MainDirectionButton direction="right"/>
    </div>
  )
}

export default MirrorRoom
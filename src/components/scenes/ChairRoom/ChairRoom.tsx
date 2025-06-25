import MainDirectionButton from "../../mainGame/MainDirectionButton"
import ChairMainImg from "../../../assets/img/scenes/chairRoom.png"
import { ChairRoomSubscenes } from "../../../db/scenesDB";
import BasicSubscene from "../../subscenes/BasicSubscene";

const ChairRoom = () => {

  return (
    <div className="scene-container" style={{
      backgroundImage: `url(${ChairMainImg})`
    }}>
      ChairRoom

      {ChairRoomSubscenes.map((subscene, index) => (
        <BasicSubscene {...subscene} prevScene="main" key={index}/>
      ))}

      <MainDirectionButton direction="left"/>
      <MainDirectionButton direction="up"/>
      <MainDirectionButton direction="right"/>
    </div>
  )
}

export default ChairRoom
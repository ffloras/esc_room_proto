import MainDirectionButton from "../../mainGame/MainDirectionButton"
import ClockRoomImg from "../../../assets/img/scenes/clockRoom.png"
import { ClockRoomSubscenes } from "../../../db/scenesDB"
import BasicSubscene from "../../subscenes/BasicSubscene"

const ClockRoom = () => {

  return (
    <div className="scene-container" style={{backgroundImage: `url(${ClockRoomImg})`}}>
      ClockRoom
      <MainDirectionButton direction="left"/>
      <MainDirectionButton direction="up"/>
      <MainDirectionButton direction="right"/>

      {ClockRoomSubscenes.map((subscene, index) => (
        <BasicSubscene {...subscene} prevScene="main" key={index}/>
      ))}

    </div>
  )
}

export default ClockRoom
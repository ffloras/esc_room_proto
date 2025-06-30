import MainDirectionButton from "../../mainGame/MainDirectionButton"
import ClockRoomImg from "../../../assets/img/scenes/clockRoom.png"
import { ClockRoomSubscenes } from "../../../db/scenesDB"
import BasicSubscene from "../../subscenes/BasicSubscene"
import LoadingScreen from "../../mainGame/LoadingScreen"
import Clock from "../../subscenes/Clock"

const ClockRoom = () => {

  return (
    <div className="scene-container" style={{backgroundImage: `url(${ClockRoomImg})`}}>
      <LoadingScreen/>
      <MainDirectionButton direction="left"/>
      <MainDirectionButton direction="up"/>
      <MainDirectionButton direction="right"/>

      {ClockRoomSubscenes.map((subscene, index) => (
        <BasicSubscene {...subscene} prevScene="main" key={index}/>
      ))}

      <Clock/>

    </div>
  )
}

export default ClockRoom
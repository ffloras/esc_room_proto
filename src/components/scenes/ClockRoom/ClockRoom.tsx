import MainDirectionButton from "../../mainGame/MainDirectionButton"
import ClockRoomImg from "../../../assets/img/scenes/clockRoom.png"
import { ClockRoomSubscenes } from "../../../db/scenesDB"
import { TimeContext } from "../../../contexts/TimeContext"
import { use } from "react"
import BasicSubscene from "../../subscenes/BasicSubscene"
import LoadingScreen from "../../mainGame/LoadingScreen"
import Clock from "../../subscenes/Clock"

const ClockRoom = () => {
  const {time} = use(TimeContext);

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
      <div className="clock-hour-sm clock-hand-sm" style={{transform: `rotate(${time.hour * 30}deg)`}}></div>
      <div className="clock-minute-sm clock-hand-sm" style={{transform: `rotate(${time.minute * 6}deg)`}}></div>
    </div>
  )
}

export default ClockRoom
import LoadingScreen from "../../mainGame/LoadingScreen"
import MainDirectionButton from "../../mainGame/MainDirectionButton"
import '../../../css/paintingRoom.css'
import paintingRoomImg from '../../../assets/img/scenes/paintingRoom.png'
import { PaintingRoomSubscenes } from "../../../db/scenesDB"
import BasicSubscene from "../../subscenes/BasicSubscene"


const PaintingRoom = () => {
  return (
    <div className="scene-container" style={{
      backgroundImage: `url(${paintingRoomImg})`
    }}>
      

      PaintingRoom
      <LoadingScreen />
      {PaintingRoomSubscenes.map((subscene) => (
        <BasicSubscene {...subscene} prevScene="main" key={subscene.name}/>
      ))}
      <MainDirectionButton direction="left" />
      <MainDirectionButton direction="up" />
      <MainDirectionButton direction="right" />
    </div>
  )
}

export default PaintingRoom
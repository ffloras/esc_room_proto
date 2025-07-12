import MainDirectionButton from "../../mainGame/MainDirectionButton"
import ChairMainImg from "../../../assets/img/scenes/chairRoom.png"
// import { ChairRoomSubscenes } from "../../../db/scenesDB";
// import BasicSubscene from "../../subscenes/BasicSubscene";
import LoadingScreen from "../../mainGame/LoadingScreen";
import Window from "../../subscenes/Window";
import BasicItem from "../../items/BasicItem";
import Wardrobe from "./Wardrobe";
import Bird from "./Bird";

const ChairRoom = () => {

  return (
    <div className="scene-container" style={{
      backgroundImage: `url(${ChairMainImg})`
    }}>
      <LoadingScreen/>

      {/* {ChairRoomSubscenes.map((subscene, index) => (
        <BasicSubscene {...subscene} prevScene="main" key={index}/>
      ))} */}

      <Wardrobe/>

      <Window/>
      <BasicItem name="brassKey"/>

      <Bird/>

      <MainDirectionButton direction="left"/>
      <MainDirectionButton direction="up"/>
      <MainDirectionButton direction="right"/>
    </div>
  )
}

export default ChairRoom
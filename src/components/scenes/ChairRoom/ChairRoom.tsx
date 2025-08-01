import MainDirectionButton from "../../mainGame/MainDirectionButton"
import ChairMainImg from "../../../assets/img/scenes/chairRoom.png"
import LoadingScreen from "../../mainGame/LoadingScreen";
import Window from "../../subscenes/Window";
import BasicItem from "../../items/BasicItem";
import Wardrobe from "./Wardrobe";
import Bird from "./Bird";
import stoolImg from '../../../assets/img/subscenes/chairRoom/stool.png'
import { SceneContext } from "../../../contexts/SceneContext";
import { use } from "react";
import BasicSubscene from "../../subscenes/BasicSubscene";
import sunBoxImg from '../../../assets/img/subscenes/chairRoom/sunboxSm.png'

const ChairRoom = () => {
  const {changeScene} = use(SceneContext);

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
      <img src={stoolImg} alt="Stool with cushion" className="stool"/>

      <BasicItem name="scissors"/>
      <div className="book-clue-clickbox" onClick={() => changeScene("bookClue", "main")}></div>
      <BasicSubscene name="sunbox puzzle" className="sunbox-clickbox" prevScene="main" next="sunBox" img={sunBoxImg}/>

      <MainDirectionButton direction="left"/>
      <MainDirectionButton direction="up"/>
      <MainDirectionButton direction="right"/>
    </div>
  )
}

export default ChairRoom
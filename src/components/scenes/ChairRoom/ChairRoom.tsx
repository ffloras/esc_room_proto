import MainDirectionButton from "../../mainGame/MainDirectionButton"
import { use } from "react";
import { AllItemsContext } from "../../../contexts/AllItemsContext";
import ChairMainImg from "../../../assets/img/scenes/chairRoom.png"
import { ChairRoomSubscenes } from "../../../db/scenesDB";
import BasicItem from "../../items/BasicItem";
import BasicSubscene from "../../subscenes/BasicSubscene";

const ChairRoom = () => {
  let {items} = use(AllItemsContext);

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
import { use } from "react";
import { AllItemsContext } from "../../../contexts/AllItemsContext";
import mirrorMainImg from "../../../assets/img/scenes/mainRoom.png";
import BasicItem from "../../items/BasicItem";
import BasicSubscene from "../../subscenes/BasicSubscene";
import MainDirectionButton from "../../mainGame/MainDirectionButton";
import { MirrorRoomSubscenes } from "../../../db/scenesDB";


const MirrorRoom = () => {
  const {items} = use(AllItemsContext);

  return (
    <div className="scene-container" style={{
      backgroundImage: `url(${mirrorMainImg})`,
      }}
    >
      MirrorRoom
      <BasicItem name="test"/>
      <BasicItem name="test2"/>

      <BasicSubscene {...MirrorRoomSubscenes[0]}/>

      <MainDirectionButton direction="left"/>
      <MainDirectionButton direction="up"/>
      <MainDirectionButton direction="right"/>
    </div>
  )
}

export default MirrorRoom
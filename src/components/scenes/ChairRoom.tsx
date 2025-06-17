import MainDirectionButton from "../mainGame/MainDirectionButton"
import { use } from "react";
import { AllItemsContext } from "../../contexts/AllItemsContext";
import BasicItem from "../items/BasicItem";

const ChairRoom = () => {
  let {items} = use(AllItemsContext);

  return (
    <div className="scene-container">
      ChairRoom
      <MainDirectionButton direction="left"/>
      <MainDirectionButton direction="up"/>
      <MainDirectionButton direction="right"/>
    </div>
  )
}

export default ChairRoom
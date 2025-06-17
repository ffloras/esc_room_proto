import MainDirectionButton from "../mainGame/MainDirectionButton"
import BasicItem from "../items/BasicItem"
import { use } from "react";
import { AllItemsContext } from "../../contexts/AllItemsContext";

const ClockRoom = () => {
  const {items} = use(AllItemsContext);

  return (
    <div className="scene-container">
      ClockRoom
      <MainDirectionButton direction="left"/>
      <MainDirectionButton direction="up"/>
      <MainDirectionButton direction="right"/>

    </div>
  )
}

export default ClockRoom
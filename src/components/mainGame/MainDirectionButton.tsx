import { use } from "react";
import { SceneContext } from "../../contexts/SceneContext";
import directionArrow from "../../assets/img/directionArrow.png";
import React from "react";


const MainDirectionButton = ({direction} : {direction: string}) => {
  const {changeStage} = use(SceneContext);

  function setStyle(direction: string): React.CSSProperties  {
    let style: {[key: string]: string} = {
      width: '30px',
      position: 'absolute',
      cursor: 'pointer',
      zIndex: '200',
    }
    switch (direction) {
      case "up":
        style.left = '47%';
        style.marginTop= '0.5rem';
        break;
      case "right":
        style.transform = 'rotate(90deg)';
        style.bottom = '50%';
        style.right = '0%';
        break;
      case "down":
        style.transform = 'rotate(180deg)';
        style.bottom = '2%';
        style.left = '47%';
        break;
      case "left":
        style.transform ='rotate(270deg)';
        style.bottom = '50%';
        style.left = '0%';
        break;
      default:
        return style
    }
    return style;
  }

  return (
    <img src={directionArrow} alt="direction arrow" onClick={() => changeStage(direction)} style={setStyle(direction)}/>
  )
}

export default MainDirectionButton
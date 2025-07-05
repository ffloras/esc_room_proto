import "../../css/ceiling.css"
import type React from "react"
import { use, useRef, useState} from "react"
//components
import MainDirectionButton from "../mainGame/MainDirectionButton"
import CeilingGear from "../subscenes/CeilingGear"
//images
import ceilingImg from '../../assets/img/scenes/ceiling.png'
import sliderImg from "../../assets/img/subscenes/ceiling/slider.png"
import thumbImg from "../../assets/img/subscenes/ceiling/thumb.png"
import ceilingGearsImg from "../../assets/img/subscenes/ceiling/ceilingGears.png"
import gearImg from "../../assets/img/items/gear.png"
//contexts
import { PuzzleContext } from "../../contexts/PuzzleContext"
import { ActiveItemContext } from "../../contexts/ActiveItemContext"
import { ItemsContext } from "../../contexts/ItemsContext"
import LoadingScreen from "../mainGame/LoadingScreen"

type gearRotationProp = {
  [key: string]: {
    gearRot: number,
    starRot: number
  }
}

const gearsInfo: gearRotationProp= {
  topLeft: {
    gearRot: 1.9,
    starRot: -1.6
  },
  topCenter: {
    gearRot: -1.9,
    starRot: 1.3,
  },
  centerLeft: {
    gearRot: -1.5,
    starRot: 1.2
  },
  center: {
    gearRot: 1,
    starRot: -2
  },
  centerRight: {
    gearRot: -0.8,
    starRot: 0.9
  },
  bottomLeft: {
    gearRot: 1.0,
    starRot: -0.5
  },
  bottomCenter: {
    gearRot: -0.8,
    starRot: 0.6
  },
  bottomRight: {
    gearRot: 1.8,
    starRot: -2
  },
}

const Ceiling = () => {
  const [movement, setMovement] = useState<number>(0);
  const [textActive, setTextActive] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const {puzzleUnlocked, setPuzzleUnlocked} = use(PuzzleContext);
  const {activeItem, setActiveItem} = use(ActiveItemContext);
  const {removeSidebarItem} = use(ItemsContext);

  const gears = ["topLeft", "topCenter", "centerLeft", "center", "centerRight", "bottomLeft", "bottomCenter", "bottomRight"];

  //controls slider and gear rotation
  const slide = (e: React.MouseEvent<HTMLDivElement>) => {
    
    e.preventDefault();
    if (!puzzleUnlocked.ceilingGear) {
      setTextActive(true);
      return;
    }
    if (!thumbRef.current || !sliderRef.current) return;

    let shiftY = (e.clientY - thumbRef.current.getBoundingClientRect().top);


    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(e: MouseEvent) {
      if (!thumbRef.current || !sliderRef.current) return;
      
      let newTop = e.clientY - shiftY - (sliderRef.current.getBoundingClientRect().top + 10);
      let topEdge = 0
      let bottomEdge = 120;

      if (newTop < topEdge) newTop = topEdge;
      if (newTop > bottomEdge) newTop = bottomEdge;

      setMovement(newTop);
    }
    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  }


  const activateGear = () => {
    if (activeItem == "gear") {
      setTextActive(false);
      setPuzzleUnlocked((prev) => ({...prev, ceilingGear: true}));
      setActiveItem(null);
      removeSidebarItem("gear");
    } else {
      setTextActive(true);
    }
  }

  return (
    <div className="scene-container" style={{ backgroundImage: `url(${ceilingImg})` }} ref={sliderRef}>
      <LoadingScreen/>
      <div className="ceiling-gears">
        <img src={ceilingGearsImg} alt="ceiling gears" />
        <div className="gear-slot" 
          style={{backgroundImage: puzzleUnlocked.ceilingGear ? `url(${gearImg})` : 'none'}}
          onClick={activateGear}
        ></div>
        <div className="ceiling-text" style={{display: textActive? "inline" : "none"}}>Missing component</div>
      </div>

      <div className="ceiling-slider" style={{ backgroundImage: `url(${sliderImg})` }}>
        <div
          className="ceiling-thumb"
          style={{
            backgroundImage: `url(${thumbImg})`,
            top: `${movement}px`
          }}
          onMouseDown={(e) => slide(e)}
          ref={thumbRef}
        ></div>
      </div>

      {gears.map((gear, index) => (<CeilingGear key={gear} {...gearsInfo[gear]} movement={movement} location={gear} spritePos={index}/>))}

      <MainDirectionButton direction="down" />
    </div>
  )
}

export default Ceiling
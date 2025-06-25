import "../../css/ceiling.css"
import type React from "react"
import { use, useRef, useState, useEffect } from "react"
//components
import MainDirectionButton from "../mainGame/MainDirectionButton"
import CeilingGear from "../subscenes/CeilingGear"
//images
import ceilingImg from '../../assets/img/scenes/ceiling.png'
import sliderImg from "../../assets/img/subscenes/ceiling/slider.png"
import thumbImg from "../../assets/img/subscenes/ceiling/thumb.png"
import ceilingGearsImg from "../../assets/img/subscenes/ceiling/ceilingGears.png"
import gearImg from "../../assets/img/items/gear.png"
import centerGearImg from "../../assets/img/subscenes/ceiling/centerGear.png"
import centerStarImg from "../../assets/img/subscenes/ceiling/centerStar.png"
import topLeftGearImg from "../../assets/img/subscenes/ceiling/topLeftGear.png"
import topLeftStarImg from "../../assets/img/subscenes/ceiling/topLeftStar.png"
import topCenterGearImg from "../../assets/img/subscenes/ceiling/topCenterGear.png"
import topCenterStarImg from "../../assets/img/subscenes/ceiling/topCenterStar.png"
import centerLeftGearImg from "../../assets/img/subscenes/ceiling/centerLeftGear.png"
import centerLeftStarImg from "../../assets/img/subscenes/ceiling/centerLeftStar.png"
import centerRightGearImg from "../../assets/img/subscenes/ceiling/centerRightGear.png"
import centerRightStarImg from "../../assets/img/subscenes/ceiling/centerRightStar.png"
import bottomLeftGearImg from "../../assets/img/subscenes/ceiling/bottomLeftGear.png"
import bottomLeftStarImg from "../../assets/img/subscenes/ceiling/bottomLeftStar.png"
import bottomCenterGearImg from "../../assets/img/subscenes/ceiling/bottomCenterGear.png"
import bottomCenterStarImg from "../../assets/img/subscenes/ceiling/bottomCenterStar.png"
import bottomRightGearImg from "../../assets/img/subscenes/ceiling/bottomRightGear.png"
import bottomRightStarImg from "../../assets/img/subscenes/ceiling/bottomRightStar.png"

//contexts
import { PuzzleContext } from "../../contexts/PuzzleContext"
import { ActiveItemContext } from "../../contexts/ActiveItemContext"
import { ItemsContext } from "../../contexts/ItemsContext"

type gearRotationProp = {
  [key: string]: {
    gearImg: string,
    starImg: string,
    gearRot: number,
    starRot: number
  }
}

const gearsInfo: gearRotationProp= {
  topLeft: {
    gearImg: topLeftGearImg,
    starImg: topLeftStarImg,
    gearRot: 1.9,
    starRot: -1.6
  },
  topCenter: {
    gearImg: topCenterGearImg,
    starImg: topCenterStarImg,
    gearRot: -1.9,
    starRot: 1.3,
  },
  centerLeft: {
    gearImg: centerLeftGearImg,
    starImg: centerLeftStarImg,
    gearRot: -1.5,
    starRot: 1.2
  },
  center: {
    gearImg: centerGearImg,
    starImg: centerStarImg,
    gearRot: 1,
    starRot: -2
  },
  centerRight: {
    gearImg: centerRightGearImg,
    starImg: centerRightStarImg,
    gearRot: -0.8,
    starRot: 0.9
  },
  bottomLeft: {
    gearImg: bottomLeftGearImg,
    starImg: bottomLeftStarImg,
    gearRot: 1.0,
    starRot: -0.5
  },
  bottomCenter: {
    gearImg: bottomCenterGearImg,
    starImg: bottomCenterStarImg,
    gearRot: -0.8,
    starRot: 0.6
  },
  bottomRight: {
    gearImg: bottomRightGearImg,
    starImg: bottomRightStarImg,
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
  const [load, setLoad] = useState<boolean>(true);

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

  // useEffect(() => {
  //   const loadTimer = setTimeout(() => {
  //     setLoad(false);
  //   }, 300);

  //   return () => clearTimeout(loadTimer);
  // }, [])

  return (
    <div className="scene-container" style={{ backgroundImage: `url(${ceilingImg})` }} ref={sliderRef}>
      {/* <div style={{
        position: "absolute",
        height: '448px',
        width: '698px',
        top: '0px',
        left: '0px',
        backgroundColor: 'white',
        zIndex: "100",
        display: load ? "block" : "none",
      }}></div> */}
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

      {gears.map((gear) => (<CeilingGear key={gear} {...gearsInfo[gear]} movement={movement} location={gear}/>))}

      <MainDirectionButton direction="down" />
    </div>
  )
}

export default Ceiling
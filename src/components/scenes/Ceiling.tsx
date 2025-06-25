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
//contexts
import { PuzzleContext } from "../../contexts/PuzzleContext"
import { ActiveItemContext } from "../../contexts/ActiveItemContext"
import { ItemsContext } from "../../contexts/ItemsContext"



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

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setLoad(false);
    }, 50);

    return () => clearTimeout(loadTimer);
  }, [])

  return (
    <div className="scene-container" style={{ backgroundImage: `url(${ceilingImg})` }} ref={sliderRef}>
      <div style={{
        position: "absolute",
        height: '448px',
        width: '698px',
        top: '0px',
        left: '0px',
        backgroundColor: 'white',
        zIndex: "100",
        display: load ? "block" : "none",
      }}></div>
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

      {gears.map((gear) => (<CeilingGear key={gear} location={gear} rotation={movement}/>))}

      <MainDirectionButton direction="down" />
    </div>
  )
}

export default Ceiling
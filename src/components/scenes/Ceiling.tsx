import MainDirectionButton from "../mainGame/MainDirectionButton"
import ceilingImg from '../../assets/img/scenes/ceiling.png'
import "../../css/ceiling.css"
import sliderImg from "../../assets/img/subscenes/ceiling/slider.png"
import thumbImg from "../../assets/img/subscenes/ceiling/thumb.png"
import type React from "react"
import { useEffect, useRef, useState } from "react"

const Ceiling = () => {
  const [movement, setMovement] = useState<number>(0)
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const slide = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!thumbRef.current || !sliderRef.current) return;

    let shiftY = (e.clientY - thumbRef.current.getBoundingClientRect().top) ;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(e: MouseEvent) {
      if (!thumbRef.current || !sliderRef.current) return;
      
      let newTop = e.clientY - shiftY - (sliderRef.current.getBoundingClientRect().top + 20);
      let topEdge = 0
      let bottomEdge = 100;

      if (newTop < topEdge) newTop = topEdge;
      if (newTop > bottomEdge) newTop = bottomEdge;

      setMovement(newTop);
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }


  }

  // useEffect(() => {
  //   console.log(movement)
  // }, [movement])

  return (
    <div className="scene-container" style={{ backgroundImage: `url(${ceilingImg})` }} ref={sliderRef}>

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



      <MainDirectionButton direction="down" />
    </div>
  )
}

export default Ceiling
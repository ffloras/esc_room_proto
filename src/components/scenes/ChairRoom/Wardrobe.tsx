// import LoadingScreen from "../../mainGame/LoadingScreen"
// import MainDirectionButton from "../../mainGame/MainDirectionButton"
// import wardrobeLockedImg from '../../../assets/img/subscenes/paintingRoom/wardrobeLrgLocked.png'
// import wardrobeUnlockedImg from "../../../assets/img/subscenes/paintingRoom/wardrobeLrgUnlocked.png"
// import wardrobeOpenImg from "../../../assets/img/subscenes/paintingRoom/wardrobeLrgOpen.png"
import wardrobeInsideImg from "../../../assets/img/subscenes/paintingRoom/wardrobeInside.png"
import lightImg from "../../../assets/img/subscenes/paintingRoom/light.png"

import React, { useState, use, useEffect } from "react"
import { PuzzleContext } from "../../../contexts/PuzzleContext"
import { ActiveItemContext } from "../../../contexts/ActiveItemContext"
import { ItemsContext } from "../../../contexts/ItemsContext"
import { delay } from "../../../generalFunctions"

import wardrobeSpritesheet from "../../../assets/img/subscenes/chairRoom/wardrobeSpritesheet340x420.png"

type WardrobeStatesProp = {
  [key: string]: number,
}

const Wardrobe = () => {
  const wardrobeStates: WardrobeStatesProp = {
    locked: 0,
    unlockedClosed: 1,
    open: 2,
  }

  const { puzzleUnlocked, setPuzzleUnlocked } = use(PuzzleContext);

  const [lightX, setLightX] = useState<number | null>(null);
  const [lightY, setLightY] = useState<number | null>(null);

  // const [wardrobeOpen, setWardrobeOpen] = useState<boolean>(false);

  const [wardrobeState, setWardrobeState] = useState<number>(puzzleUnlocked.wardrobe ? wardrobeStates.unlockedClosed : wardrobeStates.locked);
  const [startCompletion, setStartCompletion] = useState<boolean>(false);
  const [text, setText] = useState<boolean>(false);
  // const [imgLoaded, setImgLoaded] = useState<boolean>(false);


  const { activeItem, setActiveItem } = use(ActiveItemContext);
  const { removeSidebarItem } = use(ItemsContext);



  const openWardrobe = () => {
    if (activeItem == "paintingKey" && !puzzleUnlocked.wardrobe) {
      setPuzzleUnlocked((prev) => ({ ...prev, wardrobe: true }));
      setWardrobeState(wardrobeStates.unlockedClosed);
      setActiveItem(null);
      removeSidebarItem("paintingKey");
      return;
    }
    if (wardrobeState == wardrobeStates.unlockedClosed && puzzleUnlocked.wardrobe) {
      setWardrobeState(wardrobeStates.open);
    }
  }

  const closeWardrobe = () => {
    setWardrobeState(wardrobeStates.unlockedClosed);
  }

  const useLight = (e: React.MouseEvent<HTMLDivElement>) => {
    let leftEdge = e.currentTarget.getBoundingClientRect().left;
    let topEdge = e.currentTarget.getBoundingClientRect().top;
    let spotlightSize = 55;
    function onMouseMove(e: MouseEvent) {
      setLightX(e.clientX - leftEdge - spotlightSize / 2);
      setLightY(e.clientY - topEdge - spotlightSize / 2);
    }
    function onMouseLeave() {
      document.removeEventListener('mousemove', onMouseMove);
      setLightX(null);
      setLightY(null);
    }
    document.addEventListener('mousemove', onMouseMove);
    e.currentTarget.addEventListener('mouseleave', onMouseLeave)
  }

  const obtainItem = () => {
    setPuzzleUnlocked((prev) => ({ ...prev, shard1: true }))
    setStartCompletion(true);
  }


  // const loadComplete = (e: React.SyntheticEvent<HTMLImageElement>) => {
  //   if ((e.target as HTMLImageElement).src.includes('wardrobeLrgOpen')) {
  //     setImgLoaded(true);
  //   }
  // }

  const showText = async () => {
    if (activeItem == 'firefly' || text == true) return;
    console.log("hello")
    setText(true);
    await delay(1000);
    setText(false);
  }

  useEffect(() => {
    if (!startCompletion) return;
    const completionTimer = setTimeout(() => {
      setStartCompletion(false);
      setActiveItem("");
      removeSidebarItem("firefly");
    }, 1000);

    return () => clearTimeout(completionTimer);
  }, [startCompletion])


  return (
    <div className="wardrobe-container"
      style={{
        backgroundImage: `url(${wardrobeSpritesheet})`,
        backgroundPosition: `-${wardrobeState * 340}px 0px`
      }}
      onClick={openWardrobe}
    >
      <div className="wardrobe-door-left"
        style={{ display: wardrobeState === wardrobeStates.open ? 'block' : 'none' }}
        onClick={closeWardrobe}
      ></div>
      <div className="wardrobe-door-right"
        style={{ display: wardrobeState === wardrobeStates.open ? 'block' : 'none' }}
        onClick={closeWardrobe}
      ></div>

      {wardrobeState === wardrobeStates.open &&
        <div className="wardrobe-inside-container" onMouseEnter={(e) => useLight(e)} onClick={showText}>
          <div className="wardrobe-inside"
            style={{
              backgroundImage: `url(${wardrobeInsideImg})`,
              maskImage: activeItem == 'firefly' ? `url(${lightImg})` : '',
              WebkitMaskImage: activeItem == 'firefly' ? `url(${lightImg})` : '',
              maskPosition: activeItem == 'firefly' ? `${lightX}px ${lightY}px` : '',
              display: (puzzleUnlocked.shard1 || (activeItem == "firefly" && lightX != null)) ? "block" : "none",
              opacity: startCompletion ? '0' : '1',
            }}></div>

          <div className="wardrobe-dark-text"
            style={{ opacity: text ? 1 : 0 }}
          >Too dark...</div>

          <div className="wardrobe-item"
            style={{
              display: activeItem == "firefly" ? "block" : "none"
            }}
            onClick={obtainItem}
          ></div>
        </div>
      }

    </div>
    // <div className="scene-container">
    //   <LoadingScreen />

    //   {!wardrobeOpen &&
    //     <img src={puzzleUnlocked.wardrobe ? wardrobeUnlockedImg : wardrobeLockedImg} alt="wardrobe closed"
    //       className="wardrobe"
    //       onClick={openWardrobe}
    //     />
    //   }
    //   {wardrobeOpen &&
    //     <>
    //       <img src={wardrobeOpenImg} alt="wardrobe open" className="wardrobe"
    //         onLoad={e => loadComplete(e)}
    //       />
    //       {imgLoaded &&
    //         <div className="wardrobe-container"
    //           onMouseEnter={e => useLight(e)}
    //         >
    //           <div
    //             className="black-screen"
    // style={{
    //   backgroundImage: `url(${wardrobeInsideImg})`,
    //   maskImage: activeItem == 'firefly' ? `url(${lightImg})` : '',
    //   WebkitMaskImage: activeItem == 'firefly' ? `url(${lightImg})` : '',
    //   maskPosition: activeItem == 'firefly' ? `${lightX}px ${lightY}px` : '',
    //   display: (puzzleUnlocked.shard1 || (activeItem == "firefly" && lightX != null)) ? "block" : "none",
    //   opacity: startCompletion ? '0' : '1',
    // }}
    //           ></div>
    // <div className="wardrobe-item"
    //   style={{
    //     display: activeItem == "firefly" ? "block" : "none"
    //   }}
    //   onClick={obtainItem}
    // ></div>
    //         </div>
    //       }
    //     </>
    //   }
    //   <MainDirectionButton direction="down" />
    // </div>

  )
}

export default Wardrobe
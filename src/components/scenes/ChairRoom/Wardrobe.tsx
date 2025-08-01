// import LoadingScreen from "../../mainGame/LoadingScreen"
// import MainDirectionButton from "../../mainGame/MainDirectionButton"
// import wardrobeLockedImg from '../../../assets/img/subscenes/paintingRoom/wardrobeLrgLocked.png'
// import wardrobeUnlockedImg from "../../../assets/img/subscenes/paintingRoom/wardrobeLrgUnlocked.png"
// import wardrobeOpenImg from "../../../assets/img/subscenes/paintingRoom/wardrobeLrgOpen.png"
import wardrobeInsideSpritesheet from '../../../assets/img/subscenes/chairRoom/wardrobeInsideSpritesheet221x280.png'
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

  const wardrobeInsideStates: WardrobeStatesProp = {
    completeBugIronKeyMushroom: 0,
    completeBugMushroom: 1,
    completeBugIronKey: 2,
    completeIronKeyMushroom: 3,
    completeBug: 4,
    completeMushroom: 5,
    completeIronKey: 6,
    complete: 7
  }

  // const wardrobeItemsObtained = {
  //   Bug: false,
  //   ironKey: false,
  //   Mushroom: false,
  // }

  const { puzzleUnlocked, unlockPuzzle} = use(PuzzleContext);

  const [lightX, setLightX] = useState<number | null>(null);
  const [lightY, setLightY] = useState<number | null>(null);

  // const [wardrobeOpen, setWardrobeOpen] = useState<boolean>(false);

  const [wardrobeState, setWardrobeState] = useState<number>(puzzleUnlocked.wardrobe ? wardrobeStates.unlockedClosed : wardrobeStates.locked);
  const [wardrobeInsideState, setWardrobeInsideState] = useState<number>(setWardrobeContent())
  const [startCompletion, setStartCompletion] = useState<boolean>(false);
  const [text, setText] = useState<boolean>(false);
  // const [imgLoaded, setImgLoaded] = useState<boolean>(false);


  const { activeItem, setActiveItem } = use(ActiveItemContext);
  const { addSidebarItem, removeSidebarItem } = use(ItemsContext);

  function setWardrobeContent() {
    let ironKey = puzzleUnlocked.ironKeyWardrobe ? '' : "IronKey";
    let bug = puzzleUnlocked.bugWardrobe ? '' : 'Bug';
    let mushroom = puzzleUnlocked.mushroomWardrobe ? '' : 'Mushroom';
    return wardrobeInsideStates[`complete${bug}${ironKey}${mushroom}`];
  }

  const openWardrobe = () => {
    if (activeItem == "paintingKey" && !puzzleUnlocked.wardrobe) {
      unlockPuzzle("wardrobe");
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

  const obtainItem = (item: string) => {
    if (puzzleUnlocked[`${item}Wardrobe`]) return;
    addSidebarItem(item);
    unlockPuzzle(`${item}Wardrobe`);
  }


  // const loadComplete = (e: React.SyntheticEvent<HTMLImageElement>) => {
  //   if ((e.target as HTMLImageElement).src.includes('wardrobeLrgOpen')) {
  //     setImgLoaded(true);
  //   }
  // }

  const showText = async () => {
    if (activeItem == 'firefly' || text == true) return;
    setText(true);
    await delay(1000);
    setText(false);
  }

  useEffect(() => {
    if (puzzleUnlocked.wardrobeInside) return;
    let newWardrobeContent = setWardrobeContent();
    setWardrobeInsideState(newWardrobeContent);
    if (newWardrobeContent == wardrobeInsideStates.complete) {
      unlockPuzzle("wardrobeInside");
      setStartCompletion(true);
    }
  }, [puzzleUnlocked])

  useEffect(() => {
    if (!startCompletion) return;
    const completionTimer = setTimeout(() => {
      setStartCompletion(false);
      removeSidebarItem("firefly");
      setActiveItem("");
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
              backgroundImage: `url(${wardrobeInsideSpritesheet})`,
              backgroundPosition: `-${wardrobeInsideState * 201.6}px 0px`,
              maskImage: activeItem == 'firefly' ? `url(${lightImg})` : '',
              WebkitMaskImage: activeItem == 'firefly' ? `url(${lightImg})` : '',
              maskPosition: activeItem == 'firefly' ? `${lightX}px ${lightY}px` : '',
              display: (puzzleUnlocked.wardrobeInside === true || (activeItem == "firefly" && lightX != null)) ? "block" : "none",
              opacity: startCompletion ? '0' : '1',
            }}></div>

          <div className="wardrobe-dark-text"
            style={{ opacity: text ? 1 : 0 }}
          >Too dark...</div>

          <div className="wardrobe-key"
            style={{display: activeItem == "firefly" ? "block" : "none"}}
            onClick={() => obtainItem("ironKey")}
          ></div>

          <div className="wardrobe-bug"
            style={{display: activeItem == "firefly" ? "block" : "none"}}
            onClick={() => obtainItem("bug")}
          ></div>

          <div className="wardrobe-mushroom"
            style={{display: activeItem == "firefly" ? "block" : "none"}}
            onClick={() => obtainItem("mushroom")}
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
    //   backgroundImage: `url(${wardrobeInsideSpritesheet})`,
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
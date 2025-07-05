import LoadingScreen from "../../mainGame/LoadingScreen"
import lightImg from "../../../assets/img/subscenes/paintingRoom/light.png"
import wardrobeLockedImg from '../../../assets/img/subscenes/paintingRoom/wardrobeLrgLocked.png'
import wardrobeUnlockedImg from "../../../assets/img/subscenes/paintingRoom/wardrobeLrgUnlocked.png"
import wardrobeOpenImg from "../../../assets/img/subscenes/paintingRoom/wardrobeLrgOpen.png"
import wardrobeInsideImg from "../../../assets/img/subscenes/paintingRoom/wardrobeInside.png"

import MainDirectionButton from "../../mainGame/MainDirectionButton"
import React, { useState, use, useEffect } from "react"
import { PuzzleContext } from "../../../contexts/PuzzleContext"
import { ActiveItemContext } from "../../../contexts/ActiveItemContext"
import { ItemsContext } from "../../../contexts/ItemsContext"

const Wardrobe = () => {
  const [lightX, setLightX] = useState<number | null>(null);
  const [lightY, setLightY] = useState<number | null>(null);
  const [wardrobeOpen, setWardrobeOpen] = useState<boolean>(false);
  const [startCompletion, setStartCompletion] = useState<boolean>(false);
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  const { puzzleUnlocked, setPuzzleUnlocked } = use(PuzzleContext);
  const { activeItem, setActiveItem } = use(ActiveItemContext);
  const { removeSidebarItem } = use(ItemsContext);



  const openWardrobe = () => {
    if (activeItem == "paintingKey" && !puzzleUnlocked.wardrobe) {
      setPuzzleUnlocked((prev) => ({ ...prev, wardrobe: true }));
      setActiveItem(null);
      removeSidebarItem("paintingKey");
      return;
    }
    if (!wardrobeOpen && puzzleUnlocked.wardrobe) {
      setWardrobeOpen(true);
    }
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


  const loadComplete = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if ((e.target as HTMLImageElement).src.includes('wardrobeLrgOpen')) {
      setImgLoaded(true);
    }
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
    <div className="scene-container">
      <LoadingScreen />

      {!wardrobeOpen &&
        <img src={puzzleUnlocked.wardrobe ? wardrobeUnlockedImg : wardrobeLockedImg} alt="wardrobe closed"
          className="wardrobe"
          onClick={openWardrobe}
        />
      }
      {wardrobeOpen &&
        <>
          <img src={wardrobeOpenImg} alt="wardrobe open" className="wardrobe"
            onLoad={e => loadComplete(e)}
          />
          {imgLoaded &&
            <div className="wardrobe-container"
              onMouseEnter={e => useLight(e)}
            >
              <div
                className="black-screen"
                style={{
                  backgroundImage: `url(${wardrobeInsideImg})`,
                  maskImage: activeItem == 'firefly' ? `url(${lightImg})` : '',
                  WebkitMaskImage: activeItem == 'firefly' ? `url(${lightImg})` : '',
                  maskPosition: activeItem == 'firefly' ? `${lightX}px ${lightY}px` : '',
                  display: (puzzleUnlocked.shard1 || (activeItem == "firefly" && lightX != null)) ? "block" : "none",
                  opacity: startCompletion ? '0' : '1',
                }}
              ></div>
              <div className="wardrobe-item"
                style={{
                  display: activeItem == "firefly" ? "block" : "none"
                }}
                onClick={obtainItem}
              ></div>
            </div>
          }
        </>
      }
      <MainDirectionButton direction="down" />
    </div>

  )
}

export default Wardrobe
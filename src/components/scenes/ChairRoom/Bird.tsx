import birdSpritesheet from '../../../assets/img/subscenes/chairRoom/birdSpritesheet74x46-55x50.png'
import { use, useEffect, useState } from 'react'
import { PuzzleContext } from '../../../contexts/PuzzleContext'
import { ActiveItemContext } from '../../../contexts/ActiveItemContext'
import { ItemsContext } from '../../../contexts/ItemsContext'
import { delay } from '../../../generalFunctions'

type imgStatesProp = {
  [key: string]: number;
}

const Bird = () => {
  const birdStates: imgStatesProp = {
    default: 0,
    flapUp: 1,
    seeds: 2,
    acorn: 3,
    mushroom: 4,
    bug: 5,
    flapDown: 6, 
  }

  const messageStates: imgStatesProp= {
    seeds: 0,
    acorn: 1,
    mushroom: 2,
    bug: 3,
    default: 4,
  }


  const {puzzleUnlocked, setPuzzleUnlocked} = use(PuzzleContext);
  const [currentFood, setCurrentFood] = useState<string>(getFoodStatus())
  const [birdState, setBirdState] = useState<string>("default");
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const {activeItem, setActiveItem} = use(ActiveItemContext);
  const {removeSidebarItem} = use(ItemsContext);
  const [isFlying, setIsFlying] = useState<boolean>(false);

  function getFoodStatus() {
    if (!puzzleUnlocked.seedsBird) return "seeds";
    if (!puzzleUnlocked.acornBird) return "acorn";
    if (!puzzleUnlocked.mushroomBird) return "mushroom";
    if (!puzzleUnlocked.bugBird) return "bug";
    else return "default";
  }

  

  const animateBird = async () => {
    const eat = async () => {
      setBirdState(currentFood);
      await delay(700);
      setBirdState("default");
      await delay(500);
    }

    const chirp = async () => {
      if (showMessage) return;
      setBirdState("flapUp");
      setShowMessage(true);
      await delay(500);
      setBirdState("default");
      setShowMessage(false);
    }

    if (activeItem === currentFood) {
      await eat();
      setPuzzleUnlocked((prev) => ({...prev, [`${currentFood}Bird`]: true}));
      removeSidebarItem(currentFood);
      await chirp();
      setActiveItem(null);
    } else {
      chirp();
    }
  }

  useEffect(() => {
    setCurrentFood(getFoodStatus());
    if (puzzleUnlocked.bugBird && !puzzleUnlocked.birdComplete) {
      setIsFlying(true);
    }
  }, [puzzleUnlocked])

  useEffect(() => {
    const fly = async () => {
      for (let i = 0; i < 4; i++) {
        setBirdState("flapUp");
        await delay(300);
        setBirdState("flapDown");
        await delay(300);
      }
      //setIsFlying(false);
      setPuzzleUnlocked((prev) => ({...prev, birdComplete: true}))
    }

    if (isFlying) {
      fly();
    }
  }, [isFlying])

  return (
    <div className={`bird-container ${isFlying ? 'bird-fly' : ''} ${puzzleUnlocked.birdComplete ? 'bird-complete' : ''}`}>
      <div className="bird-bedroom"
        style={{
          backgroundImage: `url(${birdSpritesheet})`,
          backgroundPosition: `-${birdStates[birdState] * 74}px 0px`,
        }}
        onClick={animateBird}
      ></div>
      <div className='food-message' 
        style={{
          backgroundImage: `url(${birdSpritesheet})`,
          backgroundPosition: `-${messageStates[currentFood] * 55}px -46px`,
          opacity: showMessage ? 1 : 0,
        }}
      ></div>
    </div>
  )
}

export default Bird
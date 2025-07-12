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
    chirp: 1,
    seeds: 2,
    berry: 3,
    mushroom: 4,
    bug: 5,
  }

  const messageStates: imgStatesProp= {
    seeds: 0,
    berry: 1,
    mushroom: 2,
    bug: 3,
  }


  const {puzzleUnlocked, setPuzzleUnlocked} = use(PuzzleContext);
  const [currentFood, setCurrentFood] = useState<string>(getFoodStatus())
  const [birdState, setBirdState] = useState<string>("default");
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const {activeItem, setActiveItem} = use(ActiveItemContext);
  const {removeSidebarItem} = use(ItemsContext);

  function getFoodStatus() {
    if (puzzleUnlocked.seedsBird === false) {
      return "seeds";
    } 
    if (!puzzleUnlocked.berryBird) return "berry";
    if (!puzzleUnlocked.mushroomBird) return "mushroom";
    if (!puzzleUnlocked.bugBird) return "bug";
    else return "";
  }

  

  const animateBird = async () => {
    const eat = async () => {
      setBirdState(currentFood);
      await delay(700);
      setBirdState("default");
    }

    const chirp = async () => {
      setBirdState("chirp");
      setShowMessage(true);
      await delay(500);
      setBirdState("default");
      setShowMessage(false);
    }

    if (activeItem === currentFood) {
      eat();
      setPuzzleUnlocked((prev) => ({...prev, [`${currentFood}Bird`]: true}));
      setActiveItem(null);
      removeSidebarItem('seeds')
    } else {
      chirp();
    }
  }

  useEffect(() => {
    setCurrentFood(getFoodStatus());
  }, [puzzleUnlocked])

  return (
    <>
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
    </>
  )
}

export default Bird
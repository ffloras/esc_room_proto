import {useEffect, use, useState} from 'react'
import { PuzzleContext } from '../../contexts/PuzzleContext'
import { ActiveItemContext } from '../../contexts/ActiveItemContext'
import { ItemsContext } from '../../contexts/ItemsContext'
import { TimeContext } from '../../contexts/TimeContext';
import windowSpritesheet from '../../assets/img/subscenes/chairRoom/windowSpritesheet.png'

type windowStatesProp = {
  [key: string] : number;
}

const Window = () => {
  const {puzzleUnlocked, setPuzzleUnlocked} = use(PuzzleContext);
  const {activeItem, setActiveItem} = use(ActiveItemContext);
  const {removeSidebarItem} = use(ItemsContext);
  const [windowState, setWindowState] = useState<number>(0);
  const {moonTime} = use(TimeContext);

  const windowStates: windowStatesProp = {
    boarded: 0,
    fullMoon: 1,
    halfMoon: 2,
    crescentMoon: 3,
    newMoon: 4,
  }

  const removeBoard = () => {
    if (puzzleUnlocked.windowBoard) return;
    if (activeItem == 'crowbar') {
      setPuzzleUnlocked((prev) => ({...prev, windowBoard: true}));
      removeSidebarItem(activeItem);
      setActiveItem(null);
      setWindowState(windowStates[moonTime])
    }
  }

  useEffect(() => {
    puzzleUnlocked.windowBoard ? setWindowState(windowStates[moonTime]) : setWindowState(windowStates.boarded);
  }, [])

  return (
    <div className='window-container'
      onClick={removeBoard}
      style={{
        backgroundImage: `url(${windowSpritesheet})`,
        backgroundPosition: `-${windowState * 251}px 0px`,
      }}
      >
    </div>
  )
}

export default Window
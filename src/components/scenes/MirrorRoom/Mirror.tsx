import { use, useEffect, useState } from 'react';
import { PuzzleContext } from '../../../contexts/PuzzleContext';
import { ActiveItemContext } from '../../../contexts/ActiveItemContext';
import { ItemsContext } from '../../../contexts/ItemsContext';
import "../../../css/mirrorRoom.css";
//images
import mirrorCloseupImg from '../../../assets/img/subscenes/mainRoom/mirrorCloseup.png'
import mirrorFragmentSpritesheet from '../../../assets/img/subscenes/mainRoom/mirrorFragments.png'
import mirrorClothImg from '../../../assets/img/subscenes/mainRoom/mirrorCloth.png'
//components
import LoadingScreen from '../../mainGame/LoadingScreen'
import MainDirectionButton from '../../mainGame/MainDirectionButton'
import { delay } from '../../../generalFunctions';


const Mirror = () => {
  const { puzzleUnlocked, unlockPuzzle } = use(PuzzleContext);
  const { activeItem, setActiveItem } = use(ActiveItemContext);
  const { removeSidebarItem } = use(ItemsContext);
  const [initialCompletion, setInitialCompletion] = useState<boolean>(false);

  const addFragment = () => {
    if (!activeItem || !activeItem.includes('mirrorFragment')) return;
    unlockPuzzle(`${activeItem}`);
    removeSidebarItem(activeItem);
    setActiveItem(null);
  }

  const openDoor = () => {
    unlockPuzzle("door");
  }

  useEffect(() => {
    if (puzzleUnlocked.mirrorComplete) return;
    const startCompletion = async () => {
      setInitialCompletion(true);
      await delay(1500);
      unlockPuzzle("mirrorComplete");
      await delay(500);
      setInitialCompletion(false);
    }

    if (puzzleUnlocked.mirrorFragment1 && puzzleUnlocked.mirrorFragment2 && puzzleUnlocked.mirrorFragment3) {
      startCompletion();
    }
  }, [puzzleUnlocked])

  return (
    <div className='scene-container'>
      <LoadingScreen />
      <img className="mirror-closeup" src={mirrorCloseupImg} alt="mirror closeup" />
      <img className="mirror-cloth" src={mirrorClothImg} alt="mirror cloth" />
      <div className="mirror-clickbox" onClick={() => addFragment()}></div>

      <div className="mirror-surface">
        <div className="mirror-door" style={{
          backgroundImage: `url(${mirrorFragmentSpritesheet})`,
          backgroundPosition: `-${(puzzleUnlocked.door ? 1 : 0) * 250}px -210px`,
          display: puzzleUnlocked.mirrorComplete ? "block" : "none",
        }}
        ></div>
        <div className="mirror-door-clickbox" style={{
            display: puzzleUnlocked.mirrorComplete ? "block" : "none",
          }}
          onClick={openDoor}
        ></div>
        <div className="transition-screen" style={{
          opacity: initialCompletion ? '1' : '0',
        }}></div>
      </div>

      {puzzleUnlocked.mirrorFragment1 && !puzzleUnlocked.mirrorComplete &&
        <div className="mirror-fragment1" style={{ backgroundImage: `url(${mirrorFragmentSpritesheet})` }}></div>
      }
      {puzzleUnlocked.mirrorFragment2 && !puzzleUnlocked.mirrorComplete &&
        <div className="mirror-fragment2" style={{ backgroundImage: `url(${mirrorFragmentSpritesheet})` }}></div>
      }
      {puzzleUnlocked.mirrorFragment3 && !puzzleUnlocked.mirrorComplete &&
        <div className="mirror-fragment3" style={{ backgroundImage: `url(${mirrorFragmentSpritesheet})` }}></div>
      }

      <MainDirectionButton direction='down' />
    </div>

  )
}

export default Mirror
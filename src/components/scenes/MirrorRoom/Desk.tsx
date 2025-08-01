import { useState, use } from 'react';
import deskImg from '../../../assets/img/subscenes/mainRoom/desk.png'
import seedImg from '../../../assets/img/subscenes/mainRoom/seedsDrawer.png'
import deskDrawerSpritesheet from "../../../assets/img/subscenes/mainRoom/deskDrawerSpritesheet123x80.png"
import { PuzzleContext } from '../../../contexts/PuzzleContext';
import { ActiveItemContext } from '../../../contexts/ActiveItemContext';
import { ItemsContext } from '../../../contexts/ItemsContext';
import { delay } from '../../../generalFunctions';
import { SceneContext } from '../../../contexts/SceneContext';


type drawerStatesProp = {
  locked: number;
  unlocked: number;
  topOpen: number;
  bottomOpen: number;
}

type shakeDrawerProp = {
  [key: string]: boolean;
}

const Desk = () => {
  const drawerStates: drawerStatesProp = {
    locked: 0,
    unlocked: 1,
    topOpen: 2,
    bottomOpen: 3,
  }

  const {puzzleUnlocked, unlockPuzzle} =use(PuzzleContext);
  const {activeItem, setActiveItem} = use(ActiveItemContext);
  const {removeSidebarItem, addSidebarItem} = use(ItemsContext);
  const {setCurrentScene, setPrevScene} = use(SceneContext);
  const [topDrawer, setTopDrawer] = useState<number>(puzzleUnlocked.deskDrawerTop ? drawerStates.unlocked : drawerStates.locked);
  const [bottomDrawer, setBottomDrawer] = useState<number>(puzzleUnlocked.deskDrawerBottom ? drawerStates.unlocked : drawerStates.locked);
  const [shakeDrawer, setShakeDrawer] = useState<shakeDrawerProp>({top: false, bottom: false});

  const shake = async (position: string) => {
    if (shakeDrawer[position]) return;
    setShakeDrawer((prev) => ({...prev, [position]: true}));
    await delay(300);
    setShakeDrawer((prev) => ({...prev, [position]: false}));
  }

  const useTopDrawer = async () => {
    if (activeItem == 'brassKey' && topDrawer == drawerStates.locked) {
      setTopDrawer(drawerStates.unlocked);
      unlockPuzzle("deskDrawerTop");
      removeSidebarItem('brassKey');
      setActiveItem(null);
    } else if (topDrawer == drawerStates.locked) {
       shake('top');
    } else if (topDrawer == drawerStates.unlocked) {
      setTopDrawer(drawerStates.topOpen);
    } else if (topDrawer == drawerStates.topOpen) {
      setTopDrawer(drawerStates.unlocked);
    }
  }

  const useBottomDrawer = () => {
    if (activeItem == 'ironKey' && bottomDrawer == drawerStates.locked) {
      setBottomDrawer(drawerStates.unlocked);
      unlockPuzzle("deskDrawerBottom");
      removeSidebarItem('ironKey');
      setActiveItem(null);
    } else if (bottomDrawer == drawerStates.locked) {
       shake('bottom');
    } else if (bottomDrawer == drawerStates.unlocked) {
      setBottomDrawer(drawerStates.bottomOpen);
    } else if (bottomDrawer == drawerStates.bottomOpen) {
      setBottomDrawer(drawerStates.unlocked);
    }
  }

  const changeScene = (nextScene: string) => {
    setCurrentScene(nextScene);
    setPrevScene("main");
  }

  const obtainSeeds = () => {
    addSidebarItem("seeds");
    unlockPuzzle("obtainSeeds");
  }

  return (
    <div className='desk-container'>
      <img src={deskImg} alt="desk" />

      <div className="desk-top-clickbox" onClick={() => changeScene("maze")}></div>

      <div className="desk-top-drawer"
        style={{
          backgroundImage: `url(${deskDrawerSpritesheet})`,
          backgroundPosition: `-${topDrawer * 123}px 0px`,
          height: topDrawer == drawerStates.topOpen ? `80px` : '52px',
          animation: shakeDrawer.top ? 'shake 300ms linear' : "",
        }}
        onClick={() => useTopDrawer()}
      >
      </div>
      <div className="drawer-seed" 
          style={{
            backgroundImage: `url(${seedImg})`,
            display: topDrawer === drawerStates.topOpen && !puzzleUnlocked.obtainSeeds ? "block" : "none",
          }}
          onClick={obtainSeeds}
        ></div>

      <div className="desk-bottom-drawer"
        style={{
          backgroundImage: `url(${deskDrawerSpritesheet})`,
          backgroundPosition: `-${bottomDrawer * 123}px 0px`,
          height: bottomDrawer == drawerStates.bottomOpen ? `80px` : '52px',
          animation: shakeDrawer.bottom ? 'shake 300ms linear' : "",
        }}
        onClick={() => useBottomDrawer()}
      >
        {bottomDrawer == drawerStates.bottomOpen && 
          <div className="completion-paper-clickbox" onClick={() => changeScene('completionPaper')}></div>
        }
      </div>
    </div>
  )
}

export default Desk
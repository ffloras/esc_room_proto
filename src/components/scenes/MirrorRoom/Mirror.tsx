import { use } from 'react';
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


const Mirror = () => {
  const {puzzleUnlocked, setPuzzleUnlocked} = use(PuzzleContext);
  const {activeItem, setActiveItem} = use(ActiveItemContext);
  const {removeSidebarItem} = use(ItemsContext);

  const addFragment = () => {
    if (!activeItem || !activeItem.includes('mirrorFragment')) return;
    setPuzzleUnlocked((prev) => ({...prev, [activeItem]: true}));
    removeSidebarItem(activeItem);
    setActiveItem(null);
  }

  return (
    <div className='scene-container'>
      <LoadingScreen/>
      <img className="mirror-closeup" src={mirrorCloseupImg} alt="mirror closeup" />
      <img className="mirror-cloth" src={mirrorClothImg} alt="mirror cloth" />
      <div className="mirror-clickbox" onClick={() => addFragment()}></div>
      
      {puzzleUnlocked.mirrorFragment1 && 
        <div className="mirror-fragment1" style={{backgroundImage: `url(${mirrorFragmentSpritesheet})`}}></div>
      }
      {puzzleUnlocked.mirrorFragment2 && 
        <div className="mirror-fragment2" style={{backgroundImage: `url(${mirrorFragmentSpritesheet})`}}></div>
      }
      {puzzleUnlocked.mirrorFragment3 && 
        <div className="mirror-fragment3" style={{backgroundImage: `url(${mirrorFragmentSpritesheet})`}}></div>
      }
      
      <MainDirectionButton direction='down'/>
    </div>

  )
}

export default Mirror
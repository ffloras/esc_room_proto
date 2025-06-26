
import MainDirectionButton from '../../mainGame/MainDirectionButton'
import mirrorCloseup from '../../../assets/img/subscenes/mainRoom/mirrorCloseup.png'
import { useState } from 'react'
import "../../../css/mirrorRoom.css"
import LoadingScreen from '../../mainGame/LoadingScreen'

const Mirror = () => {
  const [textActive, setTextActive] = useState({
    player: false,
    ghost: false
  });

  const showPlayerText = () => {
    setTextActive((prev) => ({...prev, player: !prev.player}));
  }

  const showGhostText = () => {
    setTextActive((prev) => ({...prev, ghost: !prev.ghost}));
  }

  return (
    <div className='scene-container'style={{backgroundImage: `url(${mirrorCloseup})`}}>
      <LoadingScreen/>
      {textActive.player && 
        <>
          <span className='text-box'style={{top: '160px', left: '260px'}}>Who am I?</span>
          <span className='text-box'style={{top: '180px', left: '280px'}}>What am I?</span>
        </>
      }
      {textActive.ghost &&
        <>
          <span className='text-box'style={{top: '70px', left: '305px'}}>Who are you?</span>
          <span className='text-box'style={{top: '90px', left: '315px'}}>What are you?</span>
        </>
      }
      <div className='player' onClick={showPlayerText}></div>
      <div className="ghost" onClick={showGhostText}></div>
      
      <MainDirectionButton direction='down'/>
    </div>

  )
}

export default Mirror
import MainDirectionButton from '../../mainGame/MainDirectionButton'
import LoadingScreen from '../../mainGame/LoadingScreen'
import mazeImg from '../../../assets/img/subscenes/mainRoom/maze.png'
import birdPrintImg from '../../../assets/img/subscenes/mainRoom/birdprint.png'
import birdImg from '../../../assets/img/subscenes/mainRoom/birdMaze.png'
import { use } from 'react'
import { PuzzleContext } from '../../../contexts/PuzzleContext'

const Maze = () => {
  const {puzzleUnlocked} = use(PuzzleContext);

  return (
    <div className='scene-container'>
      <LoadingScreen/>
      <img src={mazeImg} alt="maze" className='maze' />
      {puzzleUnlocked.birdComplete && <img src={birdPrintImg} alt='birdprints' className='maze-birdprint'/>}
      {puzzleUnlocked.birdComplete && <img src={birdImg} alt='bird' className='maze-bird'/>}
      <MainDirectionButton direction='down'/>
    </div>
  )
}

export default Maze
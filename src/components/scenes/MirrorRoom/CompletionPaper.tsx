import LoadingScreen from '../../mainGame/LoadingScreen'
import MainDirectionButton from '../../mainGame/MainDirectionButton'
import progressTagImg from "../../../assets/img/subscenes/mainRoom/progressTag.png"
import { playerId } from '../../../db/playerId'
import { use } from 'react'
import { PuzzleContext } from '../../../contexts/PuzzleContext'

const CompletionPaper = () => {
  const {totalPuzzlesCompleted} = use(PuzzleContext);
  const totalPuzzles = 30;

  return (
    <div className='scene-container'>
      <LoadingScreen/>
      <img src={progressTagImg} alt="progress tag" className='progress-tag'/>
      <div className="progress-text">
        SUBJECT #{playerId} 
        <br/> 
        Progress: {Math.round(totalPuzzlesCompleted / totalPuzzles * 100)}%
      </div>
      <MainDirectionButton direction='down'/>
    </div>
  )
}

export default CompletionPaper
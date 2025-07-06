import MainDirectionButton from '../../mainGame/MainDirectionButton'
import moonClueImg from '../../../assets/img/subscenes/mainRoom/moonPaper.png'
import LoadingScreen from '../../mainGame/LoadingScreen'

const MoonClue = () => {
  return (
    <div className='scene-container'>
      <LoadingScreen/>
      <img className="moon-clue" src={moonClueImg} alt="moon clue" />
      <MainDirectionButton direction='down'/>
    </div>
  )
}

export default MoonClue
import MainDirectionButton from '../../mainGame/MainDirectionButton'
import LoadingScreen from '../../mainGame/LoadingScreen'

const Maze = () => {
  return (
    <div className='scene-container'>
      <LoadingScreen/>
      Maze
      <MainDirectionButton direction='down'/>
    </div>
  )
}

export default Maze
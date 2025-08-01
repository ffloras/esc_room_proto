import MainDirectionButton from '../../mainGame/MainDirectionButton'
import bookClueImg from '../../../assets/img/subscenes/chairRoom/bookClue.png'
import LoadingScreen from '../../mainGame/LoadingScreen'

const BookClue = () => {
  return (
    <div className='scene-container'>
      <LoadingScreen/>
      <img src={bookClueImg} alt="Book clue" className='book-clue'/>
      <MainDirectionButton direction='down'/>
    </div>
  )
}

export default BookClue
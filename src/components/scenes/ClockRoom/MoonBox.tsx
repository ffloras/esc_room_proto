import { use, useEffect } from 'react'
import MainDirectionButton from '../../mainGame/MainDirectionButton'
import moonBoxImg from '../../../assets/img/subscenes/clockRoom/moonBoxCloseup.png'
import { PuzzleContext } from '../../../contexts/PuzzleContext'
import CounterBidirection from '../../subscenes/CounterBidirection'
import LoadingScreen from '../../mainGame/LoadingScreen'
import { delay } from '../../../generalFunctions'
import BasicItem from '../../items/BasicItem'

const MoonBox = () => {
  const { puzzleUnlocked, unlockPuzzle, puzzleState} = use(PuzzleContext);
  let counters = [];
  let ans = [1, 2, 5, 6];

  for (let i = 0; i < puzzleState.moonBox.length; i++) {
    counters.push(<CounterBidirection range={10} className={`moonBox-counters moonBox-counter${i}`} position={i} img={null} width={null} puzzle='moonBox' key={i} />)
  }

  useEffect(() => {
    async function solveMoonBox() {
      if (JSON.stringify(puzzleState.moonBox) === JSON.stringify(ans)) {
        await delay(200);
        unlockPuzzle("moonBox");
      }
    }
    solveMoonBox();
  }, [puzzleState.moonBox])

  return (
    <div className='scene-container'>
      <LoadingScreen />
      <div className="moonBox-container" style={{
        backgroundImage: `url(${moonBoxImg})`,
        backgroundPosition: `-${puzzleUnlocked.moonBox ? 395 : 0}px 0px`,
      }}>
        {!puzzleUnlocked.moonBox && counters}
        {puzzleUnlocked.moonBox && <BasicItem name='emerald'/>}
      </div>
      <MainDirectionButton direction='down' />
    </div>
  )
}

export default MoonBox
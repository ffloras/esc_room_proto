import MainDirectionButton from '../../mainGame/MainDirectionButton'
import paintingPuzzleImg from '../../../assets/img/subscenes/mainRoom/paintingPuzzleCloseup.png'
import symbolsSpritesheet from '../../../assets/img/subscenes/mainRoom/paintingSymbolsSpritesheet.png'
import paintingPuzzleOpenImg from '../../../assets/img/subscenes/mainRoom/paintingPuzzleOpenCloseup.png'
import Counter from '../../subscenes/Counter'
import { useState, use, useEffect } from 'react'
import { PuzzleContext } from '../../../contexts/PuzzleContext'
import BasicItem from '../../items/BasicItem'

const PaintingPuzzle = () => {
  const [count, setCount] = useState([0, 0, 0, 0, 0]);
  const{puzzleUnlocked, setPuzzleUnlocked} = use(PuzzleContext);
  const maxSymbolCount = 7;
  const symbols = [];
  const ans = [1,2,3,4,5];

  useEffect(() => {
    if (JSON.stringify(ans) === JSON.stringify(count)) {
      setPuzzleUnlocked((prev) => ({...prev, paintingBox: true}))
    }
  }, [count])

  for (let i = 0; i < count.length; i++) {
    symbols.push(
      <Counter img={symbolsSpritesheet} 
        className={`painting-symbol symbol-${i}`} 
        offsetx={-43} pos={i} max={maxSymbolCount}
        count={count} setCount={setCount}
        key={i}
      />
    )
  }

  return (
    <div className='scene-container'>
      <img src={puzzleUnlocked.paintingBox ? paintingPuzzleOpenImg : paintingPuzzleImg} alt="painting puzzle box" className='painting-box'/>
      {!puzzleUnlocked.paintingBox && symbols}
      {puzzleUnlocked.paintingBox && <BasicItem name='paintingKey'/>}
      
      <MainDirectionButton direction='down'/>
    </div>
  )
}

export default PaintingPuzzle
import { useState, use, useEffect } from 'react'
import { PuzzleContext } from '../../../contexts/PuzzleContext'
//images
import paintingPuzzleImg from '../../../assets/img/subscenes/mainRoom/paintingPuzzleCloseup.png'
import symbolsSpritesheet from '../../../assets/img/subscenes/mainRoom/paintingSymbolsSpritesheet.png'
import paintingPuzzleOpenImg from '../../../assets/img/subscenes/mainRoom/paintingPuzzleOpenCloseup.png'
//components
import Counter from '../../subscenes/Counter'
import MainDirectionButton from '../../mainGame/MainDirectionButton'
import BasicItem from '../../items/BasicItem'
import LoadingScreen from '../../mainGame/LoadingScreen'

const PaintingPuzzle = () => {
  const{puzzleUnlocked, unlockPuzzle, puzzleState} = use(PuzzleContext);
  const [openImgLoaded, setOpenImgLoaded] = useState<boolean>(false);

  const maxSymbolCount = 7;
  const symbols = [];
  const ans = [3, 6, 5, 0, 4];

  //check and set puzzle completion
  useEffect(() => {
    if (JSON.stringify(ans) === JSON.stringify(puzzleState.paintingBox)) {
      unlockPuzzle("paintingBox");
    }
  }, [puzzleState])

  //set up counter components
  for (let i = 0; i < puzzleState.paintingBox.length; i++) {
    symbols.push(
      <Counter img={symbolsSpritesheet} 
        className={`painting-symbol symbol-${i}`} 
        offsetx={-43} pos={i} max={maxSymbolCount}
        key={i} puzzle='paintingBox'
      />
    )
  }

  return (
    <div className='scene-container'>
      <LoadingScreen/>
      <img src={puzzleUnlocked.paintingBox ? paintingPuzzleOpenImg : paintingPuzzleImg} 
        alt="painting puzzle box" 
        className='painting-box'
        onLoad={e => {
          if ((e.target as HTMLImageElement).src.includes('paintingPuzzleOpenCloseup')) {
            setOpenImgLoaded(true);
          }
        }}/>
      {!puzzleUnlocked.paintingBox && symbols}
      {puzzleUnlocked.paintingBox && openImgLoaded && <BasicItem name='paintingKey'/>}
      
      <MainDirectionButton direction='down'/>
    </div>
  )
}

export default PaintingPuzzle
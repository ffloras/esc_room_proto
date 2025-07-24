import { use, type FC } from 'react'
import arrowImg from '../../assets/img/counterArrow.png'
import { PuzzleContext } from '../../contexts/PuzzleContext'

type CounterBidirectionProp = {
  range: number;
  className: string;
  position: number;
  img: string | null;
  puzzle: string;
  width: number | null;
}

const CounterBidirection: FC<CounterBidirectionProp> = ({range, className, position, img, puzzle, width}) => {
  const {puzzleUnlocked, puzzleState, setPuzzleState} = use(PuzzleContext);

  const changeCount = (direction: string) => {
    if (puzzleUnlocked[puzzle]) return;
 
    if (direction == "up") {
      setPuzzleState((prev) => ({...prev, [puzzle]: prev[puzzle].map((num, index) => index === position ? ++num % range : num)}));
    }
    if (direction == "down") {
      setPuzzleState((prev) => ({...prev, [puzzle]: prev[puzzle].map((num, index) => index === position ? (num + range - 1) % range : num)}))
    }
  }

  return (
    <div className={`bidirectional-counter center-col ${className}`}>
      <img src={arrowImg} alt="up arrow" onClick={() => changeCount("up")}/>
      <div className='bi-counter-screen'
        style={{
          backgroundImage: img ? `url(${img})` : undefined,
          backgroundPosition: (img && width) ? `-${width * puzzleState[puzzle][position]}px 0px` : undefined,
          
        }}
      >
        {img ? "" : puzzleState[puzzle][position]}
      </div>
      <img src={arrowImg} alt="down arrow" style={{rotate: '180deg'}} onClick={() => changeCount("down")}/>

    </div>
  )
}

export default CounterBidirection
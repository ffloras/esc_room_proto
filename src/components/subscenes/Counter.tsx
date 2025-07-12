import type { FC } from "react";
import { use } from "react";
import { PuzzleContext } from "../../contexts/PuzzleContext";

type counterProp = {
  img: string;
  className: string;
  offsetx: number;
  pos: number;
  max: number;
  puzzle: string;
}

const Counter: FC<counterProp> = ({img, className, offsetx, pos, max, puzzle}) => {
  const {puzzleUnlocked, puzzleState, setPuzzleState} = use(PuzzleContext);

  const increment = () => {
    if (puzzle && puzzleUnlocked[puzzle]) return;
    setPuzzleState((prev) => ({...prev, [puzzle]: prev[puzzle].map((num, index) => index == pos ? (++num % max) : num)}))
  }

  return (
    <div className={className} 
      style=
        {{
          backgroundImage: `url(${img})`,
          backgroundPosition: `${offsetx * puzzleState[puzzle][pos]}px 0px`,
        }}
      onClick={increment}
    ></div>
  )
}

export default Counter
import type React from "react";
import type { FC } from "react";
import { use } from "react";
import { PuzzleContext } from "../../contexts/PuzzleContext";

type counterProp = {
  img: string;
  className: string;
  offsetx: number;
  count: number[];
  setCount: React.Dispatch<React.SetStateAction<number[]>>;
  pos: number;
  max: number;
  puzzle?: string;
}

const Counter: FC<counterProp> = ({img, className, offsetx, count, setCount, pos, max, puzzle}) => {
  const {puzzleUnlocked} = use(PuzzleContext);

  const increment = () => {
    if (puzzle && puzzleUnlocked[puzzle]) return;
    setCount((prev) => (prev.map((num, index) => index == pos ? (++num % max) : num)))
  }

  return (
    <div className={className} 
      style=
        {{
          backgroundImage: `url(${img})`,
          backgroundPosition: `${offsetx * count[pos]}px 0px`,
        }}
      onClick={increment}
    ></div>
  )
}

export default Counter
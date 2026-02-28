import { useEffect, useState, use } from "react";
import { delay } from "../../../generalFunctions";
import { ItemsContext } from "../../../contexts/ItemsContext";
import { PuzzleContext } from "../../../contexts/PuzzleContext";
import bugSpritesheet from "../../../assets/img/subscenes/paintingRoom/bugMoveSpritesheep24x23.png";

type imgStatesProp = {
  [key: string]: number;
};

type BugMoveProp = {
  rotation: number;
  animation: string;
};

const WallBug = () => {
  const bugStates: imgStatesProp = {
    move1: 0,
    move2: 1,
  };

  const bugMoves: BugMoveProp[] = [
    {
      rotation: 70,
      animation: "bugMove1",
    },
    {
      rotation: -20,
      animation: "bugMove2",
    },
    {
      rotation: 180,
      animation: "bugMove3",
    },
    {
      rotation: -90,
      animation: "bugMove4",
    },
  ];

  const bugMovesLength = bugMoves.length;

  const { puzzleUnlocked, unlockPuzzle } = use(PuzzleContext);
  const { addSidebarItem } = use(ItemsContext);
  const [currentBugState, setcurrentBugState] = useState<number>(
    bugStates.move2,
  );
  const [currentBugMovement, setCurrentBugMovement] = useState<number>(0);

  /* bug leg movememnt */
  useEffect(() => {
    if (puzzleUnlocked.obtainBug) {
      return;
    }

    const interval = setInterval(() => {
      setcurrentBugState((prev) =>
        prev === bugStates.move1 ? bugStates.move2 : bugStates.move1,
      );
    }, 200);

    return () => clearInterval(interval);
  }, []);

  /* bug positional movement */
  useEffect(() => {
    if (puzzleUnlocked.obtainBug) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentBugMovement((prev) => ++prev % bugMovesLength);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const obtainBug = () => {
    if (puzzleUnlocked.obtainBug) {
      return;
    }
    puzzleUnlocked.obtainBug = true;
    addSidebarItem("bug");
  };

  return (
    <div
      className="wall-bug"
      onClick={obtainBug}
      style={{
        backgroundImage: `url(${bugSpritesheet})`,
        backgroundPosition: `-${currentBugState * 30}px 0px`,
        opacity: puzzleUnlocked.obtainBug ? "0" : "1",
        rotate: `${bugMoves[currentBugMovement].rotation}deg`,
        animation: puzzleUnlocked.obtainBug
          ? ""
          : `${bugMoves[currentBugMovement].animation} 2000ms linear`,
      }}
    ></div>
  );
};

export default WallBug;

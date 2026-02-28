import { use, useEffect } from "react";
import MainDirectionButton from "../../mainGame/MainDirectionButton";
import acornBoxSpritesheet from "../../../assets/img/subscenes/paintingRoom/acornBoxSpritesheet373x324.png";
import { PuzzleContext } from "../../../contexts/PuzzleContext";
import CounterBidirection from "../../subscenes/CounterBidirection";
import LoadingScreen from "../../mainGame/LoadingScreen";
import { delay } from "../../../generalFunctions";
import { ItemsContext } from "../../../contexts/ItemsContext";

const AcornBox = () => {
  const { puzzleUnlocked, unlockPuzzle, puzzleState } = use(PuzzleContext);
  const { addSidebarItem } = use(ItemsContext);
  let counters = [];
  let ans = [5, 3, 2, 6];

  for (let i = 0; i < puzzleState.moonBox.length; i++) {
    counters.push(
      <CounterBidirection
        range={10}
        className={`acornBox-counters acornBox-counter${i}`}
        position={i}
        img={null}
        width={null}
        puzzle="acornBox"
        key={i}
      />,
    );
  }

  const obtainAcorn = () => {
    if (puzzleUnlocked.acornBox && !puzzleUnlocked.acornTaken) {
      unlockPuzzle("acornTaken");
      addSidebarItem("acorn");
    }
  };

  useEffect(() => {
    async function solveAcornBox() {
      if (JSON.stringify(puzzleState.acornBox) === JSON.stringify(ans)) {
        await delay(200);
        unlockPuzzle("acornBox");
      }
    }
    solveAcornBox();
  }, [puzzleState.acornBox]);

  return (
    <div className="scene-container">
      <LoadingScreen />
      <div
        className="acornBox-container"
        onClick={obtainAcorn}
        style={{
          backgroundImage: `url(${acornBoxSpritesheet})`,
          backgroundPosition: `-${(Number(puzzleUnlocked.acornBox) + Number(puzzleUnlocked.acornTaken)) * 373}px 0px`,
        }}
      >
        {!puzzleUnlocked.acornBox && counters}
      </div>
      <MainDirectionButton direction="down" />
    </div>
  );
};

export default AcornBox;

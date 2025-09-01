import LoadingScreen from "../../mainGame/LoadingScreen";
import MainDirectionButton from "../../mainGame/MainDirectionButton";
import safeImg from "../../../assets/img/subscenes/clockRoom/safe350x340.png";
import safeLockImg from "../../../assets/img/subscenes/clockRoom/safeLock.png";
import safeNumbersImg from "../../../assets/img/subscenes/clockRoom/safeNumbers30x44.png";
import { use, useEffect } from "react";
import { PuzzleContext } from "../../../contexts/PuzzleContext";
import CounterBidirection from "../../subscenes/CounterBidirection";
import { delay } from "../../../generalFunctions";
import BasicItem from "../../items/BasicItem";

const Safe = () => {
  const { puzzleUnlocked, unlockPuzzle, puzzleState } = use(PuzzleContext);
  const counters = [];
  // const ans = [4, 5, 7];
  const sampleAns = [2, 9, 3];

  for (let i = 0; i < 3; i++) {
    counters.push(
      <CounterBidirection
        range={10}
        className={`safe-counters safe-counter-${i}`}
        position={i}
        puzzle="safeUnlock"
        img={safeNumbersImg}
        width={30}
        key={i}
      />
    );
  }

  useEffect(() => {
    const rotateLock = async () => {
      unlockPuzzle("safeUnlock");
      await delay(1000);
      unlockPuzzle("safeOpen");
    };

    if (JSON.stringify(puzzleState.safeUnlock) == JSON.stringify(sampleAns)) {
      rotateLock();
    }
  }, [puzzleState]);

  return (
    <div className="scene-container">
      <LoadingScreen />
      <div
        className="safe"
        style={{
          backgroundImage: `url(${safeImg})`,
          backgroundPosition: `-${puzzleUnlocked.safeOpen ? 350 : 0}px 0px`,
        }}
      ></div>
      {!puzzleUnlocked.safeOpen && counters}
      {!puzzleUnlocked.safeOpen && (
        <div
          className="safe-lock"
          style={{
            backgroundImage: `url(${safeLockImg})`,
            transform: puzzleUnlocked.safeUnlock
              ? "rotate(-180deg)"
              : "rotate(0deg)",
          }}
        ></div>
      )}
      {puzzleUnlocked.safeOpen && <BasicItem name="mirrorFragment3" />}
      <MainDirectionButton direction="down" />
    </div>
  );
};

export default Safe;

import mushroomJarClosedImg from "../../../assets/img/subscenes/clockRoom/mushroomJarClosed.png";
import mushroomJarOpenImg from "../../../assets/img/subscenes/clockRoom/mushroomJarOpen.png";
import mushroomJarEmptyImg from "../../../assets/img/subscenes/clockRoom/mushroomJarEmpty.png";
import { PuzzleContext } from "../../../contexts/PuzzleContext";
import { ActiveItemContext } from "../../../contexts/ActiveItemContext";
import { ItemsContext } from "../../../contexts/ItemsContext";
import { useState, use } from "react";
import { delay } from "../../../generalFunctions";

type MushroomJarImgsProp = {
  closed: string;
  open: string;
  empty: string;
};

type mushroomJarStatesProp = "closed" | "open" | "empty";

const MushroomJar = () => {
  const { puzzleUnlocked, unlockPuzzle } = use(PuzzleContext);
  const { activeItem } = use(ActiveItemContext);
  const { removeSidebarItem, addSidebarItem } = use(ItemsContext);
  const [jarShake, setJarShake] = useState<boolean>(false);
  const [mushroomJarState, setMushroomJarState] =
    useState<mushroomJarStatesProp>(getMushroomJarState());

  const mushroomJarImgs: MushroomJarImgsProp = {
    closed: mushroomJarClosedImg,
    open: mushroomJarOpenImg,
    empty: mushroomJarEmptyImg,
  };

  function getMushroomJarState(): mushroomJarStatesProp {
    if (puzzleUnlocked.mushroomJarOpen) {
      if (puzzleUnlocked.mushroomJarEmpty) {
        return "empty";
      } else {
        return "open";
      }
    } else {
      return "closed";
    }
  }

  const shake = async () => {
    if (jarShake) {
      return;
    }
    setJarShake(true);
    await delay(500);
    setJarShake(false);
  };

  const interactWithJar = () => {
    if (mushroomJarState == "closed") {
      if (activeItem == "hammer") {
        setMushroomJarState("open");
        unlockPuzzle("mushroomJarOpen");
        removeSidebarItem("hammer");
      } else {
        shake();
      }
    } else if (mushroomJarState == "open") {
      setMushroomJarState("empty");
      unlockPuzzle("mushroomJarEmpty");
      addSidebarItem("mushroom");
    }
  };

  return (
    <div className="mushroom-jar" onClick={interactWithJar}>
      <img
        src={mushroomJarImgs[mushroomJarState]}
        style={{
          animation: jarShake ? "shake 500ms linear" : "",
        }}
      />
    </div>
  );
};

export default MushroomJar;

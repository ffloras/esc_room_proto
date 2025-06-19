import starBoxImg from "../../../assets/img/subscenes/clockRoom/starBoxCloseUp.png"
import MainDirectionButton from '../../mainGame/MainDirectionButton'
import React, { useEffect, useState, use } from "react";
import '../../../css/clockRoom.css'
//puzzle pieces
import topLeft from '../../../assets/img/subscenes/clockRoom/starBoxPieces/topLeft.png'
import topCenter from '../../../assets/img/subscenes/clockRoom/starBoxPieces/topCenter.png'
import centerLeft from '../../../assets/img/subscenes/clockRoom/starBoxPieces/centerLeft.png'
import center from '../../../assets/img/subscenes/clockRoom/starBoxPieces/center.png'
import centerRight from '../../../assets/img/subscenes/clockRoom/starBoxPieces/centerRight.png'
import bottomLeft from '../../../assets/img/subscenes/clockRoom/starBoxPieces/bottomLeft.png'
import bottomCenter from '../../../assets/img/subscenes/clockRoom/starBoxPieces/bottomCenter.png'
import bottomRight from '../../../assets/img/subscenes/clockRoom/starBoxPieces/bottomRight.png'
import { ItemsContext } from "../../../contexts/ItemsContext";
import { PuzzleContext } from "../../../contexts/PuzzleContext";

const ansArray: (string | null)[][] =
  [
    [topLeft, topCenter, null],
    [centerLeft, center, centerRight],
    [bottomLeft, bottomCenter, bottomRight]
  ];

const questArray: (string | null)[][] =
  [
    [center, centerLeft, bottomCenter],
    [topCenter, centerRight, bottomRight],
    [null, bottomLeft, topLeft]
  ];

  const testArray: (string | null)[][] =
  [
    [topLeft, center, topCenter],
    [centerLeft, centerRight, null],
    [bottomLeft, bottomCenter, bottomRight]
  ];

const StarBox = () => {
  const { currentItemsList } = use(ItemsContext);
  const { puzzleUnlocked, setPuzzleUnlocked } = use(PuzzleContext);

  const [puzzleArray, setPuzzleArray] = useState<(string | null)[][]>(puzzleUnlocked.starBox ? ansArray : testArray)

  const swapPieces = (e: React.MouseEvent<HTMLDivElement>) => {
    if (puzzleUnlocked.starBox) return;

    const [i, j] = e.currentTarget.id.split(" ").map((index) => (+index));
    const maxIndex = puzzleArray.length - 1;

    if (!puzzleArray[i][j]) return;

    let current = puzzleArray[i][j];
    let top = puzzleArray[Math.max(0, i - 1)][j];
    let bottom = puzzleArray[Math.min(maxIndex, i + 1)][j];
    let left = puzzleArray[i][Math.max(0, j - 1)];
    let right = puzzleArray[i][Math.min(maxIndex, j + 1)];
    const updatedPuzzle = puzzleArray.map((row) => [...row]);

    if (!top) {
      updatedPuzzle[i - 1][j] = current;
    } else if (!bottom) {
      updatedPuzzle[i + 1][j] = current;
    } else if (!left) {
      updatedPuzzle[i][j - 1] = current;
    } else if (!right) {
      updatedPuzzle[i][j + 1] = current;
    } else {
      return;
    }
    updatedPuzzle[i][j] = null;
    setPuzzleArray(updatedPuzzle);
  }

  useEffect(() => {
    if (puzzleUnlocked.starBox) return;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (puzzleArray[i][j] !== ansArray[i][j]) return;
      }
    } 
    setPuzzleUnlocked((prev) => ({...prev, starBox: true}))
  }, [puzzleArray])

  return (
    <div className='scene-container' style={{ backgroundImage: `url(${starBoxImg})` }}>
      <div className="starBox-container">
        {puzzleArray.map((row, i) => (
          <div className="starBox-row" key={i}>
            {row.map((piece, j) => (
              <div id={`${i} ${j}`}
                className="starBox-piece"
                key={piece}
                style={{ backgroundImage: piece ? `url(${piece})` : 'none' }}
                onClick={(e) => swapPieces(e)}
              >
              </div>
            ))}
          </div>
        ))}
      </div>
      <MainDirectionButton direction='down' />
    </div>
  )
}

export default StarBox
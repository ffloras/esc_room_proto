import React, { useEffect, useState, use } from "react";
import { PuzzleContext } from "../../../contexts/PuzzleContext";
import '../../../css/clockRoom.css'
//images
import starBoxSpritesheet from '../../../assets/img/subscenes/clockRoom/starBoxSpritesheet.png'
import starBoxImg from "../../../assets/img/subscenes/clockRoom/starBoxCloseUp.png"
import starBoxDrawerImg from '../../../assets/img/subscenes/clockRoom/starBoxPieces/starBoxDrawer.png'
//components
import BasicItem from "../../items/BasicItem";
import LoadingScreen from "../../mainGame/LoadingScreen";
import MainDirectionButton from '../../mainGame/MainDirectionButton'

const ansArray: (number | null)[][] =
  [
    [0, 1, null],
    [2, 3, 4],
    [5, 6, 7]
  ];

// const questArray: (number | null)[][] =
//   [
//     [3, 2, 6],
//     [1, 4, 7],
//     [null, 5, 0]
//   ];

  const testArray: (number | null)[][] =
  [
    [0, 3, 1],
    [2, 4, null],
    [5, 6, 7]
  ];

const StarBox = () => {
  const { puzzleUnlocked, setPuzzleUnlocked } = use(PuzzleContext);

  const [puzzleArray, setPuzzleArray] = useState<(number | null)[][]>(puzzleUnlocked.starBox ? ansArray : testArray)

  const swapPieces = (e: React.MouseEvent<HTMLDivElement>) => {
    if (puzzleUnlocked.starBox) return;

    const [i, j] = e.currentTarget.id.split(" ").map((index) => (+index));
    const maxIndex = puzzleArray.length - 1;

    if (puzzleArray[i][j] === null) return;

    let current = puzzleArray[i][j];
    let top = puzzleArray[Math.max(0, i - 1)][j];
    let bottom = puzzleArray[Math.min(maxIndex, i + 1)][j];
    let left = puzzleArray[i][Math.max(0, j - 1)];
    let right = puzzleArray[i][Math.min(maxIndex, j + 1)];
    const updatedPuzzle = puzzleArray.map((row) => [...row]);

    if (top === null) {
      updatedPuzzle[i - 1][j] = current;
    } else if (bottom === null) {
      updatedPuzzle[i + 1][j] = current;
    } else if (left === null) {
      updatedPuzzle[i][j - 1] = current;
    } else if (right === null) {
      updatedPuzzle[i][j + 1] = current;
    } else {
      return;
    }
    updatedPuzzle[i][j] = null;
    setPuzzleArray(updatedPuzzle);
  }

  //checks puzzle completion
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
    <div className='scene-container'>
      <LoadingScreen/>
      <img src={starBoxImg} alt="starBox" className="starBoxImg"/>
      <div className="starBox-container">
        {puzzleArray.map((row, i) => (
          <div className="starBox-row" key={i}>
            {row.map((piece, j) => (
              <div id={`${i} ${j}`}
                className="starBox-piece"
                key={piece}
                style={{ 
                  backgroundImage: piece != null ? `url(${starBoxSpritesheet})` : 'none',
                  backgroundPosition: piece != null ? `-${piece * 100}px 0px` : '',
                }}
                onClick={(e) => swapPieces(e)}
              >
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="starBox-drawer"
        style={{
          top: puzzleUnlocked.starBox? '182px' : '104px'
        }}
      >
        <img src={`${starBoxDrawerImg}`} alt="starbox drawer" />
        <BasicItem name="gear"/>
      </div>
      <MainDirectionButton direction='down' />
    </div>
  )
}

export default StarBox
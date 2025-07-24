import React, { use, useRef, useState } from 'react'
import MainDirectionButton from '../../mainGame/MainDirectionButton'
import crosswordImg from '../../../assets/img/subscenes/clockRoom/crossWordPuzzle.png'
import crosswordPapersVerticalImg from '../../../assets/img/subscenes/clockRoom/crosswordPapersVertical45x255.png'
import { PuzzleContext } from '../../../contexts/PuzzleContext'
import LoadingScreen from '../../mainGame/LoadingScreen'


type crosswordPaperProp = {
  name: string;
  position: number;
  width?: number;
  height?: number;
}

const Crossword = () => {
  const { puzzleUnlocked, puzzleState, setPuzzleState } = use(PuzzleContext);
  const [maxZindex, setMaxZIndex] = useState<number>(2);
  const [zIndex, setZIndex] = useState<{[key: string]: number}>( 
    {
      triton: 1,
      kore: 1,
      thebe: 1,
      phobos: 1,
      despina: 1,
      atlas: 1,
      aegir: 1,
      titania: 1,
      rhea: 1,
      oberon: 1,
    }
  );

  const papersHorizontal: crosswordPaperProp[] = [
    { name: "triton", position: 0, width: 215 },
    { name: "kore", position: 1, width: 150 },
    { name: "thebe", position: 2, width: 182 },
    { name: "phobos", position: 3, width: 218 },
    { name: "despina", position: 4, width: 252 },
    { name: "atlas", position: 5, width: 184 },
    { name: "aegir", position: 6, width: 180 },
  ]

  const papersVertical: crosswordPaperProp[] = [
    { name: 'titania', position: 0, height: 255 },
    { name: "rhea", position: 1, height: 147 },
    { name: 'oberon', position: 2, height: 220 },
  ]

  let sceneContainerRef = useRef<HTMLDivElement>(null);

  const movePaper = (e: React.MouseEvent<HTMLDivElement>, name: string) => {
    e.preventDefault();
    if (!sceneContainerRef.current) return;

    setZIndex((prev) => ({...prev, [name]: maxZindex}));
    setMaxZIndex((prev) => (prev + 1));

    let width = e.currentTarget.offsetWidth;
    let height = e.currentTarget.offsetHeight;
    let offsetX = e.clientX - (e.currentTarget.getBoundingClientRect().left);
    let offsetY = e.clientY - (e.currentTarget.getBoundingClientRect().top);

    let leftBoundary = sceneContainerRef.current.getBoundingClientRect().left;
    let sceneContainerWidth = sceneContainerRef.current.offsetWidth;
    let topBoundary = sceneContainerRef.current.getBoundingClientRect().top;
    let sceneContainerHeight = sceneContainerRef.current.offsetHeight;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(e: MouseEvent) {
      let newX = Math.max(0, e.clientX - offsetX - leftBoundary);
      newX = Math.min(sceneContainerWidth - width, newX);
      let newY = Math.max(0, e.clientY - offsetY - topBoundary);
      newY = Math.min(sceneContainerHeight - height, newY);
      // console.log(newX, newY)
      setPuzzleState((prev) => ({...prev, [name]: [newX, newY]}))
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  }

  return (
    <div className='scene-container' ref={sceneContainerRef} style={{ backgroundImage: `url(${crosswordImg})` }}>
      <LoadingScreen/>
      {papersHorizontal.map((paper) => (puzzleUnlocked[paper.name] &&
        <div key={paper.name} className="crossword-paper crossword-paper-horizontal" style={{
          // backgroundImage: `url(${crosswordPapersHorizontalImg})`,
          backgroundPosition: `0px -${paper.position * 45}px`,
          width: `${paper.width}px`,
          height: "45px",
          left: `${puzzleState[paper.name][0]}px`,
          top: `${puzzleState[paper.name][1]}px`,
          zIndex: zIndex[paper.name],
        }}
          onMouseDown={(e) => movePaper(e, paper.name)}
        ></div>
      ))}
      {papersVertical.map((paper) => (puzzleUnlocked[paper.name] &&
        <div key={paper.name} className="crossword-paper" style={{
          backgroundImage: `url(${crosswordPapersVerticalImg})`,
          backgroundPosition: `-${paper.position * 45}px 0px`,
          width: "45px",
          height: `${paper.height}px`,
          left: `${puzzleState[paper.name][0]}px`,
          top: `${puzzleState[paper.name][1]}px`,
          zIndex: zIndex[paper.name],
        }}
          onMouseDown={(e) => movePaper(e, paper.name)}
        ></div>
      ))}

      <MainDirectionButton direction='down' />

    </div>


  )
}

export default Crossword
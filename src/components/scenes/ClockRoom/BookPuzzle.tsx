import bookImg from '../../../assets/img/subscenes/clockRoom/bookCloseup.png'
import MainDirectionButton from '../../mainGame/MainDirectionButton'
import scissorsPointerImg from '../../../assets/img/subscenes/clockRoom/scissorPointer.png'
import type React from 'react'
import { useState, use, type FC } from 'react'
import { PuzzleContext } from '../../../contexts/PuzzleContext'
import bookPageSpritesheet from '../../../assets/img/subscenes/clockRoom/bookPagesSpritesheet243x300.png'
import resetButtonImg from '../../../assets/img/reset.png'
import LoadingScreen from '../../mainGame/LoadingScreen'
import { ActiveItemContext } from '../../../contexts/ActiveItemContext'

type divProp = {
  top: number;
  left: number;
  width: number;
  height: number;
}

const BookPuzzle: FC<{bookNumber: number}> = ({bookNumber}) => {
  const [newDiv, setNewDiv] = useState<divProp>({ top: 0, left: 0, width: 0, height: 0 })
  const [hoverScissors, setHoverScissors] = useState<boolean>(false);
  const {bookCutouts, setBookCutouts} = use(PuzzleContext);
  const {activeItem} = use(ActiveItemContext);

  const cutPaper = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeItem !== "scissors") return;
    e.preventDefault();
    
    let pageLeftMargin = e.currentTarget.getBoundingClientRect().left;
    let pageTopMargin = e.currentTarget.getBoundingClientRect().top;
    let pageWidth = e.currentTarget.offsetWidth;
    let pageHeight = e.currentTarget.offsetHeight;
    let initialX = e.clientX;
    let initialY = e.clientY;

    let newLeft = 0;
    let newTop = 0;
    let newWidth = 0;
    let newHeight = 0;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(e: MouseEvent) {
      let newX = e.clientX;
      let newY = e.clientY;

      if (newX < pageLeftMargin) return;
      if (newX > pageLeftMargin + pageWidth) return;
      if (newY < pageTopMargin) return;
      if (newY > pageTopMargin + pageHeight) return;

      newLeft = newX > initialX ? initialX - pageLeftMargin : newX - pageLeftMargin;
      newTop = newY > initialY ? initialY - pageTopMargin : newY - pageTopMargin;
      newWidth = Math.abs(newX - initialX);
      newHeight = Math.abs(newY - initialY);

      setNewDiv({left: newLeft, top: newTop, width: newWidth, height: newHeight,});
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      setBookCutouts((prev) => ({...prev, [`book${bookNumber}`]: [...prev[`book${bookNumber}`], {top: newTop, left: newLeft, width: newWidth, height: newHeight}]}))
      setNewDiv({ top: 0, left: 0, width: 0, height: 0 });
    }
  }

  const showScissors = () => {
    if (activeItem !== "scissors") return;
    setHoverScissors(true)
  }

  const hideScissors = () => {
    setHoverScissors(false)
  }

  const resetPage = () => {
    setBookCutouts((prev) => ({...prev, [`book${bookNumber}`]: []}))
  }

  return (
    <div className='scene-container' style={{ backgroundImage: `url(${bookImg})` }}>
      <LoadingScreen/>
      <div className="book-top-page" 
        style={{ 
          backgroundImage: `url(${bookPageSpritesheet})`, 
          cursor: hoverScissors ? `url(${scissorsPointerImg}) 3 2, auto` : 'default',
          backgroundPosition: `-${1 * 243}px -${bookNumber * 300}px`
        }} 
        onMouseDown={cutPaper}
        onMouseEnter={showScissors}
        onMouseLeave={hideScissors}
      >
        <div className="book-cut-section"
          style={{
            top: `${newDiv.top}px`,
            left: `${newDiv.left}px`,
            width: `${newDiv.width}px`,
            height: `${newDiv.height}px`,
            
          }}
        ></div>

        {bookCutouts[`book${bookNumber}`].map((cutOut, index) => (
          <div key={index} className="book-page-cutout" style={{
            top: cutOut.top,
            left: cutOut.left,
            width: cutOut.width,
            height: cutOut.height,
            backgroundImage: `url(${bookPageSpritesheet})`,
            backgroundPosition: `-${cutOut.left}px -${cutOut.top + bookNumber * 300}px`
          }}></div>
        ))}
      </div>

      <div className="book-left-page" 
        style={{
          backgroundImage: `url(${bookPageSpritesheet})`,
          backgroundPosition: `-${2 * 243}px -${bookNumber * 300}px`
        }}
      ></div>

      <img src={resetButtonImg} alt="Reset button" className='book-reset-button' onClick={resetPage}/>
      <MainDirectionButton direction='down' />
    </div>
  )
}

export default BookPuzzle
import MainDirectionButton from '../../mainGame/MainDirectionButton'
import clockBottomImg from '../../../assets/img/subscenes/clockRoom/clockBottom.png'
import LoadingScreen from '../../mainGame/LoadingScreen'
import clockPointerImg from '../../../assets/img/subscenes/clockRoom/clockPointer.png'
import BasicItem from '../../items/BasicItem';
import { use, useEffect, useState } from 'react';
import { PuzzleContext } from '../../../contexts/PuzzleContext';
import resetImg from '../../../assets/img/reset.png'

const ClockBottom = () => {
  const {puzzleUnlocked, setPuzzleUnlocked} = use(PuzzleContext);
  const [showItem, setShowItem] = useState<boolean>(false);
  const [ansPosition, setAnsPosition] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(0);
  const [pointerReturning, setpointerReturning] = useState<boolean>(false);

  const ansKey = [7, 2, 8, 3, 5, 11, 6, 10];
  const ansInitial = [null, null, null, null, null, null, null, null];
  const [ans, setAns] = useState<(number | null)[]>(ansInitial);

  const addToAns = (newAns: number) => {
    setAns((prev) => (prev.map((prevAns, index) => index == ansPosition ? newAns : prevAns)));
    setAnsPosition((prev) => prev + 1);
  }

  const calculateDeg = (mouseX: number, mouseY: number, originX: number, originY: number): number => {
    let shiftX = mouseX - originX;
    let shiftY = originY - mouseY;
    let deg = Math.abs(Math.atan(shiftY / shiftX) * (180 / Math.PI));
    if (shiftX >= 0 && shiftY >= 0) return 90 - deg;
    if (shiftX >= 0 && shiftY < 0) return 90 + deg;
    if (shiftX < 0 && shiftY < 0) return 270 - deg;
    else return 270 + deg;
  }
 
  const rotatePointer = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (pointerReturning) return;
    if (puzzleUnlocked.clockBottom) return;

    let originX = e.currentTarget.getBoundingClientRect().left + e.currentTarget.offsetWidth / 2;
    let originY = e.currentTarget.getBoundingClientRect().top + e.currentTarget.offsetHeight;
    let initialDeg = calculateDeg(e.clientX, e.clientY, originX, originY);
    let offsetDeg = initialDeg > 180 ? (initialDeg - 360) : initialDeg;
    let clockSegment = 0;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(e: MouseEvent) {
      let deg = calculateDeg(e.clientX, e.clientY, originX, originY) - offsetDeg;
      clockSegment = Math.floor(((deg + 15) % 360) / 30)
      setRotation(deg);
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      setpointerReturning(true);
      setRotation((prev) => prev > 180 ? 360 : 0);
      addToAns(clockSegment);
    }
  }

  // useEffect(() => {
  //   console.log(rotation)
  // }, [rotation])

  const reset = () => {
    setAns(ansInitial);
    setAnsPosition(0);
  }

  useEffect(() => {
    if (ansPosition < ans.length) return;
    if (JSON.stringify(ans) === JSON.stringify(ansKey)) {
      setPuzzleUnlocked((prev) => ({...prev, clockBottom: true}));
      const itemTimer = setTimeout(() => {
        setShowItem(true);
      }, 1000);
      return () => clearTimeout(itemTimer);
    } else {
      setAns(ansInitial);
      setAnsPosition(0);
    }
  }, [ansPosition])

  useEffect(() => {
    const pointerTimer = setTimeout(() => {
      setpointerReturning(false);
    }, 1000);

    return () => clearTimeout(pointerTimer);
  }, [pointerReturning])

  // useEffect(() => {
  //   if (JSON.stringify(ans) === JSON.stringify(count)) {
  //     setPuzzleUnlocked((prev) => ({...prev, clockBottom: true}));
  //     const itemTimer = setTimeout(() => {
  //       setShowItem(true);
  //     }, 1000);

  //     return () => clearTimeout(itemTimer);
  //   }
  // }, [count])

  return (
    <div className='scene-container'>
      <LoadingScreen/>


      <img className="clock-star-puzzle not-draggable" src={clockBottomImg} alt="clock star puzzle" 
        style={{zIndex: showItem ? '-2' : '5'}}
      />

      <div className="clock-pointer-container" 
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: pointerReturning ? `transform 1s` : '',
        }}>
        <img className="clock-pointer" src={clockPointerImg} alt="" />
        <div className="clock-pointer-clickbox" onMouseDown={(e) => rotatePointer(e)}></div>
      </div>
      

      <div className="sliding-door-background"></div>
      <div className="clock-reset-button-clickbox" 
        onClick={reset}
      ></div>

      <div className="sliding-door" style={{
        top: puzzleUnlocked.clockBottom ?  '300px' : '355px',
        zIndex: showItem ? '-3' : '2',
      }}>
        {ans.map((ansSegment, index) => (
          <div className="clock-ans-slot" key={index} 
            style={{ 
              left: `${index * 20 + 10}px`,
              backgroundColor: ansSegment == null ? 'white' : 'gray',
            }}
          ></div>
        ))}
        <div className="clock-reset-button" style={{backgroundImage: `url(${resetImg})`}}
        ></div>
      </div>

      <BasicItem name='mirrorFragment1'/>

      <MainDirectionButton direction='down'/>
    </div>
  )
}

export default ClockBottom
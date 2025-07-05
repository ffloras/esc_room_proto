import MainDirectionButton from '../../mainGame/MainDirectionButton'
import clockTopImg from '../../../assets/img/subscenes/clockRoom/clockTop.png'
import hourHandImg from '../../../assets/img/subscenes/clockRoom/hourHand.png'
import minuteHandImg from '../../../assets/img/subscenes/clockRoom/minuteHand.png'
import React, { useEffect, useRef, useState, use } from 'react'
import { TimeContext } from '../../../contexts/TimeContext'
import LoadingScreen from '../../mainGame/LoadingScreen'

const ClockTop = () => {
  const {time, changeTime, changeMoonTime} = use(TimeContext);
  const [hourRotation, setHourRotation] = useState<number>(time.hour * 30);
  const [minuteRotation, setMinuteRotation] = useState<number>(time.minute * 6);
  
  const calculateDeg = (mouseX: number, mouseY: number, originX: number, originY: number): number => {
    let shiftX = mouseX - originX;
    let shiftY = originY - mouseY;
    let deg = Math.abs(Math.atan(shiftY / shiftX) * (180 / Math.PI));
    if (shiftX >= 0 && shiftY >= 0) return 90 - deg;
    if (shiftX >= 0 && shiftY < 0) return 90 + deg;
    if (shiftX < 0 && shiftY < 0) return 270 - deg;
    else return 270 + deg;
  }

  const rotateHand = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    if (!clockOriginRef.current) return;
    let elementID = e.currentTarget.id;

    let originX = clockOriginRef.current.getBoundingClientRect().left + clockOriginRef.current.offsetWidth / 2;
    let originY = clockOriginRef.current.getBoundingClientRect().top + clockOriginRef.current.offsetHeight / 2;
    let initialDeg = calculateDeg(e.clientX, e.clientY, originX, originY);
    let prevRotation = elementID === "minute" ? minuteRotation : hourRotation;
    let offsetDeg = (prevRotation < 90 && initialDeg > 270) ? initialDeg - (360 + prevRotation) : initialDeg - prevRotation;
    let newHour = time.hour;
    let newMin = time.minute;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(e: MouseEvent) {
      let deg = calculateDeg(e.clientX, e.clientY, originX, originY) - offsetDeg;
      newHour = Math.floor(deg / 30);
      newMin = Math.floor(deg / 6);
      if (elementID == 'minute') {
        setMinuteRotation(deg);
      } else {
        setHourRotation(deg);
      }
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      changeTime(elementID == 'hour' ? newHour: newMin, elementID);
    }
  }

  const clockOriginRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("hr: ", time.hour)
    console.log("min: ", time.minute)
    changeMoonTime();
  }, [time])

  return (
    <div className='scene-container'>
      <LoadingScreen/>
      <img className='clock-top not-draggable' src={clockTopImg} alt="clock top" />
      <img className="minute-hand clock-hand" id="minute" src={minuteHandImg} alt="minute hand" onMouseDown={(e) => rotateHand(e)}
        style={{transform: `rotate(${minuteRotation}deg)`}}
      />
      <img className="hour-hand clock-hand" id='hour' src={hourHandImg} alt="hour hand" onMouseDown={(e) => rotateHand(e)}
        style={{transform: `rotate(${hourRotation}deg)`}}
      />
      <div className="clock-hand-origin" ref={clockOriginRef}></div>
      <MainDirectionButton direction='down'/>
    </div>
  )
}

export default ClockTop
import React, { type FC } from 'react'
import arrowImg from '../../assets/img/counterArrow.png'

type CounterBidirectionProp = {
  counterList: string[];
  className: string;
  count: number[];
  setCount: React.Dispatch<React.SetStateAction<number[]>>;
  position: number;
}

const CounterBidirection: FC<CounterBidirectionProp> = ({counterList, className, count, setCount, position}) => {

  const changeCount = (direction: string) => {
    let length = counterList.length;
    if (direction == "up") {
      setCount((prev) => (prev.map((num, index) => index === position ? ++num % length : num)));
    }
    if (direction == "down") {
      setCount((prev) => (prev.map((num, index) => index === position ? (num + length - 1) % length : num)))
    }
  }

  return (
    <div className={`bidirectional-counter center-col ${className}`}>
      <img src={arrowImg} alt="up arrow" onClick={() => changeCount("up")}/>
      <div className='bi-counter-screen'>{counterList[count[position]]}</div>
      <img src={arrowImg} alt="down arrow" style={{rotate: '180deg'}} onClick={() => changeCount("down")}/>

    </div>
  )
}

export default CounterBidirection
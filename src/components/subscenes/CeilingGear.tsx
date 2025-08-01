import { use, type FC } from "react";
import ceilingGearsSpritesheet from '../../assets/img/subscenes/ceiling/ceilingGearsSpritesheet.png'
import { PuzzleContext } from "../../contexts/PuzzleContext";


type ceilingGearProp = {
  gearRot: number;
  starRot: number;
  location: string;
  spritePos: number;
}



const CeilingGear: FC<ceilingGearProp> = ({gearRot, starRot, location, spritePos}) => {
  const {puzzleState} = use(PuzzleContext);

  return (
    <div className={`${location}-gear`}>
        <div className="gear-dimensions"
          style={{
            backgroundImage: `url(${ceilingGearsSpritesheet})`,
            backgroundPosition: `-${spritePos * 160}px -80px`,
            transform:`rotate(${puzzleState.ceilingRotation[0] * gearRot}deg)`,
          }}
        ></div>
        {/* <img src={gearImg} alt={`${location} gear`} 
          style={{
            transform:`rotate(${movement * gearRot}deg)`
          }}
        /> */}
        <div className={`${location}-star star-dimensions`}
          style={{
            backgroundImage: `url(${ceilingGearsSpritesheet})`,
            backgroundPosition: `-${spritePos * 80}px 0px`,
            transform:`rotate(${puzzleState.ceilingRotation[0] * starRot}deg)`,
          }}></div>
        {/* <img src={starImg} alt={`${location} star`}  className={} 
          style={{
            transform:`rotate(${movement * starRot}deg)`
          }}
        /> */}
      </div>
  )
}

export default CeilingGear
import type { FC } from "react";
import centerGearImg from "../../assets/img/subscenes/ceiling/centerGear.png"
import centerStarImg from "../../assets/img/subscenes/ceiling/centerStar.png"
import topLeftGearImg from "../../assets/img/subscenes/ceiling/topLeftGear.png"
import topLeftStarImg from "../../assets/img/subscenes/ceiling/topLeftStar.png"
import topCenterGearImg from "../../assets/img/subscenes/ceiling/topCenterGear.png"
import topCenterStarImg from "../../assets/img/subscenes/ceiling/topCenterStar.png"
import centerLeftGearImg from "../../assets/img/subscenes/ceiling/centerLeftGear.png"
import centerLeftStarImg from "../../assets/img/subscenes/ceiling/centerLeftStar.png"
import centerRightGearImg from "../../assets/img/subscenes/ceiling/centerRightGear.png"
import centerRightStarImg from "../../assets/img/subscenes/ceiling/centerRightStar.png"
import bottomLeftGearImg from "../../assets/img/subscenes/ceiling/bottomLeftGear.png"
import bottomLeftStarImg from "../../assets/img/subscenes/ceiling/bottomLeftStar.png"
import bottomCenterGearImg from "../../assets/img/subscenes/ceiling/bottomCenterGear.png"
import bottomCenterStarImg from "../../assets/img/subscenes/ceiling/bottomCenterStar.png"
import bottomRightGearImg from "../../assets/img/subscenes/ceiling/bottomRightGear.png"
import bottomRightStarImg from "../../assets/img/subscenes/ceiling/bottomRightStar.png"

type ceilingGearProp = {
  location: string;
  rotation: number;
}

type gearRotationProp = {
  [key: string]: {
    gearImg: string,
    starImg: string,
    gearRot: number,
    starRot: number
  }
}

const gears: gearRotationProp= {
  topLeft: {
    gearImg: topLeftGearImg,
    starImg: topLeftStarImg,
    gearRot: 1.9,
    starRot: -1.6
  },
  topCenter: {
    gearImg: topCenterGearImg,
    starImg: topCenterStarImg,
    gearRot: -1.9,
    starRot: 1.3,
  },
  centerLeft: {
    gearImg: centerLeftGearImg,
    starImg: centerLeftStarImg,
    gearRot: -1.5,
    starRot: 1.2
  },
  center: {
    gearImg: centerGearImg,
    starImg: centerStarImg,
    gearRot: 1,
    starRot: -2
  },
  centerRight: {
    gearImg: centerRightGearImg,
    starImg: centerRightStarImg,
    gearRot: -0.8,
    starRot: 0.9
  },
  bottomLeft: {
    gearImg: bottomLeftGearImg,
    starImg: bottomLeftStarImg,
    gearRot: 1.0,
    starRot: -0.5
  },
  bottomCenter: {
    gearImg: bottomCenterGearImg,
    starImg: bottomCenterStarImg,
    gearRot: -0.8,
    starRot: 0.6
  },
  bottomRight: {
    gearImg: bottomRightGearImg,
    starImg: bottomRightStarImg,
    gearRot: 1.8,
    starRot: -2
  },
}

const CeilingGear: FC<ceilingGearProp> = ({location, rotation}) => {
  return (
    <div className={`${location}-gear`}>
        <img src={gears[location].gearImg} alt={`${location} gear`} 
          style={{
            transform:`rotate(${rotation * gears[location].gearRot}deg)`
          }}
        />
        <img src={gears[location].starImg} alt={`${location} star`}  className={`${location}-star`} 
          style={{
            transform:`rotate(${rotation * gears[location].starRot}deg)`
          }}
        />
      </div>
  )
}

export default CeilingGear
import type { FC } from "react";
// import centerGearImg from "../../assets/img/subscenes/ceiling/centerGear.png"
// import centerStarImg from "../../assets/img/subscenes/ceiling/centerStar.png"
// import topLeftGearImg from "../../assets/img/subscenes/ceiling/topLeftGear.png"
// import topLeftStarImg from "../../assets/img/subscenes/ceiling/topLeftStar.png"
// import topCenterGearImg from "../../assets/img/subscenes/ceiling/topCenterGear.png"
// import topCenterStarImg from "../../assets/img/subscenes/ceiling/topCenterStar.png"
// import centerLeftGearImg from "../../assets/img/subscenes/ceiling/centerLeftGear.png"
// import centerLeftStarImg from "../../assets/img/subscenes/ceiling/centerLeftStar.png"
// import centerRightGearImg from "../../assets/img/subscenes/ceiling/centerRightGear.png"
// import centerRightStarImg from "../../assets/img/subscenes/ceiling/centerRightStar.png"
// import bottomLeftGearImg from "../../assets/img/subscenes/ceiling/bottomLeftGear.png"
// import bottomLeftStarImg from "../../assets/img/subscenes/ceiling/bottomLeftStar.png"
// import bottomCenterGearImg from "../../assets/img/subscenes/ceiling/bottomCenterGear.png"
// import bottomCenterStarImg from "../../assets/img/subscenes/ceiling/bottomCenterStar.png"
// import bottomRightGearImg from "../../assets/img/subscenes/ceiling/bottomRightGear.png"
// import bottomRightStarImg from "../../assets/img/subscenes/ceiling/bottomRightStar.png"

type ceilingGearProp = {
  gearImg: string;
  starImg: string;
  gearRot: number;
  starRot: number;
  movement: number;
  location: string;
}



const CeilingGear: FC<ceilingGearProp> = ({gearImg, starImg, gearRot, starRot, movement, location}) => {
  return (
    <div className={`${location}-gear`}>
        <img src={gearImg} alt={`${location} gear`} 
          style={{
            transform:`rotate(${movement * gearRot}deg)`
          }}
        />
        <img src={starImg} alt={`${location} star`}  className={`${location}-star`} 
          style={{
            transform:`rotate(${movement * starRot}deg)`
          }}
        />
      </div>
  )
}

export default CeilingGear
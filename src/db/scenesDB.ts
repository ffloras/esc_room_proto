import type { ComponentType } from "react";
import mirrorImg from "../assets/img/subscenes/mainRoom/mirror.png"
import Mirror from "../components/scenes/MirrorRoom/Mirror";

//Stages
import MirrorRoom from "../components/scenes/MirrorRoom/MirrorRoom";
import CandleRoom from "../components/scenes/CandleRoom";
import ClockRoom from "../components/scenes/ClockRoom";
import ChairRoom from "../components/scenes/ChairRoom";
import StartMenu from "../components/scenes/StartMenu";
import Ceiling from "../components/scenes/Ceiling";


type StagesProp = {
  [key: number]: ScenesProp,
}

type ScenesProp = {
  [key: string] : ComponentType;
}

export const Stages: StagesProp = {
  0: 
  {
    main: MirrorRoom
  },
  1: 
  {
    main: ClockRoom
  },
  2: 
  {
    main: ChairRoom
  },
  3: 
  {
    main: CandleRoom
  },
  4: 
  {
    main: StartMenu
  },
  5: 
  {
    main: Ceiling
  },
};

export type SubsceneProp = {
  name: string;
  img: string;
  imgPrev: string | null,
  top: number;
  left: number;
  shape: string;
  next: ComponentType;
}

export const MirrorRoomSubscenes: SubsceneProp[] = [
  {
    name: "mirror",
    img: mirrorImg,
    imgPrev: null,
    top: 70,
    left: 450,
    shape: "domed",
    next: Mirror,
  },
]
import type { ComponentType } from "react";


//Stages
import MirrorRoom from "../components/scenes/MirrorRoom/MirrorRoom";
import CandleRoom from "../components/scenes/CandleRoom";
import ClockRoom from "../components/scenes/ClockRoom/ClockRoom";
import ChairRoom from "../components/scenes/ChairRoom/ChairRoom";
import StartMenu from "../components/scenes/StartMenu";
import Ceiling from "../components/scenes/Ceiling";

//Mirror Room subscenes
import mirrorImg from "../assets/img/subscenes/mainRoom/mirror.png"
import Mirror from "../components/scenes/MirrorRoom/Mirror";

//Clock Room subscenes
import starBoxImg from '../assets/img/subscenes/clockRoom/starBox.png'
import StarBox from "../components/scenes/ClockRoom/StarBox";

//Chair Room subscenes
import flowerDrawerImg from "../assets/img/subscenes/chairRoom/flowerDrawer.png"
import FlowerDrawer from "../components/scenes/ChairRoom/FlowerDrawer";

type StagesProp = {
  [key: number]: ScenesProp,
}

type ScenesProp = {
  [key: string] : ComponentType;
}

export const Stages: StagesProp = {
  0: 
  {
    main: MirrorRoom,
    mirror: Mirror,
  },
  1: 
  {
    main: ClockRoom,
    starBox: StarBox,
  },
  2: 
  {
    main: ChairRoom,
    flowerDrawer: FlowerDrawer
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
  top: number;
  left: number;
  shape: string;
  next: string;
}

export const MirrorRoomSubscenes: SubsceneProp[] = [
  {
    name: "mirror",
    img: mirrorImg,
    top: 70,
    left: 450,
    shape: "polygon(62% 0, 79% 8%, 100% 19%, 100% 53%, 98% 80%, 92% 100%, 7% 100%, 0 91%, 4% 23%, 26% 9%)",
    next: "mirror",
  },
]

export const ClockRoomSubscenes: SubsceneProp[] = [
  {
    name: "starBox",
    img: starBoxImg,
    top: 250,
    left: 400,
    shape: "polygon(100% 87.38%, 100% 17.83%, 50% 0%, 0% 8.11%, 0% 76.16%, 50% 100%)",
    next: "starBox",
  },
]

export const ChairRoomSubscenes: SubsceneProp[] = [
  {
    name: "flowerDrawer",
    img: flowerDrawerImg,
    top: 230,
    left: 120,
    shape: "",
    next: "flowerDrawer",
  },
]
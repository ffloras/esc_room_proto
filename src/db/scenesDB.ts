import type { ComponentType } from "react";


//Stages
import MirrorRoom from "../components/scenes/MirrorRoom/MirrorRoom";
import PaintingRoom from "../components/scenes/PaintingRoom/PaintingRoom";
import ClockRoom from "../components/scenes/ClockRoom/ClockRoom";
import ChairRoom from "../components/scenes/ChairRoom/ChairRoom";
import StartMenu from "../components/scenes/StartMenu";
import Ceiling from "../components/scenes/Ceiling";

//Mirror Room subscenes
import mirrorImg from "../assets/img/subscenes/mainRoom/mirror.png"
import Mirror from "../components/scenes/MirrorRoom/Mirror";
import paintingPuzzleImg from "../assets/img/subscenes/mainRoom/paintingPuzzle.png"
import PaintingPuzzle from '../components/scenes/MirrorRoom/PaintingPuzzle'

//Clock Room subscenes
import starBoxImg from '../assets/img/subscenes/clockRoom/starBox.png'
import StarBox from "../components/scenes/ClockRoom/StarBox";

//Chair Room subscenes
import flowerDrawerImg from "../assets/img/subscenes/chairRoom/flowerDrawer.png"
import FlowerDrawer from "../components/scenes/ChairRoom/FlowerDrawer";

//Painting Room subscenes
import wardrobeImg from "../assets/img/subscenes/paintingRoom/wardrobeLocked.png"
import Wardrobe from "../components/scenes/PaintingRoom/Wardrobe";
import ClockBottom from "../components/scenes/ClockRoom/ClockBottom";
import ClockTop from "../components/scenes/ClockRoom/ClockTop";

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
    paintingPuzzle: PaintingPuzzle,
  },
  1: 
  {
    main: ClockRoom,
    starBox: StarBox,
    clockBottom: ClockBottom,
    clockTop: ClockTop,
  },
  2: 
  {
    main: ChairRoom,
    flowerDrawer: FlowerDrawer
  },
  3: 
  {
    main: PaintingRoom,
    wardrobe: Wardrobe
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
  {
    name: "paintingPuzzle",
    img: paintingPuzzleImg,
    top: 91,
    left: 100,
    shape: "",
    next: "paintingPuzzle"
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

export const PaintingRoomSubscenes: SubsceneProp[] = [
  {
    name: "wardrobe",
    img: wardrobeImg,
    top: 125,
    left: 500,
    shape: "",
    next: 'wardrobe'
  },
]
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
import moonClueImg from '../assets/img/subscenes/mainRoom/moonPaperSm.png'
import MoonClue from "../components/scenes/MirrorRoom/MoonClue";

//Clock Room subscenes
import starBoxImg from '../assets/img/subscenes/clockRoom/starBox.png'
import StarBox from "../components/scenes/ClockRoom/StarBox";

//Chair Room subscenes
import flowerDrawerImg from "../assets/img/subscenes/chairRoom/flowerDrawer.png"
import Wardrobe from "../components/scenes/ChairRoom/Wardrobe";

//Painting Room subscenes
//import wardrobeImg from "../assets/img/subscenes/paintingRoom/wardrobeLocked.png"
import ClockBottom from "../components/scenes/ClockRoom/ClockBottom";
import ClockTop from "../components/scenes/ClockRoom/ClockTop";
import FlowerDrawer from "../components/scenes/PaintingRoom/FlowerDrawer";

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
    moonClue: MoonClue,
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
    wardrobe: Wardrobe,
  },
  3: 
  {
    main: PaintingRoom,
    flowerDrawer: FlowerDrawer,
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
  top?: number;
  left?: number;
  shape?: string;
  next: string;
  zindex?: number;
  className?: string;
}

export const MirrorRoomSubscenes: SubsceneProp[] = [
  {
    name: "mirror",
    img: mirrorImg,
    top: 73,
    left: 410,
    shape: "",
    next: "mirror",
  },
  {
    name: "paintingPuzzle",
    img: paintingPuzzleImg,
    top: 56,
    left: 80,
    shape: "",
    next: "paintingPuzzle"
  },
  {
    name: "moonClue",
    img: moonClueImg,
    next: "moonClue",
    className: "moon-clue-sm"
  }
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
  // {
  //   name: "wardrobe",
  //   img: wardrobeImg,
  //   top: 25,
  //   left: 10,
  //   shape: "",
  //   next: 'wardrobe',
  //   zindex: 10,
  // },
]

export const PaintingRoomSubscenes: SubsceneProp[] = [
  {
    name: "flowerDrawer",
    img: flowerDrawerImg,
    top: 220,
    left: 520,
    shape: "",
    next: "flowerDrawer",
  },
]
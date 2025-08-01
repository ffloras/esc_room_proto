import gearImg from "../assets/img/items/gear.png"
import flowerPotionInDrawerImg from "../assets/img/subscenes/chairRoom/flowerDrawerPotionBottom.png"
import agPotionImg from "../assets/img/items/flowerAgUnselected.png"
import coPotionImg from "../assets/img/items/flowerCoUnselected.png"
import fireflyImg from "../assets/img/items/firefly.png"
import paintingKeyImg from "../assets/img/items/key.png"
import mirrorFragment1 from "../assets/img/items/mirrorPiece1.png"
import mirrorFragment2 from '../assets/img/items/mirrorPieceSafe.png'
import crowbarImg from '../assets/img/items/crowbar.png'
import brassKeyImg from '../assets/img/items/brassKey.png'
import ironKeyImg from '../assets/img/items/progressKey.png'
import seedImg from '../assets/img/items/seedsItem.png'
import mushroomImg from '../assets/img/items/mushroom.png'
import bugImg from '../assets/img/items/beetle.png'
import emeraldImg from '../assets/img/items/emerald.png'
import sapphireImg from '../assets/img/items/sapphire.png'
import scissorsImg from '../assets/img/items/scissors.png'
import hammerImg from '../assets/img/items/hammer.png'
import acornImg from '../assets/img/items/acorn.png'

  

export const ItemsContainer = {
  height: 70,
  gap: 12,
  border: 1,
}

export type ItemsProp = {
  [key: string]: ItemProp
}

export type ItemProp = {
  name: string;
  img: string;
  isObtained: boolean;
  top?: number;
  left?: number;
  shape?: string;
  scale?: number;
  zindex?: number;
  className?: string;
}

export const Items: ItemsProp = {
  agPotion: {
    name: "Ag Potion",
    img: agPotionImg,
    isObtained: false,
    top: 46,
    left: 190,
    shape: "ag-potion xs"
  },
  coPotion: {
    name: "Co Potion",
    img: coPotionImg,
    isObtained: false,
    top: 37,
    left: 235,
    shape: "circle sm"
  },
  gear: {
    name: "gear",
    img: gearImg,
    isObtained: false,
    top: 115,
    left: 220,
    shape: "circle"
  },
  flowerPotionInDrawer: {
    name: "flowerPotionInDrawer",
    img: flowerPotionInDrawerImg,
    isObtained: false,
  },
  firefly: {
    name: "firefly",
    img: fireflyImg,
    top: -7,
    left: 45,
    shape: "circle",
    isObtained: false,
  },
  paintingKey: {
    name: "key",
    img: paintingKeyImg,
    top: 200,
    left: 290,
    shape: "",
    isObtained: false,
  },
  crowbar: {
    name: "Crowbar",
    img: crowbarImg,
    top: 315,
    left: 150,
    shape: '',
    zindex: 10,
    isObtained: false,
  },
  mirrorFragment1: {
    name: "Mirror Fragment",
    img: mirrorFragment1,
    top: 359,
    left: 300,
    shape: "",
    isObtained: false,
    zindex: 0,
  },
  mirrorFragment3: {
    name: "Mirror Piece",
    img: mirrorFragment2,
    isObtained: false,
    className: "mirror-fragment-2"
  },
  brassKey: {
    name: "Brass Key",
    img: brassKeyImg,
    isObtained: false,
    className: "brass-key",
  },
  ironKey: {
    name: "Iron key",
    img: ironKeyImg,
    isObtained: false,
  },
  mushroom: {
    name: "mushroom",
    img: mushroomImg,
    isObtained: false,
  },
  bug: {
    name: "bug",
    img: bugImg,
    isObtained: false,
  },
  seeds: {
    name: "seeds",
    img: seedImg,
    isObtained: false,
  },
  acorn: {
    name: "Acorn",
    img: acornImg,
    isObtained: false,
    className: "wall-acorn"
  },
  emerald: {
    name: "Emerald",
    img: emeraldImg,
    isObtained: false,
    className: "emerald-moonBox"
  },
  sapphire: {
    name: "Sapphire",
    img: sapphireImg,
    isObtained: false,
    className: "sapphire-sunbox"
  },
  scissors: {
    name: "Scissors",
    img: scissorsImg,
    isObtained: false,
    className: "scissors"
  },
  hammer: {
    name: "Hammer",
    img: hammerImg,
    isObtained: false,
    className: "hammer",
  }

}

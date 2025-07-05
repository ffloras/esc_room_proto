import gearImg from "../assets/img/items/gear.png"
import flowerPotionInDrawerImg from "../assets/img/subscenes/chairRoom/flowerDrawerPotionBottom.png"
import agPotionImg from "../assets/img/items/flowerAgUnselected.png"
import coPotionImg from "../assets/img/items/flowerCoUnselected.png"
import fireflyImg from "../assets/img/items/firefly.png"
import paintingKeyImg from "../assets/img/items/key.png"
import mirrorFragment1 from "../assets/img/items/mirrorPiece1.png"
import crowbarImg from '../assets/img/items/crowbar.png'

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
  zindex?: string;
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
    top: 310,
    left: 323,
    shape: '',
    isObtained: false,
  },
  mirrorFragment1: {
    name: "Mirror Fragment",
    img: mirrorFragment1,
    top: 359,
    left: 300,
    shape: "",
    isObtained: false,
    zindex: '0',
  }

}

import gearImg from "../assets/img/items/gear.png"
import flowerPotionInDrawerImg from "../assets/img/subscenes/chairRoom/flowerDrawerPotionBottom.png"
import agPotionImg from "../assets/img/items/flowerAgUnselected.png"
import coPotionImg from "../assets/img/items/flowerCoUnselected.png"
import fireflyImg from "../assets/img/items/firefly.png"
import paintingKeyImg from "../assets/img/items/key.png"

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
}

export const Items: ItemsProp = {
  agPotion: {
    name: "Ag Potion",
    img: agPotionImg,
    isObtained: false,
    top: 81,
    left: 200,
    shape: "ag-potion xs"
  },
  coPotion: {
    name: "Co Potion",
    img: coPotionImg,
    isObtained: false,
    top: 71,
    left: 250,
    shape: "circle sm"
  },
  gear: {
    name: "gear",
    img: gearImg,
    isObtained: false,
    top: 120,
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
  }

}

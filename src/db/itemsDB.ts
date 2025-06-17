import testImg from "../assets/img/items/item.png"

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
  top: number;
  left: number;
  shape: string;
}

export const Items: ItemsProp = {
  test: {
    name: "test",
    img: testImg,
    isObtained: false,
    top: 200,
    left: 200,
    shape: "circle"
  },
  test2: {
    name: "test2",
    img: testImg,
    isObtained: false,
    top: 100,
    left: 250,
    shape: "circle"
  },
}

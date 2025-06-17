import { createContext, useState, type FC, type ReactNode } from "react";
import { type ItemsProp, Items } from "../db/itemsDB";

type AllItemsContextProp = {
  items: ItemsProp;
  setItemObtained: (name: string, status: boolean) => void;
}

export const AllItemsContext = createContext<AllItemsContextProp>({
  items: {},
  setItemObtained: () => {},
})

type AllItemsProviderProp = {
  children: ReactNode;
}

export const AllItemsProvider: FC<AllItemsProviderProp> = ({children}) => {
  const [items, setItems] = useState<ItemsProp>(Items);

  const setItemObtained = (name: string, status: boolean) => {
    setItems((items) => ({
      ...items,
      [name]: {
        ...items[name],
        isObtained: status
      }
    }))
  }

  return(
    <AllItemsContext.Provider value={{items, setItemObtained}}>
      {children}
    </AllItemsContext.Provider>
  )
}
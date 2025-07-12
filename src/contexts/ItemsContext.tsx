import React, { createContext, useState, type ReactNode, type FC} from "react";
import { Items, ItemsContainer } from "../db/itemsDB"

export type CurrentItemProp = {
  name: string;
  img: string;
}

type ItemsContextProp = {
  currentItemsList: (CurrentItemProp | null)[];
  addSidebarItem: (name: string) => void;
  containerMargin: number;
  setContainerMargin: React.Dispatch<React.SetStateAction<number>>;
  removeSidebarItem: (name: string) => void;
}

export const ItemsContext = createContext<ItemsContextProp>({
  currentItemsList: [null],
  addSidebarItem: () => { },
  containerMargin: 0,
  setContainerMargin: () => {},
  removeSidebarItem: () => {},
})

type ItemsProviderType = { 
  children: ReactNode
}

export const ItemsProvider: FC<ItemsProviderType> = ({ children }) => {

  const [currentItemsList, setCurrentItemsList] = useState<(CurrentItemProp | null)[]>([null, null, null, null, null,])
  const [containerMargin, setContainerMargin] = useState<number>(0);

  const itemHeight = ItemsContainer.height + ItemsContainer.gap + ItemsContainer.border * 2;
  const maxVisibleItems = 5;

  const addSidebarItem = (name: string) => {
    const item = {
      name: name,
      img: Items[name].img
    }
    for (let i = 0; i < currentItemsList.length; i++) {
      if (!currentItemsList[i]) {
        setCurrentItemsList((prev) => {
          let updated = [...prev];
          updated[i] = item;
          return updated;
        });
        return;
      }
    }
    setCurrentItemsList((prev) => [...prev, item])

    let containerHeight = (currentItemsList.length + 1) * itemHeight;
    let lowerLimit = -(containerHeight - maxVisibleItems * itemHeight);
    setContainerMargin(lowerLimit)
  }

  const removeSidebarItem = (name: string) => {
    if (currentItemsList.length <= 5) {
      setCurrentItemsList((prev) => [...(prev.filter((item) => item?.name != name)), null])
    } else {
      setCurrentItemsList((prev) => (prev.filter((item) => item?.name != name)))
      if (containerMargin < 0) {
        setContainerMargin((prev) => (prev + itemHeight))
      }
    }
  }

  // useEffect(() => {
    
  // }, [currentItemsList])


  return (
    <ItemsContext.Provider value={
      { 
        currentItemsList, 
        addSidebarItem,
        removeSidebarItem,
        containerMargin, 
        setContainerMargin,
      }
    }>
      {children}
    </ItemsContext.Provider>
  )
}
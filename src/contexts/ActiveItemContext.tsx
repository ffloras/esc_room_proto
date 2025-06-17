import React, { useState, createContext, type ReactNode, type FC } from "react";

type ActiveItemContextProp = {
  activeItem: string | null;
  setActiveItem: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ActiveItemContext = createContext<ActiveItemContextProp>({
  activeItem: "",
  setActiveItem: () => {}
})

type ActiveItemProviderProp = {
  children: ReactNode;
}

export const ActiveItemProvider: FC<ActiveItemProviderProp> = ({children}) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <ActiveItemContext.Provider value={{activeItem, setActiveItem}}>
      {children}
    </ActiveItemContext.Provider>
  )
}
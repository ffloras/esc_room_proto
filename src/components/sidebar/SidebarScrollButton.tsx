import React, { use, useEffect, useState } from 'react'
import directionArrow from "../../assets/img/directionArrow.png"
import { ItemsContainer } from '../../db/itemsDB'
import { ItemsContext } from '../../contexts/ItemsContext'

type SidebarScrollButtonProps = {
  containerHeight: number;
  direction: "up" | "down";
}

const SidebarScrollButton: React.FC<SidebarScrollButtonProps> = ({containerHeight, direction}) => {
  const {containerMargin, setContainerMargin} = use(ItemsContext);
  const [buttonVisibility, setButtonVisibilty] = useState<"visible" | "hidden">("hidden");

  const maxVisibleItems = 5;
  const itemHeight = ItemsContainer.height + ItemsContainer.gap + ItemsContainer.border * 2;
  let upperLimit = 0;
  let lowerLimit = -(containerHeight - maxVisibleItems * itemHeight);
  
  //scrolls one item container's length for every button click by changing sidebar container margins
  function scroll(direction: string) {
    if (direction == "up") {
      setContainerMargin((prev) => (Math.min(upperLimit, prev + itemHeight)));
    }
    if (direction == "down") {
      setContainerMargin((prev) => (Math.max(lowerLimit, prev - itemHeight)));
    } 
  }

  //sets visibility of button when scroll end is reached
  useEffect(() => {
    if (direction == 'up') {
      containerMargin >= upperLimit ? setButtonVisibilty("hidden") : setButtonVisibilty("visible");
    }
    if (direction == 'down') {
      containerMargin <= lowerLimit ? setButtonVisibilty("hidden") : setButtonVisibilty("visible");
    }
  }, [containerMargin])

  return (
    <>
      <img 
        className={`sidebar-arrow sidebar-${direction}-arrow`} 
        src={directionArrow} 
        alt="sidebar up arrow" 
        onClick={() => scroll(direction)}
        style={{visibility: buttonVisibility}}
      />
    </>
  )
}

export default SidebarScrollButton
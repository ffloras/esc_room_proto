import { use, type FC } from "react";
import { ItemsContext} from "../../contexts/ItemsContext";
import { AllItemsContext } from "../../contexts/AllItemsContext";

type BasicItemProp = {
  name: string;
}

const BasicItem: FC<BasicItemProp> = ({name}) => {
  const {addSidebarItem} = use(ItemsContext);
  const {items, setItemObtained} = use(AllItemsContext);

  const obtainItem = () =>{
    addSidebarItem(name);
    setItemObtained(name, true);
  }

  const {img, top, left, shape, isObtained, className} = items[name];

  return (
    <>
      <img 
        className={`${shape} ${className}`}
        src={img} alt={name}
        style={{
          position: "absolute",
          top: `${top}px`,
          left: `${left}px`,
          display: isObtained ? "none" : "inline",
        }}
        onClick={obtainItem}
      />
    </>
  )
}

export default BasicItem
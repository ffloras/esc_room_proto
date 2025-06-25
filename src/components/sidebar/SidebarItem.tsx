//import "../../css/sidebar.css"
import { use } from "react";
import { AllItemsContext } from "../../contexts/AllItemsContext";
import { ActiveItemContext } from "../../contexts/ActiveItemContext";;

const SidebarItem = ({name}: {name: string | null}) => {
  const {items} = use(AllItemsContext);
  const {activeItem, setActiveItem} = use(ActiveItemContext);

  const selectItem = () => {
    if (activeItem == name) {
      setActiveItem(null);
    } else if (name) {
      setActiveItem(name);
    }
  }

  return (
    <div
      className="sidebar-item-container center-col"
      style={{ backgroundColor: activeItem && activeItem == name ? "gray" : "white"}}
      onClick={selectItem}
    >
      {name? <><img src={items[name].img} alt={name} width='auto' height='50px'/><div>{items[name].name}</div></> : <></> }
    </div>
  )
}

export default SidebarItem
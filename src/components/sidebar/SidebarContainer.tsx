import "../../css/sidebar.css"
import { use} from "react"
import { ItemsContext, type CurrentItemProp, } from "../../contexts/ItemsContext";
import SidebarScrollButton from "./SidebarScrollButton";
import { ItemsContainer } from "../../db/itemsDB";
import SidebarItem from "./SidebarItem";


const SidebarContainer = () => {
  const {currentItemsList, containerMargin} = use(ItemsContext);

  let itemHeight = ItemsContainer.height + ItemsContainer.gap + ItemsContainer.border * 2;
  let containerHeight = currentItemsList.length * itemHeight;

  let sidebarList = currentItemsList.map((item: CurrentItemProp | null, index: number) => (
    <SidebarItem name={item ? item.name : null} key={index} />
  ))

  
  // useEffect(() => {
    
  // }, [containerMargin])

//   useEffect(() => {


//   return () => {
//     console.log("margin: ",containerMargin);
//     console.log("height: ", containerHeight);
//   };
// }, [currentItemsList]);

  return (
    <div className="sidebar-main-container center-col">
      <SidebarScrollButton direction="up"/>
      
      <div className="sidebar-outer-container center-col">
        <div className='sidebar-inner-container' style={{ height: `${containerHeight}px`, marginTop: `${containerMargin}px` }}>
          {sidebarList}
        </div>
      </div>

      <SidebarScrollButton direction="down"/>
    </div>
  )
}

export default SidebarContainer


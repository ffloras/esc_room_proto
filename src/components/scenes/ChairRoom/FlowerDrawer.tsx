import { useState, use, useEffect } from 'react'
import "../../../css/chairRoom.css"
import MainDirectionButton from '../../mainGame/MainDirectionButton'
//contexts
import { PuzzleContext } from '../../../contexts/PuzzleContext'
import { ActiveItemContext } from '../../../contexts/ActiveItemContext'
import { ItemsContext } from '../../../contexts/ItemsContext'
//images 
import flowerDrawerClosedImg from '../../../assets/img/subscenes/chairRoom/flowerDrawerCloseup.png'
import floweDrawerTopOpenedImg from '../../../assets/img/subscenes/chairRoom/flowerDrawerOpenTop.png'
import flowerDrawerBottomOpenedImg from '../../../assets/img/subscenes/chairRoom/flowerDrawerOpenBottom.png'
import flowerPotionInDrawer from '../../../assets/img/subscenes/chairRoom/flowerDrawerPotionBottom.png'
import flowerPaperImg from '../../../assets/img/subscenes/chairRoom/flowerPaper.png'
import coPotionSelectedImg from '../../../assets/img/items/flowerCoSelected.png'
import coPotionUnselectedImg from '../../../assets/img/items/flowerCoUnselected.png'
import niPotionSelectedImg from '../../../assets/img/items/flowerNiSelected.png'
import niPotionUnselectedImg from '../../../assets/img/items/flowerNiUnselected.png'
import agPotionSelectedImg from '../../../assets/img/items/flowerAgSelected.png'
import agPotionUnselectedImg from '../../../assets/img/items/flowerAgUnselected.png'
import flowerClosedImg from '../../../assets/img/subscenes/chairRoom/flowerClosed.png'
import flowerOpenImg from '../../../assets/img/subscenes/chairRoom/flowerOpen.png'
import BasicItem from '../../items/BasicItem'



type drawerStatesProp = {
  [key: string]: string;
}

type potionsProp = {
  [key: string]: boolean;
}

type flowerColorProp = {
  wheel: string;
  color: number;
}

type flowerColorsProp = {
  [key: string] : {
    [key: number] : string;
  }
}

const flowerColors: flowerColorsProp = {
  co: 
  {
    1: '#ffffff',
    2: '#41FE02',
    3: '#0AA80F',
    4: '#11DCFF',
    5: '#3834FF',
    6: '#8400fd',
  },
  ag: 
  {
    1: '#aaaaaa',
    2: '#FE9A0D',
    3: '#FC0E0E',
    4: '#935A14',
    5: '#FCFC0E',
    6: '#ffffff'
  }
}

const FlowerDrawer = () => {
  const drawerStates: drawerStatesProp = {
    closed: flowerDrawerClosedImg,
    topOpened: floweDrawerTopOpenedImg,
    bottomOpened: flowerDrawerBottomOpenedImg,
  }

  const [drawerState, setDrawerState] = useState<string>("closed");
  const [paperVisible, setPaperVisible] = useState<boolean>(false);
  const [potionsSelected, setPotionsSelected] = useState<string>("")
  const [flowerColor, setFlowerColor] = useState<flowerColorProp>({wheel: 'co', color: 1})

  const {activeItem, setActiveItem} = use(ActiveItemContext);
  const {puzzleUnlocked, setPuzzleUnlocked} = use(PuzzleContext)
  const {removeSidebarItem} = use(ItemsContext);
  

  const useDrawer = (drawerState: string) => {
    setDrawerState(drawerState);
  }

  const unlockPotion = (potion: string | null) => {
    if (!(potion == 'agPotion' || potion == 'coPotion' || potion == 'niPotion')) return;
    setPuzzleUnlocked((prev) => ({...prev, [potion]: true}));
    if (potion === activeItem) {
      setActiveItem("");
      removeSidebarItem(potion);
    }
  }

  const selectPotion = (potion: string) => {
    if (puzzleUnlocked.flower) return;
    if (potionsSelected === potion) {
      setPotionsSelected("");
    } else {
      setPotionsSelected(potion);
    }
  }

  const changeColor = () => {
    if (puzzleUnlocked.flower) return;
    switch (potionsSelected) {
      case 'niPotion':
        let newColor;
        if (flowerColor.wheel == 'co') {
          newColor = ((flowerColor.color + 1) % 6) + 1;
        } else {
          newColor = ((flowerColor.color + 1) % 5) + 1;
        }
        setFlowerColor((prev) => ({...prev, color: newColor}));
        break;
      case 'coPotion':
        setFlowerColor((prev) => ({...prev, wheel: 'co'}));
        break;
      case 'agPotion':
        setFlowerColor((prev) => ({...prev, wheel: 'ag'}));
        break;
    }
  }

  useEffect(() => {
    if (flowerColor.wheel == 'co' && flowerColor.color == 6) {
      setPotionsSelected("");
      setFlowerColor((prev) => ({...prev, color: 1}))
      setPuzzleUnlocked((prev) => ({...prev, flower: true}))
    }
  }, [flowerColor])

  return (
    <div className='scene-container'>
      <div className="items-area" onClick={() => unlockPotion(activeItem)}></div>
      <div className="flower">
        <div className="flower-color" style={{backgroundColor: flowerColors[flowerColor.wheel][flowerColor.color]}}></div>
        <img src={puzzleUnlocked.flower ? flowerOpenImg : flowerClosedImg} alt="flower" onClick={changeColor}/>
        {puzzleUnlocked.flower && <BasicItem name='firefly'/>}
      </div>

      <img src={drawerStates[drawerState]} className="flower-drawer" alt="drawer with flower puzzle" />

      {drawerState == "closed" && 
      <>
        <div className="open-top-drawer" onClick={() => useDrawer("topOpened")}></div>
        <div className="open-bottom-drawer" onClick={() => useDrawer("bottomOpened")}></div>
      </>}
      {drawerState == "topOpened" &&
      <>
        <div className="close-top-drawer" onClick={() => useDrawer("closed")}></div>
        <div className="show-paper" onClick={() => setPaperVisible(true)}></div>
      </>}
      {paperVisible && <img src={flowerPaperImg} className="flower-paper" alt="flower puzzle clue"/>}
      {drawerState == "bottomOpened" &&
      <>
        <div className="close-bottom-drawer" onClick={() => useDrawer("closed")}></div>
        <div className="open-top-drawer" onClick={() => useDrawer("topOpened")}></div>
        {!puzzleUnlocked.niPotion && 
          <img src={flowerPotionInDrawer} alt="Ni potion in bottom drawer" 
          className='potion-in-drawer' onClick={() => unlockPotion("niPotion")}/>
        }
      </>}

      {puzzleUnlocked.coPotion && 
        <img src={potionsSelected == 'coPotion' ? coPotionSelectedImg: coPotionUnselectedImg} alt="co potion" 
        className='circle flower-co-potion' onClick={() => selectPotion("coPotion")}/>
      }
      {puzzleUnlocked.agPotion && 
        <img src={potionsSelected == 'agPotion' ? agPotionSelectedImg: agPotionUnselectedImg} alt="ag potion" 
        className='ag-potion flower-ag-potion' onClick={() => selectPotion("agPotion")}/>
      }
      {puzzleUnlocked.niPotion && 
        <img src={potionsSelected == 'niPotion' ? niPotionSelectedImg: niPotionUnselectedImg} alt="ni potion" 
        className='circle flower-ni-potion' onClick={() => selectPotion("niPotion")}/>
      }

      <MainDirectionButton direction='down'/>
    </div>

  )
}

export default FlowerDrawer
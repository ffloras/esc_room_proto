import React, { use } from 'react'
import { type SubsceneProp } from '../../db/scenesDB'
import { SceneContext } from '../../contexts/SceneContext'

type BasicSubsceneProp = SubsceneProp & {
  prevScene: string;
}

const BasicSubscene: React.FC<BasicSubsceneProp> = (subscene) => {
//img, name, top, left, next
const {setCurrentScene, setPrevScene} = use(SceneContext)

const changeSubscene = () => {
  setCurrentScene(subscene.next);
  setPrevScene(subscene.prevScene);
}

  return (
    <>
      <img 
        src={subscene.img} 
        alt={subscene.name}
        style={{
          position: "absolute",
          top:`${ subscene.top}px`,
          left:`${ subscene.left}px`,
          clipPath: subscene.shape,
        }}
        onClick={changeSubscene} 
      />
    </>
  )
}

export default BasicSubscene
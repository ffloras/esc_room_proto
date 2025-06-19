import React, { use } from 'react'
import { type SubsceneProp } from '../../db/scenesDB'
import { SceneContext } from '../../contexts/SceneContext'

const BasicSubscene: React.FC<SubsceneProp> = (subscene) => {
//img, name, top, left, next
const {setCurrentScene} = use(SceneContext)

const changeSubscene = () => {
  setCurrentScene(subscene.next);
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
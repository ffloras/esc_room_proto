import React from 'react'
import { type SubsceneProp } from '../../db/scenesDB'

const BasicSubscene: React.FC<SubsceneProp> = (subscene) => {
//img, name, top, left, next

const changeSubscene = () => {

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
          scale: "1",
        }}
        onClick={changeSubscene} 
      />
    </>
  )
}

export default BasicSubscene
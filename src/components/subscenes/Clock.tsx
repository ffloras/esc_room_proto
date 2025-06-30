import clockImg from '../../assets/img/subscenes/clockRoom/clock.png'
import { use } from 'react'
import { SceneContext } from '../../contexts/SceneContext'

const Clock = () => {
  const {setCurrentScene, setPrevScene} = use(SceneContext);

  const changeScene = (nextScene: string) => {
    setCurrentScene(nextScene);
    setPrevScene("main");
  }

  return (
    <>
      <img className="clock" src={clockImg} alt="Grandfather Clock" />
      <div className="clock-top-clickbox" onClick={() => changeScene("clockTop")}></div>
      <div className="clock-bottom-clickbox" onClick={() => changeScene("clockBottom")}></div>
    </>
  )
}

export default Clock
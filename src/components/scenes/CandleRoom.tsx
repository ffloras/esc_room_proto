import LoadingScreen from "../mainGame/LoadingScreen"
import MainDirectionButton from "../mainGame/MainDirectionButton"

const CandleRoom = () => {
  return (
    <div className="scene-container">
      CandleRoom
      <LoadingScreen/>
      <MainDirectionButton direction="left"/>
      <MainDirectionButton direction="up"/>
      <MainDirectionButton direction="right"/>
    </div>
  )
}

export default CandleRoom
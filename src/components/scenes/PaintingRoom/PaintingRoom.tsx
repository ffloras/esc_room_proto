import LoadingScreen from "../../mainGame/LoadingScreen";
import MainDirectionButton from "../../mainGame/MainDirectionButton";
import "../../../css/paintingRoom.css";
import paintingRoomImg from "../../../assets/img/scenes/paintingRoom.png";
import { PaintingRoomSubscenes } from "../../../db/scenesDB";
import BasicSubscene from "../../subscenes/BasicSubscene";
import painting1Img from "../../../assets/img/subscenes/paintingRoom/painting1.png";
import painting2Img from "../../../assets/img/subscenes/paintingRoom/painting2.png";
import painting3Img from "../../../assets/img/subscenes/paintingRoom/painting3.png";
import painting4Img from "../../../assets/img/subscenes/paintingRoom/painting4.png";
import painting5Img from "../../../assets/img/subscenes/paintingRoom/painting5.png";
import curtainsImg from "../../../assets/img/subscenes/paintingRoom/curtains.png";
import displayImg from "../../../assets/img/subscenes/paintingRoom/display.png";
import chandelierImg from "../../../assets/img/subscenes/paintingRoom/chandelier.png";
import { SceneContext } from "../../../contexts/SceneContext";
import WallBug from "./WallBug";
import { use } from "react";

const PaintingRoom = () => {
  const { changeScene } = use(SceneContext);

  return (
    <div
      className="scene-container"
      style={{
        backgroundImage: `url(${paintingRoomImg})`,
      }}
    >
      <LoadingScreen />
      {PaintingRoomSubscenes.map((subscene) => (
        <BasicSubscene {...subscene} prevScene="main" key={subscene.name} />
      ))}

      <WallBug />

      <img className="painting1" src={painting1Img} alt="Painting 1" />
      <img className="painting2" src={painting2Img} alt="Painting 2" />
      <img className="painting3" src={painting3Img} alt="Painting 3" />
      <img className="painting4" src={painting4Img} alt="Painting 4" />
      <img className="painting5" src={painting5Img} alt="Painting 5" />

      <img className="display" src={displayImg} alt="Display" />
      <img className="curtains" src={curtainsImg} alt="Curtains" />
      <img className="chandelier" src={chandelierImg} alt="Chandelier" />

      <div
        className="acornBox-clickbox"
        onClick={() => changeScene("acornBox", "main")}
      ></div>

      <MainDirectionButton direction="left" />
      <MainDirectionButton direction="up" />
      <MainDirectionButton direction="right" />
    </div>
  );
};

export default PaintingRoom;

import React, {useEffect, useState} from "react";
import Circle from "./Circle";

interface BoardProps {
  points: number;
  counter: number
}
const Board: React.FC<BoardProps> = ({points, counter}) => {
  console.log("Board re-render");

  const [positions, setPositions] = useState<{top: number, left: number}[]>([]);
  const containerSize = 500;
  const circleSize = 50;

  useEffect(() => {
    const getRandomPosition = () => {
      const maxTop = containerSize - circleSize;
      const maxLeft = containerSize - circleSize;
      return {
        top: Math.random() * maxTop,
        left: Math.random() * maxLeft,
      };
    };

    // Generate new positions for the circles
    const newPositions = Array.from({ length: points }, getRandomPosition);
    setPositions(newPositions);
  }, [counter]);

  return (
    <div style={{width: containerSize + "px", height: containerSize + "px", border: "1px solid white", marginLeft: "50px", position: "relative"}}>
      {
        positions.map((position, index) => (
          <Circle key={index} top={position.top} left={position.left} size={circleSize} value={points - index}></Circle>
        ))
      }
    </div>
  );
}

export default Board;
import React, {useState} from "react";
import "../assets/styles/Circle.css"
import {useDispatch} from "react-redux";
import {AppDispatch} from "@store";
import {onPointClicked} from "@slices/pointSlice";

interface CircleProps {
  top: number;
  left: number;
  size: number;
  value: number
}

const Circle: React.FC<CircleProps> = ({top, left, size, value}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [additionalClass, setAdditionalClass] = useState('');

  const onPointChose = (e: React.MouseEvent, abc: any) => {
    dispatch(onPointClicked({"currentFinding": value}));
    setAdditionalClass(" fadeOut");
  }

  return (
    <div className={"circle" + additionalClass} style={{
      width: size,
      height: size,
      top: top + "px",
      left: left + "px",
      zIndex: size - value
    }} onClick={(e) => onPointChose(e, this)}
    >
      {value}
    </div>
  );
}

export default Circle;
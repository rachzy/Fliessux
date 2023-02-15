import React from "react";
import "./Title.css";

interface IProps {
  children: string;
  color?: string;
}

const Title: React.FC<IProps> = ({ children, color }) => {
  return (
    <h1 style={color ? { color: color } : {}} className="title">
      {children}
    </h1>
  );
};

export default Title;

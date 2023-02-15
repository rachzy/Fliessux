import React from "react";
import "./Button.css";

interface IProps {
  children: string;
  color?: string;
  onClick?: () => void;
}

const Button: React.FC<IProps> = ({ children, onClick, color }) => {
  return (
    <button
      style={color ? { backgroundColor: color } : {}}
      className="default-btn"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

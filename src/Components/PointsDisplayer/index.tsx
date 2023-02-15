import React from "react";
import "./PointsDisplayer.css";

interface IProps {
  text: string;
  points: number;
  pointsColor: string;
}

const PointsDisplayer: React.FC<IProps> = ({ text, points, pointsColor }) => {
  return (
    <p className="points-label">
      {text}: <span style={{ color: pointsColor }}>{points}</span>
    </p>
  );
};

export default PointsDisplayer;

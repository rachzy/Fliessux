import React from "react";
import { ICustomLanguage } from "../../types";

import "./LanguageItem.css";

interface IProps {
  language: ICustomLanguage;
  selected: boolean;
  onClick: (customCL: ICustomLanguage) => void;
}

const LanguageItem: React.FC<IProps> = ({ language, selected, onClick }) => {
  return (
    <button
      className={`language ${!selected || "active"}`}
      onClick={onClick.bind(this, language)}
    >
      <p>{language.title}</p>
      <img
        src={require(`../../assets/images/${language.language.icon}`)}
        alt={language.language.language}
      />
    </button>
  );
};

export default LanguageItem;

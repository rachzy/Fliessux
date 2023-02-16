import React, { useState } from "react";

import "./Languages.css";

import { ICustomLanguage, ICustomLanguages } from "../../types";
import LanguageItem from "../LanguageItem";

interface IProps {
  customLanguages: ICustomLanguages[];
  selectedLanguage: ICustomLanguages;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<ICustomLanguages>>;
}

const Languages: React.FC<IProps> = ({
  customLanguages,
  selectedLanguage,
  setSelectedLanguage,
}) => {
  const [opened, setOpened] = useState(false);

  const handleButtonClick = (selectedCL: ICustomLanguage) => {
    setSelectedLanguage(
      customLanguages.filter(
        (lang) => lang.language === selectedCL.language.language
      )[0]
    );
    setOpened(!opened);
  };

  return (
    <div className={`languages-container ${!opened || "active"}`}>
      {selectedLanguage.languages.map((customLanguage) => {
        return (
          <LanguageItem
            key={customLanguage.title}
            language={customLanguage}
            selected={
              opened ||
              customLanguage.language.language === selectedLanguage.language
            }
            onClick={handleButtonClick}
          />
        );
      })}
    </div>
  );
};

export default Languages;

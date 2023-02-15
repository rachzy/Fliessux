export type colors = "red" | "blue" | "green" | "yellow";

export interface IBallon {
  id: number;
  color: colors;
  position: {
    x: number;
    y: number;
  };
}

type language = "pt-br" | "en" | "es"

export interface ILanguage {
  language: language;
  icon: string;
}

interface ICustomLanguage {
  title: string;
  language: ILanguage;
}

export interface ICustomLanguages {
  language: language
  languages: ICustomLanguage[]
}

export interface ILanguages {
  languages: ILanguage[];
}
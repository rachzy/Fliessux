export interface IFly {
  id: number;
  position: {
    x: number;
    y: number;
  };
  alive: boolean;
}

type language = "pt-br" | "en" | "es";

export interface ILanguage {
  language: language;
  icon: string;
}

export interface ICustomLanguage {
  title: string;
  language: ILanguage;
}

export interface ICustomLanguages {
  language: language;
  languages: ICustomLanguage[];
}

export interface ILanguages {
  languages: ILanguage[];
}

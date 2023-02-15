export type colors = "red" | "blue" | "green" | "yellow";

export interface IBallon {
  id: number;
  color: colors;
  position: {
    x: number;
    y: number;
  };
}

import generateRandomNumber from "./generateRandomNumber";

export default function pickRandom(arr: any[]) {
  return arr[generateRandomNumber(0, arr.length - 1)];
}

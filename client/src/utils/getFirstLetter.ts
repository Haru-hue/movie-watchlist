export function getFirstLetters(str: string) {
  return str
    .split(" ")
    .map((word) => word[0])
    .join("");
}

export default getFirstLetters;

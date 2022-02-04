// 0 : space, 1 : Harry.
import Harry from "./harry.js";

export function buildLevel(game, level) {
  let harrys = [];

  level.forEach((row, rowIndex) => {
    row.forEach((harry, harryIndex) => {
      if (harry === 1) {
        let position = {
          x: 80 * harryIndex,
          y: 50 + 80 * rowIndex
        };

        harrys.push(new Harry(game, position));
      }
    });
  });

  return harrys;
}

export const levelOne = [
  [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

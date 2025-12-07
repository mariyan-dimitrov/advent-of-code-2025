const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "input.txt");
const regex = /([A-Z])([0-9]+)/;

(async function secretEntrance() {
  let currentIndex = 50;
  let rotations = 0;

  const dataInArray = await new Promise((res) => {
    fs.readFile(filePath, { encoding: "utf-8" }, function (err, data) {
      if (!err) {
        res(data.split("\n").map((row) => row.split("\r")[0]));
      } else {
        console.log(err);
      }
    });
  });

  dataInArray.forEach((toMove) => {
    const [_, direction, rawTicksToMove] = regex.exec(toMove);
    const ticksToMove = Number(rawTicksToMove);

    if (ticksToMove && direction) {
      let newIndex = currentIndex;

      if (direction === "L") {
        newIndex = currentIndex - ticksToMove;
      } else {
        newIndex = ticksToMove + currentIndex;
      }

      newIndex = newIndex % 100;

      if (newIndex < 0) {
        newIndex = 100 + newIndex;
      }

      currentIndex = newIndex;

      if (currentIndex === 0) {
        rotations += 1;
      }
    }
  });

  console.log(rotations); // 1007
})();

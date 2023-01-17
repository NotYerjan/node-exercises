function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

const agetResults = async () => {
  await luckyDraw("Tina")
    .then((res) => console.log(res))
    .catch((err) => console.log(err.message));
  await luckyDraw("Jorge")
    .then((res) => console.log(res))
    .catch((err) => console.log(err.message));
  await luckyDraw("Julien")
    .then((res) => console.log(res))
    .catch((err) => console.log(err.message));
};

agetResults();

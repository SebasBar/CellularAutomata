function CellAutomata() {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const tile = 10;
  const canvaHeight = 800;
  const canvaWidth = 1200;

  const canvaGridXNum = Math.round(canvaWidth / tile);
  const canvaGridYNum = Math.round(canvaHeight / tile);

  const middleCell = Math.round(canvaGridXNum / 2);

  console.log("canvagridX", canvaGridXNum);

  const lineCounter = 1;

  const newLineCells = [];

  //const rule = [0, 0, 0, 1, 1, 1, 1, 0]; // rule 30
  //const rule = [0, 1, 1, 1, 1, 1, 1, 0];
  //const rule = [0, 0, 0, 1, 1, 1, 1, 0];
  //const rule = [0, 0, 1, 0, 1, 0, 0, 1]; // rule 41
  //const rule = [1, 0, 1, 1, 0, 1, 1, 0]; // rule 182

  const rule = [];
  rule[0] = Number(document.getElementById("firstInput").value);
  rule[1] = Number(document.getElementById("secondInput").value);
  rule[2] = Number(document.getElementById("thirdInput").value);
  rule[3] = Number(document.getElementById("forthInput").value);
  rule[4] = Number(document.getElementById("fifthInput").value);
  rule[5] = Number(document.getElementById("sixthInput").value);
  rule[6] = Number(document.getElementById("seventhInput").value);
  rule[7] = Number(document.getElementById("eigthInput").value);

  console.log(rule);

  const ruleDef = [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 1],
    [1, 0, 0],
    [0, 1, 1],
    [0, 1, 0],
    [0, 0, 1],
    [0, 0, 0],
  ];

  const drawBoard = () => {
    for (x = 0; x < canvaWidth; x = x + tile) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvaHeight);
    }
    for (y = 0; y < canvaHeight; y = y + tile) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvaWidth, y);
    }
    ctx.strokeStyle = "#333333";
    ctx.stroke();
  };

  const drawCell = (x, y) => {
    ctx.fillStyle = "black";
    ctx.fillRect((x - 1) * tile, tile * (y - 1), tile, tile);
  };

  const checkCellAlive = (x, y) => {
    const pixelData = ctx.getImageData(
      x * tile - tile / 2,
      y * tile - tile / 2,
      1,
      1
    );

    if (pixelData.data[3] === 255) {
      return 1;
    } else return 0;
  };

  const checkThreePrevNight = (x, y) => {
    const threePrev = [null, null, null];
    if (checkCellAlive(x - 1, y - 1) === 1) {
      threePrev[0] = 1;
    } else threePrev[0] = 0;
    if (checkCellAlive(x, y - 1) === 1) {
      threePrev[1] = 1;
    } else threePrev[1] = 0;
    if (checkCellAlive(x + 1, y - 1) === 1) {
      threePrev[2] = 1;
    } else threePrev[2] = 0;

    return threePrev;
  };

  const createCell = (x, y) => {
    for (i = 0; i < 8; i++) {
      if (rule[i] === 1) {
        if (
          ruleDef[i][0] === checkThreePrevNight(x, y)[0] &&
          ruleDef[i][1] === checkThreePrevNight(x, y)[1] &&
          ruleDef[i][2] === checkThreePrevNight(x, y)[2]
        ) {
          drawCell(x, y);
          return;
        }
      }
    }
  };

  const oddToHalf = (num) => {
    return parseInt(num / 2);
  };

  const optimizedCreateLine = (y) => {
    for (
      var k = -1 * oddToHalf(2 * (y - 1) + 1);
      k <= oddToHalf(2 * (y - 1) + 1);
      k++
    ) {
      createCell(middleCell - k, y);
    }
  };

  const createLine = (y) => {
    for (var k = 0; k < canvaGridXNum; k++) {
      createCell(k + 1, y);
    }
  };

  const animation = () => {
    for (var j = 1; j < canvaGridYNum; j++) {
      //createLine(j + 1);
      optimizedCreateLine(j + 1);
    }
  };

  firstCell = drawCell(middleCell, 1);

  animation();

  drawBoard();
}

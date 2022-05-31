// options menu
let slider = document.querySelector(".slider");
let sizeText = document.querySelector(".size-text");
let rainbow = document.querySelector(".rainbow");
let shade = document.querySelector(".shade");
let reset = document.querySelector(".reset");
let rainbowMode = false;
let shadeMode = false;
reset.addEventListener("click", () => {
  createDrawingBoard();
});
slider.oninput = function () {
  sizeText.textContent = `${slider.value}x${slider.value}`;
  createDrawingBoard();
};
rainbow.addEventListener("click", () => {
  if (rainbowMode === true) {
    rainbow.style.cssText = "background-color: white; color #8b8b8b;";
  } else {
    rainbow.style.cssText = "background-color: #8b8b8b; color: white";
  }
  shade.style.cssText = "background-color: whitel color #8b8b8b;";
  rainbowMode = !rainbowMode;
  shadeMode = false;
});
shade.addEventListener("click", () => {
  if (shadeMode === true) {
    shade.style.cssText = "background-color: white; color #8b8b8b;";
  } else {
    shade.style.cssText = "background-color: #8b8b8b; color: white";
  }
  rainbow.style.cssText = "background-color: whitel color #8b8b8b;";
  shadeMode = !shadeMode;
  rainbowMode = false;
});

// create drawing boward
function createDrawingBoard() {
  const drawingBoard = document.querySelector(".drawing-board");
  // clear the grid in case a different size is selected
  while (drawingBoard.firstChild) {
    drawingBoard.removeChild(drawingBoard.firstChild);
  }
  for (let x = 0; x < slider.value; x++) {
    // create column of pixels to paint
    const gridColumn = document.createElement("div");
    gridColumn.classList.add("grid-column");
    for (let y = 0; y < slider.value; y++) {
      // create each pixel for the column
      const gridItem = document.createElement("div");
      gridItem.classList.add("grid-item");
      gridColumn.appendChild(gridItem);
    }
    drawingBoard.appendChild(gridColumn);
  }

  paintable();
}
createDrawingBoard();

// select the grid to make the pixels paintable
function paintable() {
  const paintItem = document.querySelectorAll(".grid-item");
  for (let i = 0; i < paintItem.length; i++) {
    // make it so clicking paints the pixel
    paintItem[i].addEventListener("touchstart", () => {
      applyColor(paintItem[i]);
    });
    // also makes it possible to click and drag
    paintItem[i].addEventListener("mouseenter", (e) => {
      if (e.buttons === 1) {
        applyColor(paintItem[i]);
      }
    });
    // edge case for mouse clicking
    paintItem[i].addEventListener("mousedown", (e) => {
      if (e.buttons === 1) {
        applyColor(paintItem[i]);
      }
    });
  }
}

// function to apply color
function applyColor(toPaint) {
  if (rainbowMode === true) {
    toPaint.style.backgroundColor = randomColor();
  } else if (shadeMode === true) {
    let shade = getComputedStyle(toPaint).backgroundColor;
    let newColor;
    // determine if color is currently black
    if (shade === "rgb(0, 0, 0)") {
      newColor = "rgb(0, 0, 0)";
      // if color isn't black, make 10% black
    } else if (shade.split("(")[0] === "rgb") {
      newColor = "rgba(0, 0, 0, 0.1)";
    } else if (shade === "rgba(0, 0, 0, 0)") {
      newColor = "rgba(0, 0, 0, 0.1)";
      // logic to determine what shade of black to set it to
    } else {
      let oldShade = shade.split(",")[3].slice(0, -1);
      let newShade = (parseFloat(oldShade) + parseFloat(0.1)).toFixed(1);
      newColor = `rgba(0, 0, 0, ${newShade})`;
    }
    toPaint.style.cssText = `background-color: ${newColor};`;
  } else {
    toPaint.style.backgroundColor = "black";
  }
}

function randomColor() {
  let chars = "0123456789abcdef";
  let newColor = "#";
  for (let i = 0; i < 6; i++) {
    newColor += chars[Math.floor(Math.random() * chars.length)];
  }
  return newColor;
}

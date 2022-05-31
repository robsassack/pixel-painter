// options menu
let slider = document.querySelector(".slider");
let sizeText = document.querySelector(".size-text");
slider.oninput = function () {
  sizeText.textContent = `${slider.value}x${slider.value}`;
  createDrawingBoard();
//   drawable();
};

// create drawing boward
function createDrawingBoard() {
  const drawingBoard = document.querySelector(".drawing-board");
  // clear the grid in case a different size is selected
  while (drawingBoard.firstChild) {
      drawingBoard.removeChild(drawingBoard.firstChild);
  }
  for (let x = 0; x<slider.value; x++) {
    // create column of pixels to paint
    const gridColumn = document.createElement("div");
    gridColumn.classList.add("grid-column");
    for (let y = 0; y<slider.value; y++) {
      // create each pixel for the column
      const gridItem = document.createElement("div");
      gridItem.classList.add("grid-item");
      gridColumn.appendChild(gridItem);
    }
    drawingBoard.appendChild(gridColumn);
  }

  // select the grid to make the pixels paintable
  const paintItem = document.querySelectorAll(".grid-item");
  for (let i = 0; i < paintItem.length; i++) {
    // make it so clicking paints the pxiel
    paintItem[i].addEventListener("mousedown", (e) => {
      paintItem[i].style.backgroundColor = "black";
    });
    // also makes it possible to click and drag
    paintItem[i].addEventListener("mousemove", (e) => {
      if (e.buttons === 1) {
        paintItem[i].style.backgroundColor = "black";
      }
    });
  }
}
createDrawingBoard();

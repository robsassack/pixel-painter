// create drawing boward
const drawingBoard = document.querySelector('.drawing-board');
for (let x=0; x<16; x++){
    // create column of pixels to paint
    const gridColumn = document.createElement('div');
    gridColumn.classList.add('grid-column');
    for (let y=0; y<16; y++){
        // create each pixel for the column
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridColumn.appendChild(gridItem);
    }
    drawingBoard.appendChild(gridColumn);
}

// select the grid to make them paintable
const paintItem = document.querySelectorAll('.grid-item');
for (let i=0; i<paintItem.length; i++) {
    // make it so clicking paints the pxiel
    paintItem[i].addEventListener('mousedown', e => {
        paintItem[i].style.backgroundColor = 'black';
    })
    // also makes it possible to click and drag
    paintItem[i].addEventListener('mousemove', e=> {
        if (e.buttons === 1) {
            paintItem[i].style.backgroundColor = 'black';
        }
    })
}
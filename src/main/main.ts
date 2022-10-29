import Cell from "./lifegame/Cell";
import LifeGround from "./lifegame/LifeGround";
import LifeItem from "./lifegame/LifeItem";

let lifeGround = new LifeGround();
lifeGround.addItem(new LifeItem(new Cell(2+12, 3+12)));
lifeGround.addItem(new LifeItem(new Cell(3+12, 4+12)));
lifeGround.addItem(new LifeItem(new Cell(4+12, 2+12)));
lifeGround.addItem(new LifeItem(new Cell(4+12, 3+12)));
lifeGround.addItem(new LifeItem(new Cell(4+12, 4+12)));

lifeGround.addItem(new LifeItem(new Cell(2, 0)));
lifeGround.addItem(new LifeItem(new Cell(3, 0)));
lifeGround.addItem(new LifeItem(new Cell(4, 0)));
lifeGround.addItem(new LifeItem(new Cell(8, 0)));
lifeGround.addItem(new LifeItem(new Cell(9, 0)));
lifeGround.addItem(new LifeItem(new Cell(10, 0)));

lifeGround.addItem(new LifeItem(new Cell(0, 2)));
lifeGround.addItem(new LifeItem(new Cell(5, 2)));
lifeGround.addItem(new LifeItem(new Cell(7, 2)));
lifeGround.addItem(new LifeItem(new Cell(12, 2)));

lifeGround.addItem(new LifeItem(new Cell(0, 3)));
lifeGround.addItem(new LifeItem(new Cell(5, 3)));
lifeGround.addItem(new LifeItem(new Cell(7, 3)));
lifeGround.addItem(new LifeItem(new Cell(12, 3)));

lifeGround.addItem(new LifeItem(new Cell(0, 4)));
lifeGround.addItem(new LifeItem(new Cell(5, 4)));
lifeGround.addItem(new LifeItem(new Cell(7, 4)));
lifeGround.addItem(new LifeItem(new Cell(12, 4)));

lifeGround.addItem(new LifeItem(new Cell(2, 5)));
lifeGround.addItem(new LifeItem(new Cell(3, 5)));
lifeGround.addItem(new LifeItem(new Cell(4, 5)));
lifeGround.addItem(new LifeItem(new Cell(8, 5)));
lifeGround.addItem(new LifeItem(new Cell(9, 5)));
lifeGround.addItem(new LifeItem(new Cell(10, 5)));

lifeGround.addItem(new LifeItem(new Cell(2, 12)));
lifeGround.addItem(new LifeItem(new Cell(3, 12)));
lifeGround.addItem(new LifeItem(new Cell(4, 12)));
lifeGround.addItem(new LifeItem(new Cell(8, 12)));
lifeGround.addItem(new LifeItem(new Cell(9, 12)));
lifeGround.addItem(new LifeItem(new Cell(10, 12)));

lifeGround.addItem(new LifeItem(new Cell(0, 10)));
lifeGround.addItem(new LifeItem(new Cell(5, 10)));
lifeGround.addItem(new LifeItem(new Cell(7, 10)));
lifeGround.addItem(new LifeItem(new Cell(12, 10)));

lifeGround.addItem(new LifeItem(new Cell(0, 9)));
lifeGround.addItem(new LifeItem(new Cell(5, 9)));
lifeGround.addItem(new LifeItem(new Cell(7, 9)));
lifeGround.addItem(new LifeItem(new Cell(12, 9)));

lifeGround.addItem(new LifeItem(new Cell(0, 8)));
lifeGround.addItem(new LifeItem(new Cell(5, 8)));
lifeGround.addItem(new LifeItem(new Cell(7, 8)));
lifeGround.addItem(new LifeItem(new Cell(12, 8)));

lifeGround.addItem(new LifeItem(new Cell(2, 7)));
lifeGround.addItem(new LifeItem(new Cell(3, 7)));
lifeGround.addItem(new LifeItem(new Cell(4, 7)));
lifeGround.addItem(new LifeItem(new Cell(8, 7)));
lifeGround.addItem(new LifeItem(new Cell(9, 7)));
lifeGround.addItem(new LifeItem(new Cell(10, 7)));





let canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx: CanvasRenderingContext2D = canvas.getContext('2d');

document.body.style.margin = '0px';
document.body.style.height = '100%';
document.body.style.overflow = 'hidden';
document.body.appendChild(canvas);

const itemSize = 4;
let cameraOffsetX = Math.floor(canvas.width/2);
let cameraOffsetY = Math.floor(canvas.height/2);
let cameraZoomPercents = 100;

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    lifeGround.getItems().forEach((lifeItem: LifeItem) => {
        let itemSizeZoommed = itemSize * (cameraZoomPercents / 100);
        if (itemSizeZoommed < 1) {
            itemSizeZoommed = 1;
        }
        ctx.beginPath();
        ctx.rect(
            (lifeItem.cell.x * itemSizeZoommed) + cameraOffsetX,
            (lifeItem.cell.y * itemSizeZoommed) + cameraOffsetY,
            itemSizeZoommed,
            itemSizeZoommed
        );
        ctx.fill();
    });
}

function processFrame() {
    render();
    lifeGround.processIteration();
    window.requestAnimationFrame(processFrame);
}
processFrame();

function moveCameraX(diff: number) {
    cameraOffsetX += diff;
}

function moveCameraY(diff: number) {
    cameraOffsetY += diff;
}

function zoomCamera(diffPercents: number) {
    cameraZoomPercents += diffPercents;
    if (cameraZoomPercents < 1) {
        cameraZoomPercents = 1;
    }
}

function generateMoreLife() {
    for (let j = 0; j < 10; j++) {
        for (let i = 0; i < 1000; i++) {
            lifeGround.addItem(new LifeItem(new Cell(
                Math.round(250*Math.random()) * (Math.random() > 0.5 ? 1 : -1),
                Math.round(250*Math.random()) * (Math.random() > 0.5 ? 1 : -1)
            )));
        }
    }
}

window.onkeyup = (e) => {
    switch (e.code) {
        case 'ArrowLeft': {
            moveCameraX(120);
        } break;
        case 'ArrowRight': {
            moveCameraX(-120);
        } break;
        case 'ArrowUp': {
            moveCameraY(120);
        } break;
        case 'ArrowDown': {
            moveCameraY(-120);
        } break;
        case 'Equal': {
            zoomCamera(10);
        } break;
        case 'Minus': {
            zoomCamera(-10);
        } break;
        case 'Space': {
            generateMoreLife();
        } break;
        default: {
            console.log(e.code);
        }
    }
};

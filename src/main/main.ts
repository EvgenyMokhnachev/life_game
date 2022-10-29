import Cell from "./lifegame/Cell";
import LifeGround from "./lifegame/LifeGround";
import LifeItem from "./lifegame/LifeItem";

let lifeGround = new LifeGround();
lifeGround.addItem(new LifeItem(new Cell(2, 3)));
lifeGround.addItem(new LifeItem(new Cell(3, 4)));
lifeGround.addItem(new LifeItem(new Cell(4, 2)));
lifeGround.addItem(new LifeItem(new Cell(4, 3)));
lifeGround.addItem(new LifeItem(new Cell(4, 4)));

let canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx: CanvasRenderingContext2D = canvas.getContext('2d');

document.body.style.margin = '0px';
document.body.style.height = '100%';
document.body.style.overflow = 'hidden';
document.body.appendChild(canvas);

const itemSize = 4;

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

let cameraOffsetX = Math.floor(canvas.width/2);
function moveCameraX(diff: number) {
    cameraOffsetX += diff;
}

let cameraOffsetY = Math.floor(canvas.height/2);
function moveCameraY(diff: number) {
    cameraOffsetY += diff;
}

let cameraZoomPercents = 100;
function zoomCamera(diffPercents: number) {
    cameraZoomPercents += diffPercents;
    if (cameraZoomPercents < 1) {
        cameraZoomPercents = 1;
    }
}

function generateMoreLife() {
    for (let i = -250; i < 250; i++) {
        lifeGround.addItem(new LifeItem(new Cell(Math.round(i*Math.random()), Math.round(i*Math.random()))));
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

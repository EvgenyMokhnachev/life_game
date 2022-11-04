import Cell from "./lifegame/logic/Cell";
import LifeGround from "./lifegame/logic/LifeGround";
import LifeItem from "./lifegame/logic/LifeItem";
import LifeGameTimeProcessor from "./lifegame/environment/LifeGameTimeProcessor";

let lifeGround = new LifeGround();

// lifeGround.addItems([
//     LifeItem.create(2+12, 3+12),
//     LifeItem.create(3+12, 4+12),
//     LifeItem.create(4+12, 2+12),
//     LifeItem.create(4+12, 3+12),
//     LifeItem.create(4+12, 4+12)
// ]);

lifeGround.addItems(centraliseObject(generate30P5H2V0()));

function centraliseObject(items: LifeItem[]): LifeItem[] {
    let minX = 0;
    let maxX = 0;

    let minY = 0;
    let maxY = 0;

    items.forEach((item: LifeItem) => {
        if (item.cell.x > maxX) {
            maxX = item.cell.x
        }

        if (item.cell.x < minX) {
            minX = item.cell.x
        }

        if (item.cell.y > maxY) {
            maxY = item.cell.y
        }

        if (item.cell.y < minY) {
            minY = item.cell.y
        }
    });

    let centerX = Math.round((minX + maxX) / 2);
    let centerY = Math.round((minY + maxY) / 2);

    return items.map(item => {
        let itemCell = new Cell(item.cell.x, item.cell.y);
        itemCell.x = itemCell.x - centerX;
        itemCell.y = itemCell.y - centerY;
        item.cell = itemCell;
        return item;
    });
}

function positionObject(items: LifeItem[], x: number, y: number) {
    return items.map(item => {
        item.cell.x += x;
        item.cell.y += y;
        return item;
    })
}

function generate30P5H2V0(): LifeItem[] {
    return [
        LifeItem.create(0, 5),
        LifeItem.create(0, 6),

        LifeItem.create(1, 4),
        LifeItem.create(1, 5),
        LifeItem.create(1, 6),

        LifeItem.create(2, 2),

        LifeItem.create(3, 1),
        LifeItem.create(3, 2),
        LifeItem.create(3, 4),

        LifeItem.create(4, 0),
        LifeItem.create(4, 1),

        LifeItem.create(5, 1),
        LifeItem.create(5, 2),
        LifeItem.create(5, 4),
        LifeItem.create(5, 5),
        LifeItem.create(5, 6),

        LifeItem.create(6, 2),

        LifeItem.create(7, 4),

        LifeItem.create(8, 8),

        LifeItem.create(9, 5),
        LifeItem.create(9, 9),

        LifeItem.create(10, 4),
        LifeItem.create(10, 5),
        LifeItem.create(10, 7),
        LifeItem.create(10, 8),

        LifeItem.create(11, 5),

        LifeItem.create(12, 6),
        LifeItem.create(12, 7),
        LifeItem.create(12, 9),
        LifeItem.create(12, 10),
    ];
}

function generateInfinitySquare(): LifeItem[] {
    return [
        LifeItem.create(0, 0),
        LifeItem.create(1, 0),
        LifeItem.create(2, 0),
        LifeItem.create(3, 0),
        LifeItem.create(4, 0),

        LifeItem.create(0, 1),
        LifeItem.create(1, 1),
        LifeItem.create(2, 1),
        LifeItem.create(3, 1),
        LifeItem.create(4, 1),

        LifeItem.create(0, 2),
        LifeItem.create(1, 2),

        LifeItem.create(2, 2),

        LifeItem.create(3, 2),
        LifeItem.create(4, 2),

        LifeItem.create(0, 3),
        LifeItem.create(1, 3),
        LifeItem.create(2, 3),
        LifeItem.create(3, 3),
        LifeItem.create(4, 3),

        LifeItem.create(0, 4),
        LifeItem.create(1, 4),
        LifeItem.create(2, 4),
        LifeItem.create(3, 4),
        LifeItem.create(4, 4),
    ];
}


let canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx: CanvasRenderingContext2D = canvas.getContext('2d');

document.body.style.margin = '0px';
document.body.style.height = '100%';
document.body.style.overflow = 'hidden';
document.body.appendChild(canvas);

const itemSize = 4;
let cameraOffsetX = Math.floor(canvas.width / 2);
let cameraOffsetY = Math.floor(canvas.height / 2);
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

let lifeGameTimeProcessor = new LifeGameTimeProcessor(lifeGround);
lifeGameTimeProcessor.start();

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        lifeGameTimeProcessor.pause();
    } else {
        lifeGameTimeProcessor.unpause();
    }
});

function processFrame() {
    render();
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
    let itemSizeZoommed = itemSize * (cameraZoomPercents / 100);

    for (let x = 0; x < Math.floor(canvas.width / itemSizeZoommed); x += 1) {
        for (let y = 0; y < Math.floor(canvas.height / itemSizeZoommed); y += 1) {
            if ((Math.random() > 0.999)) {
                positionObject(
                    centraliseObject(
                        generate30P5H2V0()
                    ),
                    Math.round(x - (cameraOffsetX / itemSizeZoommed)),
                    Math.round(y - (cameraOffsetY / itemSizeZoommed))
                ).forEach(itemSize => {
                    lifeGround.addItem(itemSize);
                });
                // lifeGround.addItem(LifeItem.create(
                //     x - (cameraOffsetX / itemSizeZoommed),
                //     y - (cameraOffsetY / itemSizeZoommed)
                // ));
            }
        }
    }

    // for (let j = 0; j < 10; j++) {
    //     for (let i = 0; i < 1000; i++) {
    //         lifeGround.addItem(LifeItem.create(
    //             Math.round(250*Math.random()) * (Math.random() > 0.5 ? 1 : -1),
    //             Math.round(250*Math.random()) * (Math.random() > 0.5 ? 1 : -1)
    //         ));
    //     }
    // }
}

window.onkeyup = (e) => {
    switch (e.code) {
        case 'ArrowLeft': {
            moveCameraX(120);
        }
            break;
        case 'ArrowRight': {
            moveCameraX(-120);
        }
            break;
        case 'ArrowUp': {
            moveCameraY(120);
        }
            break;
        case 'ArrowDown': {
            moveCameraY(-120);
        }
            break;
        case 'Equal': {
            zoomCamera(10);
        }
            break;
        case 'Minus': {
            zoomCamera(-10);
        }
            break;
        case 'Space': {
            generateMoreLife();
        }
            break;
        case 'KeyP': {
            lifeGameTimeProcessor.pauseToggle();
        }
            break;
        default: {
            console.log(e.code);
        }
    }
};

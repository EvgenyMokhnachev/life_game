import LifeGround from "./lifegame/logic/LifeGround";
import LifeGameTimeProcessor from "./lifegame/environment/LifeGameTimeProcessor";
import LifeObject from "./lifegame/objects/LifeObject";
import {key, keyboard} from "./utils/Keyboard";
import LifeGameRender from "./lifegame/render/LifeGameRender";
import LifeObject30P5H2V0 from "./lifegame/objects/LifeObject30P5H2V0";
import LifeObjectGlider from "./lifegame/objects/LifeObjectGlider";
import LifeObjectStaticPulsar from "./lifegame/objects/LifeObjectStaticPulsar";
import LifeObjectPulsar3 from "./lifegame/objects/LifeObjectPulsar3";

const canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.style.margin = '0px';
document.body.style.height = '100%';
document.body.style.overflow = 'hidden';
document.body.appendChild(canvas);

const lifeGround = new LifeGround();
// lifeGround.addItems(new Object30P5H2V0().centralise().getItems());
// lifeGround.addItems(new LifeObjectGlider().centralise().getItems());
// lifeGround.addItems(new LifeObjectStaticPulsar().centralise().getItems());
lifeGround.addItems(new LifeObjectPulsar3().centralise().getItems());

const lifeGameRender = new LifeGameRender(lifeGround, canvas);
lifeGameRender.render();

const lifeGameTimeProcessor = new LifeGameTimeProcessor(lifeGround);
lifeGameTimeProcessor.start();

function generateMoreLife() {
    let lifeObject: LifeObject = new LifeObject30P5H2V0().centralise();

    for (let x = -100; x < 100; x += lifeObject.getWidth()) {
        for (let y = -100; y < 100; y += lifeObject.getHeight()) {
            if (Math.random() > 0.75) {
                let lifeObject: LifeObject = new LifeObject30P5H2V0().centralise();
                lifeGround.addItems(lifeObject.move(x, y).getItems());
            }
        }
    }
}

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        lifeGameTimeProcessor.pause();
    } else {
        lifeGameTimeProcessor.unpause();
    }
});

keyboard.addKeyUpEvents([
    [key.ArrowLeft,     () => lifeGameRender.moveCameraX(120)],
    [key.ArrowRight,    () => lifeGameRender.moveCameraX(-120)],
    [key.ArrowUp,       () => lifeGameRender.moveCameraY(120)],
    [key.ArrowDown,     () => lifeGameRender.moveCameraY(-120)],
    [key.Equal,         () => lifeGameRender.zoomCamera(25)],
    [key.Minus,         () => lifeGameRender.zoomCamera(-25)],
    [key.Space,         () => generateMoreLife()],
    [key.KeyP,          () => lifeGameTimeProcessor.pauseToggle()],
]);

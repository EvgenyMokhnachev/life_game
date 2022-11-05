import LifeGround from "../logic/LifeGround";

class LifeGameTimeProcessor {
    private lifeGround: LifeGround;
    private pauseTime: number;
    private speed: number;
    private lastIteration: number;
    private lastRequestAnimationFrame: number;

    constructor(lifeGround: LifeGround) {
        this.lifeGround = lifeGround;
        this.speed = 4;
        this.pauseTime = undefined;
        this.lastIteration = Date.now();
        this.lastRequestAnimationFrame = undefined;
    }

    public start() {
        if (this.pauseTime) {
            return;
        }
        let timestampDifferent = Date.now() - this.lastIteration;
        let processIterations = Math.floor((timestampDifferent/1000) * this.speed);

        if (processIterations > 0) {
            this.lifeGround.processIteration();
            this.lastIteration = Date.now();
        }

        this.lastRequestAnimationFrame = window.requestAnimationFrame(this.start.bind(this));
    }

    public pause() {
        if (!this.pauseTime) {
            this.pauseTime = Date.now();
            cancelAnimationFrame(this.lastRequestAnimationFrame);
        }
    }

    public unpause() {
        if (this.pauseTime) {
            let pauseDiffTime = Date.now() - this.pauseTime;
            this.lastIteration += pauseDiffTime;
            this.pauseTime = undefined;
            this.start();
        }
    }

    public pauseToggle() {
        if (this.pauseTime) {
            this.unpause();
        } else {
            this.pause();
        }
    }

}

export default LifeGameTimeProcessor;

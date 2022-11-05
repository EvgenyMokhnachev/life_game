import LifeItem from "../logic/LifeItem";
import LifeGround from "../logic/LifeGround";

class LifeGameRender {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private lastRequestAnimationFrame: number;

    private lifeGround: LifeGround;

    private itemSize: number;
    private zoom: number;
    private itemSizeZoomed: number;
    private cameraOffsetX: number;
    private cameraOffsetY: number;

    constructor(lifeGround: LifeGround, canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.itemSize = 4;
        this.zoom = 500;
        this.itemSizeZoomed = this.calculateItemSizeZoomed(this.zoom);

        this.cameraOffsetX = Math.ceil(this.canvas.width / 2);
        this.moveCameraX(0);
        this.cameraOffsetY = Math.ceil(this.canvas.height / 2);
        this.moveCameraY(0);

        this.lifeGround = lifeGround;
    }

    private calculateItemSizeZoomed(zoomPercents: number): number {
        return Math.ceil(this.itemSize * (zoomPercents / 100));
    }

    public render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.beginPath();
        this.lifeGround.getItems().forEach((lifeItem: LifeItem) => {
            this.ctx.rect(
                Math.ceil(lifeItem.cell.x * this.itemSizeZoomed) + this.cameraOffsetX,
                Math.ceil(lifeItem.cell.y * this.itemSizeZoomed) + this.cameraOffsetY,
                this.itemSizeZoomed,
                this.itemSizeZoomed
            );
        });
        this.ctx.fill();
        this.ctx.closePath();


        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#f0f0f0';
        let y = 0;
        while (y < this.canvas.height) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            y += Math.ceil(this.itemSizeZoomed);
        }
        let x = 0;
        while (x < this.canvas.width) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            x += Math.ceil(this.itemSizeZoomed);
        }
        this.ctx.stroke();
        this.ctx.closePath();

        this.lastRequestAnimationFrame = window.requestAnimationFrame(this.render.bind(this));
    }

    public moveCameraX(xDiff: number) {
        this.cameraOffsetX += xDiff;
        this.cameraOffsetX = this.itemSizeZoomed * Math.trunc(this.cameraOffsetX / this.itemSizeZoomed);
    }

    public moveCameraY(yDiff: number) {
        this.cameraOffsetY += yDiff;
        this.cameraOffsetY = this.itemSizeZoomed * Math.trunc(this.cameraOffsetY / this.itemSizeZoomed);
    }

    public zoomCamera(diffPercents: number) {
        let newCameraZoomPercents = this.zoom + diffPercents;
        let newItemSizeZoomed = this.calculateItemSizeZoomed(newCameraZoomPercents);
        if (newItemSizeZoomed < 1) {
            return;
        }
        this.zoom = newCameraZoomPercents;
        this.itemSizeZoomed = newItemSizeZoomed;

        this.moveCameraX(0);
        this.moveCameraY(0);
    }

}

export default LifeGameRender;

import LifeItem from "../logic/LifeItem";
import LifeGround from "../logic/LifeGround";
import LifeObjectCell from "../objects/LifeObjectCell";
import CanvasRenderer from "../../render/CanvasRenderer";
import Rect from "../../render/Rect";
import Line from "../../render/Line";

export default class {
    private renderer: CanvasRenderer;

    private lifeGround: LifeGround;

    private itemSize: number;
    private zoom: number;
    private itemSizeZoomed: number;
    private cameraOffsetX: number;
    private cameraOffsetY: number;

    private cellHoverX: number = null;
    private cellHoverY: number = null;
    private cellHoverItemIndex: number = null;

    constructor(lifeGround: LifeGround, renderer: CanvasRenderer) {
        this.renderer = renderer;

        this.renderer.onMouseMove((x: number, y: number) => this.cellHoverChange(x, y));
        this.renderer.onMouseDown((x: number, y: number) => this.cellHoverClicked(x, y));

        this.itemSize = 12;
        this.zoom = 200;
        this.itemSizeZoomed = this.calculateItemSizeZoomed(this.zoom);

        this.cameraOffsetX = Math.ceil(this.renderer.getWidth() / 2);
        this.moveCameraX(0);
        this.cameraOffsetY = Math.ceil(this.renderer.getHeight() / 2);
        this.moveCameraY(0);

        this.lifeGround = lifeGround;

        this.renderLines();
        this.renderer.onRender(() => {
            this.renderGameItems();
        });
    }

    private cellHoverChange(x: number, y: number) {
        this.cellHoverX = this.itemSizeZoomed * Math.round((x) / this.itemSizeZoomed);
        this.cellHoverY = this.itemSizeZoomed * Math.round((y) / this.itemSizeZoomed);
        this.renderer.removeItem(this.cellHoverItemIndex);

        if (this.cellHoverX === null || this.cellHoverY === null) {
            return;
        }

        this.cellHoverItemIndex = this.renderer.addItem(new Rect(this.cellHoverX, this.cellHoverY, this.itemSizeZoomed, this.itemSizeZoomed).setFillStyle('#b0b0b0'));
    }

    private cellHoverClicked(x: number, y: number) {
        this.cellHoverChange(x, y);

        let xGamePosition = ((this.cellHoverX - this.cameraOffsetX) / this.itemSizeZoomed);
        let yGamePosition = ((this.cellHoverY - this.cameraOffsetY) / this.itemSizeZoomed);

        this.lifeGround.addItems(new LifeObjectCell().move(xGamePosition, yGamePosition).getItems());
    }

    private calculateItemSizeZoomed(zoomPercents: number): number {
        return Math.ceil(this.itemSize * (zoomPercents / 100));
    }

    private lifeGameItemsIndexes: number[] = [];
    private lifeCellColor: string = '#101010';

    private renderGameItems() {
        const squares: Rect[] = [];

        this.lifeGround.getItems().forEach((lifeItem: LifeItem) => {
            squares.push(new Rect(
                Math.ceil(lifeItem.cell.x * this.itemSizeZoomed) + this.cameraOffsetX,
                Math.ceil(lifeItem.cell.y * this.itemSizeZoomed) + this.cameraOffsetY,
                this.itemSizeZoomed,
                this.itemSizeZoomed,
            ).setFillStyle(this.lifeCellColor));
        });

        if (this.lifeGameItemsIndexes) {
            this.lifeGameItemsIndexes.forEach(gameItemIndex => this.renderer.removeItem(gameItemIndex));
        }

        this.lifeGameItemsIndexes = squares.map((square: Rect) => {
            return this.renderer.addItem(square);
        });
    }

    private linesIndexes: number[] = [];
    private linesColor: string = '#f0f0f0';
    private linesWidth: number = 1;

    private renderLines() {
        let lines: Line[] = [];

        let y = 0;
        while (y < this.renderer.getHeight()) {
            lines.push(new Line(0, y, this.renderer.getWidth(), y, this.linesColor, this.linesWidth));
            y += Math.ceil(this.itemSizeZoomed);
        }

        let x = 0;
        while (x < this.renderer.getWidth()) {
            lines.push(new Line(x, 0, x, this.renderer.getHeight(), this.linesColor, this.linesWidth));
            x += Math.ceil(this.itemSizeZoomed);
        }

        if (this.linesIndexes) {
            this.linesIndexes.forEach(lineIndex => this.renderer.removeItem(lineIndex));
        }

        this.linesIndexes = lines.map(line => {
            return this.renderer.addItem(line);
        })
    }

    public moveCameraX(xDiff: number) {
        this.cameraOffsetX += xDiff;
        this.cameraOffsetX = Math.trunc(this.itemSizeZoomed * Math.trunc(this.cameraOffsetX / this.itemSizeZoomed));
    }

    public moveCameraY(yDiff: number) {
        this.cameraOffsetY += yDiff;
        this.cameraOffsetY = Math.trunc(this.itemSizeZoomed * Math.trunc(this.cameraOffsetY / this.itemSizeZoomed));
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
        this.cellHoverChange(this.cellHoverX, this.cellHoverY);
        this.renderLines();
    }

}

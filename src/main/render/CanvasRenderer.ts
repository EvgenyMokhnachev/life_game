import CanvasItem from "./CanvasItem";

export default class {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private lastRequestAnimationFrame: number;

    private canvasOnMouseMoveEventsSequence: number = 0;
    private canvasOnMouseMoveEvents: Map<number, Function> = new Map<number, Function>();

    private canvasOnMouseDownEventsSequence: number = 0;
    private canvasOnMouseDownEvents: Map<number, Function> = new Map<number, Function>();

    private onRenderEventsSequence: number = 0;
    private onRenderEvents: Map<number, Function> = new Map<number, Function>();

    private itemsSequence: number = 0;
    private items: Map<number, CanvasItem> = new Map<number, CanvasItem>();

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.canvas.onmousemove = (e) => this.canvasOnMouseMoveEvents.forEach(
            (callback: Function) => callback(e.offsetX, e.offsetY));
        this.canvas.onmousedown = (e) => this.canvasOnMouseDownEvents.forEach(
            (callback: Function) => callback(e.offsetX, e.offsetY));
    }

    public getWidth() {
        return this.canvas.width;
    }

    public getHeight() {
        return this.canvas.height;
    }

    public onMouseMove(callback: Function): number {
        let index = ++this.canvasOnMouseMoveEventsSequence;
        this.canvasOnMouseMoveEvents.set(index, callback);
        return index;
    }

    public onMouseDown(callback: Function): number {
        let index = ++this.canvasOnMouseDownEventsSequence;
        this.canvasOnMouseDownEvents.set(index, callback);
        return index;
    }

    public onRender(callback: Function): number {
        let index = ++this.onRenderEventsSequence;
        this.onRenderEvents.set(index, callback);
        return index;
    }

    public addItem(item: CanvasItem): number {
        let index = ++this.itemsSequence;
        this.items.set(index, item);
        return index;
    }

    public removeItem(indexOfSequence: number) {
        this.items.delete(indexOfSequence);
    }

    public render() {
        this.onRenderEvents.forEach((callback: Function) => callback());

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.items.forEach((item: CanvasItem) => {
            if (
                (item.x + item.width < 0) ||
                (item.x > this.canvas.width) ||
                (item.y + item.height < 0) ||
                (item.y > this.canvas.height)
            ) {
                return;
            }

            item.render(this.ctx);
        });
        this.lastRequestAnimationFrame = window.requestAnimationFrame(this.render.bind(this));
    }

}

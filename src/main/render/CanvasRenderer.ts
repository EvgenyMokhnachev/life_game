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
        this.processRenderItems();
        return index;
    }

    public removeItem(indexOfSequence: number) {
        this.items.delete(indexOfSequence);
        this.processRenderItems();
    }

    private zIndexesForRender: number[] = [];
    private zIndexesForRenderMap: Map<number, CanvasItem[]> = new Map<number, CanvasItem[]>();

    private processRenderItems() {
        this.zIndexesForRender = [];
        this.zIndexesForRenderMap = new Map<number, CanvasItem[]>();

        this.items.forEach((item: CanvasItem) => {
            let itemZIndex = item.zIndex;
            let canvasItems = this.zIndexesForRenderMap.get(itemZIndex);
            if (itemZIndex === undefined || itemZIndex === null) {
                itemZIndex = 0;
            }
            if (!canvasItems) {
                canvasItems = [];
                this.zIndexesForRenderMap.set(itemZIndex, canvasItems);
            }
            canvasItems.push(item);

            if (this.zIndexesForRender.indexOf(itemZIndex) < 0) {
                this.zIndexesForRender.push(itemZIndex);
            }
        });

        this.zIndexesForRender = this.zIndexesForRender.sort((a, b) => {
            if (a === b) return 0;
            if (a > b) return 1;
            if (a < b) return -1;
        });
    }

    public render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let zIndex of this.zIndexesForRender) {
            let canvasItems = this.zIndexesForRenderMap.get(zIndex);
            for (let canvasItem of canvasItems) {
                if (
                    (canvasItem.x + canvasItem.width < 0) ||
                    (canvasItem.x > this.canvas.width) ||
                    (canvasItem.y + canvasItem.height < 0) ||
                    (canvasItem.y > this.canvas.height)
                ) {
                    continue;
                }

                canvasItem.render(this.ctx);
            }
        }

        this.onRenderEvents.forEach((callback: Function) => callback());

        this.lastRequestAnimationFrame = window.requestAnimationFrame(this.render.bind(this));
    }

}

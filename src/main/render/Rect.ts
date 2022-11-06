import CanvasItem from "./CanvasItem";

export default class Rect implements CanvasItem {
    x: number;
    y: number;
    width: number;
    height: number;

    fillStyle: string;
    borderRadius: number = 0;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public setFillStyle(fillStyle: string): Rect {
        this.fillStyle = fillStyle;
        return this;
    }

    public  setBorderRadius(borderRadius: number): Rect {
        this.borderRadius = borderRadius;
        return this;
    }

    render(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        // @ts-ignore
        ctx.roundRect(
            this.x,
            this.y,
            this.width,
            this.height,
            this.borderRadius
        );
        ctx.fillStyle = undefined;
        if (this.fillStyle) {
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
        }
        ctx.closePath();
    }

}

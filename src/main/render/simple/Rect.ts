import CanvasItem from "../CanvasItem";

export default class Rect extends CanvasItem {
    fillStyle: string;
    borderRadius: number = 0;

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
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

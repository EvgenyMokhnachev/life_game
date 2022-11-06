import CanvasItem from "./CanvasItem";

export default class Square implements CanvasItem {
    x: number;
    y: number;
    width: number;
    height: number;

    x1: number;
    y1: number;

    strokeStyle: string;
    lineWidth: number;

    constructor(x0: number, y0: number, x1: number, y1: number, strokeStyle: string, lineWidth: number) {
        this.x = x0;
        this.y = y0;
        this.x1 = x1;
        this.y1 = y1;
        this.width = x0 > x1 ? x0 : x1;
        this.height = y0 > y1 ? y0 : y1;
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
    }

    render(ctx: CanvasRenderingContext2D): void {
        ctx.lineWidth = this.lineWidth || 1;
        ctx.fillStyle = undefined;
        ctx.strokeStyle = undefined;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x1, this.y1);

        if (this.strokeStyle) {
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
        }

        ctx.closePath();
    }

}

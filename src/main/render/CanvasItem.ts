export default interface CanvasItem {
    x: number;
    y: number;
    width: number;
    height: number;

    render(ctx: CanvasRenderingContext2D): void;
}

export default abstract class CanvasItem {
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;
    private _zIndex: number;

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get zIndex(): number {
        return this._zIndex;
    }

    set zIndex(value: number) {
        this._zIndex = value;
    }

    constructor(x: number, y: number, width: number, height: number, zIndex: number = 1) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._zIndex = zIndex;
    }

    abstract render(ctx: CanvasRenderingContext2D): void;

}

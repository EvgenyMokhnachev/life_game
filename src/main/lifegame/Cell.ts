class Cell {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public equals(cell: Cell): boolean {
        return (cell instanceof Cell)
        && (cell.x === this.x)
        && (cell.y === this.y);
    }
}

export default Cell;

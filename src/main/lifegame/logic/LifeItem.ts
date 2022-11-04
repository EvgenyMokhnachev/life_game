import Cell from "./Cell";

class LifeItem {
    cell: Cell;
    //todo do something with colors
    //todo do something with lifetime

    constructor(cell: Cell) {
        this.cell = cell;
    }

    public static create(x: number, y: number): LifeItem {
        return new LifeItem(new Cell(x, y));
    }
}

export default LifeItem;

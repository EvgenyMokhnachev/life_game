import Cell from "./Cell";
import LifeItem from "./LifeItem";

class Neiborhoods {
    lifeItems: LifeItem[];

    emptyCells: Cell[];

    constructor(lifeItems: LifeItem[], emptyCells: Cell[]) {
        this.lifeItems = lifeItems;
        this.emptyCells = emptyCells;
    }
}

export default Neiborhoods;

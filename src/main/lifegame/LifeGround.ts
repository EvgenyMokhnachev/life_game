import Cell from "./Cell";
import LifeItem from "./LifeItem";
import Neiborhoods from "./Neiborhoods";

class LifeGround {
    private w: number;
    private h: number;
    private items: LifeItem[];

    constructor(w?: number, h?: number) {
        this.w = w || undefined;
        this.h = h || undefined;
        this.items = [];
    }

    public changeSize(w: number, h: number) {
        this.w = w;
        this.h = h;
        let oldItems = [...this.items];
        this.items = [];
        oldItems.forEach((oldItem: LifeItem) => {
            this.addItem(oldItem);
        });
    }

    public getItems(): LifeItem[] {
        return this.items;
    }

    public addItem(item: LifeItem) {
        item.cell = this.normalizeCoords(item.cell);

        let existsItem: LifeItem = this.items.find((gameItem: LifeItem) => item.cell.x === gameItem.cell.x && item.cell.y === gameItem.cell.y);

        // todo replace item instead of nothing do
        if (existsItem) {
            return;
        }
        this.items.push(item);
    }

    public normalizeCoords(coords: Cell): Cell {
        if (this.w) {
            while (coords.x >= this.w) {
                coords.x -= this.w;
            }
            while (coords.x < 0) {
                coords.x += this.w;
            }
        }

        if (this.h) {
            while (coords.y >= this.h) {
                coords.y -= this.h;
            }
            while (coords.y < 0) {
                coords.y += this.h;
            }
        }

        return coords;
    }

    public processIteration() {
        let itemsToDie: LifeItem[] = [];
        let itemsToBorn: LifeItem[] = [];

        //         let emptyCells = {
        //             "0": {//X
        //                 "1": true //Y
        //             }
        //         }
        let emptyCells: any = {};

        for (let itemIndex in this.items) {
            let lifeItem: LifeItem = this.items[itemIndex];
            let neiborhoods = this.getNeiborhoods(lifeItem.cell);

            if (neiborhoods.lifeItems.length < 2 || neiborhoods.lifeItems.length > 3) {
                itemsToDie.push(lifeItem);
            }

            for (let emptyCellIndex in neiborhoods.emptyCells) {
                let neiborhoodEmptyCell: Cell = neiborhoods.emptyCells[emptyCellIndex];
                let emptyCellsYs = emptyCells[neiborhoodEmptyCell.x];
                if (!emptyCellsYs) {
                    emptyCellsYs = {};
                    emptyCells[neiborhoodEmptyCell.x] = emptyCellsYs;
                }
                emptyCellsYs[neiborhoodEmptyCell.y] = true;
            }
        }

        for(let x in emptyCells) {
            for(let y in emptyCells[x]) {
                let neiborhoodEmptyCell = new Cell(parseInt(x), parseInt(y));
                let neiborhoodsOfEmptyCell = this.getNeiborhoods(neiborhoodEmptyCell);
                if (neiborhoodsOfEmptyCell.lifeItems.length === 3) {
                    itemsToBorn.push(new LifeItem(neiborhoodEmptyCell));
                }
            }
        }

        for (let itemToDieIndex in itemsToDie) {
            let itemToDie: LifeItem = itemsToDie[itemToDieIndex];
            let indexToRemove = this.items.indexOf(itemToDie);
            if (indexToRemove > -1) {
                this.items.splice(indexToRemove, 1);
            }
        }

        for (let itemsToBornIndex in itemsToBorn) {
            let itemToBorn: LifeItem = itemsToBorn[itemsToBornIndex];
            this.addItem(itemToBorn);
        }
    }

    private getNeiborhoods(cel: Cell): Neiborhoods {
        let neiborhoodsCoords = this.getNeiborhoodsCoords(cel);
        let neiborhoodLifeItems: LifeItem[] = [];
        let neiborhoodFreeCels: Cell[] = [];

        for (let neiborhoodCoordIndex in neiborhoodsCoords) {
            let neiborhoodsCell: Cell = neiborhoodsCoords[neiborhoodCoordIndex];
            let neiborhoodLifeItem = this.items.find(lifeItem => lifeItem.cell.equals(neiborhoodsCell));
            if (neiborhoodLifeItem) {
                neiborhoodLifeItems.push(neiborhoodLifeItem);
            } else {
                neiborhoodFreeCels.push(neiborhoodsCell);
            }
        }

        return new Neiborhoods(neiborhoodLifeItems, neiborhoodFreeCels);
    }

    public getNeiborhoodsCoords(cell: Cell): Cell[] {
        let neiborhoodsCoords: Cell[] = [
            new Cell(cell.x - 1, cell.y + 1),
            new Cell(cell.x, cell.y + 1),
            new Cell(cell.x + 1, cell.y + 1),

            new Cell(cell.x - 1, cell.y),
            new Cell(cell.x + 1, cell.y),

            new Cell(cell.x - 1, cell.y - 1),
            new Cell(cell.x, cell.y - 1),
            new Cell(cell.x + 1, cell.y - 1)
        ];
        return neiborhoodsCoords.map((neiborhoodsCell: Cell) => {
            return this.normalizeCoords(neiborhoodsCell);
        });
    }
}

export default LifeGround;

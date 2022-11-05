import Cell from "./Cell";
import LifeItem from "./LifeItem";
import Neiborhoods from "./Neiborhoods";

class LifeGround {
    private w: number;
    private h: number;
    private items = new Map<number, Map<number, LifeItem>>;
    private itemsCount: number;

    constructor(w?: number, h?: number) {
        this.w = w || undefined;
        this.h = h || undefined;
        this.items = new Map<number, Map<number, LifeItem>>;
        this.itemsCount = 0;
    }

    public getItemsCount(): number {
        return this.itemsCount + 0;
    }

    public getItems(): LifeItem[] {
        let itemsResult: LifeItem[] = [];
        for (let [x, yItemMap] of this.items) {
            for (let [y, lifeItem] of yItemMap) {
                itemsResult.push(lifeItem);
            }
        }
        return itemsResult;
    }

    public addItems(items: LifeItem[]) {
        for (let itemsIndex in items) {
            this.addItem(items[itemsIndex]);
        }
    }

    public addItem(item: LifeItem) {
        // if (this.itemsCount > 10000) return;
        item.cell = this.normalizeCoords(item.cell);

        let existsItem: LifeItem = undefined;

        let yItemMap = this.items.get(item.cell.x);
        if (yItemMap) {
            existsItem = yItemMap.get(item.cell.y);
        }

        if (existsItem) {
            return;
        }

        if (!yItemMap) {
            yItemMap = new Map<number, LifeItem>();
            this.items.set(item.cell.x, yItemMap);
        }

        yItemMap.set(item.cell.y, item);
        this.itemsCount += 1;
    }

    public removeItem(item: LifeItem) {
        let yItemMap: Map<number, LifeItem> = this.items.get(item.cell.x);
        if (!yItemMap) return;
        if (yItemMap.delete(item.cell.y)) {
            this.itemsCount -= 1;
        }
        if (yItemMap.size == 0) {
            this.items.delete(item.cell.x);
        }
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

        let items = this.getItems();
        for (let itemIndex in items) {
            let lifeItem: LifeItem = items[itemIndex];
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
            this.removeItem(itemToDie);
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

            let yItemMap: Map<number, LifeItem> = this.items.get(neiborhoodsCell.x);

            let neiborhoodLifeItem = undefined;

            if (yItemMap) {
                neiborhoodLifeItem = yItemMap.get(neiborhoodsCell.y);
            }

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

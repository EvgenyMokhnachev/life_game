import LifeItem from "../logic/LifeItem";
import Cell from "../logic/Cell";

class LifeObject {
    private items: LifeItem[];
    private width: number;
    private height: number;

    constructor(items: LifeItem[]) {
        this.items = items;
        this.width = this.getWidth();
        this.height = this.getHeight();
    }

    public getWidth(): number {
        if (this.width) {
            return this.width;
        }

        let minX = 0;
        let maxX = 0;
        this.items.forEach(item => {
            if (item.cell.x > maxX) {
                maxX = item.cell.x;
            }

            if (item.cell.x < minX) {
                minX = item.cell.x;
            }
        });
        return maxX - minX;
    }

    public getHeight(): number {
        if (this.height) {
            return this.height;
        }

        let minY = 0;
        let maxY = 0;
        this.items.forEach(item => {
            if (item.cell.y > maxY) {
                maxY = item.cell.y;
            }

            if (item.cell.y < minY) {
                minY = item.cell.y;
            }
        });
        return maxY - minY;
    }

    public centralise(): LifeObject {
        let minX = 0;
        let maxX = 0;

        let minY = 0;
        let maxY = 0;

        this.items.forEach((item: LifeItem) => {
            if (item.cell.x > maxX) {
                maxX = item.cell.x
            }

            if (item.cell.x < minX) {
                minX = item.cell.x
            }

            if (item.cell.y > maxY) {
                maxY = item.cell.y
            }

            if (item.cell.y < minY) {
                minY = item.cell.y
            }
        });

        let centerX = Math.round((minX + maxX) / 2);
        let centerY = Math.round((minY + maxY) / 2);

        this.items = this.items.map(item => {
            let itemCell = new Cell(item.cell.x, item.cell.y);
            itemCell.x = itemCell.x - centerX;
            itemCell.y = itemCell.y - centerY;
            item.cell = itemCell;
            return item;
        });

        return this;
    }

    public move(x: number, y: number): LifeObject {
        this.items = this.items.map(item => {
            item.cell.x += x;
            item.cell.y += y;
            return item;
        });
        return this;
    }

    public getItems() {
        return this.items;
    }

}

export default LifeObject;

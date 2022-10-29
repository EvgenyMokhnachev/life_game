import * as assert from 'assert';

import Cell from '../main/lifegame/Cell';
import LifeGround from '../main/lifegame/LifeGround';

describe('LifeGround getNeiborhoodsCoords', () => {

    describe('Test X borders', () => {
        /*     0   1   2
        *  0  [ ] [ ] [ ]
        *  1  [ ] [X] [ ]
        *  2  [ ] [ ] [ ] */
        describe('Test get neiborhoods cell when main cell in center', () => {
            let lifeGround: LifeGround = new LifeGround(3, 3);
            let neiborhoodsCoords: Cell[] = lifeGround.getNeiborhoodsCoords(new Cell(1, 1));

            it('Should be found all neiborhoods cells around the cell', () => {
                let cellsShouldBeFound = [
                    new Cell(0, 0),
                    new Cell(1, 0),
                    new Cell(2, 0),
                    new Cell(0, 1),
                    new Cell(2, 1),
                    new Cell(0, 2),
                    new Cell(1, 2),
                    new Cell(2, 2)
                ];
                let cellsFound = cellsShouldBeFound.filter(cell => neiborhoodsCoords.find((neiborhoodCell: Cell) => neiborhoodCell.equals(cell)));
                assert.equal(cellsFound.length, cellsShouldBeFound.length);
            })
        });

        /*     0   1   2
        *  0  [ ] [ ] [ ]
        *  1  [ ] [ ] [X]
        *  2  [ ] [ ] [ ] */
        describe('Test get neiborhoods cell when main cell is on right border', () => {
            let lifeGround: LifeGround = new LifeGround(3, 3);
            let neiborhoodsCoords: Cell[] = lifeGround.getNeiborhoodsCoords(new Cell(2, 1));

            it('Should be found all neiborhoods cells around the cell', () => {
                let cellsShouldBeFound = [
                    new Cell(1, 0),
                    new Cell(1, 1),
                    new Cell(1, 2),
                    new Cell(2, 0),
                    new Cell(2, 2),
                    new Cell(0, 0),
                    new Cell(0, 1),
                    new Cell(0, 2)
                ];
                let cellsFound = cellsShouldBeFound.filter(cell => neiborhoodsCoords.find((neiborhoodCell: Cell) => neiborhoodCell.equals(cell)));
                assert.equal(cellsFound.length, cellsShouldBeFound.length);
            })
        })
    });
});

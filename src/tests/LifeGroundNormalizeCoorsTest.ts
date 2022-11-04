import * as assert from 'assert';

import Cell from '../main/lifegame/logic/Cell';
import LifeGround from '../main/lifegame/logic/LifeGround';

describe('LifeGround.normalizeCoords', () => {

    /*     0   1   2
    *  0  [ ] [ ] [ ]
    *  1  [ ] [X] [ ]
    *  2  [ ] [ ] [ ] */
    describe('Test CENTER cell', () => {
        let lifeGround: LifeGround = new LifeGround(3, 3);
        let testCoords = new Cell(1, 1);
        let normalizedCoord = lifeGround.normalizeCoords(new Cell(testCoords.x, testCoords.y));

        it('Coords should be equal as original coords', () => {
            assert.equal(testCoords.equals(normalizedCoord), true);
        })
    });

    /*     0   1   2
    *  0  [X] [ ] [ ]
    *  1  [ ] [ ] [ ]
    *  2  [ ] [ ] [ ] */
    describe('Test TOP-LEFT cell', () => {
        let lifeGround: LifeGround = new LifeGround(3, 3);
        let testCoords = new Cell(0, 0);
        let normalizedCoord = lifeGround.normalizeCoords(new Cell(testCoords.x, testCoords.y));

        it('Coords should be equal as original coords', () => {
            assert.equal(testCoords.equals(normalizedCoord), true);
        })
    });

    /*   -1  0   1   2
    * -1  X
    *  0    [ ] [ ] [ ]
    *  1    [ ] [ ] [ ]
    *  2    [ ] [ ] [ ] */
    describe('Test TOP (outsid -1) – LEFT (outside -1) cell', () => {
        let lifeGround: LifeGround = new LifeGround(3, 3);
        let testCoords = new Cell(-1, -1);
        let expectedCooord = new Cell(2, 2);
        let normalizedCoord = lifeGround.normalizeCoords(new Cell(testCoords.x, testCoords.y));

        it('Coords should be equal as original coords', () => {
            assert.equal(expectedCooord.equals(normalizedCoord), true);
        })
    });

    /*   -1  0   1   2   3
    * -1
    *  0    [ ] [ ] [ ]
    *  1    [ ] [ ] [ ]
    *  2    [ ] [ ] [X]
    *  3                    */
    describe('Test BOTTOM – RIGHT cell', () => {
        let lifeGround: LifeGround = new LifeGround(3, 3);
        let testCoords = new Cell(2, 2);
        let expectedCooord = new Cell(2, 2);
        let normalizedCoord = lifeGround.normalizeCoords(new Cell(testCoords.x, testCoords.y));

        it('Coords should be equal as expected coords', () => {
            assert.equal(expectedCooord.equals(normalizedCoord), true);
        })
    });

    /*   -1  0   1   2   3
    * -1
    *  0    [ ] [ ] [ ]
    *  1    [ ] [ ] [ ]
    *  2    [ ] [ ] [ ]
    *  3                 X  */
    describe('Test BOTTOM (outsid +1) – RIGHT (outside +1) cell', () => {
        let lifeGround: LifeGround = new LifeGround(3, 3);
        let testCoords = new Cell(3, 3);
        let expectedCooord = new Cell(0, 0);
        let normalizedCoord = lifeGround.normalizeCoords(new Cell(testCoords.x, testCoords.y));

        it('Coords should be equal as expected coords', () => {
            assert.equal(expectedCooord.equals(normalizedCoord), true);
        })
    });

});

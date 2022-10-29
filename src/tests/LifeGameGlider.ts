import * as assert from 'assert';

import Cell from '../main/lifegame/Cell';
import LifeGround from '../main/lifegame/LifeGround';
import LifeItem from '../main/lifegame/LifeItem';

describe('LifeGround Test', () => {

    /*     1   2   3   4   5   6   7
    *  1  [ ] [ ] [X] [ ] [ ] [ ] [ ]
    *  2  [X] [ ] [X] [ ] [ ] [ ] [ ]
    *  3  [ ] [X] [X] [ ] [ ] [ ] [ ]
    *  4  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
    *  5  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
    *  6  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
    *  7  [ ] [ ] [ ] [ ] [ ] [ ] [ ] */
    function getStartGamePosition(): LifeGround {
        let lifeGround: LifeGround = new LifeGround(7, 7);
        lifeGround.addItem(new LifeItem(new Cell(1, 2)));
        lifeGround.addItem(new LifeItem(new Cell(2, 3)));
        lifeGround.addItem(new LifeItem(new Cell(3, 1)));
        lifeGround.addItem(new LifeItem(new Cell(3, 2)));
        lifeGround.addItem(new LifeItem(new Cell(3, 3)));
        return lifeGround;
    }

    describe('Glider test case', () => {
        /*     1   2   3   4   5   6   7
        *  1  [ ] [X] [ ] [ ] [ ] [ ] [ ]
        *  2  [ ] [ ] [X] [X] [ ] [ ] [ ]
        *  3  [ ] [X] [X] [ ] [ ] [ ] [ ]
        *  4  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  5  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  6  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  7  [ ] [ ] [ ] [ ] [ ] [ ] [ ] */
        describe('First life iteration', () => {
            let lifeGround: LifeGround = getStartGamePosition();
            lifeGround.processIteration();

            it('Count of cels should be 5', () => {
                assert.equal(lifeGround.getItems().length, 5)
            })

            it('Position T=1', () => {
                let lifeCellsShouldBeFound = [
                    new Cell(2, 1),
                    new Cell(3, 2),
                    new Cell(4, 2),
                    new Cell(2, 3),
                    new Cell(3, 3),
                ];
                let lifeCellsFound = lifeCellsShouldBeFound.filter(cell => lifeGround.getItems().find((item: LifeItem) => item.cell.equals(cell)));
                assert.equal(lifeCellsFound.length, lifeCellsShouldBeFound.length);
            })
        })

        /*     1   2   3   4   5   6   7
        *  1  [ ] [ ] [X] [ ] [ ] [ ] [ ]
        *  2  [ ] [ ] [ ] [X] [ ] [ ] [ ]
        *  3  [ ] [X] [X] [X] [ ] [ ] [ ]
        *  4  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  5  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  6  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  7  [ ] [ ] [ ] [ ] [ ] [ ] [ ] */
        describe('Second life iteration', () => {
            let lifeGround: LifeGround = getStartGamePosition();
            lifeGround.processIteration();
            lifeGround.processIteration();

            it('Count of cels should be 5', () => {
                assert.equal(lifeGround.getItems().length, 5)
            })

            it('Position T=2', () => {
                let lifeCellsShouldBeFound = [
                    new Cell(3, 1),
                    new Cell(4, 2),
                    new Cell(2, 3),
                    new Cell(3, 3),
                    new Cell(4, 3),
                    ];
                let lifeCellsFound = lifeCellsShouldBeFound.filter(cell => lifeGround.getItems().find((item: LifeItem) => item.cell.equals(cell)));
                assert.equal(lifeCellsFound.length, lifeCellsShouldBeFound.length);
            })
        })

        /*     1   2   3   4   5   6   7
        *  1  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  2  [ ] [X] [ ] [X] [ ] [ ] [ ]
        *  3  [ ] [ ] [X] [X] [ ] [ ] [ ]
        *  4  [ ] [ ] [X] [ ] [ ] [ ] [ ]
        *  5  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  6  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  7  [ ] [ ] [ ] [ ] [ ] [ ] [ ] */
        describe('Third life iteration', () => {
            let lifeGround: LifeGround = getStartGamePosition();
            lifeGround.processIteration();
            lifeGround.processIteration();
            lifeGround.processIteration();

            it('Count of cels should be 5', () => {
                assert.equal(lifeGround.getItems().length, 5)
            })

            it('Position T=3', () => {
                let lifeCellsShouldBeFound = [
                    new Cell(2, 2),
                    new Cell(4, 2),
                    new Cell(3, 3),
                    new Cell(4, 3),
                    new Cell(3, 4),
                ];
                let lifeCellsFound = lifeCellsShouldBeFound.filter(cell => lifeGround.getItems().find((item: LifeItem) => item.cell.equals(cell)));
                assert.equal(lifeCellsFound.length, lifeCellsShouldBeFound.length);
            })
        })

        /*     1   2   3   4   5   6   7
        *  1  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  2  [ ] [ ] [ ] [X] [ ] [ ] [ ]
        *  3  [ ] [X] [ ] [X] [ ] [ ] [ ]
        *  4  [ ] [ ] [X] [X] [ ] [ ] [ ]
        *  5  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  6  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  7  [ ] [ ] [ ] [ ] [ ] [ ] [ ] */
        describe('Forth life iteration', () => {
            let lifeGround: LifeGround = getStartGamePosition();
            lifeGround.processIteration();
            lifeGround.processIteration();
            lifeGround.processIteration();
            lifeGround.processIteration();

            it('Count of cels should be 5', () => {
                assert.equal(lifeGround.getItems().length, 5)
            })

            it('Position T=4 === T=1 (N+4)', () => {
                let lifeCellsShouldBeFound = [
                    new Cell(2, 3),
                    new Cell(3, 4),
                    new Cell(4, 2),
                    new Cell(4, 3),
                    new Cell(4, 4),
                ];
                let lifeCellsFound = lifeCellsShouldBeFound.filter(cell => lifeGround.getItems().find((item: LifeItem) => item.cell.equals(cell)));
                assert.equal(lifeCellsFound.length, lifeCellsShouldBeFound.length);
            })
        })
    });
});

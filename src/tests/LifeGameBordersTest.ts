import * as assert from 'assert';

import Cell from '../main/lifegame/Cell';
import LifeGround from '../main/lifegame/LifeGround';
import LifeItem from '../main/lifegame/LifeItem';

describe('LifeGround Borders test', () => {

    describe('Test X borders', () => {
        /*     0   1   2   3   4   5   6
        *  0  [X] [ ] [ ] [ ] [ ] [ ] [ ]
        *  1  [X] [ ] [ ] [ ] [ ] [ ] [ ]
        *  2  [X] [ ] [ ] [ ] [ ] [ ] [ ]
        *  3  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  4  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  5  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  6  [ ] [ ] [ ] [ ] [ ] [ ] [ ] */
        function getStartGamePosition(): LifeGround {
            let lifeGround: LifeGround = new LifeGround(7, 7);
            lifeGround.addItem(new LifeItem(new Cell(0, 0)));
            lifeGround.addItem(new LifeItem(new Cell(0, 1)));
            lifeGround.addItem(new LifeItem(new Cell(0, 2)));
            return lifeGround;
        }

        /*     0   1   2   3   4   5   6
        *  0  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  1  [X] [X] [ ] [ ] [ ] [ ] [X]
        *  2  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  3  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  4  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  5  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  6  [ ] [ ] [ ] [ ] [ ] [ ] [ ] */
        describe('First life iteration', () => {
            let lifeGround: LifeGround = getStartGamePosition();
            lifeGround.processIteration();

            it('Count of cels should be 3', () => {
                assert.equal(lifeGround.getItems().length, 3)
            })

            it('New positions should be horisontal', () => {
                let lifeCellsShouldBeFound = [
                    new Cell(0, 1),
                    new Cell(1, 1),
                    new Cell(6, 1)
                ];
                let lifeCellsFound = lifeCellsShouldBeFound.filter(cell => lifeGround.getItems().find((item: LifeItem) => item.cell.equals(cell)));
                assert.equal(lifeCellsFound.length, lifeCellsShouldBeFound.length);
            })
        })

        /*     0   1   2   3   4   5   6
        *  0  [X] [ ] [ ] [ ] [ ] [ ] [ ]
        *  1  [X] [ ] [ ] [ ] [ ] [ ] [ ]
        *  2  [X] [ ] [ ] [ ] [ ] [ ] [ ]
        *  3  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  4  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  5  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  6  [ ] [ ] [ ] [ ] [ ] [ ] [ ] */
        describe('Second life iteration', () => {
            let lifeGround: LifeGround = getStartGamePosition();
            lifeGround.processIteration();
            lifeGround.processIteration();

            it('Count of cels should be 3', () => {
                assert.equal(lifeGround.getItems().length, 3)
            })

            it('New positions should be vertical', () => {
                let lifeCellsShouldBeFound = [
                    new Cell(0, 0),
                    new Cell(0, 1),
                    new Cell(0, 2)
                ];
                let lifeCellsFound = lifeCellsShouldBeFound.filter(cell => lifeGround.getItems().find((item: LifeItem) => item.cell.equals(cell)));
                assert.equal(lifeCellsFound.length, lifeCellsShouldBeFound.length);
            })
        })
    });

    describe('Test Y borders', () => {
        /*     0   1   2   3   4   5   6
        *  0  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  1  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  2  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  3  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  4  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  5  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  6  [ ] [ ] [ ] [ ] [X] [X] [X] */
        function getStartGamePosition(): LifeGround {
            let lifeGround: LifeGround = new LifeGround(7, 7);
            lifeGround.addItem(new LifeItem(new Cell(4, 6)));
            lifeGround.addItem(new LifeItem(new Cell(5, 6)));
            lifeGround.addItem(new LifeItem(new Cell(6, 6)));
            return lifeGround;
        }

        /*     0   1   2   3   4   5   6
        *  0  [ ] [ ] [ ] [ ] [ ] [X] [ ]
        *  1  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  2  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  3  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  4  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  5  [ ] [ ] [ ] [ ] [ ] [X] [ ]
        *  6  [ ] [ ] [ ] [ ] [ ] [X] [ ] */
        describe('First life iteration', () => {
            let lifeGround: LifeGround = getStartGamePosition();
            lifeGround.processIteration();

            it('Count of cels should be 3', () => {
                assert.equal(lifeGround.getItems().length, 3)
            })

            it('New positions should be vertical', () => {
                let lifeCellsShouldBeFound = [
                    new Cell(5, 0),
                    new Cell(5, 5),
                    new Cell(5, 6)
                ];
                let lifeCellsFound = lifeCellsShouldBeFound.filter(cell => lifeGround.getItems().find((item: LifeItem) => item.cell.equals(cell)));
                assert.equal(lifeCellsFound.length, lifeCellsShouldBeFound.length);
            })
        })

        /*     0   1   2   3   4   5   6
        *  0  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  1  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  2  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  3  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  4  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  5  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  6  [ ] [ ] [ ] [ ] [X] [X] [X] */
        describe('Second life iteration', () => {
            let lifeGround: LifeGround = getStartGamePosition();
            lifeGround.processIteration();
            lifeGround.processIteration();

            it('Count of cels should be 3', () => {
                assert.equal(lifeGround.getItems().length, 3)
            })

            it('New positions should be horizontal', () => {
                let lifeCellsShouldBeFound = [
                    new Cell(4, 6),
                    new Cell(5, 6),
                    new Cell(6, 6)
                ];
                let lifeCellsFound = lifeCellsShouldBeFound.filter(cell => lifeGround.getItems().find((item: LifeItem) => item.cell.equals(cell)));
                assert.equal(lifeCellsFound.length, lifeCellsShouldBeFound.length);
            })
        })
    });
});

import * as assert from 'assert';

import Cell from '../main/lifegame/Cell';
import LifeGround from '../main/lifegame/LifeGround';
import LifeItem from '../main/lifegame/LifeItem';

describe('LifeGround Test', () => {

    /*     1   2   3   4   5   6   7
    *  1  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
    *  2  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
    *  3  [ ] [ ] [ ] [X] [ ] [ ] [ ]
    *  4  [ ] [ ] [ ] [ ] [X] [ ] [ ]
    *  5  [ ] [ ] [ ] [X] [ ] [ ] [ ]
    *  6  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
    *  7  [ ] [ ] [ ] [ ] [ ] [ ] [ ] */
    function getStartGamePosition(): LifeGround {
        let lifeGround: LifeGround = new LifeGround(7, 7);
        lifeGround.addItem(new LifeItem(new Cell(4, 3)));
        lifeGround.addItem(new LifeItem(new Cell(5, 4)));
        lifeGround.addItem(new LifeItem(new Cell(4, 5)));
        return lifeGround;
    }

    describe('Die case 1', () => {
        /*     1   2   3   4   5   6   7
        *  1  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  2  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  3  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  4  [ ] [ ] [ ] [X] [X] [ ] [ ]
        *  5  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  6  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  7  [ ] [ ] [ ] [ ] [ ] [ ] [ ] */
        describe('First life iteration', () => {
            let lifeGround: LifeGround = getStartGamePosition();
            lifeGround.processIteration();

            it('Count of cels should be 2', () => {
                assert.equal(lifeGround.getItems().length, 2)
            })

            it('New positions should be horisontal', () => {
                let lifeCellsShouldBeFound = [
                    new Cell(4, 4),
                    new Cell(5, 4)
                ];
                let lifeCellsFound = lifeCellsShouldBeFound.filter(cell => lifeGround.getItems().find((item: LifeItem) => item.cell.equals(cell)));
                assert.equal(lifeCellsFound.length, lifeCellsShouldBeFound.length);
            })
        })

        /*     1   2   3   4   5   6   7
        *  1  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  2  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  3  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  4  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  5  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  6  [ ] [ ] [ ] [ ] [ ] [ ] [ ]
        *  7  [ ] [ ] [ ] [ ] [ ] [ ] [ ] */
        describe('Second life iteration', () => {
            let lifeGround: LifeGround = getStartGamePosition();
            lifeGround.processIteration();
            lifeGround.processIteration();

            it('Count of cels should be 0', () => {
                assert.equal(lifeGround.getItems().length, 0)
            })
        })
    });
})

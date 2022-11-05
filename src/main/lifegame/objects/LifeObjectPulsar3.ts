import LifeObject from "./LifeObject";
import LifeItem from "../logic/LifeItem";

export default class extends LifeObject{

    constructor() {
        super([
            LifeItem.create(2, 0),
            LifeItem.create(3, 0),
            LifeItem.create(4, 0),
            LifeItem.create(8, 0),
            LifeItem.create(9, 0),
            LifeItem.create(10, 0),

            LifeItem.create(0, 2),
            LifeItem.create(5, 2),
            LifeItem.create(7, 2),
            LifeItem.create(12, 2),

            LifeItem.create(0, 3),
            LifeItem.create(5, 3),
            LifeItem.create(7, 3),
            LifeItem.create(12, 3),

            LifeItem.create(0, 4),
            LifeItem.create(5, 4),
            LifeItem.create(7, 4),
            LifeItem.create(12, 4),

            LifeItem.create(2, 5),
            LifeItem.create(3, 5),
            LifeItem.create(4, 5),
            LifeItem.create(8, 5),
            LifeItem.create(9, 5),
            LifeItem.create(10, 5),

            LifeItem.create(2, 7),
            LifeItem.create(3, 7),
            LifeItem.create(4, 7),
            LifeItem.create(8, 7),
            LifeItem.create(9, 7),
            LifeItem.create(10, 7),

            LifeItem.create(0, 8),
            LifeItem.create(5, 8),
            LifeItem.create(7, 8),
            LifeItem.create(12, 8),

            LifeItem.create(0, 9),
            LifeItem.create(5, 9),
            LifeItem.create(7, 9),
            LifeItem.create(12, 9),

            LifeItem.create(0, 10),
            LifeItem.create(5, 10),
            LifeItem.create(7, 10),
            LifeItem.create(12, 10),

            LifeItem.create(2, 12),
            LifeItem.create(3, 12),
            LifeItem.create(4, 12),
            LifeItem.create(8, 12),
            LifeItem.create(9, 12),
            LifeItem.create(10, 12),
        ]);
    }

}

import LifeObject from "./LifeObject";
import LifeItem from "../logic/LifeItem";

export default class extends LifeObject{

    constructor() {
        super([
            LifeItem.create(0, 5),
            LifeItem.create(0, 6),

            LifeItem.create(1, 4),
            LifeItem.create(1, 5),
            LifeItem.create(1, 6),

            LifeItem.create(2, 2),

            LifeItem.create(3, 1),
            LifeItem.create(3, 2),
            LifeItem.create(3, 4),

            LifeItem.create(4, 0),
            LifeItem.create(4, 1),

            LifeItem.create(5, 1),
            LifeItem.create(5, 2),
            LifeItem.create(5, 4),
            LifeItem.create(5, 5),
            LifeItem.create(5, 6),

            LifeItem.create(6, 2),

            LifeItem.create(7, 4),

            LifeItem.create(8, 8),

            LifeItem.create(9, 5),
            LifeItem.create(9, 9),

            LifeItem.create(10, 4),
            LifeItem.create(10, 5),
            LifeItem.create(10, 7),
            LifeItem.create(10, 8),

            LifeItem.create(11, 5),

            LifeItem.create(12, 6),
            LifeItem.create(12, 7),
            LifeItem.create(12, 9),
            LifeItem.create(12, 10),
        ]);
    }

}

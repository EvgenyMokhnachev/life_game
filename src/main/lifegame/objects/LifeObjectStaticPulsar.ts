import LifeObject from "./LifeObject";
import LifeItem from "../logic/LifeItem";

export default class extends LifeObject{

    constructor() {
        super([
            LifeItem.create(0, 0),
            LifeItem.create(1, 0),
            LifeItem.create(2, 0),
            LifeItem.create(3, 0),
            LifeItem.create(4, 0),

            LifeItem.create(0, 1),
            LifeItem.create(1, 1),
            LifeItem.create(2, 1),
            LifeItem.create(3, 1),
            LifeItem.create(4, 1),

            LifeItem.create(0, 2),
            LifeItem.create(1, 2),

            LifeItem.create(2, 2),

            LifeItem.create(3, 2),
            LifeItem.create(4, 2),

            LifeItem.create(0, 3),
            LifeItem.create(1, 3),
            LifeItem.create(2, 3),
            LifeItem.create(3, 3),
            LifeItem.create(4, 3),

            LifeItem.create(0, 4),
            LifeItem.create(1, 4),
            LifeItem.create(2, 4),
            LifeItem.create(3, 4),
            LifeItem.create(4, 4),
        ]);
    }

}

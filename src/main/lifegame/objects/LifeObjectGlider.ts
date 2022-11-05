import LifeObject from "./LifeObject";
import LifeItem from "../logic/LifeItem";

export default class extends LifeObject{

    constructor() {
        super([
            LifeItem.create(0, 1),
            LifeItem.create(1, 2),
            LifeItem.create(2, 0),
            LifeItem.create(2, 1),
            LifeItem.create(2, 2)
        ]);
    }

}

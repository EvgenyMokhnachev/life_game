import LifeObject from "./LifeObject";
import LifeItem from "../logic/LifeItem";

export default class extends LifeObject {

    constructor() {
        super([
            LifeItem.create(0, 0),
        ]);
    }

}

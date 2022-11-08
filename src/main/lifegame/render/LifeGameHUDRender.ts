import CanvasRenderer from "../../render/CanvasRenderer";
import Rect from "../../render/simple/Rect";

export default class {
    private renderer: CanvasRenderer;

    constructor(renderer: CanvasRenderer) {
        this.renderer = renderer;
        this.render();
    }

    private render() {
        const margin = 20;
        const height = 60;
        let width = (window.innerWidth / 2) - margin - margin;
        let item = new Rect(
            (window.innerWidth / 2) - (width / 2),
            (window.innerHeight - height) - margin,
            width, height)
            .setBorderRadius(12)
            .setFillStyle('#dddddd');
        item.zIndex = 2;
        this.renderer.addItem(item);
    }

}

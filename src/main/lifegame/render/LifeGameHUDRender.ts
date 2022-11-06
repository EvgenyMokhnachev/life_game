import CanvasRenderer from "../../render/CanvasRenderer";
import Rect from "../../render/Rect";

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
        this.renderer.addItem(
            new Rect(
                (window.innerWidth / 2) - (width / 2),
                (window.innerHeight - height) - margin,
                width, height
            )
                .setBorderRadius(12)
                .setFillStyle('#dddddd')
        );
    }

}

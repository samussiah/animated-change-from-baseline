import getDimensions from './layout/getDimensions';
import layoutControls from './layout/controls';
import layoutLegend from './layout/legend';
import layoutCanvas from './layout/canvas';

export default function layout() {
    const main = this.util.addElement('main', d3.select(this.element));
    getDimensions.call(this, main);
    const controls = layoutControls.call(this, main);
    const legend = layoutLegend.call(this, main);
    const canvas = layoutCanvas.call(this, main);

    return {
        main,
        controls,
        legend,
        ...canvas,
    };
}

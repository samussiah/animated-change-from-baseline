import getDimensions from './layout/getDimensions';
import layoutControls from './layout/controls';
import layoutLegend from './layout/legend';
import layoutCanvas from './layout/canvas';
//import resize from './layout/resize';

export default function layout() {
    const main = this.util.addElement('main', d3.select(this.element));
    getDimensions.call(this, main);
    const controls = layoutControls.call(this, main);
    const legend = layoutLegend.call(this, main);
    const canvas = layoutCanvas.call(this, main);

    //window.addEventListener('resize', resize.bind(this));

    return {
        main,
        controls,
        legend,
        ...canvas,
    };
}

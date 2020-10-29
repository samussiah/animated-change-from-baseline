export default function layout() {
    const main = this.util.addElement('main', d3.select(this.element));
    this.settings.width = this.settings.width || main.node().clientWidth;
    this.settings.height = this.settings.height || main.node().clientHeight;
    const svg = this.util.addElement('svg', main, 'svg')
        .attr('width', this.settings.width)
        .attr('height', this.settings.height);
    const g = this.util.addElement('g', main, 'g');

    return {
        main,
        svg,
        g,
    };
}
